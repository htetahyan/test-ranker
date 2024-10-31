import db from "@/db"
import { Candidates, MultipleChoiceAnswers, Options } from "@/db/schema/schema"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
    try{
        const body=await req.json()
        const {answers,candidateId}=body
        const candidate= await db.select().from(Candidates).where(eq(Candidates.generatedUrl,candidateId))
        const alreadyAnswered= await db.select().from(MultipleChoiceAnswers).where(and(eq(MultipleChoiceAnswers.candidateId,candidate[0].id)))

/*         if(alreadyAnswered.length>0) return NextResponse.json({message:"Test is Already answered,skipping ..."},{status:200})
 */        answers.map(async(id:number)=>{
            if(!id || candidate.length==0 ) return
            const alreadyAnswered= await db.select().from(MultipleChoiceAnswers).where(and(eq(MultipleChoiceAnswers.candidateId,candidate[0].id),eq(MultipleChoiceAnswers.optionId,id)))
            if(alreadyAnswered.length>0) throw new Error("Already answered")

            const options= await db.select().from(Options).where(eq(Options.id,id))
            await db.insert(MultipleChoiceAnswers).values({
              candidateId:candidate[0].id,
              multipleChoicesQuestionId:options[0].multipleChoicesQuestionId,
              isCorrect:options[0].isCorrect,
              optionId:id
            })
        })
await db.update(Candidates).set({currentStep:'info'}).where(eq(Candidates.generatedUrl,candidateId))
        return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){
        return NextResponse.json({message:err.message},{status:500})
    }}