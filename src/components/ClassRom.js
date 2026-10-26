import React from 'react';
import Chat from './Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassRoom = ({ user, onLogout }) => {
  const roleLabel = user?.role === 'moderador' ? 'Moderador' : 'Estudiante';

  return (
    <div className="classroom-page">
      <header className="classroom-bar">
        <div>
          <p className="brand-kicker">Auralis</p>
          <h1>Clase en vivo</h1>
        </div>
        <div className="session-meta">
          <div>
            <strong>{user?.name}</strong>
            <span className={`role-pill role-${user?.role}`}>{roleLabel}</span>
          </div>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={onLogout}>Salir</button>
        </div>
      </header>
      <main className="classroom-grid">
        <section className="video-panel">
          <div className="panel-heading">
            <h2>Sesión activa</h2>
            <p>Introducción a JavaScript. No hay más clases para elegir.</p>
          </div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/PVoZ86J3tGQ?si=DT0OkvTBRC4XKlmN"
              title="Transmisión de la clase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <Chat currentUser={user} />
      </main>
    </div>
  );
};

export default ClassRoom;
