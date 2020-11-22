import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

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
