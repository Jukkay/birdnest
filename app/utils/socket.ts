import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents } from '../types';

// Socket client instance
export const socket: Socket<ServerToClientEvents> = io({
	autoConnect: false,
	reconnection: true,
});
