'use client';

import { useQuery } from '@tanstack/react-query';
import { IRawData, ISavedDrone } from '../pages/api/drones';
import { fetchClientDroneList } from '../utils/queries';
import { Canvas } from './Canvas';
import { DroneListItem } from './DroneListItem';
import { DroneListLoader } from './DroneListLoader';

export const DroneList = ({ refetchInterval }: { refetchInterval: number }) => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		refetchInterval: refetchInterval,
	});
	if (isError) {
		return <div className='m-6'>Error: {(error as Error).message}</div>;
	}
	if (isLoading) {
		return <DroneListLoader />;
	}
	return (
		<div className="flex w-full justify-around flex-wrap p-6">
			<Canvas drones={data?.all} />
			<div className="pr-6 bg-slate-400 rounded-lg shadow-lg w-4/12">
				<h3>Violating drones</h3>
				<div className="overflow-auto h-screen">
					{data?.violators?.length > 0 ? (
						data.violators.map((item: ISavedDrone) => (
							<DroneListItem
								key={item.serialNumber}
								item={item}
							/>
						))
					) : (
						<div className="m-6 text-xs">No drones found</div>
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
