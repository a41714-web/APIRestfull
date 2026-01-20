import StudentForm from '@/components/students/StudentForm';

export default function CreateStudentPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create New Student</h1>
                <p className="text-gray-500 mt-2">Add a new student to the system.</p>
            </div>
            <StudentForm />
        </div>
    );
}
