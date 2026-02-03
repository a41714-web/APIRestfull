"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCourse } from '@/services/courseService';
import { Course } from '@/types/course';
import CourseForm from '@/components/courses/CourseForm';

export default function EditCoursePage() {
    const params = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourse(Number(params.id));
                setCourse(data);
            } catch (error) {
                console.error('Failed to fetch course', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchCourse();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
                <p className="text-gray-700 mt-2">Update course information.</p>
            </div>
            <CourseForm initialData={course} />
        </div>
    );
}
