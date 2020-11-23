import { useForm } from 'react-hook-form';
import { message } from 'antd';

import { loginUser } from '../../lib/auth';

export const LoginForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    const userObject = await loginUser(values);

    if (userObject) {
      message.success('Login successful');
    } else {
      message.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='Username'
        name='username'
        ref={register({ required: true })}
      />
      {errors.username && <span>Username required</span>}
      <input
        type='password'
        placeholder='Password'
        name='password'
        ref={register({ required: true })}
      />
      {errors.password && <span>Password required</span>}
      <input type='submit' />
    </form>
  );
};
