import CourseForm from '@/components/courses/CourseForm';

export default function CreateCoursePage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-700 mt-2">Add a new course to the system.</p>
            </div>
            <CourseForm />
        </div>
    );
}
