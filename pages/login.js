import Router from 'next/router';

import { LoginForm } from '../components/Forms/LoginForm';
import { isLoggedIn } from '../lib/auth';

export default function LoginPage() {
  const isAuth = isLoggedIn();

  if (isAuth) {
    Router.push('/');
  }

  return (
    <div>
      <h1>Login page</h1>
      <LoginForm />
    </div>
  );
}
