'use client'
import { ISavedDrone } from '../pages/api/drones';

export const DroneListItem = ({ item }: { item: ISavedDrone }) => {
	return (
		<div className='m-6 text-xs'>
			<div>Serial number: {item.serialNumber}</div>
			<div>Pilot&apos;s name: {item.name}</div>
			<div>Email: {item.email}</div>
			<div>Phone: {item.phoneNumber}</div>
			<div>{`Closest distance to the nest: ${(
				item.distance / 1000
			).toFixed(1)} meters`}</div>
			<div>{`Last seen: ${Math.round(
				(Date.now() - new Date(item.violationTime).getTime()) /
					1000 /
					60
			)} minute(s) ago`}</div>
		</div>
	);
};
