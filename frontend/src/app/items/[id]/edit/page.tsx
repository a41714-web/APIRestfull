"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Item } from '@/types/item';
import { getItem } from '@/services/api';
import ItemForm from '@/components/items/ItemForm';
import { Alert } from '@/components/ui/Alert';

export default function EditItemPage() {
    const params = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const id = parseInt(params.id as string);
                if (isNaN(id)) throw new Error('Invalid ID');

                const data = await getItem(id);
                setItem(data);
            } catch (err) {
                setError('Failed to fetch item details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchItem();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !item) {
        return <Alert type="error" message={error || 'Item not found'} />;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Item</h1>
                <p className="text-gray-500 mt-1">Update item information</p>
            </div>
            <ItemForm initialData={item} />
        </div>
    );
}
