import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_JWT_URL;

import { readMe } from './users';

export const isLoggedIn = () => (Cookie.get('token') ? true : false);

export const loginUser = async (values) => {
  const route = `${API_URL}token/`;

  const res = await fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const { status } = res;
  const data = await res.json();

  if (status === 200 && data.token) {
    // set the token
    Cookie.set('token', data.token);

    const userObject = await readMe();

    // route to home
    Router.push('/');
    return userObject;
  } else {
    return false;
  }
};

export const logoutUser = () => {
  Cookie.remove('token');
  // redirect to homepage
  Router.push('/');
};
