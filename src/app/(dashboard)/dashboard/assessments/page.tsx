import DashboardTable from '@/components/dashboard/DashboardTable';
import db from '@/db';
import { Assessments, Candidates, SelectUsers, versions } from '@/db/schema/schema';
import { checkAssessmentLimitExceeded, checkPlanLimitExceeded, currentUser } from '@/service/auth.service';
import { and, asc, count, eq } from 'drizzle-orm';
import dynamic from 'next/dynamic';
import React from 'react';const page = async () => {
  const user = await currentUser() as SelectUsers;
  
  const assessments = await db
    .select()
    .from(Assessments)
    .leftJoin(versions, and(eq(versions.assessmentId, Assessments.id), eq(versions.name, 'default')))
    .where(eq(Assessments.companyId, user?.id!))
    .orderBy(asc(Assessments.createdAt)) ?? []; 
    console.log(assessments);
  const limitExceed=await checkPlanLimitExceeded(user)
    console.log(limitExceed);
    const isAssessmentLimitExceed=await checkAssessmentLimitExceeded();

  return (
    <div className='w-full '> <DashboardTable user={user}
      isAssessmentLimitExceed={isAssessmentLimitExceed!}
      assessments={assessments as any}/></div>
  );
};

export default page;
