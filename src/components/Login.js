import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="brand-kicker">Auralis</p>
        <h1>Entra a la clase en vivo</h1>
        <p className="auth-copy">Hay una sola sesión activa. Al identificarte se abre sola, con el video y el chat.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="tu.usuario"
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        <Link to="/register" className="auth-link">Crear una cuenta</Link>
        <div className="demo-box">
          <p>Cuentas de demostración</p>
          <span>Moderadora: ana.rios / aula123</span>
          <span>Estudiante: leo.martinez / aula123</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
