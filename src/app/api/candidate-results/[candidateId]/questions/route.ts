import db from "@/db";
import { Answers, Questions } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, props: { params: Promise<{ candidateId: string }> }) => {
    try {
        const { candidateId } = await props.params;
const answers= await db.select().from(Answers).where(eq(Answers.candidateId,parseInt(candidateId)))
.leftJoin(Questions,eq(Questions.id,Answers.questionId))

        return NextResponse.json({ message: "success", data:answers }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({ message: "invalid request " }, { status: 400 });
    }}