import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Users, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-blue-600 rounded-full opacity-20 blur-xl"></div>
            <div className="relative bg-white p-4 rounded-full shadow-xl mb-4 inline-flex">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            School Management <span className="text-blue-600">Simplifed</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive solution for managing students, courses, and academic records with ease and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/students">
              <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all">
                Manage Students <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="h-12 px-8 text-lg">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Student Records</h3>
            <p className="text-gray-600">
              Maintain detailed student profiles, academic history, and personal information in a secure database.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Course Management</h3>
            <p className="text-gray-600">
              Organize curriculum, manage class schedules, and track course assignments efficiently.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Growth</h3>
            <p className="text-gray-600">
              Track performance metrics and generate reports to monitor student progress and achievement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
