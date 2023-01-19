import { NextApiRequest } from 'next/types';
import { Server } from 'socket.io';
import {
	formatReturnType,
	IRawData,
	IReturnType,
	ISavedDrone,
	NextApiResponseWithSocket,
	ServerToClientEvents,
} from '../../types';
import { fetchDroneList, getRefetchInterval } from '../../utils/queries';
import { fetchInfo } from '../../utils/queries';
import {
	setIntervalAsync,
	clearIntervalAsync,
} from 'set-interval-async/dynamic';
import { prisma } from '../../utils/prisma';

// This endpoint is called everytime a user lands on the page. API queries are started when there's active users and stopped when there is none.

let queriesOn = false;

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponseWithSocket
) {
	try {
		// Create socket server instance if not already created
		if (!res.socket.server.io) {
			res.socket.server.io = new Server<ServerToClientEvents>(
				res.socket.server
			);
		}
		const socketServer = res.socket.server.io;
		// Start queries if not active
		if (!queriesOn) {
			// Get current API refresh interval so we can use it as our refetch interval
			const refetchInterval = await getRefetchInterval();
			subscribeToUpdates(socketServer, refetchInterval);
			queriesOn = true;
		}
		res.end();
	} catch (err) {}
}

// Set interval to fetch, process and send drone data
const subscribeToUpdates = (socketServer: Server, refetchInterval: number) => {
	const timer = setIntervalAsync(async () => {
		try {
			const data = await fetchDroneList();
			const [violators, allDrones] = formatDroneLists(data);
			await Promise.all(violators.map(saveOrUpdateViolator));
			await deleteExpiredData();
			const returnData: IReturnType = {
				violators: await getCurrentViolators(),
				all: allDrones,
				refetchInterval: refetchInterval,
			};
			// Emit data to all connected user. Volatile means sent data is discarded if it's not received.
			socketServer.volatile.emit('update', returnData);

			// Stop interval if no sockets connected to avoid unnecessary API requests
			const connectedSockets = await socketServer.fetchSockets();
			if (connectedSockets.length === 0) {
				(async () => {
					await clearIntervalAsync(timer);
					queriesOn = false;
				})();
			}
		} catch (err) {}
	}, refetchInterval);
};

// Calculate distances and create arrays for violators and all drones
const formatDroneLists = (data: IRawData[]) => {
	const violators: ISavedDrone[] = [];
	const allDrones: IRawData[] = data.map((drone: IRawData) => {
		const x = Math.abs(drone.positionX - 250000);
		const y = Math.abs(drone.positionY - 250000);
		const distance = Math.sqrt(x * x + y * y);
		const rad = 100000;
		if (distance > rad) {
			drone.violator = false;
			return drone;
		}
		violators.push({
			serialNumber: drone.serialNumber,
			violationTime: new Date(),
			distance: distance,
			name: '-',
			email: '-',
			phoneNumber: '-',
		});
		drone.violator = true;
		return drone;
	});
	return [violators, allDrones] as formatReturnType;
};

// Save new violators and update info for existing ones
const saveOrUpdateViolator = async (violator: ISavedDrone) => {
	try {
		const record = await prisma.drone.findFirst({
			where: {
				serialNumber: violator.serialNumber,
			},
		});
		if (!record) {
			saveNewViolator(violator);
			return;
		}
		updateViolationTime(violator);
		// Save closest distance to the hive
		if (record.distance > violator.distance)
			updateViolationDistance(violator);
	} catch (err) {}
};

// Get new pilot data and save to DB
const saveNewViolator = async (violator: ISavedDrone) => {
	const pilotInfo = await fetchInfo({
		serialNumber: violator.serialNumber,
	});
	await prisma.drone.create({
		data: {
			...violator,
			name: `${pilotInfo.firstName} ${pilotInfo.lastName}`,
			email: pilotInfo.email,
			phoneNumber: pilotInfo.phoneNumber,
		},
	});
};

const updateViolationTime = async(violator: ISavedDrone) => {
	await prisma.drone.update({
		where: {
			serialNumber: violator.serialNumber,
		},
		data: {
			violationTime: violator.violationTime,
		},
	});
};
const updateViolationDistance = async(violator: ISavedDrone) => {
	await prisma.drone.update({
		where: {
			serialNumber: violator.serialNumber,
		},
		data: {
			distance: violator.distance,
		},
	});
};

const deleteExpiredData = async () => {
	await prisma.drone.deleteMany({
		where: {
			violationTime: {
				lt: new Date(new Date().getTime() - 10 * 60 * 1000),
			},
		},
	});
};

const getCurrentViolators = async () => {
	return prisma.drone.findMany({
		orderBy: [
			{
				violationTime: 'desc',
			},
		],
	});
};
