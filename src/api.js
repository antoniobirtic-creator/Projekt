// src/api.js
const BASE_URL = process.env.REACT_APP_API_URL;

export const API_URLS = {
  posts: `${BASE_URL}v2/posts?_embed`,
  categories: `${BASE_URL}v2/categories`,
  users: `${BASE_URL}v2/users?per_page=20`,
  contact: `${BASE_URL}v2/pages/1184`,
  torte: `${BASE_URL}v2/torte?_embed`,
  vjezba: `${BASE_URL}v2/pages/1338`,
  torte_single: (slug) => `${BASE_URL}v2/torte?slug=${slug}&_embed`,
};

export default BASE_URL;
