import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

import UserContext from '../context/userContext';
import Layout from '../components/Layout';
import { readMe } from '../lib/users';
import 'antd/dist/antd.css';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const token = Cookie.get('token');

    if (token) {
      const loggedInUser = await readMe();
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}
