'use client'
import { SelectAssessments, SelectTests } from '@/db/schema/schema';
import { useAddCustomTestToAssessmentMutation, useIsCustomTestAddedQuery } from '@/quries/BaseQuery';
import { Button, Card, Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

interface TestCardProps {
  test: SelectTests;
  isAdmin: boolean;
  versionId?: number;
  assessmentId?: number;
}

export const TestCard: React.FC<TestCardProps> = ({ test, isAdmin = false, versionId, assessmentId }) => {
  const [mutate, { isLoading }] = useAddCustomTestToAssessmentMutation();
  const { data, isLoading: isQueryLoading } = useIsCustomTestAddedQuery({ customTestId: test.id!, versionId: versionId! });

  const handleToggleTest = async () => {
    await mutate({ customTestId: test.id!, versionId: versionId!, assessmentId: assessmentId! });
  };

  const ActionButton = () => {
    if (isAdmin) {
      return (
        <Link href={`/admin/custom-tests/edit?id=${test.id}`} passHref>
          <Button className="border rounded-full px-4 py-2 hover:bg-gray-100">Edit</Button>
        </Link>
      );
    }

    return data?.isExist ? (
      <Button onClick={handleToggleTest} color='danger' className="border rounded-full px-4 py-2 hover:bg-gray-100" disabled={isLoading}>
        remove
      </Button>
    ) : (
      <Button onClick={handleToggleTest} className="border rounded-full px-4 py-2 hover:bg-gray-100" disabled={isLoading}>
        Add
      </Button>
    );
  };

  if (isLoading || isQueryLoading) {
    // Skeleton loading view
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
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
    );
  }

  return (
    <div className="h-fit rounded-lg p-4 max-w-sm border-2">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold">{test.title || 'Test Title'}</h2>
      </div>

      <div className="flex gap-2 mt-2">
        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
          {test.testType || 'Cognitive ability'}
        </span>
      </div>

      <h3 className="text-md font-semibold mt-4">Description</h3>
      <p className="text-sm mt-3">{test.description || 'This is a description of the test.'}</p>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span>{Math.round(test.duration / 60)} mins</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{test.questionsCount} questions</span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href={`/assessments?id=${test.id}`} passHref>
          <Button className="border rounded-full px-4 py-2 hover:bg-gray-100">Preview</Button>
        </Link>
        <ActionButton />
      </div>
    </div>
  );
};

interface TestListProps {
  versionId?: number;
  isAdmin: boolean;
  tests: SelectTests[];
  assessmentId?: number;
}

const TestList: React.FC<TestListProps> = ({ versionId, isAdmin, tests, assessmentId }) => {
  return (
    <div className="p-4 w-screen h-fit grid grid-cols-3 gap-4">
      {tests?.map((test) => (
        <TestCard key={test.id} test={test} isAdmin={isAdmin} versionId={versionId} assessmentId={assessmentId} />
      ))}
    </div>
  );
};

export default TestList;
