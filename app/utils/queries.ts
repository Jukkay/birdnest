import { XMLParser } from 'fast-xml-parser';

// API queries
export const fetchClientDroneList = async () => {
	const response = await fetch('/api/drones');
	return await response.json();
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
