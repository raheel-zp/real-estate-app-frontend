import axios from "axios";
import { startLoading, stopLoading } from "../utils/loadingService";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    startLoading();

    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const { token } = JSON.parse(auth);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {}
    }
    return config;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

export default API;
