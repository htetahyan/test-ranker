import db from '@/db'
import { Assessments } from '@/db/schema/schema'
import React from 'react'

const page = async () => {
  const assessments = await db.select().from(Assessments)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="max-w-2xl w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Assessments
        </h1>
        {assessments.length > 0 ? (
          <ul className="space-y-4">
            {assessments?.map((assessment) => (
              <li key={assessment.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <span className="text-lg font-medium text-gray-700">
                  {assessment.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No Assessments
          </p>
        )}
      </div>
    </div>
  )
}

export default page
