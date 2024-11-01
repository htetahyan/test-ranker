import Empty from '@/components/animation/Empty';
import TestDragNDrop from '@/components/assessments/TestDragNDrop';
import DashboardTable from '@/components/dashboard/DashboardTable';
import Header from '@/components/dashboard/Header';
import db from '@/db';
import { Assessments, Candidates, SelectUsers, versions } from '@/db/schema/schema';
import { currentUser } from '@/service/auth.service';
import { and, asc, count, eq } from 'drizzle-orm';
import Link from 'next/link';

import React from 'react';
import { FaPlus, FaEllipsisH } from 'react-icons/fa';
const page = async () => {
  const user = await currentUser() as SelectUsers;

  const assessments = await db
    .select()
    .from(Assessments)
    .leftJoin(versions, and(eq(versions.assessmentId, Assessments.id), eq(versions.name, 'default')))
    .where(eq(Assessments.companyId, user?.id!))
    .orderBy(asc(Assessments.createdAt)) ?? [];

  // Check if there's at least one assessment
  let versionsArray = [] as any;
  let versionCount = 0;

  console.log(assessments, 'assessments');
  

  return (
    <div> <DashboardTable 
   
      assessments={assessments} 
    // Handle case where versionsArray is empty
    /></div>
  );
};

export default page;
