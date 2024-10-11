import { getQuestionsFromAssessmentId } from "@/service/assessments.service";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest,{params}:{params:{id:string}})=>{
    try {
        const assessments=await getQuestionsFromAssessmentId({assessmentId:Number(params.id)})
        return NextResponse.json({assessments},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}