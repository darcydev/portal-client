import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.WORDPRESS_API_URL;

/**
 * Creates a new empty brief that returns the id
 */
export const createBrief = async () => {
  const token = Cookie.get('token');
  if (!token) return;

  const route = `${API_URL}briefs/`;
  const body = {
    status: 'publish',
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
    throw new Error('Failed to fetch API');
  }

  // route user to newly created brief page
  Router.push(`/briefs/${data.id}`);
};

export const readBriefs = async (route) => {
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

export const getAllBriefs = async () => readBriefs(`${API_URL}briefs/`);
export const getBriefById = async (id) => readBriefs(`${API_URL}briefs/${id}`);

export const updateBrief = () => {
  return 10;
};
