"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getClass } from '@/services/classService';
import { Class } from '@/types/class';
import ClassForm from '@/components/classes/ClassForm';

export default function EditClassPage() {
    const params = useParams();
    const [classData, setClassData] = useState<Class | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const data = await getClass(Number(params.id));
                setClassData(data);
            } catch (error) {
                console.error('Failed to fetch class', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchClass();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!classData) {
        return <div>Class not found</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Class</h1>
                <p className="text-gray-700 mt-2">Update class information.</p>
            </div>
            <ClassForm initialData={classData} />
        </div>
    );
}
