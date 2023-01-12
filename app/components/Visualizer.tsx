'use client';

import { IRawData } from '../pages/api/drones';
import { Base } from './Base';

const Drones = ({ drones }: { drones: IRawData[] }) => {
	return (<g>
		{drones?.length > 0 &&
			drones.map((drone: IRawData) => {
				const x = Math.floor(drone.positionX / 1000);
				const y = Math.floor(drone.positionY / 1000);
				let params = { stroke: 'green', fill: 'green', strokeWidth: '1', r: '3' }
				if (drone.violator) {
					params.stroke = 'red'
					params.fill = 'red'
				}
				return <circle key={drone.serialNumber} cx={x} cy={y} {...params} />
			})}
	</g>)
};

export const Visualizer = ({ drones }: { drones: IRawData[] }) => {

	return (
		<svg version="1.1"
			width={'100%'} height={'100%'}
			viewBox={'0 0 500 500'}
			preserveAspectRatio="xMidYMid meet"
			xmlns="http://www.w3.org/2000/svg"
			className='top-0 bottom-0 static lg:absolute'>
			<g>
				<Base />
				<Drones drones={drones} />
			</g>
		</svg>
	);
};
