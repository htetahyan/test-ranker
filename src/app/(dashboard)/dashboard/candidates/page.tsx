import React from "react";
import db from "@/db";
import CandidatesList from "@/components/dashboard/Candidates";
import { Candidates } from "@/db/schema/schema";

const Page = async () => {
  // Fetch all candidates without pagination
  const candidates = await db.select().from(Candidates);

  return (
 <CandidatesList candidates={candidates} />
  );
};

export default Page;
