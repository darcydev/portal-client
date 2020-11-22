import Link from 'next/link';
import { Button } from 'antd';

import { isLoggedIn, logoutUser } from '../lib/auth';

export const NavMenu = () => {
  const isAuth = isLoggedIn();

  return (
    <nav>
      <Link href='/'>
        <Button type='primary'>Home</Button>
      </Link>
      {isAuth ? (
        <>
          <Link href='/clients'>
            <Button type='primary'>All clients</Button>
          </Link>
          <Link href='/'>
            <Button type='primary' onClick={() => logoutUser()}>
              Logout
            </Button>
          </Link>
        </>
      ) : (
        <Link href='/login'>
          <Button type='primary'>Login</Button>
        </Link>
      )}
    </nav>
  );
};
