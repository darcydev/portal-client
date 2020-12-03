import { Skeleton } from 'antd';

import { getBriefById, getAllBriefs } from '../../lib/briefs';
import BriefForm from '../../components/Forms/BriefForm';

export default function Brief({ brief }) {
	return (
		<div>
			<h1>single brief page</h1>
			{brief ? <BriefForm /> : <Skeleton />}
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
