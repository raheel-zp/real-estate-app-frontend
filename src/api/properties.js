import API from "./index";
export const fetchProperties = (params) => API.get("/properties", { params });
export const fetchProperty = (id) => API.get(`/properties/${id}`);

export const createProperty = (data) =>
  API.post("/properties", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProperty = (id, data) =>
  API.put(`/properties/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProperty = (id) => API.delete(`/properties/${id}`);

export const getPropertyById = (id) => API.get(`/properties/${id}`);
