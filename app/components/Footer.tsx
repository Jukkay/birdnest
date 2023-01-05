import Link from 'next/link';

export const Footer = () => {
	return (
		<div className="mt-3 mb-6 mx-6">
			<Link href="/">Home</Link>
			<Link href="/about" className='mx-3'>About</Link>
		</div>
	);
};
