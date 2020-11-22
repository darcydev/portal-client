import { Button } from 'antd';

import { createBrief } from '../lib/briefs';

export default function Index() {
  return (
    <div>
      <h1>home page</h1>
      <Button onClick={() => createBrief()}>create new brief</Button>
    </div>
  );
}
