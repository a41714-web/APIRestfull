import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Users, GraduationCap, BookOpen, School, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="light-section flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-3xl space-y-8">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-blue-600 rounded-full opacity-20 blur-xl"></div>
            <div className="relative bg-white p-4 rounded-full shadow-xl mb-4 inline-flex">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            School Management <span className="text-blue-600">Simplified</span>
          </h1>

          <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            A comprehensive solution for managing students, courses, and academic records with ease and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/students">
              <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid - 2x2 layout */}
      <section className="light-section py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Manage Everything</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Link href="/students" className="card block p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Alunos (Students)</h3>
            <p>Manage student profiles, academic history, and personal information.</p>
          </Link>

          <Link href="/courses" className="card block p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cursos (Courses)</h3>
            <p>Organize curriculum and track course assignments efficiently.</p>
          </Link>

          <Link href="/teachers" className="card block p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Professores (Teachers)</h3>
            <p>Manage teacher profiles, subjects, and departmental information.</p>
          </Link>

          <Link href="/classes" className="card block p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <School className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Turmas (Classes)</h3>
            <p>Manage class groups, schedules, and student enrollments.</p>
          </Link>

        </div>
      </section>
    </div>
  );
}
