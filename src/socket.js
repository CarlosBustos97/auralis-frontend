import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const createSocket = () => io(API_URL, {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token')
  }
});

export default createSocket;
