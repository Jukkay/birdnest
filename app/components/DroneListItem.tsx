'use client';
import { ISavedDrone } from '../pages/api/drones';

export const DroneListItem = ({ item }: { item: ISavedDrone }) => {
	return (
		<div className="m-6 text-xs">
			<div>
				<span className="font-semibold mr-3">Serial number:</span>
				{item.serialNumber}
			</div>
			<div>
				<span className="font-semibold mr-3">Pilot&apos;s name:</span>
				{item.name}
			</div>
			<div>
				<span className="font-semibold mr-3">Email:</span>
				{item.email}
			</div>
			<div>
				<span className="font-semibold mr-3">Phone:</span>
				{item.phoneNumber}
			</div>
			<div>
				<span className="font-semibold mr-3">
					Closest distance to the nest:
				</span>
				{`${(item.distance / 1000).toFixed(1)} m`}
			</div>
			<div>
				<span className="font-semibold mr-3">Last violation:</span>
				{`${Math.round(
					(Date.now() - new Date(item.violationTime).getTime()) /
						1000 /
						60
				)} minute(s) ago`}
			</div>
		</div>
	);
};
