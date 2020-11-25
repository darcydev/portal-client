import { useState, useEffect } from 'react';
import { Form, Select, Button, Upload, Input } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

import { uploadMedia } from '../../lib/media';

export default function MediaUpload() {
	const [fileList, setFileList] = useState([]);

	const onFinish = (values) => {
		uploadMedia(values);
	};

	const normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	// TODO fetch from WP admin
	const options = [];
	for (let i = 0; i < 100; i++) {
		const value = `${i.toString(36)}${i}`;
		options.push({
			value,
			disabled: i === 10,
		});
	}

	console.log('fileList :>> ', fileList);

	return (
		<div>
			<h1>media upload page</h1>
			<Form name='media_upload' onFinish={onFinish}>
				<Form.Item
					name='job_code'
					label='Job code'
					rules={[{ required: true, message: 'Required' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='tags'
					label='Tags'
					rules={[{ required: true, message: 'Required' }]}
				>
					<Select mode='multiple' placeholder='Select tags' options={options} />
				</Form.Item>
				<Form.Item
					name='files'
					label='Files'
					getValueFromEvent={normFile}
					rules={[{ required: true, message: 'Required' }]}
				>
					<Upload.Dragger
						name='file'
						onRemove={(file) => {
							const index = fileList.indexOf(file);
							const newFileList = fileList.slice();
							newFileList.splice(index, 1);
							setFileList(newFileList);
						}}
						beforeUpload={(file) => {
							const newFileList = fileList;
							newFileList.push(file);
							setFileList(newFileList);

							return false;
						}}
						fileList={fileList}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag file to this area to upload
						</p>
						<p className='ant-upload-hint'>
							Support for a single or bulk upload.
						</p>
					</Upload.Dragger>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
