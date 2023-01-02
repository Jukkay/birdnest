'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchClientDroneList } from '../utils/queries';
import { Canvas } from './Canvas';

export const DroneList = ({ list }: { list: IDrone[] }) => {
	const [violators, setViolators] = useState<IDrone[]>([]);
	const { isLoading, isError, data, error } = useQuery<IDrone[], Error>({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		initialData: list,
		refetchInterval: 2000,
		refetchOnMount: false,
	});
	// Calculate violating drones
	useEffect(() => {
		if (!data || data.length < 1) return;
		const mappedViolators: IDrone[] = [];
		data.map((drone) => {
			const x = Math.abs(drone.positionX - 250000);
			const y = Math.abs(drone.positionY - 250000);
			const distance = Math.sqrt(x * x + y * y);
			const rad = 100000;
			if (distance <= rad) mappedViolators.push(drone);
		});
		setViolators(mappedViolators);
	}, [data]);
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return data && data.length > 0 ? (
		<div>
			<Canvas violators={violators} />
			<h3>All drones</h3>
			{data.map((item: IDrone) => (
				<div key={item.serialNumber}>{item.serialNumber}</div>
			))}
			<h3>Violating drones</h3>
			{violators.map((item: IDrone) => (
				<div key={item.serialNumber}>{item.serialNumber}</div>
			))}
		</div>
	) : (
		<div>No drones found</div>
	);
};

export interface IDrone {
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
