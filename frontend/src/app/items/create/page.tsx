import ItemForm from '@/components/items/ItemForm';

export default function CreateItemPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create New Item</h1>
                <p className="text-gray-500 mt-1">Add a new item to your inventory</p>
            </div>
            <ItemForm />
        </div>
    );
}
