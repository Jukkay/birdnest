'use client';

import { useEffect, useRef } from 'react';
import { IDrone } from './DroneList';

const drawCoordinate = (
	context: CanvasRenderingContext2D,
	x: number,
	y: number
) => {
    x = Math.floor(x / 1000)
    y = Math.floor(y / 1000)
	context.fillStyle = 'red';
	context.fillRect(x, y, 5, 5);
    context.font = '20px serif'
    context.textAlign = "center"; 
    context.textBaseline = "middle"; 
    // draw the emoji
    context.fillText('👽', x, y)
};

const drawBase = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, 2 * Math.PI);
    ctx.stroke();
}

export const Canvas = ({ violators }: { violators: IDrone[] }) => {
	const ref = useRef<HTMLCanvasElement>(null);

	// Draw coordinates on canvas
	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
        drawBase(ctx, canvas);
		violators.length > 0 && violators.map((violator: IDrone) => {
			drawCoordinate(ctx, violator.positionX, violator.positionY);
		});
	}, [violators]);
	return (
		<canvas width="500" height="500" ref={ref} className="">
			Violating drones are visualized here.
		</canvas>
	);
};
