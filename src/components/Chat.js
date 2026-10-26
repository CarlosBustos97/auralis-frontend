import React, { useEffect, useRef, useState } from "react";
import axiosInstance from '../axiosConfig';
import createSocket from "../socket";
import 'bootstrap/dist/css/bootstrap.min.css';

const Chat = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    let active = true;
    const socket = createSocket();

    const upsertMessage = (incoming) => {
      if (!incoming?._id) return;
      setMessages((prevMessages) => {
        if (prevMessages.some((item) => item._id === incoming._id)) return prevMessages;
        return [...prevMessages, incoming];
      });
    };

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/message/getAll');
        if (active) setMessages(response.data);
      } catch {
        if (active) setError('No se pudo cargar el chat');
      }
    };

    fetchMessages();
    socket.on('message', upsertMessage);

    return () => {
      active = false;
      socket.off('message', upsertMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setError('');

    try {
      const response = await axiosInstance.post('/message/store', { text });
      setMessages((prevMessages) => {
        if (prevMessages.some((item) => item._id === response.data._id)) return prevMessages;
        return [...prevMessages, response.data];
      });
      setMessage('');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo enviar el mensaje');
    }
  };

  return (
    <section className="chat-panel">
      <div className="panel-heading">
        <h2>Chat de la clase</h2>
        <p>Los mensajes aparecen al instante para todos los participantes.</p>
      </div>
      <div className="chat-log">
        {messages.length === 0 && <p className="chat-empty">Todavía no hay mensajes. Escribe el primero.</p>}
        {messages.map((msg) => {
          const author = msg.created_by || {};
          const isModerator = author.role === 'moderador';
          const isMine = author._id === currentUser?._id;
          return (
            <article key={msg._id} className={`chat-message ${isModerator ? 'is-moderator' : 'is-student'} ${isMine ? 'is-mine' : ''}`}>
              <header>
                <strong>{author.name || 'Participante'}</strong>
                <span className={`role-pill role-${author.role || 'estudiante'}`}>
                  {isModerator ? 'Moderador' : 'Estudiante'}
                </span>
                <time>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              </header>
              <p>{msg.text}</p>
            </article>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          maxLength={500}
          aria-label="Mensaje"
        />
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </section>
  );
};

export default Chat;
