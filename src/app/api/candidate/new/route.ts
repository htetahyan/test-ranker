import { createCandidate } from "@/service/candidate.service";
import { NextRequest, NextResponse } from "next/server";
import { version } from "os";

export const POST=async(req:NextRequest)=>{
    try{

    
    const body=await req.json()
    const {fullName,email,versionId}=body
        console.log(versionId)
    if(!fullName || !email||!version){
        return NextResponse.json({message:"Please provide all fields"},{status:400})
    }
    const generatedCandidateUrl=await createCandidate({fullName,email,versionId})
    return NextResponse.json({message:"success",generatedUrl:generatedCandidateUrl},{status:201})
}catch(err:any){
    return NextResponse.json({message:err.message},{status:500})
}
}