import axios from 'axios';
import { Item } from '@/types/item';

const API_URL = 'http://localhost:8080/items';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getItems = async (): Promise<Item[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getItem = async (id: number): Promise<Item> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
    const response = await api.post('/', item);
    return response.data;
};

export const updateItem = async (id: number, item: Omit<Item, 'id'>): Promise<Item> => {
    const response = await api.put(`/${id}`, item);
    return response.data;
};

export const deleteItem = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export default api;
