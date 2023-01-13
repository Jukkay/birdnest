import { NextApiRequest } from 'next/types';
import { Server } from 'socket.io';
import {
	IRawData,
	IReturnType,
	ISavedDrone,
	NextApiResponseWithSocket,
	ServerToClientEvents,
} from '../../types';
import { getRefetchInterval } from '../../utils/queries';
import { XMLParser } from 'fast-xml-parser';
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
	if (res.socket.server.io && queriesOn) return res.end();
	console.log('Initializing socket connection and starting API requests.');
	const io = new Server<ServerToClientEvents>(res.socket.server);
	res.socket.server.io = io;

	// Get current API refresh interval so we can use it as our refetch interval
	const refetchInterval = await getRefetchInterval();
	subscribeToUpdates(io, refetchInterval);
	queriesOn = true;
	res.end();
}

const subscribeToUpdates = (io: Server, refetchInterval: number) => {
	const timer = setIntervalAsync(async () => {
		try {
			const response = await fetch(
				'https://assignments.reaktor.com/birdnest/drones'
			);
			if (!response.ok) throw new Error('Failed to retrieve drone data');
			const xml = await response.text();
			const parser = new XMLParser();
			const data = parser.parse(xml).report.capture.drone;

			// Find violators and save distances
			const violators: ISavedDrone[] = [];
			const allDrones: IRawData[] = data.map((drone: IRawData) => {
				const x = Math.abs(drone.positionX - 250000);
				const y = Math.abs(drone.positionY - 250000);
				const distance = Math.sqrt(x * x + y * y);
				const rad = 100000;
				let violator = false;
				if (distance <= rad) {
					violator = true;
					violators.push({
						serialNumber: drone.serialNumber,
						violationTime: new Date(),
						distance: distance,
						name: '-',
						email: '-',
						phoneNumber: '-',
					});
				}
				drone.violator = violator;
				return drone;
			});

			// Query pilot information for new violators
			const newViolators: ISavedDrone[] = await Promise.all(
				violators.map(async (violator: ISavedDrone) => {
					const pilotInfo = await fetchInfo({
						serialNumber: violator.serialNumber,
					});
					return {
						...violator,
						name: `${pilotInfo.firstName} ${pilotInfo.lastName}`,
						email: pilotInfo.email,
						phoneNumber: pilotInfo.phoneNumber,
					};
				})
			);

			// Save new violators
			if (newViolators.length > 0) {
				await prisma.drone.createMany({
					data: newViolators,
					skipDuplicates: true,
				});
			}

			// Update old violators. Prisma doesn't accept multiple conditions on updates so we need to find and update separately.
			await Promise.all(
				violators.map(async (violator: ISavedDrone) => {
					const record = await prisma.drone.findFirst({
						where: {
							serialNumber: violator.serialNumber,
						},
					});
					if (!record) return;

					// Update violation time
					await prisma.drone.update({
						where: {
							serialNumber: violator.serialNumber,
						},
						data: {
							violationTime: violator.violationTime,
						},
					});

					// Update shortest violation distance
					if (record.distance > violator.distance) {
						await prisma.drone.update({
							where: {
								serialNumber: violator.serialNumber,
							},
							data: {
								distance: violator.distance,
							},
						});
					}
				})
			);

			// Purge data older than 10min as per requirements
			await prisma.drone.deleteMany({
				where: {
					violationTime: {
						lt: new Date(new Date().getTime() - 10 * 60 * 1000),
					},
				},
			});
			const freshData = await prisma.drone.findMany({
				orderBy: [
					{
						violationTime: 'desc',
					},
				],
			});
			const returnData: IReturnType = {
				violators: freshData,
				all: allDrones,
				refetchInterval: refetchInterval,
			};

			// Emit data to all connected user. Volatile means sent data is discarded if it's not received.
			io.volatile.emit('update', returnData);

			// Stop interval if no sockets connected to avoid unnecessary API requests
			const connectedSockets = await io.fetchSockets();
			if (connectedSockets.length === 0) {
				(async () => {
					console.log('No sockets connected. Stopping API requests.');
					await clearIntervalAsync(timer);
					queriesOn = false;
				})();
			}
		} catch (err) {
			console.error(err);
		}
	}, refetchInterval);
};
