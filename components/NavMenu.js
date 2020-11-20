import Link from 'next/link';

import { isLoggedIn, logoutUser } from '../lib/auth';

export const NavMenu = () => {
  const isAuth = isLoggedIn();

  return (
    <nav>
      <Link href='/'>Home</Link>
      {isAuth ? (
        <Link href='/'>
          <a onClick={() => logoutUser()}>Logout</a>
        </Link>
      ) : (
        <Link href='/login'>Login</Link>
      )}
    </nav>
  );
};
