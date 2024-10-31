import db from "@/db";
import { MultipleChoiceAnswers, MultipleChoicesQuestions, Options, Tests } from "@/db/schema/schema";
import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, props: { params: Promise<{ candidateId: string }> }) => {
    try {
        const { candidateId } = await props.params;

        // Validate candidateId
        if (!candidateId) return NextResponse.json({ message: "invalid request " + candidateId }, { status: 400 });

        // Query to fetch multiple choice answers, questions, and tests
        const multipleChoicesAnswers = await db
            .select()
            .from(MultipleChoiceAnswers)
            .leftJoin(MultipleChoicesQuestions, eq(MultipleChoicesQuestions.id, MultipleChoiceAnswers.multipleChoicesQuestionId))
            .orderBy(asc(MultipleChoicesQuestions.order))
            .leftJoin(Tests, eq(Tests.id, MultipleChoicesQuestions.testId))
            .leftJoin(Options, eq(Options.id, MultipleChoiceAnswers.optionId))
            .where(eq(MultipleChoiceAnswers.candidateId, parseInt(candidateId)));

        console.log(multipleChoicesAnswers, 'multipleChoicesAnswers');

        // Transform data into the desired format
        const transformedData: Record<string, any> = {};

        multipleChoicesAnswers.forEach(item => {
            const testId = item?.Tests?.id;

            // Initialize test object if not exists
            if (!transformedData[testId!]) {
                transformedData[testId!] = {
                    ...item.Tests,
                    multipleChoiceQuestions: [],
                };
            }

            // Push multiple choice question and its answers
            const questionWithAnswers = {
                ...item.MultipleChoicesQuestions,
                multipleChoiceAnswers: item.MultipleChoiceAnswers,
                options: []  // Initialize an options array
            };

            // Add the option to the question if it exists
            if (item.Options) {
                questionWithAnswers.options.push(item?.Options as never);
            }

            transformedData[testId!].multipleChoiceQuestions.push(questionWithAnswers);
        });

        // Convert object to array
        const result = Object.values(transformedData);

        // Return the transformed result
        return NextResponse.json({ message: "success", data: result }, { status: 200 });
    } catch (error: unknown) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: "invalid request " }, { status: 400 });
    }
};
