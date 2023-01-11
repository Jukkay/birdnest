import Link from 'next/link';
import { BsGithub} from "react-icons/bs";
export const Footer = () => {
	return (
		<div className="flex items-center m-3">
			<Link href="https://github.com/Jukkay/birdnest" className='flex items-center'><BsGithub className="mr-2"/>Github</Link>
		</div>
	);
};
