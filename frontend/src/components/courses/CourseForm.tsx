"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/types/course';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { createCourse, updateCourse } from '@/services/courseService';

interface CourseFormProps {
    initialData?: Course;
}

export default function CourseForm({ initialData }: CourseFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Course>({
        nome: initialData?.nome || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData?.id) {
                await updateCourse(initialData.id, formData);
            } else {
                await createCourse(formData);
            }
            router.push('/courses');
            router.refresh();
        } catch (err) {
            setError('Failed to save course. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {initialData ? 'Edit Course' : 'Register New Course'}
            </h2>

            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Course Name"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Enter course name"
                />

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={loading}
                    >
                        {initialData ? 'Update Course' : 'Register Course'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
