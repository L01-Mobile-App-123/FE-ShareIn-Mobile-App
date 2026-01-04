import { io, Socket } from 'socket.io-client/dist/socket.io.js';

const SERVER_URL = 'https://mobile-app-be-oxwk.onrender.com/';
let socket: Socket | null = null;

export function connectSocket(userId: string) {
  if (!socket) {
    socket = io(SERVER_URL, {
      transports: ['websocket'],
      query: { userId },
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}
