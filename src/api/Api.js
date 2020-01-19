import axios from "axios";
import { BASE_URL } from "../components/todo/Constants";

export const instance = axios.create({
  baseURL: BASE_URL,
  //auth: { username, password },
  
//   headers: { Authorization: basicAuthHeader }
});
// export const executeBasicAuth = async (name,password) =>{
//     const response = instance.get('/basicAuth')
// }
export const sampleGet = async () => {
  const response = await instance.get("/todos/todo/2");
  return response.data;
};

export const retrieveAllTodos = async name => {
  const response = await instance.get(`/jpa/users/${name}/todos`);
  return response.data;
};
export const deleteTodo = async (name, id) => {
  await instance.delete(`/jpa/users/${name}/todos/${id}`);
};
export const getTodo = async (name, id) => {
  const response = await instance.get(`/jpa/users/${name}/todos/${id}`);
  return response.data;
};
export const updateTodo = async (name, id, todo) => {
  const response = await instance.put(`/jpa/users/${name}/todos/${id}`, todo);
  return response.data;
};
export const createTodo = async (name, todo) => {
  await instance.post(`/jpa/users/${name}/todos`, todo);
};

export default instance;
