import { useContext } from 'react';
import Link from 'next/link';

import AppContext from '../context/AppContext';
import { getAllClients } from '../lib/clients';

export default function Index({ allClients, preview }) {
  const { isAuth } = useContext(AppContext);

  return (
    <div>
      <h1>home page</h1>
      <h2>all list of all clients</h2>
      {allClients.length &&
        allClients.map((client) => {
          const { title, id, acf, slug } = client;

          return (
            <div key={id}>
              <h4>{title.rendered}</h4>
              <h5>{acf.client_code}</h5>
              <Link href={`/clients/${slug}`}>view</Link>
            </div>
          );
        })}
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const allClients = await getAllClients(preview);

  return {
    props: { allClients, preview },
  };
}
