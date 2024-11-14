import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { versions } from "@/db/schema/schema";
import { and, eq } from "drizzle-orm";


export const POST=async (req:NextRequest, props:{params: Promise<{assessmentId:string,versionId:string}>}) => {
    try{
        const {assessmentId,versionId} = await props.params;
        const {type}=await req.json();
        if(!assessmentId || !versionId || !type){
            return NextResponse.json({message:"Please provide all fields"},{status:400})
        }

        
        const version=await db.select().from(versions).where(and(eq(versions.assessmentId,parseInt(assessmentId)),eq(versions.id,parseInt(versionId)))).then((data) => data[0])
        if(!version){
            return NextResponse.json({message:"Version not found"},{status:401})
        }
        await db.update(versions).set({isPublished:type==='PUBLISH'?true:false}).where(and(eq(versions.assessmentId,parseInt(assessmentId)),eq(versions.id,parseInt(versionId))))
        return NextResponse.json({message:"success"},{status:200})
    }
   catch(err:any){
       return NextResponse.json({message:err.message},{status:500})
   }
}