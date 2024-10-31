import db from "@/db"
import { CandidateInfo, Candidates } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const GET=async(req:NextRequest,props:{params:Promise<{candidateId:string}>})=>{ 
    try{
        const {candidateId}=await props.params
        if(!candidateId) return NextResponse.json({message:"invalid request "+candidateId},{status:400})
        const candidateInfo=await db.select().from(CandidateInfo).where(eq(CandidateInfo.candidateId,parseInt(candidateId)))
    const candidate=await db.select().from(Candidates).where(eq(Candidates.id,parseInt(candidateId)))
        if(!candidateInfo) return NextResponse.json({message:"invalid request "+candidateId},{status:400})
        return NextResponse.json({message:"success",data:{candidateInfo:candidateInfo[0],candidate:candidate[0]}},{status:200})

    }
    catch(error:any){
        return NextResponse.json({message:"invalid request "},{status:400})
    }}