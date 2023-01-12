'use client';

import { useQuery } from '@tanstack/react-query';
import { IRawData, ISavedDrone } from '../pages/api/drones';
import { fetchClientDroneList } from '../utils/queries';
import { Visualizer } from './Visualizer';
import { DroneListItem } from './DroneListItem';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { socket } from '../utils/socket';

export const DroneList = () => {
	const initSocket = async () => {
		try {
			await fetch('/api/subscribe');
			if (socket.disconnected) socket.open();
			socket.on('connect', () => {
				console.log('Socket connected');
			});
			socket.on('update', returnData => {
				console.log('data received via socket', returnData)
				setData(returnData)
			})
		} catch (err) {
			console.error('Failed to initialize socket connection');
		}
	};
	useEffect(() => {
		initSocket();
		return () => {
			socket.removeAllListeners('update');
			socket.removeAllListeners('connect');
		}
	}, []);

	const [data, setData] = useState<IReturnType>({ all: [], violators: [] });

	return (
		<div className="flex justify-around flex-wrap p-6 items-stretch min-h-full w-full relative">
			<div className="mb-6 lg:m-6 relative lg:w-1/2 w-full">
				<Visualizer drones={data?.all} />
			</div>
			<div className="lg:m-6 p-6 bg-slate-400 rounded-lg shadow-lg relative w-full lg:w-2/6 outer-list lg:h-auto">
				<h3>Violating drones</h3>
				<div className="overflow-auto absolute top-20 bottom-2 left-2 right-2 inner-list lg:h-auto">
					{data?.violators?.length > 0 ? (
						data.violators.map((item: ISavedDrone) => (
							<DroneListItem
								key={item.serialNumber}
								item={item}
							/>
						))
					) : (
						<div className="m-6 p-6 text-xs">No drones found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export interface IDrone extends IPilot {
	serialNumber: string;
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
