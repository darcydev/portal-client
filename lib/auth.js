import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

export const isLoggedIn = () => (Cookie.get('token') ? true : false);

export const loginUser = (values) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') return;

  const { username, password } = values;

  axios
    .post('http://yourportal.biz/wp-json/jwt-auth/v1/token/', {
      username,
      password,
    })
    .then((res) => {
      if (res.status === 200) {
        Cookie.set('token', res.data.token);

        Router.push('/');
      } else {
        // TODO display fail message to user
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const logoutUser = () => {
  Cookie.remove('token');
  // redirect to homepage
  Router.push('/');
};
