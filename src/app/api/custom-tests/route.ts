import db from "@/db"
import { Tests, VersionAndTest } from "@/db/schema/schema"
import {and, count, eq, is} from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async(req:NextRequest)=>{
    try{
        const {versionId,customTestId,assessmentId}=await req.json()

        if(!versionId || !customTestId || !assessmentId){
            return NextResponse.json({message:"Please provide all fields"},{status:400})
        }

       const test=await db.select().from(Tests).where(eq(Tests.id,customTestId))
       if(!test[0]) return NextResponse.json({message:"Test not found"},{status:404})
       
       const isExist = await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.versionId,versionId),eq(VersionAndTest.testId,test[0].id),eq(VersionAndTest.assessmentId,assessmentId)))
       const versionAndTestCount=await db.select({count:count()}).from(VersionAndTest).where(and(eq(VersionAndTest.versionId,versionId),eq(VersionAndTest.assessmentId,assessmentId)))
        if(isExist.length>0) {
            await db.delete(VersionAndTest).where(and(eq(VersionAndTest.versionId, versionId), eq(VersionAndTest.testId, test[0].id), eq(VersionAndTest.assessmentId, assessmentId))).returning({id: VersionAndTest.id})
      return NextResponse.json({message:"successfully removed"},{status:201})
        }
await db.insert(VersionAndTest).values({testId:test[0].id,versionId,assessmentId,order: versionAndTestCount[0].count+1}).returning({id:VersionAndTest.id})
     

        return NextResponse.json({message:"successfully added"},{status:201})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}
        

export const GET=async (req:NextRequest) => {
    
    try {
       const customTestId=req.nextUrl.searchParams.get('customTestId') as string
       const versionId=req.nextUrl.searchParams.get('versionId') as string

        const versionAndTest=await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.testId,parseInt(customTestId)),eq(VersionAndTest.versionId,parseInt(versionId))))
        console.log(versionAndTest,'versionAndTest');
        return NextResponse.json({isExist:versionAndTest.length>0,message:"success"},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}