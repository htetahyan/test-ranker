import db from "@/db"
import { Tests } from "@/db/schema/schema"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: Request) => {
    revalidateTag("CUSTOM_TESTS")
    try{const { description,title,duration } = await req.json() 
    const customTest = await db.insert(Tests).values({ description,questionsCount:0,title,duration,testType:"custom" }).returning({id:Tests.id})
  
    return NextResponse.json({message:"success",id:customTest[0].id}, { status: 201})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}
