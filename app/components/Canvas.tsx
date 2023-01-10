'use client';

import { useEffect, useRef } from 'react';
import { IRawData } from '../pages/api/drones';
import { IDrone } from './DroneList';

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
				return <circle cx={x} cy={y} {...params} />
			})}
	</g>)
};

const Base = () => {
	return <>
		<line x1={0} x2={500} y1={250} y2={250} stroke="white" strokeWidth={1} />
		<line x1={250} x2={250} y1={0} y2={500} stroke="white" strokeWidth={1} />
		<circle cx={250} cy={250} r={5} stroke="red" fill="red" strokeWidth={1} />
		<circle cx={250} cy={250} r={100} stroke="red" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={150} stroke="green" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={200} stroke="green" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={250} stroke="green" fill="transparent" strokeWidth={1} />
		<text x="150" y="245" textAnchor='middle' fill="white">100m</text>
		<text x="350" y="245" textAnchor='middle' fill="white">100m</text>
		<text x="50" y="245" textAnchor='middle' fill="white">200m</text>
		<text x="450" y="245" textAnchor='middle' fill="white">200m</text>
	</>
};

export const Canvas = ({ drones }: { drones: IRawData[] }) => {

	return (
		<svg version="1.1"
			width={500} height={500}
			xmlns="http://www.w3.org/2000/svg">
			<g>
				<Base />
				<Drones drones={drones} />
			</g>
		</svg>
	);
};
