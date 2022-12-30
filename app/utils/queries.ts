import { XMLParser } from 'fast-xml-parser';

export const fetchServerDroneList = async () => {
	const response = await fetch(
		'https://assignments.reaktor.com/birdnest/drones',
		{ next: { revalidate: 2 } }
	);
	if (!response.ok) throw new Error('Unable to retrieve drone list');
	const xml = await response.text();
	const parser = new XMLParser();
	const data = parser.parse(xml);
	return data.report.capture.drone
};

export const fetchClientDroneList = async () => {
	const response = await fetch(
		'https://assignments.reaktor.com/birdnest/drones'
	);
	if (!response.ok) throw new Error('Unable to retrieve drone list');
	const xml = await response.text();
	const parser = new XMLParser();
	const data = parser.parse(xml);
	return data.report.capture.drone;
};

export const fetchInfo = async ({ serialNumber }: { serialNumber: string }) => {
	const response = await fetch(
		`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
	);
	if (!response.ok) throw new Error('Unable to retrieve pilot information');
	const xml = await response.text();
	const parser = new XMLParser();
	const data = parser.parse(xml);
	return data.report.capture.drone;
};
