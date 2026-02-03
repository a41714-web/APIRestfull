import api from './api';
import { Class } from '@/types/class';

export const getClasses = async (): Promise<Class[]> => {
    const response = await api.get('/turmas');
    return response.data;
};

export const getClass = async (id: number): Promise<Class> => {
    const response = await api.get(`/turmas/${id}`);
    return response.data;
};

export const createClass = async (turma: Class): Promise<Class> => {
    const response = await api.post('/turmas', turma);
    return response.data;
};

export const updateClass = async (id: number, turma: Class): Promise<Class> => {
    const response = await api.put(`/turmas/${id}`, turma);
    return response.data;
};

export const deleteClass = async (id: number): Promise<void> => {
    await api.delete(`/turmas/${id}`);
};
