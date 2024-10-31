import parse from 'html-dom-parser';
import { main } from './openai.service';
import { createNewTest, createQuestionAndOptions } from './assessments.service';
import { NextResponse } from 'next/server';
import { MultipleChoicesQuestions } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';
import db from '@/db';
import { redirect } from 'next/navigation';

export const extractTextsFromHtml = (html: string) => {
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
  export const generate = async ({
    prompt,
    title,
    duration,
    
    questionsCount,
  assessmentId,
    versionId,
  }: {
    prompt: string;
    assessmentId:number;
    duration: number;
    questionsCount: number;
   title: string;
    versionId: number;
  }) => {
    try {
      const array = await main(prompt) as any;
  
      // Create a new test and check for potential errors.
      const testId = await createNewTest({
        description: prompt,title,
        versionId,
        assessmentId,
        duration,
        questionsCount,
     
      });
  
      // Retrieve the count of multiple-choice questions once.
      const multipleChoiceQuestionsCount = await db
        .select({ count: count() })
        .from(MultipleChoicesQuestions)
        .where(eq(MultipleChoicesQuestions.testId, testId));
  
      const baseCount = multipleChoiceQuestionsCount[0]?.count || 0;
  
      // Using Promise.all to ensure all questions are processed concurrently.
      await Promise.all(
        array.map((question: any, index: number) =>
          createQuestionAndOptions({
            testId,
            question: question.question,
            answer: question.answer,
            options: question.options,
            correctOption: question.solution,
            order: baseCount + index + 1,
          })
        )
      );
  return NextResponse.json({ message: 'success' }, { status: 201 });
      // Respond with a success message if all steps are completed.
    } catch (error: any) {
      console.error("Error in generating questions:", error.message);
 throw new Error(error.message);
    }

  };
  