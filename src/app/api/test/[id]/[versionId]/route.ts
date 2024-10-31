import { getAllMultipleChoiceAndOptions, getTestAndQuestions } from "@/service/assessments.service";
import { data } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest, props:{params: Promise<{id:string,versionId:string}>}) => {
    const params = await props.params;
    try {
        const id= parseInt(params.id)
        const versionId=parseInt(params.versionId)
        
const multipleChoiceQuestionsAndOptions=await getTestAndQuestions({id,versionId})
return NextResponse.json({data:multipleChoiceQuestionsAndOptions,message:"success"},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}