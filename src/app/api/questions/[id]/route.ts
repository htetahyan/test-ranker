import db from "@/db";
import { Questions } from "@/db/schema/schema";
import { getQuestionsFromVersionId} from "@/service/assessments.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest, props:{params: Promise<{id:string}>}) => {
    const params = await props.params;
    try {
        const assessments=await getQuestionsFromVersionId({versionId:Number(params.id)})
        return NextResponse.json({assessments},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
export const DELETE=async (req:NextRequest, props:{params: Promise<{id:string}>}) => {
    const params = await props.params;
    try {
        const assessments=await db.delete(Questions).where(eq(Questions.id,parseInt(params.id)))

        return NextResponse.json({message:"deleted"},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}