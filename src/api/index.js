import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    try {
      const { token } = JSON.parse(auth);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {}
  }
  return config;
});

export default API;
