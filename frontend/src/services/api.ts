import axios from 'axios';
import { Student } from '@/types/student';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Student functions
export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get('/alunos');
    return response.data;
};

export const getStudent = async (id: number): Promise<Student> => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
};

export const createStudent = async (student: Student): Promise<Student> => {
    const response = await api.post('/alunos', student);
    return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
    const response = await api.put(`/alunos/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await api.delete(`/alunos/${id}`);
};

export default api;
