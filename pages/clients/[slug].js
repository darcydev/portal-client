import { useForm } from 'react-hook-form';

import {
	getClientBySlug,
	getAllClients,
	updateClient,
} from '../../lib/clients';

export default function Client({ client }) {
	const { handleSubmit, register } = useForm();

	const { id, acf, title } = client[0];

	const onSubmit = (values) => {
		updateClient(id, values);
	};

	return (
		<div>
			<h1>single client page</h1>
			{client.length ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<label>Client name</label>
					<input
						type='text'
						defaultValue={title.rendered}
						name='client_name'
						ref={register}
					/>
					<label>Client code</label>
					<input
						type='text'
						defaultValue={acf.client_code}
						name='client_code'
						ref={register}
					/>
					<input type='submit' />
				</form>
			) : (
				<p>client loading...</p>
			)}
		</div>
	);
}

export async function getStaticProps({ params }) {
	const client = await getClientBySlug(params.slug);

	return { props: { client } };
}

export async function getStaticPaths() {
	const clients = await getAllClients();

	return {
		paths: clients.map((_client) => {
			return {
				params: { slug: _client.slug },
			};
		}),
		fallback: true,
	};
}
