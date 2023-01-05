'use client';

import { useQuery } from '@tanstack/react-query';
import { IRawData, ISavedDrone } from '../pages/api/drones';
import { fetchClientDroneList } from '../utils/queries';
import { Canvas } from './Canvas';
import { DroneListItem } from './DroneListItem';

export const DroneList = ({ refetchInterval }: { refetchInterval: number }) => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		refetchInterval: refetchInterval,
	});
	if (isError) {
		return <div>Error: {(error as Error).message}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex w-full justify-around flex-wrap">
			<Canvas drones={data.all} />
			<div className='m-6 overflow-auto h-screen'>
				<h3>Violating drones</h3>
				<div>
					{data?.violators?.length > 0 ? (
						data.violators.map((item: ISavedDrone) => (
							<DroneListItem
								key={item.serialNumber}
								item={item}
							/>
						))
					) : (
						<div>No drones found</div>
					)}
				</div>
			</div>
		</div>
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
