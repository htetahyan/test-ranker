import db from "@/db";
import { Questions } from "@/db/schema/schema";
import { getQuestionsFromAssessmentId } from "@/service/assessments.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest,{params}:{params:{id:string}})=>{
    try {
        const assessments=await getQuestionsFromAssessmentId({assessmentId:Number(params.id)})
        return NextResponse.json({assessments},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
export const DELETE=async(req:NextRequest,{params}:{params:{id:string}})=>{
    try {
        const assessments=await db.delete(Questions).where(eq(Questions.id,parseInt(params.id)))

        return NextResponse.json({message:"deleted"},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}