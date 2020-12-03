import { useState } from 'react';
import { Form, Select, Button, Upload, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { uploadMedia } from '../../lib/media';

export default function AssetUpload(id) {
	const [fileList, setFileList] = useState([]);

	const onFinish = async (values) => {
		uploadMedia(values, fileList);
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

	return (
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
			<Upload.Dragger
				name='file'
				onRemove={(file) => {
					const index = fileList.indexOf(file);
					const newFileList = fileList.slice();
					newFileList.splice(index, 1);
					setFileList(newFileList);
				}}
				beforeUpload={(file) => {
					console.log({ file });
					const newFileList = fileList;
					newFileList.push(file);
					setFileList(newFileList);
				}}
				fileList={fileList}
				multiple
			>
				<p className='ant-upload-drag-icon'>
					<InboxOutlined />
				</p>
				<p className='ant-upload-text'>
					Click or drag file to this area to upload
				</p>
				<p className='ant-upload-hint'>Support for a single or bulk upload.</p>
			</Upload.Dragger>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
