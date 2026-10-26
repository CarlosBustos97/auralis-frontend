import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('estudiante');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        name,
        role,
        status: true,
      });
      navigate('/login');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo completar el registro');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="brand-kicker">Auralis</p>
        <h1>Crear cuenta</h1>
        <p className="auth-copy">El usuario es único. El rol define si entras como estudiante o como moderador de la clase.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre y apellido"
            required
          />
          <label htmlFor="role">Rol</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="estudiante">Estudiante</option>
            <option value="moderador">Moderador</option>
          </select>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="usuario.unico"
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 4 caracteres"
            required
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Registrarme</button>
        </form>
        <Link to="/login" className="auth-link">Ya tengo cuenta</Link>
      </div>
    </div>
  );
};

export default Register;
