import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchProperties = (params) => API.get("/properties", { params });
export const fetchProperty = (id) => API.get(`/properties/${id}`);
