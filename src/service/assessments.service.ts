import db from "@/db"
import { Assessments, Candidates, MultipleChoicesQuestions, Options, Questions, SelectMultipleChoicesQuestions, SelectTests, Tests } from "@/db/schema/schema"
import { and, count, eq, or } from "drizzle-orm"
import { prepareMultipleQuestions, prepareOptions, prepareTest } from "./prepare.service"
import { unstable_cache } from "next/cache"
import { option } from "framer-motion/client"
import { v4 as uuidv4, } from 'uuid';
export const createNewAssessment=async({name,companyId,jobLocation,jobRole,workArrangement}:{ name:string,companyId:number,jobLocation:string,jobRole:string,workArrangement:string})=>{

    const id=await db.insert(Assessments).values({
uniqueId:uuidv4(),
        name,
        companyId,
        jobLocation,
        jobRole,
        workArrangement
        
    
    }).returning({id:Assessments.id})
    return id[0].id
}
export const getTestsFromAssessmentId=async({assessmentId}:{assessmentId:number})=>{
try{
    console.log(assessmentId,'assessmentId');
    
    
    const arrays= await db.select().from(Tests).where(eq(Tests.assessmentsId,assessmentId))
    const assessment=await db.select().from(Assessments).where(eq(Assessments.id,assessmentId))
    
    return {
        tests:arrays[0],
        assessment}

}
catch(err:any){
  console.log(err.message,'error');
  
   return []
}
   
}
export const createNewTest=async({title,description,assessmentId,questionsCount,testType,duration}:any)=>{
try{ 
    const id=await db.insert(Tests).values({
        title,
        description,
        testType,
        generator:"ai",
      
        
        duration:parseInt(duration as string),
        questionsCount:parseInt(questionsCount as string),

        assessmentsId:parseInt(assessmentId as string),

    }).returning({id:Tests.id})
    return id[0].id

}catch(err:any){
    throw new Error(err.message)}
}
export const createQuestionAndOptions = async ({
    testId,
    question,
    options,
    correctOption,
    index
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
    index: number
     // Using numbers for options
  }) => {
    try {
      
      
      // Insert the question into the `MultipleChoicesQuestions` table
      const insertedQuestion = await db
        .insert(MultipleChoicesQuestions)
        .values({
          question: question.title,
          description: question.description,
          type: question.type,
          background: question.backgroundColor,
          label: question.labels,
          data: question.data,
          order: index+1,
          
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
        options[optionNumber] = option.option; // Assuming option.option contains the option text
  
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
export const getTestAndQuestions = async ({ id }: { id: number }) => {
  try {
    
  
  // Fetch the test data
  const test = await db.select().from(Tests).where(eq(Tests.assessmentsId, id)).then((data) => data[0]);
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

export const createNewQuestion = async ({question,type,assessmentId,description,duration}:{question:string,type:string,assessmentId:number,description:string,duration:number}) => {
  try{
    const questionCount= await db.select({ count: count() }).from(Questions).where(eq(Questions.assessmentId,assessmentId));

        await db.insert(Questions).values({
      question,
      assessmentId,
      duration:300,
      description,
      type,order: questionCount[0].count+1

    })
  }
  catch(e:any){
    throw new Error(e.message)
  }
}
export const getQuestionsFromAssessmentId = async ({assessmentId}:{assessmentId:number}) => {
  try{
    const questions = await db.select().from(Questions).where(eq(Questions.assessmentId,assessmentId))
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
export const getAssesssmentRelatedInfo = async ({assessmentId,userId}:{assessmentId:number,userId:number}) => {
  
  const assessment = await db.select().from(Assessments).where(and(eq(Assessments.id,assessmentId),eq(Assessments.companyId,userId)))
  const tests = await db.select().from(Tests).where(eq(Tests.assessmentsId,assessment[0].id))
  const candidates = await db.select().from(Candidates).where(eq(Candidates.assessmentId,assessment[0].id))

  
  return {assessment:assessment[0],tests:tests[0],candidates}
}
