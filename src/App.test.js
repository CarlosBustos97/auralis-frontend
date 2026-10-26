import { render, screen } from '@testing-library/react';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: () => ({
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(),
      interceptors: { request: { use: jest.fn() } },
    }),
    post: jest.fn(),
  },
}));

jest.mock('socket.io-client', () => ({
  io: () => ({
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  }),
}));

import App from './App';

test('pide identificación antes de abrir la clase', async () => {
  render(<App />);
  expect(await screen.findByText(/Entra a la clase en vivo/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /crear una cuenta/i })).toBeInTheDocument();
});
