import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

export const createClient = async (client_code) => {
	const token = Cookie.get('token');

	if (!token) {
		console.error('no token found');
		Router.push('/login');
		return;
	}

	const route = `${API_URL}clients`;
	const body = {
		status: 'publish',
		title: {
			rendered: `${client_code}`,
		},
		fields: {
			client_code: `${client_code}`,
		},
	};

	const res = await fetch(route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (data.errors) {
		console.error(data.errors);
		throw new Error('Failed to fetch API: createClient');
	}

	return data;
};

export const updateClient = async (id, values) => {
	const token = Cookie.get('token');
	if (!token) return;

	const route = `${API_URL}clients/${id}`;
	const body = {
		title: {
			rendered: values.client_name,
			raw: values.client_name,
		},
		fields: {
			client_code: values.client_code,
		},
	};

	const res = await fetch(route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (data.errors) {
		console.error(data.errors);
		throw new Error('Failed to fetch API');
	}

	return data;
};

const readClients = async (route) => {
	const res = await fetch(route, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();

	if (data.errors) {
		console.error(data.errors);
		throw new Error('Failed to fetch API');
	}

	return data;
};

export const getAllClients = () => readClients(`${API_URL}clients`);
export const getClientBySlug = (slug) =>
	readClients(`${API_URL}clients?slug=${slug}`);
export const getClientByCode = async (code) => {
	const allClients = await getAllClients();

	return allClients.filter((client) => client.acf.client_code === code);
};
