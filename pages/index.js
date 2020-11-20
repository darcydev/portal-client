import Cookie from 'js-cookie';

import { createBrief } from '../lib/briefs';

export default function Index() {
  return (
    <div>
      <h1>home page</h1>

      <button onClick={() => createBrief()}>create new brief</button>
    </div>
  );
}
