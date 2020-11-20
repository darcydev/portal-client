import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

export const getClientBySlug = async (slug) => {
  const res = await fetch(`${API_URL}clients?slug=${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error('Failed to fetch API');
  }

  return data;
};

export const getAllClients = async () => {
  const res = await fetch(`${API_URL}clients`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error('Failed to fetch API');
  }

  return data;
};

export const updateClient = (id, values) => {
  const token = Cookie.get('token');

  if (!token) return;

  const { client_name, client_code } = values;

  axios
    .post(
      `${API_URL}clients/${id}`,
      {
        title: {
          rendered: client_name,
        },
        fields: {
          client_code: client_code,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log('success');
        // TODO display success message
      } else {
        // TODO display fail message to user
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
