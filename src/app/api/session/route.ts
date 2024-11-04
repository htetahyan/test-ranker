import db from "@/db";
import { SessionData } from "@/db/schema/schema";
import { generateAssessmentWithSessionData } from "@/service/assessments.service";
import { currentUser } from "@/service/auth.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{
  try{  const {sessionId}=await req.json()
    if(!sessionId) return NextResponse.json({message:'success',redirect:'/dashboard'})

    const user=currentUser()
    const sessionData=await db.select().from(SessionData).where(eq(SessionData.sessionId,sessionId))
    if(sessionData.length===0) return NextResponse.json({message:'success',redirect:'/dashboard'})
   const {assessmentId,versionId}=await generateAssessmentWithSessionData(sessionData,user,sessionId)
return NextResponse.json({message:'success',redirect:`/assessments/${assessmentId}/${versionId}/edit/tests`})
}catch(e){
    return NextResponse.json({message:'success',redirect:'/dashboard'})
}

}