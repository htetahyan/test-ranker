import React from "react";
import db from "@/db";
import CandidatesList from "@/components/dashboard/Candidates";
import { Assessments, Candidates, versions } from "@/db/schema/schema";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async (props:{searchParams:Promise<{page:string,limit:string}>}) => {
  const {page,limit}=await props.searchParams
  if(!page || !limit) redirect('/dashboard/candidates?page=0&limit=5')
  // Fetch all candidates without pagination
  const data = await db.select().from(Candidates).leftJoin(versions, eq(versions.id, Candidates.versionId)).leftJoin(Assessments,eq(Assessments.id,versions.assessmentId)).orderBy(
    asc(Candidates.createdAt)).limit(Number(limit)).offset(Number(page)*Number(limit));

  return (
 <CandidatesList data={data as any} />
  );
};

export default Page;
