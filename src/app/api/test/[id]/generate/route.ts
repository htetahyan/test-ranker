import db from "@/db"
import { MultipleChoicesQuestions, Tests } from "@/db/schema/schema"
import { createQuestionAndOptions } from "@/service/assessments.service"
import { main } from "@/service/openai.service"
import { count, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async (req:NextRequest, props:{params: Promise<{id:string}>}) => {
  const params = await props.params;
  {
      try{
          const body=await req.json()
          const id=parseInt(params.id)
          const {prompt,questionsCount}=body
          console.log(prompt,questionsCount,id);
          
          if(!id){
              throw new Error("Please provide id")
          }
          const test=await db.select().from(Tests).where(eq(Tests.assessmentsId,id))
          const newPrompt=generatePrompt(prompt,test[0]?.description,questionsCount)
          const array= await main(newPrompt)
          const multipleChoiceQuestionsCount=await db.select({ count: count() }).from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,test[0]?.id));
          await array.map((question:any,index:number)=>{return createQuestionAndOptions({testId:test[0]?.id,question:question.question,answer:question.answer,options:question.options,correctOption:question.solution,order:multipleChoiceQuestionsCount[0].count+index})})

          return NextResponse.json({message:"success"},{status:201})
      }catch(err:any){
        console.log(err);
        
          return NextResponse.json({message:err.message},{status:500})
      }
  }
}
const generatePrompt = (prompt:string,content: string, questionsCount: number) => ` Please create exactly ${questionsCount} multiple-choice questions for the following Job description:
according to this prompt ${prompt} and the following content:
      [${content}].
    
      Each question should be structured as follows:  
      [{
        "question": {
          "title": "What is the primary goal of the project?",
          "description": "The company is engaging in a complex mission that involves the coordination of multiple teams, risk assessment, and high-level decision-making. The project involves critical operations that require careful monitoring and management to ensure successful outcomes.",
          "type": "multiple-choice"
        },
        "options": {
          "1": "Coordinating between teams.",
          "2": "Risk mitigation.",
          "3": "Achieving long-term objectives.",
          "4": "All of the above."
        },
        "solution": 4
      },
      {
        "question": {
          "title": "Chart-Based Analysis of Project Performance",
          "description": "Based on the performance metrics provided in the chart, which factor plays the most significant role in ensuring the overall success of the project, and why?",
          "type": "pie",
          "labels": ["Team Coordination", "Risk Management", "Timely Delivery"],
          "data": [40, 30, 30],
          "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        },
        "options": {
          "1": "Team Coordination ensures streamlined processes across departments.",
          "2": "Risk Management is critical in avoiding costly delays.",
          "3": "Timely Delivery is essential to meeting customer expectations.",
          "4": "All of the above are important, but a combination of Team Coordination and Timely Delivery is most critical."
        },
        "solution": 4
      },
      // Add more complex questions here exactly ${questionsCount}
      ]
        *above is the example response for essay type question and chart type question. You must response in above format without extra things like command and any other things.
    
      * Ensure each question has a medium long and complex options.

      * Questions should vary in difficulty, adjusting to the job description.
      * At least 3 chart question must be included in 10 questions with proper labels, data, and backgroundColor.
      * chart question should not simple like you can answer just by looking at chart.Make it complicate and use math.
      * you can add more than three labels and data and backgroundColor, prefer more complicated.
      * when you make a chart type question, make sure it must related to chart don't make non sense question and add chart type without proper explanation in title and description, also don't make question and description that options is too obvious to choose add some calculation or complex logic.
      * for example don't ask kind of question that you can immediately know one you look at chart. example like this "Consider the following data represented in a bar chart: Training Effectiveness (40%), Policy Understanding (30%), Program Adoption (20%), and General Satisfaction (10%). Determine the area with the most significant impact." that too basic and too simple.
      * The question types can be multiple-choice, pie, line, bar, or polar.
      * Avoid simple descriptions or directly quoting the job description; instead, focus on critical thinking and analytical aspects.
      * You may mention the company name if it appears in the description.
`;