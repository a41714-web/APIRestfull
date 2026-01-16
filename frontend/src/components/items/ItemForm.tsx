"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Item } from '@/types/item';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { createItem, updateItem } from '@/services/api';

interface ItemFormProps {
    initialData?: Item;
}

export default function ItemForm({ initialData }: ItemFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Omit<Item, 'id'>>({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (initialData?.id) {
                await updateItem(initialData.id, formData);
            } else {
                await createItem(formData);
            }
            router.push('/items');
            router.refresh();
        } catch (err) {
            setError('Failed to save item. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {initialData ? 'Edit Item' : 'Create New Item'}
            </h2>

            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter item name"
                />

                <Input
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter item description"
                />

                <Input
                    label="Price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
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
                        {initialData ? 'Update Item' : 'Create Item'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
