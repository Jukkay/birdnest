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
			<body className=''>
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
