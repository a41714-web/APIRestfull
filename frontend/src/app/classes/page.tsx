"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Class } from '@/types/class';
import { getClasses, deleteClass } from '@/services/classService';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';

export default function ClassesPage() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchClasses = async () => {
        try {
            const data = await getClasses();
            setClasses(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch classes. Please ensure the API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this class?')) return;

        try {
            await deleteClass(id);
            setClasses(classes.filter((c) => c.id !== id));
        } catch {
            alert('Failed to delete class.');
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
                    <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
                    <p className="text-gray-500 mt-1">Manage your classes (Turmas)</p>
                </div>
                <Link href="/classes/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Class
                    </Button>
                </Link>
            </div>

            {error ? (
                <Alert type="error" message={error} />
            ) : (
                <Table
                    data={classes}
                    keyExtractor={(c) => (c.id !== undefined ? c.id : Math.random())}
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
                            header: 'Year',
                            accessor: 'ano',
                        },
                        {
                            header: 'Actions',
                            accessor: (c) => (
                                <div className="flex gap-2">
                                    <Link href={`/classes/${c.id}/edit`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => c.id !== undefined && handleDelete(c.id)}
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
