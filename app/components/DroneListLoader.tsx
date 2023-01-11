import { VisualizerLoader } from './VisualizerLoader';
import DroneListItemLoader from './DroneListItemLoader';

export const DroneListLoader = () => {
	return (
		<div className="flex justify-around flex-wrap p-6 items-stretch min-h-full w-full relative">
			<div className="mb-6 lg:m-6 relative lg:w-1/2 w-full">
				<VisualizerLoader />
			</div>
			<div className="lg:m-6 p-6 bg-slate-400 rounded-lg shadow-lg relative w-full lg:w-2/6 outer-list lg:h-auto">
				<h3>Violating drones</h3>
				<div className="overflow-y-scroll absolute top-20 bottom-2 left-2 right-2 inner-list lg:h-auto">
					<DroneListItemLoader />
					<DroneListItemLoader />
					<DroneListItemLoader />
				</div>
			</div>
		</div>
	);
};
