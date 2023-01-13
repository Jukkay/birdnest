// Loading component to display instead of Visualizer
import { Base } from './Base';

export const VisualizerLoader = () => {
	return (
		<svg
			version="1.1"
			width={'100%'}
			height={'100%'}
			viewBox={'0 0 500 500'}
			preserveAspectRatio="xMidYMid meet"
			xmlns="http://www.w3.org/2000/svg"
			className="top-0 bottom-0 static lg:absolute"
		>
			<g>
				<Base />
			</g>
		</svg>
	);
};
