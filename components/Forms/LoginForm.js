import { useForm } from 'react-hook-form';

import { loginUser } from '../../lib/auth';

export const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    loginUser(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='Username'
        name='username'
        ref={register({ required: true })}
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        ref={register({ required: true })}
      />
      <input type='submit' />
    </form>
  );
};
