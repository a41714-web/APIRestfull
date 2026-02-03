"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Course } from '@/types/course';
import { getCourses, deleteCourse } from '@/services/courseService';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch courses. Please ensure the API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        try {
            await deleteCourse(id);
            setCourses(courses.filter((course) => course.id !== id));
        } catch {
            alert('Failed to delete course.');
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
                    <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
                    <p className="text-gray-500 mt-1">Manage your courses</p>
                </div>
                <Link href="/courses/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Course
                    </Button>
                </Link>
            </div>

            {error ? (
                <Alert type="error" message={error} />
            ) : (
                <Table
                    data={courses}
                    keyExtractor={(course) => (course.id !== undefined ? course.id : Math.random())}
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
                            header: 'Actions',
                            accessor: (course) => (
                                <div className="flex gap-2">
                                    <Link href={`/courses/${course.id}/edit`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => course.id !== undefined && handleDelete(course.id)}
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
