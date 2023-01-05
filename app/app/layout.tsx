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
		<html lang="en">
			<body className='bg-slate-700 m-6 py-3 rounded-lg shadow-lg'>
				<section>
					<ReactQueryWrapper>{children}</ReactQueryWrapper>
				</section>
				<section>
					<Footer />
				</section>
			</body>
		</html>
	);
}
