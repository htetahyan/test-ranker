import { getAllMultipleChoiceAndOptions, getTestAndQuestions } from "@/service/assessments.service";
import { data } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest, props:{params: Promise<{id:string}>}) => {
    const params = await props.params;
    try {
        const id= parseInt(params.id)
        
const multipleChoiceQuestionsAndOptions=await getTestAndQuestions({id})
return NextResponse.json({data:multipleChoiceQuestionsAndOptions,message:"success"},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}