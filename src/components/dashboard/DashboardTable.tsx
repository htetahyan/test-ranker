'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Pagination,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import Empty from '../animation/Empty';

const DashboardTable = ({ assessments }:{assessments: any}) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 6;

  useEffect(() => {
    // Simulate a 2-second loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pages = Math.ceil(assessments.length / rowsPerPage);

  const paginatedAssessments = useMemo(() => {
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
            <Button className="flex items-center bg-black text-white px-6 py-3 rounded-lg transition duration-200 shadow-md">
              <FaPlus className="mr-2" />
              New Assessment
            </Button>
          </Link>
        </div>

        {loading ? (
          // Skeleton layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: rowsPerPage }).map((_, index) => (
              <Card key={index} className="w-full space-y-5 p-4 rounded-lg">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        ) : assessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedAssessments.map((item: any,i:number) => (
              <Card key={i} className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg p-6 rounded-xl">
                <CardHeader className="pb-2 flex items-center gap-4">
                  <h3 className="text-xl font-semibold">{item.Assessments.name}</h3>
                  <p className="text-sm text-gray-400">{item.Assessments.jobRole || "No job role specified"}</p>
                </CardHeader>

                <CardBody className="text-gray-300 pb-4">
                  <p className="text-lg">{new Date(item.Assessments.createdAt).toLocaleDateString()}</p>
                </CardBody>

                <CardFooter className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <p className="text-xs uppercase text-gray-400">Version</p>
                    <p className="text-lg font-bold">{item.versions.name}</p>
                  </div>
                  <Link href={`/assessments/${item.Assessments.id}/${item.versions.id}`}>
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

        {assessments.length > 0 && !loading && (
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
    </div>
  );
};

export default DashboardTable;
