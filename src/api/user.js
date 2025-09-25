import API from "./index";

export const getProfile = () => API.get("/auth/me");
