import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

import { createJob, getJobByCode } from '../lib/jobs';

export const uploadMedia = async (values) => {
	const token = Cookie.get('token');
	if (!token) {
		console.error('no token found');
		Router.push('/login');
		return;
	}

	console.log('values :>> ', values);

	const { job_code, tags, files } = values;
	const route = `${API_URL}media`;

	/* TODO
		STEPS:
		1) Check if job code is new. If so, create the job. Else, use the client code.
		2) Upload the media with the tags
		*/

	const existingJobs = await getJobByCode(job_code);
	let job = undefined;

	// if the job code doesn't exist
	// create them in the database
	if (existingJobs.length === 0) {
		job = await createJob(job_code);
		// each job code should be unique, so if there is more than 1 -> there has been an error
	} else if (existingJobs.length > 1) {
		throw new Error('More than 1 job found with code!');
		// if there is one job code, just use it
	} else if (existingJobs.length === 1) {
		job = existingJobs[0];
	}

	console.log('job :>> ', job);

	files.forEach(async (file) => {
		console.log('file :>> ', file);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('acf.job_object', job);

		const res = await fetch(route, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const data = await res.json();

		console.log('data :>> ', data);

		if (data.errors) {
			console.error(data.errors);
			throw new Error('Error fetching API');
		}

		return data;
	});
};

/* OLD VERSION */
export const createMedia = async (values, postId, alt_text, description) => {
	const token = Cookie.get('token');
	if (!token) {
		console.error('no token found');
		return;
	}

	/* TODO allow for multiple file upload??? */
	const file = values.file[0];
	console.log('file :>> ', file);

	const route = `${API_URL}media`;
	const formData = new FormData();
	formData.append('file', file);
	/* TODO consider whether we need jobId and briefId if we're including postId??? */
	formData.append('post', postId);
	formData.append('alt_text', alt_text);
	formData.append('description', description);

	const res = await fetch(route, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});

	const data = await res.json();

	console.log('data :>> ', data);

	if (data.errors) {
		console.error(data.errors);
		throw new Error('Error fetching API');
	}

	return data;
};
