const BASE_URL = process.env.REACT_APP_API_URL;

export const API_URLS = {
  // Makni ?_embed odavde, to dodajemo dinamički
  posts: `${BASE_URL}v2/posts`,
  categories: `${BASE_URL}v2/categories`,
  users: `${BASE_URL}v2/users`,
  me: `${BASE_URL}v2/users/me`,
};

export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return null;
  }

  // SNR dodatak: Vraćamo i podatke i headere jer nam trebaju za paginaciju (X-WP-TotalPages)
  const data = await response.json();
  return { data, headers: response.headers, status: response.status };
};
