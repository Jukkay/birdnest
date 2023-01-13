import { NextApiResponse } from 'next/types';
import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';

export interface ServerToClientEvents {
	update: (returnData: IReturnType) => void;
}
interface SocketServer extends HTTPServer {
	io?: IOServer;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO;
}

export interface IDrone extends IPilot {
	serialNumber: string;
	violationTime?: number;
}
export interface IPilot {
	positionY: number;
	positionX: number;
	violator: boolean;
}
export interface IReturnType {
	violators: ISavedDrone[];
	all: IRawData[];
	refetchInterval: number;
}

export interface ISavedDrone {
	serialNumber: string;
	violationTime: Date;
	distance: number;
	name: string;
	email: string;
	phoneNumber: string;
}

export interface IRawData {
	serialNumber: string;
	model: string;
	manufacturer: string;
	mac: string;
	ipv4: string;
	ipv6: string;
	firmware: string;
	positionY: number;
	positionX: number;
	altitude: number;
	violator: boolean;
}
