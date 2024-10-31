import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>


      {/* Header Section */}
 =

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
Generate AI Powered Questions
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Enter your job description URL to create your quiz.
        </p>
        <div className="flex">
          <Link href="/create">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md">
            Generate Questions
          </button></Link>
        </div>
      </main>
    </div>
  );
}
