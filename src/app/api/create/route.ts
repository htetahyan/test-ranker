import db from "@/db";
import { SessionData } from "@/db/schema/schema";
import { NextRequest, NextResponse } from "next/server"
import {v4 as uuidv4} from 'uuid';
export const POST=async(req:NextRequest)=>{{
    try{
        const body=await req.json()
        const {name,jobRole,url,generateBy,description,questionCount,duration}=body
     if(!name || !jobRole || !questionCount || !duration){
         return NextResponse.json({message:"Please provide all fields"},{status:400})
     }
     const sessionId= uuidv4()
      const sessionData=await db.insert(SessionData).values({
        assessmentName:name,
        jobRole,
        url,
        generateBy,
        description,
        questionCount,
        sessionId,
        duration
     }).returning()
     if(!sessionData[0]) throw new Error("Failed to create session. Please try again later.")
 
        return NextResponse.json({message:"success",sessionId},{status:201})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}}