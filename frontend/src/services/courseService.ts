import api from './api';
import { Course } from '@/types/course';

export const getCourses = async (): Promise<Course[]> => {
    const response = await api.get('/cursos');
    return response.data;
};

export const getCourse = async (id: number): Promise<Course> => {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
    const response = await api.post('/cursos', course);
    return response.data;
};

export const updateCourse = async (id: number, course: Course): Promise<Course> => {
    const response = await api.put(`/cursos/${id}`, course);
    return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
    await api.delete(`/cursos/${id}`);
};
