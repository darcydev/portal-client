import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

import { createJob, getJobByCode } from '../lib/jobs';

export const uploadMedia = async (values, fileList) => {
	const token = Cookie.get('token');
	if (!token) {
		console.error('no token found');
		Router.push('/login');
		return;
	}

	const { job_code, tags } = values;
	const route = `${API_URL}media`;

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

	fileList.forEach(async (file) => {
		/* FIXME uploading ACF data isn't working */

		const formData = new FormData();
		formData.append('file', file);

		const res = await fetch(route, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const data = await res.json();

		if (data.errors) {
			console.error(data.errors);
			return false;
		}

		console.log('data :>> ', data);

		return data;
	});
};
