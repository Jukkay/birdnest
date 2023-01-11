import { DroneList } from '../components/DroneList';
import { getRefetchInterval } from '../utils/queries';

const Page = async () => {
	const refetchInterval = await getRefetchInterval()
	return <DroneList refetchInterval={refetchInterval}/>

};

export default Page;
