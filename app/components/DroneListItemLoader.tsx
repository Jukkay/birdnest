// Loading component to display instead of DroneListItem

const DroneListItemLoader = () => {
	return (
		<div role="status" className="max-w-sm animate-pulse m-6 p-3 bg-slate-300 rounded-lg">
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 max-w-[360px] mb-2"></div>
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 max-w-[360px] mb-2"></div>
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 mb-2"></div>
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 max-w-[330px] mb-2"></div>
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 max-w-[300px] mb-2"></div>
			<div className="h-2 bg-slate-700 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default DroneListItemLoader;
