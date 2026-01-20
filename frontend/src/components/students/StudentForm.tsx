"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { createStudent, updateStudent } from '@/services/api';

interface StudentFormProps {
    initialData?: Student;
}

export default function StudentForm({ initialData }: StudentFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Student>({
        nome: initialData?.nome || '',
        idade: initialData?.idade || 0,
        email: initialData?.email || '',
        turmaId: initialData?.turmaId,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'idade' || name === 'turmaId' ? (value ? parseInt(value) : 0) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData?.id) {
                await updateStudent(initialData.id, formData);
            } else {
                await createStudent(formData);
            }
            router.push('/students');
            router.refresh();
        } catch (err) {
            setError('Failed to save student. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {initialData ? 'Edit Student' : 'Register New Student'}
            </h2>

            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Enter student name"
                />

                <Input
                    label="Age"
                    name="idade"
                    type="number"
                    min="0"
                    value={formData.idade}
                    onChange={handleChange}
                    required
                    placeholder="Enter student age"
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter student email"
                />

                <Input
                    label="Class ID (Optional)"
                    name="turmaId"
                    type="number"
                    min="0"
                    value={formData.turmaId || ''}
                    onChange={handleChange}
                    placeholder="Enter class ID"
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
                        {initialData ? 'Update Student' : 'Register Student'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
