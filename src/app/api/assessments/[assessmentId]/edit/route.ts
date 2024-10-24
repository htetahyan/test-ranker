import db from "@/db"
import { Assessments, Tests } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async(req:NextRequest,{params}:{params:{assessmentId:string}})=>{{
    try{
        const id=parseInt(params.assessmentId)
        const body=await req.json()
        const {name,jobLocation,jobRole,workArrangement}=body
        if(!name || !jobRole || !jobLocation || !workArrangement){
            return NextResponse.json({message:"Please provide all fields"},{status:400})
        }

        await db.update(Assessments).set({name,jobLocation,jobRole,workArrangement}).where(eq(Assessments.id,id)).catch(err=> {throw new Error('Cannot update assessment, please try again')})
        return NextResponse.json({message:"success"},{status:201})
        
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}}