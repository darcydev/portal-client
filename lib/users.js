import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

const fetchUserObject = async () => {
  const token = Cookie.get('token');

  if (!token) {
    throw new Error('No token found');
  }

  const route = `${API_URL}users/me?context=edit`;

  const res = await fetch(route, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error('Failed to fetch API');
  }

  return data;
};

export const readMe = () => fetchUserObject();
