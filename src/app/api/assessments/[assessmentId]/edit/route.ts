import db from "@/db"
import { Assessments, Tests } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async (req:NextRequest, props:{params: Promise<{assessmentId:string}>}) => {
    const params = await props.params;
    {
        try{
            const id=parseInt(await params.assessmentId)
            const body=await req.json()
            const {name,jobRole}=body
            if(!name || !jobRole ){
                return NextResponse.json({message:"Please provide all fields"},{status:400})
            }

            await db.update(Assessments).set({name,jobRole}).where(eq(Assessments.id,id)).catch(err=> {throw new Error('Cannot update assessment, please try again')})
            return NextResponse.json({message:"success"},{status:201})
            
        }catch(err:any){
            return NextResponse.json({message:err.message},{status:500})
        }
    }
}