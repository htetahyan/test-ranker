import db from "@/db"
import { Answers, Candidates, File } from "@/db/schema/schema"
import { uploadArrayBuffer } from "@/service/storage.service"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{{
    try{
const form=await req.formData()
const candidateUniqueId=form.get('candidateUniqueId') as string
const answer=form.get('answer') as string ?? ''
const questionId=parseInt(form.get('questionId') as string)!
const file=form.get('file') as File | null
if(!candidateUniqueId  || !questionId) return NextResponse.json({message:"invalid request "+candidateUniqueId+' '+questionId},{status:400})
const candidate=await db.select().from(Candidates).where(eq(Candidates.generatedUrl,candidateUniqueId!))
console.log(questionId,candidate[0].id);

const alreadyAnswered=await db.select().from(Answers).where(and(eq(Answers.candidateId,candidate[0].id),eq(Answers.questionId,questionId)))

if(alreadyAnswered.length>0) return NextResponse.json({message:"this question has been answered"},{status:200})

    await db.insert(Answers).values({
        candidateId:candidate[0].id,
        type:file? 'file':'essay',
        content:answer,
        questionId,
    
    })
    if(file){
        const response=await uploadArrayBuffer(file!,file?.name!)
        await db.transaction(async (tx) => {
        const uploadedFile=await tx.insert(File).values({name:file!.name!,size:file!.size! ?? 2048,type:file!.type!,url:response.requestId!}).returning().then((data)=>data[0])
        await tx.update(Answers).set({fileId:uploadedFile.id}).where(and(eq(Answers.candidateId,candidate[0].id),eq(Answers.questionId,questionId)))
        })
        }

return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}}