import API from "./index";

export const getFavorites = () => API.get("/favorites");
export const addFavorite = (id) => API.post(`/favorites/${id}`);
export const removeFavorite = (id) => API.delete(`/favorites/${id}`);
