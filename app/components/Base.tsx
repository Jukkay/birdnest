export const Base = () => {
	return <>
		<line x1={0} x2={500} y1={250} y2={250} stroke="white" strokeWidth={1} />
		<line x1={250} x2={250} y1={0} y2={500} stroke="white" strokeWidth={1} />
		<circle cx={250} cy={250} r={100} stroke="red" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={150} stroke="green" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={200} stroke="green" fill="transparent" strokeWidth={1} />
		<circle cx={250} cy={250} r={250} stroke="green" fill="transparent" strokeWidth={1} />
		<text x="250" y="250" dominantBaseline="middle" textAnchor='middle' fill="white" className="NDZ">NDZ</text>
		<text x="150" y="245" textAnchor='middle' fill="white">100m</text>
		<text x="350" y="245" textAnchor='middle' fill="white">100m</text>
		<text x="50" y="245" textAnchor='middle' fill="white">200m</text>
		<text x="450" y="245" textAnchor='middle' fill="white">200m</text>
	</>
};