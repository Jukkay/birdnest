'use client';

import { Drone } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IRawData, ISavedDrone } from '../pages/api/drones';
import { fetchClientDroneList, fetchInfo } from '../utils/queries';
import { Canvas } from './Canvas';

export const DroneList = ({ list }: { list: Drone[] }) => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		initialData: { violators: list, all: [] } as IReturnType,
		refetchInterval: 2000,
	});
	if (isError) {
		return <div>Error: {(error as Error).message}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return data.violators && data.violators.length > 0 ? (
		<div>
			<Canvas drones={data.all} />
			<h3>Violating drones</h3>
			{data.violators.map((item: ISavedDrone) => (
				<div key={item.serialNumber}>
					<div>{item.serialNumber}</div>
					<div>{item.name}</div>
					<div>{item.email}</div>
					<div>{item.phoneNumber}</div>
					<div>{`${(item.distance / 1000).toFixed(1)} m`}</div>
					<div>{`${Math.round(
						(Date.now() - new Date(item.violationTime).getTime()) /
							1000 /
							60
					)} minute(s) ago`}</div>
				</div>
			))}
		</div>
	) : (
		<div>No drones found</div>
	);
};

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
export interface IReturnType {
	violators: ISavedDrone[];
	all: IRawData[];
}
