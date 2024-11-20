import db from "@/db";
import { Questions, VersionAndTest, versions } from "@/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const POST = async (
  req: NextRequest,
  props: { params: Promise<{ assessmentId: string; versionId: string }> }
) => {
  try {
    // Destructure and validate input parameters
    const { assessmentId, versionId } = await props.params;
    if (!assessmentId || !versionId) {
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );
    }

    const assessmentIdInt = parseInt(assessmentId);
    const versionIdInt = parseInt(versionId);

    // Start a transaction
    await db.transaction(async (tx) => {
      // Retrieve the existing version and its test relationships
      const versionAndTests = await tx
        .select()
        .from(VersionAndTest)
        .where(and(eq(VersionAndTest.assessmentId, assessmentIdInt), eq(VersionAndTest.versionId, versionIdInt)));

      // Create a new version
      const newVersion = await tx
        .insert(versions)
        .values({
          assessmentId: assessmentIdInt,
          name: new Date().toDateString(),
          uniqueId: uuid(),
          isPublished: false,
        })
        .returning({ id: versions.id })
        .then((data) => data[0]);

      if (!newVersion) {
        throw new Error("Failed to create a new version");
      }

      // Clone version and test mappings
      for (const v of versionAndTests) {
        await tx.insert(VersionAndTest).values({
          assessmentId: assessmentIdInt,
          versionId: newVersion.id,
          testId: v.testId,
          order: v.order,
        });
      }

      // Retrieve existing version details
      const existingVersion = await tx
        .select()
        .from(versions)
        .where(and(eq(versions.assessmentId, assessmentIdInt), eq(versions.id, versionIdInt)))
        .then((data) => data[0]);

      if (!existingVersion) {
        throw new Error("Version not found");
      }

      // Retrieve and clone questions
      const questions = await tx
        .select()
        .from(Questions)
        .where(eq(Questions.versionId, existingVersion.id));

      for (const q of questions) {
        await tx.insert(Questions).values({
          versionId: newVersion.id,
          order: q.order,
          question: q.question,
          description: q.description,
          type: q.type,
          duration: q.duration,
        });
      }
    });

    return NextResponse.json(
      { message: "Version cloned successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
