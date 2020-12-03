import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';

import UserContext from '../../context/userContext';

export default function BriefForm() {
	const [jobType, setJobType] = useState(null);
	const { user } = useContext(UserContext);
	const { handleSubmit, register, errors, watch } = useForm();

	const onSubmit = (values) => {
		console.log('values :>> ', values);
	};

	let isAdmin = false;

	if (user) {
		isAdmin = user.roles.includes('administrator');
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Brief name</label>
			<input type='text' name='brief_name' ref={register} />
			<label>Brief code</label>
			<input type='text' name='brief_code' ref={register} />
			<label>Choose job type:</label>
			<select
				name='job_type'
				ref={register}
				onChange={(e) => setJobType(e.target.value)}
			>
				<option value='' disabled hidden>
					Select
				</option>
				<option value='animation'>Animation</option>
				<option value='web'> Web</option>
			</select>
			{isAdmin && jobType === 'animation' && (
				<Alert
					message='Reminder'
					description='We currently have two animation jobs in studio. Ask the client if this job is urgent'
					type='info'
					showIcon
				/>
			)}
			<input type='submit' />
		</form>
	);
}
