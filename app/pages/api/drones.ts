import { XMLParser } from 'fast-xml-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchInfo } from '../../utils/queries';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Set Cache control header for Vercel Edge Network
		// Cache is valid for 2 seconds and will be refreshed after that
		res.setHeader('Cache-Control', 's-maxage=2');
		const response = await fetch(
			'https://assignments.reaktor.com/birdnest/drones'
		);
		if (!response.ok)
			return res.status(500).json({
				error: true,
				message: 'Unable to retrieve drone list',
			});
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
					name: '',
					email: '',
					phoneNumber: '',
				});
			}
			drone.violator = violator;
			return drone;
		});
		// Query pilot information for new violators
		const newViolators = await Promise.all(
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
		// console.log('newViolators: ', newViolators);
		// Save new violators
		if (newViolators.length > 0) {
			await prisma.drone.createMany({
				data: newViolators,
				skipDuplicates: true,
			});
		}
		// Update old violators
		// Prisma doesn't accept multiple conditions on updates so we need to find and update separately.
		await Promise.all(
			violators.map(async (violator: ISavedDrone) => {
				const record = await prisma.drone.findFirst({
					where: {
						serialNumber: violator.serialNumber,
						distance: {
							lt: violator.distance,
						},
					},
				});
				if (record) {
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
		// Purge old data
		await prisma.drone.deleteMany({
			where: {
				violationTime: {
					lt: new Date(new Date().getTime() - 10 * 60 * 1000),
				},
			},
		});
		const freshData = await prisma.drone.findMany();
		return res.status(200).json({
			violators: freshData,
			all: allDrones,
		});
	} catch (err) {
		console.error(err);
	}
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
