import axios from 'axios';
import { Student } from '@/types/student';

const API_URL = 'http://localhost:8080/alunos';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get('');
    return response.data;
};

export const getStudent = async (id: number): Promise<Student> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createStudent = async (student: Student): Promise<Student> => {
    const response = await api.post('', student);
    return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
    const response = await api.put(`/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export default api;
