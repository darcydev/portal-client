import React from 'react';
import Head from 'next/head';

import { NavMenu } from './NavMenu';

export default function Layout({ preview, children }) {
  return (
    <>
      <Head>
        <title>Impress Portal</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <NavMenu />
      </header>
      <main>{children}</main>
      <footer>this is the footer</footer>
    </>
  );
}
