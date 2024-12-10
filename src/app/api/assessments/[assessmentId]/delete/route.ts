import db from "@/db";
import {
  Answers,
  Assessments,
  CandidateInfo,
  Candidates,
  MultipleChoiceAnswers,
  usuage,
  versions,
} from "@/db/schema/schema";
import { currentUser, getCurrentPricing } from "@/service/auth.service";
import { and, AnyColumn, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ assessmentId: string }> }
) => {
  const { assessmentId } = await props.params;
 
  try {
    const user= await currentUser()
    if(!user){return NextResponse.json({message:"Please login"},{status:401})}

    await db.transaction(async (tx) => {
      try {
        // Fetch all versions related to the assessment
        const myVersions = await tx
          .select()
          .from(versions)
          .where(eq(versions.assessmentId, parseInt(assessmentId)));

        // Iterate over each version and delete related data
        for (const version of myVersions) {
          // Fetch all candidates for the current version
          const candidates = await tx
            .select()
            .from(Candidates)
            .where(eq(Candidates.versionId, version.id));

          // Delete related records for each candidate
          for (const candidate of candidates) {
            await tx.delete(CandidateInfo).where(eq(CandidateInfo.candidateId, candidate.id));
            await tx.delete(Answers).where(eq(Answers.candidateId, candidate.id));
            await tx.delete(MultipleChoiceAnswers).where(
              eq(MultipleChoiceAnswers.candidateId, candidate.id)
            );
          }
        }
const pricingId=(await getCurrentPricing()).id
        // Delete the versions
        await tx.delete(versions).where(eq(versions.assessmentId, parseInt(assessmentId)));
        await tx.delete(Assessments).where(eq(Assessments.id, parseInt(assessmentId)));
        await tx.update(usuage).set({ totalAssessments: sql`${usuage.totalAssessments}-1` }).where(and(eq(usuage.userId, user.id),eq(usuage.pricingId,pricingId)));
      } catch (error) {
        // Rollback the transaction on failure
         tx.rollback();
        throw new Error("Transaction failed. Rollback initiated.");
      }
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error during deletion:", error.message);
    return NextResponse.json(
      { message: "Failed to delete assessment and rollback completed." },
      { status: 500 }
    );
  }
};
