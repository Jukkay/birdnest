import { Drone, PrismaClient } from '@prisma/client';
import { DroneList, IDrone, IReturnType } from '../components/DroneList';
import { IRawData, ISavedDrone } from '../pages/api/drones';

const Page = async () => {
	const prisma = new PrismaClient();
	const freshData: Drone[] = await prisma.drone.findMany();
	return (
		<div>
			<h1>Birdnest</h1>
			{/* Server components are not yet fully supported by TypeScript, so this work around is needed */}
			<DroneList list={freshData} />
		</div>
	);
};

export default Page;
