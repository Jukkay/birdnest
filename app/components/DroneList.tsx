'use client';
// Server component is the default so we use 'use client' to tell next this component is rendered client side. Using hooks isn't possible otherwise.

import { Visualizer } from './Visualizer';
import { DroneListItem } from './DroneListItem';
import { useEffect, useState } from 'react';
import { socket } from '../utils/socket';
import { IReturnType, ISavedDrone } from '../types';
import { DroneListLoader } from './DroneListLoader';

// Main component of the page.
export const DroneList = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IReturnType>({
		all: [],
		violators: [],
		refetchInterval: 2000,
	});

	const initSocket = async () => {
		try {
			setLoading(true);
			await fetch('/api/subscribe');
			if (socket.disconnected) socket.open();
			socket.on('connect', () => {
				console.log('Connected to server');
			});
			socket.on('update', (returnData) => {
				setData(returnData);
				setLoading(false);
			});
		} catch (err) {
			console.error('Failed to initialize server connection');
		}
	};
	useEffect(() => {
		initSocket();
		return () => {
			socket.removeAllListeners('update');
			socket.removeAllListeners('connect');
		};
	}, []);

	return loading ? (
		<DroneListLoader />
	) : (
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
			<p className="absolute bottom-0">{`Information is updated every ${
				(data.refetchInterval / 1000).toString() || '2'
			} seconds`}</p>
		</div>
	);
};
