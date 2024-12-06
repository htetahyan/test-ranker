import { createNewAssessment } from "@/service/assessments.service"
import { currentUser } from "@/service/auth.service"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{

    
try{ 
    const body=await req.json()
const {name,jobRole}=body

    if(!name || !jobRole){
       throw new Error("Please provide all fields")
    }
    const {id:companyId,emailVerified}=await currentUser()
    if(!emailVerified){
        throw new Error("Please verify your email first before creating an assessment")
    }
    if(!companyId){
        throw new Error("Please login")
    }
    const {id,versionId}=await createNewAssessment({name,companyId,jobRole})
console.log(id,versionId,'id');
if(id ===null && versionId===null){ throw new Error("Assessment Limit Exceeded, please upgrade your current plan") }
    return NextResponse.json({message:"success",assessmentId:id,versionId},{status:201})
}catch(err:any){
    console.log(err)
    return NextResponse.json({message:err.message},{status:500})
}
}