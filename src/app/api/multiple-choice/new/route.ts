import db from "@/db"
import { MultipleChoicesQuestions, Options, SelectMultipleChoicesQuestions, SelectOptions, Tests } from "@/db/schema/schema"
import { count, eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
    try{
        const body=await req.json()
const {question,description,testId,options}     =body as SelectMultipleChoicesQuestions & {options:{content:string,isCorrect:boolean}[]}
console.log(question,description,testId,options);
const order=await db.select({ count: count() }).from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,testId));
const multipleChoicesQuestionId=await db.insert(MultipleChoicesQuestions).values({question,type:'essay',order:order[0].count+1,description,testId,testType:'multiple-choice'}).returning({id:MultipleChoicesQuestions.id}).then((data)=>data[0].id)
multipleChoicesQuestionId && options.map(async(option,i)=>{
    await db.insert(Options).values({multipleChoicesQuestionId,order:i+1,content:option.content,isCorrect:option.isCorrect,option:''}).returning({id:Options.id}).then((data)=>data[0].id)
})     
await db.update(Tests).set({questionsCount:order[0].count+1}).where(eq(Tests.id,testId))
return NextResponse.json({message:"success"},{status:201})
    }catch(err:any){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}