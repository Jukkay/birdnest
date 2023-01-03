'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchClientDroneList, fetchInfo } from '../utils/queries';
import { Canvas } from './Canvas';

export const DroneList = ({ list }: { list: IRawData[] }) => {
	const [violators, setViolators] = useState<IDrone[]>([]);
	const [visualized, setVisualized] = useState<IDrone[]>([]);
	const [pilot, setPilot] = useState({});

	const { isLoading, isError, data, error } = useQuery<IRawData[], Error>({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		initialData: list,
		refetchInterval: 2000,
		refetchOnMount: false,
	});
	
	// Calculate violating drones
	// useEffect(() => {
	// 	if (!data || data.length < 1) return;
	// 	const mappedVisualized: IDrone[] = [];
	// 	const mappedViolators: IDrone[] = [];
	// 	data.map((drone) => {
	// 		const x = Math.abs(drone.positionX - 250000);
	// 		const y = Math.abs(drone.positionY - 250000);
	// 		const distance = Math.sqrt(x * x + y * y);
	// 		const rad = 100000;
	// 		let violator = false;
	// 		if (distance <= rad) {
	// 			violator = true;
	// 			mappedViolators.push({
	// 				serialNumber: drone.serialNumber,
	// 				positionX: drone.positionX,
	// 				positionY: drone.positionY,
	// 				violator: violator,
	// 				violationTime: Date.now()
	// 			})
	// 		}
	// 		mappedVisualized.push({
	// 			serialNumber: drone.serialNumber,
	// 			positionX: drone.positionX,
	// 			positionY: drone.positionY,
	// 			violator: violator
	// 		});
	// 	});
	// 	setVisualized(mappedVisualized);
	// 	// Compine arrays and remove old violators
	// 	const combined = [...violators.filter(({violationTime}) => violationTime && (violationTime + 10000 >= Date.now())), ...mappedViolators]
	// 	// Remove duplicates
	// 	const newList = [...new Map(combined.map((item) => [item.serialNumber, item])).values()]
	// 	setViolators(newList)
	// }, [data]);

	const handleClick = (serialNumber: string) => {};
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return data && data.length > 0 ? (
		<div>
			<Canvas drones={visualized} />
			<h3>Violating drones</h3>
			{violators.map((item: IDrone) =>
				item.violator ? (
					<div key={item.serialNumber}>
						<div>{item.serialNumber}</div>
						<button
							onClick={() => handleClick(item.serialNumber)}
						>Pilot information</button>
					</div>
				) : null
			)}
		</div>
	) : (
		<div>No drones found</div>
	);
};

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
}
export interface IDrone {
	serialNumber: string;
	positionY: number;
	positionX: number;
	violator: boolean;
	violationTime?: number;
}
export interface IPilot {
	positionY: number;
	positionX: number;
	violator: boolean;
}
