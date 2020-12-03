import Link from 'next/link';
import { Button } from 'antd';

import { isLoggedIn, logoutUser } from '../lib/auth';

export const NavMenu = () => {
	const isAuth = isLoggedIn();

	return (
		<nav>
			<Link href='/'>Home</Link>
			{isAuth ? (
				<>
					<Link href='/clients'>Clients</Link>
					<Link href='/media/upload'>Upload Media</Link>
					<Link href='/'>
						<Button type='primary' onClick={() => logoutUser()}>
							Logout
						</Button>
					</Link>
				</>
			) : (
				<Link href='/login'>Login</Link>
			)}
		</nav>
	);
};
