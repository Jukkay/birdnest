import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
export const DroneList = async () => {
	const list = await getDrones();
	console.log(list);
	return list?.length > 0 ? (
		<div>
			{list.map((item: Drone) => (
				<div key={item.serialNumber}>{item.serialNumber}</div>
			))}
		</div>
	) : (
		<div>No drones found</div>
	);
};

const getDrones = async () => {
	try {
		const response = await fetch(
			'https://assignments.reaktor.com/birdnest/drones', { next: { revalidate: 2 } }
		);
		if (response.ok) {
            const xml = await response.text()
            const parser = new XMLParser()
            const data = parser.parse(xml);
			// console.log(data.report.capture.drone);
			return data.report.capture.drone
		}
	} catch (err) {
		console.error(err);
	}
};

interface Drone {
        serialNumber: string,
        model: string,
        manufacturer: string,
        mac: string,
        ipv4: string,
        ipv6: string,
        firmware: string,
        positionY: number,
        positionX: number,
        altitude: number
}
