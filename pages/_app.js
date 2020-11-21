import App from 'next/app';

import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import { isLoggedIn } from '../lib/auth';

import 'antd/dist/antd.css';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  const isAuth = isLoggedIn();

  return (
    <AppContext.Provider value={{ isAuth }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
