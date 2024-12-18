import db from "@/db"
import { Tests } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
    try{
        const body=await req.json()
        const {id}=body
        if(!id){
            throw new Error("Please provide id")
        }
       await db.select().from(Tests).where(eq(Tests.id,id))

        return NextResponse.json({message:"success"},{status:201})
    }catch(err:any){
        
        return NextResponse.json({message:err.message},{status:500})
    }
    }