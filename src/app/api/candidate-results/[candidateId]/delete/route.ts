import db from "@/db";
import { Candidates } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export const DELETE = async (req: NextRequest, props: { params: Promise<{ candidateId: string }> }) => {
    try {
        const { candidateId } = await props.params;
        if (!candidateId) return NextResponse.json({ message: "invalid request " + candidateId }, { status: 400 });
        const candidate = await db.delete(Candidates).where(eq(Candidates.id, parseInt(candidateId)));
        return NextResponse.json({ message: "success" }, { status: 200 });
    }
    catch (error: any) {
         return NextResponse.json({ message: "invalid request " }, { status: 400 });
    }}