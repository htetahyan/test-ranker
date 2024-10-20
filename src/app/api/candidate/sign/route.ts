import db from "@/db"
import { Candidates } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{{
    try{
        const body=await req.json()
        const {signature,candidate_uniqueId}=body
        if(!signature || !candidate_uniqueId){
            throw new Error("Please provide all fields")
        }
       const candidate= await db.update(Candidates).set({isSigned:true,currentStep:'test'}).where(eq(Candidates.generatedUrl,candidate_uniqueId))
     
        return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}}