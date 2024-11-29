import React from "react";
import db from "@/db";
import CandidatesList from "@/components/dashboard/Candidates";
import { Assessments, Candidates, versions } from "@/db/schema/schema";
import { and, asc, count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { currentUser } from "@/service/auth.service";

const Page = async (props: { searchParams: Promise<{ page: string; limit: string }> }) => {
  const { page, limit } = await props.searchParams;
  
  const currentPage = Number(page) || 0;
  const perPage = Number(limit) || 5;
  
  if (!page || !limit) redirect('/dashboard/candidates?page=0&limit=5');
  
  const user = await currentUser();

  // Fetch total number of candidates
  const totalCount = await db
  .select({ count: count() })
  .from(Candidates)
  .innerJoin(versions, eq(versions.id, Candidates.versionId))
  .innerJoin(Assessments, eq(Assessments.id, versions.assessmentId))
  .where(eq(Assessments.companyId, user?.id!))
  .then((data) => data[0].count || 0); // Ensure a fallback to 0 if no records are found


  // Fetch paginated data
  const data = await db
    .select()
    .from(Assessments)
    .leftJoin(versions, eq(versions.assessmentId, Assessments.id))
    .leftJoin(Candidates, eq(Candidates.versionId, versions.id))
    .where(eq(Assessments.companyId, user?.id!))
    .orderBy(asc(Assessments.createdAt))
    .limit(perPage)
    .offset(currentPage * perPage);
console.log(totalCount)
  return (
    <CandidatesList
      data={data as any}
      currentPage={currentPage}
      totalPages={Math.ceil(totalCount / perPage)}
    />
  );
};

export default Page;
