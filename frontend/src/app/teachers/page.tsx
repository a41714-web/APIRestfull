"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Teacher } from '@/types/teacher';
import { getTeachers, deleteTeacher } from '@/services/teacherService';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTeachers = async () => {
        try {
            const data = await getTeachers();
            setTeachers(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch teachers. Please ensure the API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this teacher?')) return;

        try {
            await deleteTeacher(id);
            setTeachers(teachers.filter((teacher) => teacher.id !== id));
        } catch {
            alert('Failed to delete teacher.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Teachers</h2>
                    <p className="text-gray-500 mt-1">Manage your teachers</p>
                </div>
                <Link href="/teachers/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Teacher
                    </Button>
                </Link>
            </div>

            {error ? (
                <Alert type="error" message={error} />
            ) : (
                <Table
                    data={teachers}
                    keyExtractor={(teacher) => (teacher.id !== undefined ? teacher.id : Math.random())}
                    columns={[
                        {
                            header: 'ID',
                            accessor: 'id',
                            className: 'w-24',
                        },
                        {
                            header: 'Name',
                            accessor: 'nome',
                            className: 'font-medium',
                        },
                        {
                            header: 'Email',
                            accessor: 'email',
                        },
                        {
                            header: 'Subject',
                            accessor: 'disciplina',
                        },
                        {
                            header: 'Actions',
                            accessor: (teacher) => (
                                <div className="flex gap-2">
                                    <Link href={`/teachers/${teacher.id}/edit`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => teacher.id !== undefined && handleDelete(teacher.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ),
                            className: 'w-24',
                        },
                    ]}
                />
            )}
        </div>
    );
}
