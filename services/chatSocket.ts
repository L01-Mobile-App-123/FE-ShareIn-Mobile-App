import { io, Socket } from 'socket.io-client';

const SERVER_URL =
  process.env.SERVER_URL || 'https://mobile-app-be-oxwk.onrender.com';

let socket: Socket | null = null;

export function connectSocket(userId: string) {
  if (!socket) {
    const s = io(SERVER_URL, {
      transports: ['websocket'],
      query: { userId },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socket = s;

    s.on('connect', () => console.log('Socket connected', s.id));
    s.on('disconnect', (r) => console.log('Socket disconnected', r));
    s.on('reconnect_attempt', () => console.log('Socket reconnecting...'));
    s.on('reconnect', () => console.log('Socket reconnected'));
    s.on('connect_error', (e) => console.log('Socket error', e.message));
  }
  return socket;
}

export function getSocket() {
  if (socket && socket.disconnected && socket.active === false) {
    socket = null;
  }
  return socket;
}
