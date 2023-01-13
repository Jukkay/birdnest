import Link from 'next/link';
import { BsGithub} from "react-icons/bs";

export const Footer = () => {
	return (
		<div className="lg:pb-6">
			<Link href="https://github.com/Jukkay/birdnest" className='flex items-center'><BsGithub className="mr-2"/>Github</Link>
		</div>
	);
};
