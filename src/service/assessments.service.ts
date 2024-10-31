import db from "@/db"
import { Assessments, Candidates, MultipleChoicesQuestions, Options, Questions, SelectAssessments, SelectMultipleChoicesQuestions, SelectTests, Tests, VersionAndTest, versions } from "@/db/schema/schema"
import { and, count, eq, or } from "drizzle-orm"
import { prepareMultipleQuestions } from "./prepare.service"
import { unstable_cache } from "next/cache"
import { option } from "framer-motion/client"
import { v4 as uuidv4, } from 'uuid';
import { main } from "./openai.service"
import { extractTextsFromHtml, generate } from "./generate.service"
import { redirect } from "next/navigation"
export const createNewAssessment=async({name,companyId,jobRole}:{ name:string,companyId:number,jobRole:string})=>{

    const id=await db.insert(Assessments).values({

        name,
        companyId,
       

        jobRole,
       
        
    
    }).returning({id:Assessments.id})
    const version=await db.insert(versions).values({assessmentId:id[0].id,name:'default',isPublished:false,uniqueId:uuidv4()}).returning({id:versions.id})
    return {id:id[0].id,versionId:version[0].id}
}
export const getTestsFromAssessmentId=async({assessmentId,versionId}:{assessmentId:number,versionId:number})=>{
try{
    console.log(assessmentId,'assessmentId');
    const  testId=await getGenerateTypeTestFromVersionAndTest({versionId,assessmentId})
    
    const arrays=await db.select().from(Tests).where(eq(Tests.id,testId))
    const assessment=await db.select().from(Assessments).where(eq(Assessments.id,assessmentId))
    console.log(arrays,'arrays');
    
    return {
        tests:arrays[0],
     
        
        assessment}

}
catch(err:any){
  console.log(err.message,'error');
  
   return []
}
   
}
const createVersionAndTest=async({versionId,testId,assessmentId}:{testId:number,versionId:number,assessmentId:number})=>{
  const isExist = await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.versionId,versionId),eq(VersionAndTest.testId,testId)))
  if(isExist.length>0) return
  await db.insert(VersionAndTest).values({testId,versionId,assessmentId})
}
export const createNewTest=async({description,questionsCount,duration,versionId,title,assessmentId}:{assessmentId:number,title:string,description:string,questionsCount:number,duration:number,versionId:number})=>{
try{ 
  
    const id=await db.insert(Tests).values({
        description,
        testType:'GENERATED',
        generator:"ai",
        title,
      
        
        duration:duration,
        questionsCount:questionsCount,


    }).returning({id:Tests.id})
    await createVersionAndTest({versionId,testId:id[0].id,assessmentId})
    return id[0].id

}catch(err:any){
    throw new Error(err.message)}
}
export const  getVersionAndTest=async({testId,versionId}:{testId:number,versionId:number})=>{
   const versionAndTest=await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.testId,testId),eq(VersionAndTest.versionId,versionId)))
   return versionAndTest[0]
}
export const getGenerateTypeTestFromVersionAndTest=async({versionId,assessmentId}:{versionId:number,assessmentId:number})=>{
  
    const tests=await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.versionId,versionId),eq(VersionAndTest.type,'GENERATED'),eq(VersionAndTest.assessmentId,assessmentId)))
    return tests?.[0]?.testId?? null

}
export const createQuestionAndOptions = async ({
    testId,
    question,
    options,
    correctOption,
    order
  }: {
    testId: number;
    question: {
      title: string;
    description: string;
    type: string;
  labels?: string[];
  data?: string[];
  backgroundColor?: string[];

};
    answer: string;
    options: { [key: string]: string }; // Use object type for options
    correctOption: 1 | 2 | 3 | 4;
    order: number
     // Using numbers for options
  }) => {
    try {
      
      
      // Insert the question into the `MultipleChoicesQuestions` table
      const insertedQuestion = await db
        .insert(MultipleChoicesQuestions)
        .values({
          testType: "GENERATED",
          question: question.title,
          description: question.description,
          type: question.type,
          background: question.backgroundColor,
          label: question.labels,
          data: question.data,
          order: order,
          
          testId,
        })
        .returning({ id: MultipleChoicesQuestions.id });
  
      console.error(options, correctOption);
    
      const questionId = insertedQuestion[0].id; // Get the newly created question ID
    
      // Convert options object to an array
      const optionsArray = Object.values(options);
    
      // Loop through the options and insert them into the `Options` table
      for (let i = 0; i < optionsArray.length; i++) {
        console.log('isCorrect', i + 1 === correctOption,i+1,correctOption);
        
        await db.insert(Options).values({
          multipleChoicesQuestionId: questionId,
          order: i + 1,
          option: optionsArray[i], // Insert option content
          content: optionsArray[i], // Link the option to the question
          isCorrect: i + 1 === correctOption, // Mark the correct option (i + 1 because index is 0-based)
        });
      }
    } catch (err: any) {
      console.log(err.message);
      
      throw new Error(err.message);
    }
  };
 

  export const getAllMultipleChoiceAndOptions = async ({ id }: { id: number }): Promise<MultipleChoiceAndOptions[]> => {
  
    // Fetch all multiple choice questions
    const multipleChoices = await db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId, id));
    const test = await db.select().from(Tests).where(eq(Tests.id, id));
  
    // Prepare to store the result
    const result: MultipleChoiceAndOptions[] = [];
  
    // Sort multipleChoices by question.order (assuming it's a number)
    const sortedQuestions = multipleChoices.sort((a, b) => a.order - b.order);
  
    for (const question of sortedQuestions) {
      // Fetch options for the current question
      const optionsData = await db
        .select()
        .from(Options)
        .where(eq(Options.multipleChoicesQuestionId, question.id));
  
      // Prepare options object
      const options: { [key: number]: string } = {};
      let solution: 1 | 2 | 3 | 4 | undefined;
  
      optionsData.forEach(option => {
        // Map option ID to its corresponding number
        const optionNumber = option.id; // Assuming option.id is 1, 2, 3, or 4
        options[optionNumber] = option.content; // Assuming option.option contains the option text
  
        // Determine if the option is correct and set it as the solution
        if (option.isCorrect) {
          solution = optionNumber as 1 | 2 | 3 | 4; // Type assertion to ensure it's one of the expected values
        }
      });
  
      // Push the formatted question and its options into the result array
      result.push({
        question: question,
        test: test[0],
        options: options as { 1: string; 2: string; 3: string; 4: string }, // Ensure correct type
        solution: solution as 1 | 2 | 3 | 4, // Ensure solution is correctly typed
      });
    }
  
    return result;
  };
  

export type MultipleChoiceAndOptions = {
  question: SelectMultipleChoicesQuestions;
  options: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
  solution: 1 | 2 | 3 | 4;
  test:SelectTests
};
export const getTestAndQuestions = async ({ id, versionId }: { id: number, versionId: number }) => {
  try {
     const testId=await getGenerateTypeTestFromVersionAndTest({versionId,assessmentId:id})
  console.log(testId,'testId',id,versionId);
  
  // Fetch the test data
  const test = await db.select().from(Tests).where(eq(Tests.id, testId)).then((data) => data[0]);
if(!test){
 throw new Error("No test created for this assessment yet")
} 
  // Fetch the multiple choice questions and options
  const multipleChoicesAndOptions = await prepareMultipleQuestions.execute({ testId: test.id });

  // Create a map to store questions and their options
  const questionMap = new Map();

  // Iterate through each entry and map them to the question and its options
  multipleChoicesAndOptions.forEach((item: any) => {
    const questionId = item.MultipleChoicesQuestions.id;

    // If the question already exists in the map, add the option to it
    if (questionMap.has(questionId)) {
      const questionData = questionMap.get(questionId);
      questionData.options.push({
        id: item.Options.id,
        option: item.Options.option,
        
        order: item.Options.order,

        isCorrect: item.Options.isCorrect,
        content: item.Options.content,
        createdAt: item.Options.createdAt,
        updatedAt: item.Options.updatedAt,
      });
    } else {
      // If the question doesn't exist, create a new entry
      questionMap.set(questionId, {
       question:{ id: item.MultipleChoicesQuestions.id,
        description: item.MultipleChoicesQuestions.description,
        type: item.MultipleChoicesQuestions.type,
        label: item.MultipleChoicesQuestions.label,
        data: item.MultipleChoicesQuestions.data,
        background: item.MultipleChoicesQuestions.background,
        question: item.MultipleChoicesQuestions.question,
        testId: item.MultipleChoicesQuestions.testId,
        order: item.MultipleChoicesQuestions.order,
        createdAt: item.MultipleChoicesQuestions.createdAt,
        updatedAt: item.MultipleChoicesQuestions.updatedAt,},
        options: [
          {
            id: item.Options.id,
            option: item.Options.option,
            isCorrect: item.Options.isCorrect,
            content: item.Options.content,
            order: item.Options.order,
            createdAt: item.Options.createdAt,
            updatedAt: item.Options.updatedAt,
          },
        ],
      });
    }
  });

  // Convert the question map back into an array
  const multipleChoiceQuestions = Array.from(questionMap.values());

  // Format the final structure
  const formattedData = {
    test : test ?? [], // Test data
    multipleChoiceQuestions: multipleChoiceQuestions ?? [], // Multiple choice questions with options
  };
console.log(formattedData);

  return formattedData;}
  catch(err:any){
    throw new Error(err.message)
  }
}
type Option={
  option:string,
  id:number,
  isCorrect:boolean,

}
const updateQuestionAndOptions = async (
  {question,id,options}:{
    question:string,
    id:number,
    options:Option[]
  }
)=>{

  try{

    const updatedQuestion = await db.update(MultipleChoicesQuestions).set({
      question
    }).where(eq(MultipleChoicesQuestions.id,id))
  
  options.forEach(async (option)=>{

    await db.update(Options).set({
      content:option.option,
      isCorrect:option.isCorrect
  }).where(eq(Options.id,option.id))})
}catch(err:any){
  throw new Error(err.message)
}
}

export const createNewQuestion = async ({versionId,question,type,assessmentId,description,duration}:{versionId:number,question:string,type:string,assessmentId:number,description:string,duration:number}) => {
  try{
    const questionCount= await db.select({ count: count() }).from(Questions).where(eq(Questions.versionId,versionId));
      console.log(questionCount)
    const newQuestion=    await db.insert(Questions).values({
          
      question,
      versionId,
      duration,
      description,
      type,order: questionCount[0].count+1

    })
      console.log(newQuestion,'newQuestion')
      return newQuestion
  }
  catch(e:any){
      console.log(e.meaage)
    throw new Error(e.message)
  }
}
export const getQuestionsFromVersionId = async ({versionId}:{versionId:number}) => {
  try{
    const questions = await db.select().from(Questions).where(eq(Questions.versionId,versionId))
    return questions
  }
  catch(e:any){
    throw new Error(e.message)
  }
}
export const editQuestionAndOptions = async ({question,id,options}:{
  question:string,
  id:number,
  options:Option[]
})=>{

  await updateQuestionAndOptions({question,id,options})
}
export const getAssesssmentRelatedInfo = async ({versionId,assessmentId,userId}:{versionId:number,assessmentId:number,userId:number}) => {
  
  const assessment = await db.select().from(Assessments).where(and(eq(Assessments.id,assessmentId),eq(Assessments.companyId,userId)))

 /* const tests = await versionAndTest.map(async (item) => {

    const test = await db.select().from(Tests).where(eq(Tests.id, item.testId))
    return test[0]
  })*/
  const candidates = await db.select().from(Candidates).where(eq(Candidates.versionId,versionId))
 const versionArray=await db.select().from(versions).where(eq(versions.assessmentId,assessmentId))
  return {assessment:assessment[0],candidates,versionId,version:versionArray}
}
export const isVersionAndAssessmentExist = async ({versionId,assessmentId}:{versionId:number,assessmentId:number}) => {
  
  const assessment = await db.select().from(Assessments).where(eq(Assessments.id,assessmentId))
 const version=await db.select().from(versions).where(eq(versions.id,versionId))
 const isIdentical=assessment[0].id===version[0].assessmentId
return isIdentical 
}
export const generateMultipleChoiceQuestions = async ({assessment,content,questionsCount,versionId,duration,type,url}:{url:string,type:string,duration:number,versionId:number,assessment:SelectAssessments,content:string,questionsCount:number}) => {
  const assessmentId=assessment?.id
  const versionCount= await db.select({ count: count() }).from(versions).where(eq(versions.assessmentId,assessmentId));
  const version=await db.insert(versions).values({assessmentId,name:`Version ${versionCount[0].count+1}`,isPublished:false,
  }).returning({id:versions.id})
  let desc;
  if(type==='URL'){
    const response=await fetch(url)
    const data=await response.text()
    console.log(data);
     desc= extractTextsFromHtml(data)
  }else{
    desc=content}
  const prompt=generatePrompt(desc,questionsCount)
   await generate({prompt,assessmentId,duration,questionsCount:questionsCount,versionId:version[0].id,title:`Generated`})
 redirect(`/assessment/${assessmentId}/${version[0].id}`)
  
}
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