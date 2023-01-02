import { DroneList, IDrone } from '../components/DroneList';
import { fetchServerDroneList } from '../utils/queries';

const Page = async () => {
	const list: IDrone[] = await fetchServerDroneList();
	console.log(list);
	return (
		<div>
			<h1>Birdnest</h1>
			{/* Server components are not yet fully supported by TypeScript, so this work around is needed */}
			<DroneList list={list} />
		</div>
	);
};

export default Page;
