  import db from "@/db"
import { MultipleChoiceAnswers, MultipleChoicesQuestions, Options, Tests } from "@/db/schema/schema"
import { createNewTest, createQuestionAndOptions } from "@/service/assessments.service"
import { main } from "@/service/openai.service"
import { count, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import parse from 'html-dom-parser';

export const POST=async(req:NextRequest)=>{
try {
    

    const body=await req.json()
    const {title,description,duration,questionsCount,testType,assessmentId,generateBy,pdf,link}=body
    if(!title  || !duration || !questionsCount || !testType  || !assessmentId ||!generateBy){
        throw new Error("Please provide all fields")
    }
    
    const isTestAlreadyExist=await db.select().from(Tests).where(eq(Tests.assessmentsId,assessmentId))

    if(isTestAlreadyExist[0]?.id){
      await deleteAll(isTestAlreadyExist)

    
    }

   
  switch(generateBy){
    case "job description":
      const prompt = generatePrompt(description,questionsCount);
    
    return generate({prompt,title,description:description,assessmentId,duration,questionsCount,testType})

    break;
  case "pdf":
    const pdfPrompt = generatePrompt(pdf,questionsCount)
  return generate({prompt:pdfPrompt,title,description:pdf,assessmentId,duration,questionsCount,testType})
break;
case"link":
 const response=await fetch(link)
 const data=await response.text()
 console.log(data);
 const text= extractTextsFromHtml(data)
console.log(text);

 
 const linkPrompt = generatePrompt(text,questionsCount)
return generate({prompt:linkPrompt,title,description:text,assessmentId,duration,questionsCount,testType})
  }

  
   
}
    catch (error:any) {
    return NextResponse.json({message:error.message},{status:500})
    }

}
const deleteAll=async(isTestAlreadyExist:any)=>{
 
    const multipleChoicesQuestions = await db
      .select()
      .from(MultipleChoicesQuestions)
      .where(eq(MultipleChoicesQuestions.testId, isTestAlreadyExist[0].id));
  
    await db.transaction(async (tx) => {
      // Delete related MultipleChoiceAnswers first
      for (const m of multipleChoicesQuestions) {
        await tx.delete(MultipleChoiceAnswers)
          .where(eq(MultipleChoiceAnswers.optionId, m.id));
      }
  
      // Now delete the Options
      for (const m of multipleChoicesQuestions) {
        await tx.delete(Options).where(eq(Options.multipleChoicesQuestionId, m.id));
      }
  
      // Delete MultipleChoicesQuestions
      await tx.delete(MultipleChoicesQuestions)
        .where(eq(MultipleChoicesQuestions.testId, isTestAlreadyExist[0].id));
  
      // Finally, delete the test itself
      await tx.delete(Tests).where(eq(Tests.id, isTestAlreadyExist[0].id));
    });
  
  
}
const generate=async({prompt,title,description,assessmentId,duration,questionsCount,testType}:{prompt:string,title:string,
  description:string,assessmentId:string,duration:string,questionsCount:string,testType:string
})=>{
  const array=await main(prompt) as any
  
  
  const testId=await createNewTest({title,description,assessmentId,duration,questionsCount,testType} as any)
  const multipleChoiceQuestionsCount=await db.select({ count: count() }).from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,testId));
  
    await array.map((question:any,index:number)=>{return createQuestionAndOptions({testId,question:question.question,answer:question.answer,options:question.options,correctOption:question.solution,order:multipleChoiceQuestionsCount[0].count===0?multipleChoiceQuestionsCount[0].count+index+1:multipleChoiceQuestionsCount[0].count+index})})
  
    
    return NextResponse.json({message:'success',},{status:201})
}
const extractTextsFromHtml = (html: string) => {
  const dom = parse(html);

  const extractText = (dom: any): string => {
    if (Array.isArray(dom)) {
      return dom.map(extractText).join(''); // Traverse array of elements
    }
    if (dom.type === 'text') {
      return dom.data; // Extract text node content
    }
    return dom.children ? extractText(dom.children) : ''; // Recurse for children
  };

  return extractText(dom);
};
const generatePrompt = (content: string, questionsCount: number) => ` Please create exactly ${questionsCount}  multiple-choice questions for the following Job description:
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
      // Add more complex questions not more than ${questionsCount}
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