import TestDragNDrop from '@/components/assessments/TestDragNDrop';
import Header from '@/components/dashboard/Header';
import db from '@/db';
import { Assessments, Candidates, SelectUsers } from '@/db/schema/schema';
import { currentUser } from '@/service/auth.service';
import { asc, eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';
import { FaPlus, FaEllipsisH } from 'react-icons/fa';

const page = async () => {
  const user = await currentUser() as SelectUsers;
  
    const assessments = await db
    .select()
    .from(Assessments)
    .where(eq(Assessments.companyId, user?.id!))
    .orderBy(asc(Assessments.createdAt));

  return (
    <>
          <Header user={user} />

    <div className="min-h-screen bg-[#f9f6f1] py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Assessments Overview</h1>
         <Link href="/assessments/new"> <button className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-200 shadow-md">
            <FaPlus className="mr-2" />
            New Assessment
          </button>
          </Link>
        </div>

        {/* Tabs for Active, Inactive, Archived */}
        <div className="flex space-x-3 mb-8">
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full shadow hover:bg-blue-200 transition">
            Active 
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full shadow hover:bg-gray-200 transition">
            Inactive 
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full shadow hover:bg-gray-200 transition">
            Archived 
          </button>
        </div>

        {/* Search and table */}
        <div className="bg-white p-7 rounded-lg shadow-lg">
        {/*   <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Search assessments"
            />
          </div> */}

          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-3">Assessment Name</th>
                <th className="py-3">Job Role</th>
                <th className="py-3">Location</th>
                <th className="py-3">Work Arrangement</th>
                <th className="py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              { assessments.length===0 ? <tr><td colSpan={6} className="py-4 px-4 text-center">No Assessments Created Yet</td></tr> :assessments.map((assessment) => (
                <tr key={assessment.id} className="border-b">
                  <Link href={`/assessments/${assessment.id}`}><td className="py-4 px-4 underline">{assessment.name}</td>
                  </Link>
                  <td className="py-4 px-4">{assessment.jobRole}</td>
                  <td className="py-4 px-4">{assessment.jobLocation}</td>
                  <td className="py-4 px-4">{assessment.workArrangement}</td>
                  <td className="py-4 px-4">{new Date(assessment.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-right">
                    <FaEllipsisH className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-gray-500">Show per page</div>
            <div>1 - {assessments.length} of {assessments.length}</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
                Prev
              </button>
              <button className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default page;
