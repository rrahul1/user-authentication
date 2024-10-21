import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (formData) => API.post("/user/login", formData);
export const registerUser = (formData) => API.post("/user/signup", formData);
export const getUsers = () => API.get("/user/get-user");
export const updateUser = (id, formData) =>
   API.put(`/user/update-user/${id}`, formData);
export const deleteUser = (id) => API.delete(`/user/delete-user/${id}`);
