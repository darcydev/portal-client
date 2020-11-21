import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

export const createMedia = async (values) => {
  const token = Cookie.get('token');
  if (!token) return;

  /* TODO allow for multiple file upload??? */
  const file = values.file[0];

  /* TODO pass ACF data to uploaded file */

  const route = `${API_URL}media`;
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
    throw new Error('Error fetching API');
  }

  return data;
};
