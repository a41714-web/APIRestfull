"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Class } from '@/types/class';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { createClass, updateClass } from '@/services/classService';

interface ClassFormProps {
    initialData?: Class;
}

export default function ClassForm({ initialData }: ClassFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Class>({
        nome: initialData?.nome || '',
        ano: initialData?.ano || new Date().getFullYear(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'ano' ? (value ? parseInt(value) : 0) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData?.id) {
                await updateClass(initialData.id, formData);
            } else {
                await createClass(formData);
            }
            router.push('/classes');
            router.refresh();
        } catch (err) {
            setError('Failed to save class. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {initialData ? 'Edit Class' : 'Register New Class'}
            </h2>

            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Class Name"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Enter class name (e.g. 1A)"
                />

                <Input
                    label="Year"
                    name="ano"
                    type="number"
                    min="1900"
                    max="2100"
                    value={formData.ano}
                    onChange={handleChange}
                    required
                    placeholder="Enter year"
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
                        {initialData ? 'Update Class' : 'Register Class'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
