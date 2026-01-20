"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Student } from '@/types/student';
import { getStudents, deleteStudent } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch students. Please ensure the API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this student?')) return;

        try {
            await deleteStudent(id);
            setStudents(students.filter((student) => student.id !== id));
        } catch {
            alert('Failed to delete student.');
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
                    <h2 className="text-2xl font-bold text-gray-900">Students</h2>
                    <p className="text-gray-500 mt-1">Manage your students</p>
                </div>
                <Link href="/students/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Student
                    </Button>
                </Link>
            </div>

            {error ? (
                <Alert type="error" message={error} />
            ) : (
                <Table
                    data={students}
                    keyExtractor={(student) => (student.id !== undefined ? student.id : Math.random())}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'nome',
                            className: 'font-medium',
                        },
                        {
                            header: 'Age',
                            accessor: 'idade',
                        },
                        {
                            header: 'Email',
                            accessor: 'email',
                        },
                        {
                            header: 'Class',
                            accessor: (student) => student.turmaNome || 'N/A',
                        },
                        {
                            header: 'Actions',
                            accessor: (student) => (
                                <div className="flex gap-2">
                                    <Link href={`/students/${student.id}/edit`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => student.id !== undefined && handleDelete(student.id)}
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
