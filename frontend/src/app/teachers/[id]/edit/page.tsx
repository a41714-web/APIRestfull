"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTeacher } from '@/services/teacherService';
import { Teacher } from '@/types/teacher';
import TeacherForm from '@/components/teachers/TeacherForm';

export default function EditTeacherPage() {
    const params = useParams();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const data = await getTeacher(Number(params.id));
                setTeacher(data);
            } catch (error) {
                console.error('Failed to fetch teacher', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchTeacher();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!teacher) {
        return <div>Teacher not found</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Teacher</h1>
                <p className="text-gray-700 mt-2">Update teacher information.</p>
            </div>
            <TeacherForm initialData={teacher} />
        </div>
    );
}
