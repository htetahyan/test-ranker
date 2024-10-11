import { editQuestionAndOptions } from "@/service/assessments.service"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async(req:NextRequest)=>{
  try{  const body=await req.json()
    const {question,options,id}=body

    if(!question || !options || !id){
        throw new Error("Please provide all fields")
    }
   await editQuestionAndOptions({question,id,options})
    return NextResponse.json({message:"success"},{status:200})
    
  }catch(err:any){
    console.log(err)
    return NextResponse.json({message:err.message},{status:500})
  }
}