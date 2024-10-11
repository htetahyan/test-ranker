import { createNewAssessment } from "@/service/assessments.service"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{

    
try{ 
    const body=await req.json()
const {name,jobRole,jobLocation,workArrangement}=body

    if(!name || !jobRole || !jobLocation || !workArrangement){
       throw new Error("Please provide all fields")
    }
    const companyId=1
    const id=await createNewAssessment({name,companyId,jobRole,jobLocation,workArrangement})

    return NextResponse.json(id,{status:201})
}catch(err:any){
    console.log(err)
    return NextResponse.json({message:err.message},{status:500})
}
}