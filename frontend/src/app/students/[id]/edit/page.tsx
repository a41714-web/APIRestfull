"use client";
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Student } from '@/types/student';
import { getStudent } from '@/services/api';
import StudentForm from '@/components/students/StudentForm';

interface EditStudentPageProps {
    params: Promise<{ id: string }>;
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        params.then(setResolvedParams);
    }, [params]);

    useEffect(() => {
        if (!resolvedParams) return;

        const fetchStudent = async () => {
            try {
                const data = await getStudent(parseInt(resolvedParams.id));
                setStudent(data);
            } catch (err) {
                console.error(err);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [resolvedParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!student) return null;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Student</h1>
                <p className="text-gray-500 mt-2">Update student information.</p>
            </div>
            <StudentForm initialData={student} />
        </div>
    );
}
