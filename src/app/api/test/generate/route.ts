  import db from "@/db"
import { Tests } from "@/db/schema/schema"
import { createNewTest, createQuestionAndOptions } from "@/service/assessments.service"
import { main } from "@/service/openai.service"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
try {
    

    const body=await req.json()
    const {title,description,duration,questionsCount,testType,isFree,assessmentId}=body
    if(!title || !description || !duration || !questionsCount || !testType  || !assessmentId){
        throw new Error("Please provide all fields")
    }

   
  
   const prompt = 
  `
  Please create ${questionsCount} detailed and complex multiple-choice questions for the this Job description
  [${description}].
  . Each question should be structured as follows:  
  [{  
    "question": "<div class='p-4 bg-gray-100 rounded-lg shadow-md'><h2 class='text-2xl font-bold mb-2'>As a Business Analyst, how would you gather requirements and analyze data to design an effective marketing campaign for a new product launch?</h2><p class='mb-4'>Your team is preparing to launch a new product and aims to create a targeted marketing campaign to reach potential customers. As the Business Analyst, it is your responsibility to gather requirements and analyze data to design an effective campaign.</p><section class='mb-4'>Based on your knowledge and best practices, what would be the most crucial step in designing an effective marketing campaign?</section></div>", 
    "options": {  
      "1": "Conducting market research.",  
      "2": "Identifying target demographics.",  
      "3": "Measuring campaign success.",  
      "4": "None of the above."  
    },  
    "solution": 1 
  },//others questions]
  above array is a sample response.
  Ensure the response is a valid JavaScript array and that the 'question' field contains a html string wrapped in double quotes.
  questions should be not simple.
  When you generating question you can refer company name  and decide the question level based on it .
   Make sure not to include any leading numbers or extra formatting especially do not generate like this [1:{},2:{}] ,this is only correct format [{},{}].
  Avoid adding comments //  or extra formatting return . I will use JSON.parse to parse the response, so make sure that the response is formatted correctly.
  There should be four options.
 **Chart UI Requirements:**
- Include a chart (either pie or bar chart) in **at least one out of every five questions**.
-chart ui must be interactive a little bit. prefer more complicate ui.
-column chart are prefered.
- The chart should be styled using **Tailwind CSS only**. Do not use images, JavaScript, SVG, or canvas. Use only HTML elements like div and text tags. Do not forgot to include the chart in the question and must be stylish and modern looks.
  
**Pie Chart:**
- Use div tags and Tailwind CSS classes (e.g., 'w-[50%] h-[50%] rounded-full' for segments).
- Segments should represent “Correct,” “Incorrect,” and “Skipped” answers.
- Different sections should be styled with Tailwind classes (e.g., 'bg-red-500' for incorrect, 'bg-green-500' for correct, 'bg-yellow-500' for skipped).

**Bar Chart:**
- Include at least two labels for data points (e.g., 'Label 1' and 'Label 2').
- Use Tailwind classes (e.g., 'bg-blue-500' and 'bg-green-500') to distinguish bars.
- The chart should reflect data trends over time.
  
**Chart Examples:**
- Pie charts should use div elements with widths and heights based on percentages (e.g., 'w-[50%] h-[50%] rounded-full').
- Bar charts should use flexbox or grid layout for organization (e.g., 'flex flex-col items-center').
- Apply text-center, padding, margin, and responsive classes for legibility (e.g., 'p-4', 'm-2', 'text-xl').

Ensure all elements of the questions, including the pie charts and bar charts, are styled with a modern and sleek design using **Tailwind CSS**.

  Style all elements, including the piechart or chart and others, using a modern and sleek design with Tailwind CSS..Escaped Backslashes: Each newline character (\n) and other control characters should be escaped (i.e., \\n).
  `  
/*     const  data= await createNewTest({title,description,duration,questionsCount,testType,isFree})
 */    const array=await main(prompt) as any

const testId=await createNewTest({title,description,assessmentId,duration,questionsCount,testType,isFree} as any)
 console.log(array);


    await array.map((question:any,index:number)=>{return createQuestionAndOptions({testId,question:question.question,answer:question.answer,options:question.options,correctOption:question.solution,index})})

    
    return NextResponse.json({message:'success',},{status:201})
}
    catch (error:any) {
    return NextResponse.json({message:error.message},{status:500})
    }

}