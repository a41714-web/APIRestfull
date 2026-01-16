"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Item } from '@/types/item';
import { getItems, deleteItem } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Alert } from '@/components/ui/Alert';

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchItems = async () => {
        try {
            const data = await getItems();
            setItems(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch items. Please ensure the API is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await deleteItem(id);
            setItems(items.filter((item) => item.id !== id));
        } catch {
            alert('Failed to delete item.');
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
                    <h2 className="text-2xl font-bold text-gray-900">Items</h2>
                    <p className="text-gray-500 mt-1">Manage your items inventory</p>
                </div>
                <Link href="/items/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Item
                    </Button>
                </Link>
            </div>

            {error ? (
                <Alert type="error" message={error} />
            ) : (
                <Table
                    data={items}
                    keyExtractor={(item) => (item.id !== undefined ? item.id : Math.random())}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name',
                            className: 'font-medium',
                        },
                        {
                            header: 'Description',
                            accessor: 'description',
                        },
                        {
                            header: 'Price',
                            accessor: (item) => (
                                <span className="font-mono text-gray-700">
                                    ${item.price.toFixed(2)}
                                </span>
                            ),
                        },
                        {
                            header: 'Actions',
                            accessor: (item) => (
                                <div className="flex gap-2">
                                    <Link href={`/items/${item.id}/edit`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => item.id !== undefined && handleDelete(item.id)}
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
