"use client";

import { MultiStepForm } from '../components/MultiStepForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Switch to a Heat Pump
        </h1>
        <p className="text-xl text-gray-600">
          Check your savings and get a quote in 2 minutes
        </p>
      </div>

      <MultiStepForm />
    </main>
  );
}
