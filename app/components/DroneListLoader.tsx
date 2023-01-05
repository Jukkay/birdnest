import { CanvasLoader } from './CanvasLoader';
import DroneListItemLoader from './DroneListItemLoader';

export const DroneListLoader = () => {
	return (
		<div className="flex w-full justify-around flex-wrap p-6">
			<CanvasLoader />
			<div className="pr-6 bg-slate-400 rounded-lg shadow-lg w-4/12">
				<h3>Violating drones</h3>
				<div className="overflow-auto h-screen w-full">
					<DroneListItemLoader />
					<DroneListItemLoader />
					<DroneListItemLoader />
				</div>
			</div>
		</div>
	);
};
