import { createCandidate } from "@/service/candidate.service";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{
    try{

    
    const body=await req.json()
    const {fullName,email,assessmentId}=body
    if(!fullName || !email||!assessmentId){
        return NextResponse.json({message:"Please provide all fields"},{status:400})
    }
    const generatedCandidateUrl=await createCandidate({fullName,email,assessmentId})
    return NextResponse.json({message:"success",generatedUrl:generatedCandidateUrl},{status:201})
}catch(err:any){
    return NextResponse.json({message:err.message},{status:500})
}
}