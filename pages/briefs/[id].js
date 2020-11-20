import { getBriefById, getAllBriefs } from '../../lib/briefs';

export default function Brief({ brief }) {
  console.log('brief :>> ', brief);

  return (
    <div>
      <h1>single brief page</h1>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const brief = await getBriefById(params.id);

  return { props: { brief } };
}

export async function getStaticPaths() {
  const briefs = await getAllBriefs();

  return {
    paths: briefs.map((_brief) => {
      return {
        params: { id: _brief.id.toString() },
      };
    }),
    fallback: true,
  };
}
