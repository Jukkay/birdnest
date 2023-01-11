import { ReactQueryWrapper } from './ReactQueryWrapper';
import React from 'react';
import { Footer } from '../components/Footer';
import '../styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="w-full lg:h-full">
			<body className="flex items-center justify-center p-6 overflow-auto w-full lg:h-full">
				<div className="bg-slate-700 rounded-lg shadow-lg flex-col w-full lg:h-full">
				<h1 className="m-6 lg:absolute">Birdnest</h1>
					<section className="lg:flex lg:items-stretch min-h-full w-full lg:py-10">
						<ReactQueryWrapper>{children}</ReactQueryWrapper>
					</section>
					<section className='static lg:absolute bottom-0'>
						<Footer />
					</section>
				</div>
			</body>
		</html>
	);
}
