import { XMLParser } from 'fast-xml-parser';

// API queries

export const fetchDroneList = async () => {
	const response = await fetch(
		'https://assignments.reaktor.com/birdnest/drones'
	);
	if (!response.ok) throw new Error('Failed to retrieve drone data');
	const xml = await response.text();
	const parser = new XMLParser();
	return parser.parse(xml).report.capture.drone;
};

export const fetchInfo = async ({ serialNumber }: { serialNumber: string }) => {
	const response = await fetch(
		`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
	);
	if (!response.ok) throw new Error('Unable to retrieve pilot information');
	return await response.json();
};

export const getRefetchInterval = async() => {
	const response = await fetch(
		'https://assignments.reaktor.com/birdnest/drones'
	);
	if (!response.ok)
		return 2000
	const xml = await response.text();
	const parser = new XMLParser();
	const refetchInterval: number = parser.parse(xml).report.deviceInformation.updateIntervalMs
	return refetchInterval
}
