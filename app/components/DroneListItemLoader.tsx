const DroneListItemLoader = () => {
	return (
		<div role="status" className="max-w-sm animate-pulse w-100 m-6">
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 w-full mb-2"></div>
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 max-w-[360px] mb-2"></div>
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 mb-2"></div>
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 max-w-[330px] mb-2"></div>
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 max-w-[300px] mb-2"></div>
			<div className="h-2 bg-slate-900 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default DroneListItemLoader;
