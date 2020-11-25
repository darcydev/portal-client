import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

export const createJob = async (job_code) => {
	const token = Cookie.get('token');

	if (!token) {
		console.error('no token found');
		Router.push('/login');
		return;
	}

	const route = `${API_URL}jobs`;
	const body = {
		status: 'publish',
		title: {
			rendered: `${job_code}`,
		},
		fields: {
			job_code: `${job_code}`,
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
		throw new Error('Failed to fetch API: createJob');
	}

	return data;
};

const readJobs = async (route) => {
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

export const getJobByCode = async (job_code) => {
	const allJobs = await readJobs(`${API_URL}jobs`);
	return allJobs.filter((job) => job.acf.job_code === job_code);
};
