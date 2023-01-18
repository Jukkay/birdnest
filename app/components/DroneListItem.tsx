import { ISavedDrone } from '../types';

export const DroneListItem = ({ item }: { item: ISavedDrone }) => {
	const time = Math.round(
		(Date.now() - new Date(item.violationTime).getTime()) / 1000 / 60
	);
	const lastViolation = time === 1 ? '1 minute ago' : `${time} minutes ago`;
	const closestDistance = `${(item.distance / 1000).toFixed(1)} m`;
	return (
		<div className="m-6 p-3 text-xs bg-slate-300 rounded-lg break-words">
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
				{closestDistance}
			</div>
			<div>
				<span className="font-semibold mr-3">Last violation:</span>
				{lastViolation}
			</div>
		</div>
	);
};
