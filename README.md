# Auralis - Frontend

Interfaz de la clase en vivo. Después de iniciar sesión se abre la única clase activa, con el video y el chat.

Repositorio: https://github.com/CarlosBustos97/auralis-frontend

## Requisitos

- Node.js 18 o superior
- El backend de Auralis corriendo en `http://localhost:5000`

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. El archivo `.env` apunta a la API:

```bash
REACT_APP_API_URL=http://localhost:5000
```

3. Iniciar la aplicación:

```bash
npm start
```

La aplicación queda en `http://localhost:3000`. Si ese puerto está ocupado, arranca con `set PORT=3001` y agrega `http://localhost:3001` en `CLIENT_ORIGIN` del backend.

## Uso

Entra con una cuenta registrada o con las de demostración que crea el backend:

- Moderadora: `ana.rios` / `aula123`
- Estudiante: `leo.martinez` / `aula123`

El moderador se distingue con una etiqueta propia en el chat. Los mensajes se actualizan sin recargar la página.

## Pruebas

```bash
npm test -- --watchAll=false
```
