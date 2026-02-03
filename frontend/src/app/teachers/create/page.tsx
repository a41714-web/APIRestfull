import TeacherForm from '@/components/teachers/TeacherForm';

export default function CreateTeacherPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Register New Teacher</h1>
                <p className="text-gray-700 mt-2">Add a new teacher to the system.</p>
            </div>
            <TeacherForm />
        </div>
    );
}
