import ClassForm from '@/components/classes/ClassForm';

export default function CreateClassPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create New Class</h1>
                <p className="text-gray-700 mt-2">Add a new class (Turma) to the system.</p>
            </div>
            <ClassForm />
        </div>
    );
}
