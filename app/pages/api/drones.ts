import { XMLParser } from 'fast-xml-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchServerDroneList } from '../../utils/queries';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Set Cache control header for Vercel Edge Network
	// Cache is valid for 2 seconds and will be refreshed after that
	res.setHeader('Cache-Control', 's-maxage=2');
	const response = await fetch(
		'https://assignments.reaktor.com/birdnest/drones'
	);
	if (!response.ok)
		res.status(500).json({
			error: true,
			message: 'Unable to retrieve drone list',
		});
	const xml = await response.text();
	const parser = new XMLParser();
	const data = parser.parse(xml);
	console.log('data from api', data.report.capture.drone);
	res.status(200).json(data.report.capture.drone);
}
