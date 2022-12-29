import { DroneList } from '../components/DroneList';

export default function Page() {
	return (
		<div>
			<h1>Birdnest</h1>
			{/* Server components are not yet fully supported by TypeScript, so this work around is needed */}
			{/* @ts-expect-error Server Component */}
			<DroneList />
		</div>
	);
}
