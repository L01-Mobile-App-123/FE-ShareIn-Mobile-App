declare module 'socket.io-client/dist/socket.io.js' {
  import { io as _io, Socket } from 'socket.io-client';
  export const io: typeof _io;
  export type { Socket };
}
