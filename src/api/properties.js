import axios from "axios";
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://real-estate-app-backend-production.up.railway.app/api",
});

export const fetchProperties = (params) => API.get("/properties", { params });
export const fetchProperty = (id) => API.get(`/properties/${id}`);
