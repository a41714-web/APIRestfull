"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/types/teacher';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { createTeacher, updateTeacher } from '@/services/teacherService';

interface TeacherFormProps {
    initialData?: Teacher;
}

export default function TeacherForm({ initialData }: TeacherFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Teacher>({
        nome: initialData?.nome || '',
        email: initialData?.email || '',
        disciplina: initialData?.disciplina || '',
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
                await updateTeacher(initialData.id, formData);
            } else {
                await createTeacher(formData);
            }
            router.push('/teachers');
            router.refresh();
        } catch (err) {
            setError('Failed to save teacher. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {initialData ? 'Edit Teacher' : 'Register New Teacher'}
            </h2>

            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Enter teacher name"
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter teacher email"
                />

                <Input
                    label="Subject (Disciplina)"
                    name="disciplina"
                    value={formData.disciplina}
                    onChange={handleChange}
                    required
                    placeholder="Enter subject"
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
                        {initialData ? 'Update Teacher' : 'Register Teacher'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
