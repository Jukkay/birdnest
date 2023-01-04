import { DroneList } from '../components/DroneList';
import { getRefetchInterval } from '../utils/queries';

const Page = async () => {
	const refetchInterval = await getRefetchInterval()
	return (
		<div>
			<h1>Birdnest</h1>
			<DroneList refetchInterval={refetchInterval}/>
		</div>
	);
};

export default Page;
