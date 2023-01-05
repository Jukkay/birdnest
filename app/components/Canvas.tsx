'use client';

import { useEffect, useRef } from 'react';
import { IRawData } from '../pages/api/drones';
import { IDrone } from './DroneList';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const drawDrone = (context: CanvasRenderingContext2D, drone: IDrone) => {
	const x = Math.floor(drone.positionX / 1000);
	const y = Math.floor(drone.positionY / 1000);
	if (drone.violator) context.fillStyle = 'red';
	else context.fillStyle = 'green';
	context.fillRect(x, y, 5, 5);
};

const drawBase = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;
	// Background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// ctx.strokeRect(0, 0, canvas.width, canvas.height)
	// Crosshair
	ctx.fillStyle = 'white';
	ctx.fillRect(245, 245, 10, 10);
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(250, 0);
	ctx.lineTo(250, 500);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, 250);
	ctx.lineTo(500, 250);
	ctx.stroke();
	// Circles
	ctx.beginPath();
	ctx.moveTo(250, 250);
	ctx.lineTo(250, 0);
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.arc(250, 250, 100, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	ctx.arc(250, 250, 150, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(250, 250, 200, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(250, 250, 250, 0, 2 * Math.PI);
	ctx.stroke();
	// Measures
	ctx.font = '15px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom'
	ctx.fillText('100m', 150, 250)
	ctx.fillText('200m', 50, 250)
	ctx.fillText('100m', 350, 250)
	ctx.fillText('200m', 450, 250)
};

export const Canvas = ({ drones }: { drones: IRawData[] }) => {
	const ref = useRef<HTMLCanvasElement>(null);

	// Draw coordinates on canvas
	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		drawBase(ctx, canvas);
		drones?.length > 0 &&
			drones.map((drone: IRawData) => {
				drawDrone(ctx, drone);
			});
	}, [drones]);
	return (
		<div className="">
			<canvas width="500" height="500" ref={ref}>
				Violating drones are visualized here.
			</canvas>
		</div> || <Skeleton width={50}/>
	);
};
