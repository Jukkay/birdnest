'use client';

import { useEffect, useRef } from 'react';
import { IDrone } from './DroneList';

const drawDrone = (
	context: CanvasRenderingContext2D,
	drone: IDrone
) => {
    const x = Math.floor(drone.positionX / 1000)
    const y = Math.floor(drone.positionY / 1000)
	if (drone.violator)
		context.fillStyle = 'red';
	else
		context.fillStyle = 'green'
	context.fillRect(x, y, 5, 5);
    context.font = '20px serif'
    context.textAlign = "center"; 
    context.textBaseline = "middle"; 
};

const drawBase = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.strokeStyle = 'black'
    // ctx.lineWidth = 1;
    // ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, 2 * Math.PI);
    ctx.stroke();
}

export const Canvas = ({ drones }: { drones: IDrone[] }) => {
	const ref = useRef<HTMLCanvasElement>(null);

	// Draw coordinates on canvas
	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
        drawBase(ctx, canvas);
		drones.length > 0 && drones.map((drone: IDrone) => {
			drawDrone(ctx, drone);
		});
	}, [drones]);
	return (
		<canvas width="500" height="500" ref={ref} className="">
			Violating drones are visualized here.
		</canvas>
	);
};
