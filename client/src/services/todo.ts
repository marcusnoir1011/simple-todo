// CORE
import axios from "axios";

//  CUSTOM
import { type Todo } from "../types/todo";

let API_URL = "";
if (import.meta.env.VITE_MODE === "development") {
    API_URL = import.meta.env.VITE_LOCAL_API_URL;
}
if (import.meta.env.VITE_MODE === "production") {
    API_URL = import.meta.env.VITE_API_URL!;
}

console.log("API", API_URL);

const getAllTodo = async (): Promise<Todo[]> => {
    const { data } = await axios.get(`${API_URL}/getAllTodo`);
    return data.data;
};

const getTodo = async (id: string): Promise<Todo> => {
    const { data } = await axios.get(`${API_URL}/get/${id}`);
    return data.data;
};

const createTodo = async (title: string): Promise<Todo> => {
    const { data } = await axios.post(`${API_URL}/create`, { title });
    return data.data;
};

const deleteTodo = async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/delete/${id}`);
    return data.data;
};

const updateTodo = async (id: string, title: string) => {
    const { data } = await axios.put(`${API_URL}/update/${id}`, { title });
    return data.data;
};

export { getAllTodo, getTodo, createTodo, deleteTodo, updateTodo };
