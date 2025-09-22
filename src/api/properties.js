import API from "./index";
export const fetchProperties = (params) => API.get("/properties", { params });
export const fetchProperty = (id) => API.get(`/properties/${id}`);
