import { createNewQuestion } from "@/service/assessments.service"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
    try{
        const body=await req.json()
        const {question,type,assessmentId,description,duration,versionId}=body
        if(!question  || !assessmentId || !versionId){
            throw new Error("Please provide all fields")
        }

        await createNewQuestion({question,type,assessmentId,description,duration,versionId})
        return NextResponse.json({status:200})
    }catch(err:any){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}