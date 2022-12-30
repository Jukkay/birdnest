'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchClientDroneList } from "../utils/queries";

export const DroneList = ({list}: {list: IDrone[]}) => {
	console.log("List in DroneList", list)
	const { isLoading, isError, data, error } = useQuery<IDrone[], Error>({
		queryKey: ['drones'],
		queryFn: fetchClientDroneList,
		initialData: list,
		refetchInterval: 2000,
		refetchOnMount: false,
	  })
	if (isError) {
		return <div>Error: {error.message}</div>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}
	return data && data.length > 0 ? (
		<div>
			{data.map((item: IDrone) => (
				<div key={item.serialNumber}>{item.serialNumber}</div>
			)
			)}
		</div>
	) : (
		<div>No drones found</div>
	);
};

export interface IDrone {
	serialNumber: string,
	model: string,
	manufacturer: string,
	mac: string,
	ipv4: string,
	ipv6: string,
	firmware: string,
	positionY: number,
	positionX: number,
	altitude: number
}
