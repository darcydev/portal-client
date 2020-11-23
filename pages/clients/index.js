import { useContext } from 'react';
import Link from 'next/link';

import UserContext from '../../context/userContext';
import { getAllClients } from '../../lib/clients';

export default function AllClients({ allClients, preview }) {
  const { user } = useContext(UserContext);

  console.log('user', user);

  return (
    <div>
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
      <h1>context testing</h1>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const allClients = await getAllClients(preview);

  return {
    props: { allClients, preview },
  };
}
