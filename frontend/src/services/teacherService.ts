import api from './api';
import { Teacher } from '@/types/teacher';

export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await api.get('/professores');
    return response.data;
};

export const getTeacher = async (id: number): Promise<Teacher> => {
    const response = await api.get(`/professores/${id}`);
    return response.data;
};

export const createTeacher = async (teacher: Teacher): Promise<Teacher> => {
    const response = await api.post('/professores', teacher);
    return response.data;
};

export const updateTeacher = async (id: number, teacher: Teacher): Promise<Teacher> => {
    const response = await api.put(`/professores/${id}`, teacher);
    return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
    await api.delete(`/professores/${id}`);
};
