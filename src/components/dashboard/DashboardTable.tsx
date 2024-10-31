'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Pagination,
  Button,
} from "@nextui-org/react";
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import { SelectAssessments } from '@/db/schema/schema';
import Empty from '../animation/Empty';

const DashboardTable = ({ assessments, versionCount, version }: { assessments: SelectAssessments[], versionCount: number, version: any }) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  // Calculate total pages based on the assessments length
  const pages = Math.ceil(assessments.length / rowsPerPage);

  // Paginated data
  const paginatedAssessments = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return assessments.slice(start, end);
  }, [page, assessments]);

  return (
    <div className="min-h-screen py-10 px-5 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Assessments Overview</h1>
          <Link href="/assessments/new">
            <Button className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md">
              <FaPlus className="mr-2" />
              New Assessment
            </Button>
          </Link>
        </div>

        
          {assessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{ 
            paginatedAssessments.map((assessment) => (
              <Card key={assessment.id} className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg p-6 rounded-xl">
                <CardHeader className="pb-2 flex items-center gap-4">
                  <h3 className="text-xl font-semibold">{assessment.name}</h3>
                  <p className="text-sm text-gray-400">{assessment.jobRole || "Create a vision. To get started, imagine your dream life."}</p>
                </CardHeader>

                <CardBody className="text-gray-300 pb-4">
                  <p className="text-lg">{new Date(assessment.createdAt).toLocaleDateString()}</p>
                </CardBody>

                <CardFooter className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <p className="text-xs uppercase text-gray-400">Total Versions</p>
                    <p className="text-lg font-bold">{versionCount}</p>
                  </div>
                  <Link href={`/assessments/${assessment.id}/${version?.id}`}>
                    <Button className="text-white bg-blue-500 hover:bg-blue-600 rounded-full">
                      <FaArrowRight />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            </div>
          ) : (
            <Empty text="No Assessments Found" />
          )}
        </div>

        {assessments.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className="text-gray-800"
            />
          </div>
        )}
      </div>
  );
};

export default DashboardTable;
