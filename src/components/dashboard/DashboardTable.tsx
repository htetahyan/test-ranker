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
  useDisclosure,
} from "@nextui-org/react";
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import Empty from '../animation/Empty';
import { SelectAssessments, SelectUsers, SelectVersions } from '@/db/schema/schema';
import { checkAssessmentLimitExceeded } from '@/service/auth.service';
import { RiLockUnlockFill } from 'react-icons/ri';

type Data = {
  Assessments: SelectAssessments,
  versions: SelectVersions
};

const DashboardTable: React.FC<{ assessments: Data[] ,user: SelectUsers, isAssessmentLimitExceed:boolean}> = ({ assessments, isAssessmentLimitExceed, user }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pages = Math.ceil(assessments.length / rowsPerPage);

  const paginatedAssessments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage
    return assessments.slice(start, end);
  }, [page, assessments]);
  const goToNewAssessment = () => {
    if(isAssessmentLimitExceed) return;
    window.location.href = '/assessments/new';
  }
  
  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Assessments</h1>
          
            <Button startContent={isAssessmentLimitExceed || !user.emailVerified ? <RiLockUnlockFill /> : <FaPlus />}   isDisabled={isAssessmentLimitExceed || !user.emailVerified} onClick={goToNewAssessment} className="flex items-center bg-black text-white px-5 py-2 rounded-lg shadow-md">
            {isAssessmentLimitExceed ? <span className="ml-2 text-red-800">Limit Exceeded (upgrade)</span>: <span className="ml-2">New Assessment</span> } {!user.emailVerified  && <span className="ml-2 text-red-500">Email Not Verified</span>}
            </Button>
        
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: rowsPerPage }).map((_, index) => (
              <Card key={index} className="p-4 rounded-lg">
                <Skeleton className="rounded-lg">
                  <div className="h-20 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="mt-3 space-y-2">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        ) : assessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedAssessments.map((item, i) => (
              <Card key={i} className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg p-3 rounded-lg">
                <CardHeader className="pb-2 flex flex-col space-y-1">
                  <h3 className="text-lg font-semibold">{item.Assessments.name}</h3>
                  <p className="text-sm">{item.Assessments.jobRole || "No job role specified"}</p>
                </CardHeader>
                <CardBody className="text-gray-400 text-sm">
                  {new Date(item.Assessments.createdAt).toLocaleDateString()}
                </CardBody>
                <CardFooter className="flex justify-between items-center pt-2">
                  <span className="text-sm">{item.versions.isPublished ? "Published" : "Draft"}</span>
             <Link href={`/assessments/${item.Assessments.id}/${item.versions.id}`}>
                     <Button isIconOnly endContent={<FaArrowRight  />} className="text-black bg-slate-200 hover:bg-slate-400 rounded-full p-">
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
          <div className="flex justify-center mt-6">
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
