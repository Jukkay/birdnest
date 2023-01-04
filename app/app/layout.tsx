import { ReactQueryWrapper } from "./ReactQueryWrapper";
import React from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ReactQueryWrapper>{children}</ReactQueryWrapper>
			</body>
		</html>
	);
}