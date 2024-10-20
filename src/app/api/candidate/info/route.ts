import db from "@/db"
import { CandidateInfo, Candidates, Resume } from "@/db/schema/schema"
import { uploadArrayBuffer } from "@/service/storage.service"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{ 
    try{

        const formData = await req.formData();
        const highestEducation = JSON.parse(formData.get('highestEducation') as string || '{}'); // Use string or empty object as fallback
        const studyField = JSON.parse(formData.get('studyField') as string || '{}');
        const mostRelevantExperience = JSON.parse(formData.get('mostRelevantExperience') as string || '{}');
        const yearOfExperience = JSON.parse(formData.get('yearOfExperience') as string || '{}');
        const gender = JSON.parse(formData.get('gender') as string || '{}');
        const birthDate = JSON.parse(formData.get('birthDate') as string || '{}');
        const countryOfResidence = JSON.parse(formData.get('countryOfResidence') as string || '{}');
        const countryOfOrigin = JSON.parse(formData.get('countryOfOrigin') as string || '{}');
        const firstLanguage = JSON.parse(formData.get('firstLanguage') as string || '{}');
        const assessmentsId = JSON.parse(formData.get('assessmentsId') as string || '{}');
        const candidateId = JSON.parse(formData.get('candidateId') as string || '{}');
        if(!assessmentsId || !candidateId) return NextResponse.json({message:"invalid request "+assessmentsId+' '+candidateId},{status:400})
        
        const resume = formData.get('resume') as File | null; // Assuming resume is a file
        const isAlreadyExist = await db.select().from(CandidateInfo).where(and(eq(CandidateInfo.candidateId,candidateId),eq(CandidateInfo.candidateId,parseInt(candidateId))))
      if(isAlreadyExist.length>0) return NextResponse.json({message:"You can't submit more than once. Skipping ..."},{status:200})
        if (!gender || !candidateId || !highestEducation || !studyField || !mostRelevantExperience) {
            throw new Error("Mandatory fields are missing: Gender, Candidate ID, Highest Education, Study Field, or Most Relevant Experience.");
        }
        
        if(resume){ 
            const response=await uploadArrayBuffer(resume!,resume?.name!)
        await db.insert(Resume).values({
            //@ts-nocheck
            name:"resume!.name! as string",
size:resume!.size! as number,
            candidateId:candidateId!,
        
            type:resume?.type! as string,
            url:response!.requestId as string,
        })}
        await db.insert(CandidateInfo).values({
           
            assessmentId:assessmentsId! as number,
            highestEducation:highestEducation,
            studyField:studyField,
            mostRelevantExperience:mostRelevantExperience,
            yearOfExperience:yearOfExperience,
            gender:gender,
            birthDate:birthDate,
            
            countryOfResidence:countryOfResidence,
            countryOfOrigin:countryOfOrigin,
            firstLanguage:firstLanguage,
            
            candidateId

        })
        await db.update(Candidates).set({currentStep:"finished"}).where(eq(Candidates.id,candidateId))

        return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
    }