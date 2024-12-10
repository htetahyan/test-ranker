import db from "@/db";
import {
  Assessments,
  MultipleChoiceAnswers,
  MultipleChoicesQuestions,
  Options,
  rateLimit,
  SelectTests,
  Tests,
  VersionAndTest,
  versions,
} from "@/db/schema/schema";
import {
  createNewTest,
  createQuestionAndOptions,
  getGenerateTypeTestFromVersionAndTest,
} from "@/service/assessments.service";
import { currentUser, getCurrentPricing } from "@/service/auth.service";
import {
  extractTextsFromHtml,
  generate,
  rateLimitBasedOnPricingIdAndLastCalledAt,
} from "@/service/generate.service";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      title,
      description,
      duration,
      questionsCount,
      versionId,
      generateBy,
      pdf,
      link,
      assessmentId,
    } = body;

    if (!title || !duration || !questionsCount || !versionId || !generateBy) {
      throw new Error("Please provide all fields");
    }

    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "Please login" }, { status: 401 });

    const assessment = await db
      .select()
      .from(Assessments)
      .where(eq(Assessments.id, assessmentId))
      .then((res) => res[0]);

    if (assessment.companyId !== user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if rate limit exists for the specific user and version
    const rl = await db
      .select()
      .from(rateLimit)
      .where(and(eq(rateLimit.userId, user.id), eq(rateLimit.versionId, versionId)));

    const currentPricing = await getCurrentPricing();

    if (rl.length === 0) {
      // Insert new rate limit entry if none exists
      await db.insert(rateLimit).values({
        userId: user.id,
        versionId,
        lastCalledAt: new Date(),
        pricingId: currentPricing.id,
      });
    } else {
      // Check if the rate limit is exceeded
      const isRateLimitExceeded = await rateLimitBasedOnPricingIdAndLastCalledAt({
        pricingId: currentPricing.priceId,
        lastCalledAt: rl[0].lastCalledAt,
      });

      if (!isRateLimitExceeded) {
        return NextResponse.json(
          {
            message:
              "Rate limit exceeded. Try again after " +
              `${currentPricing.priceId === "free" ? "1 hour" : "1 minute"}.`,
          },
          { status: 429 }
        );
      }

      // Update the lastCalledAt for subsequent calls
      await db
        .update(rateLimit)
        .set({ lastCalledAt: new Date() })
        .where(and(eq(rateLimit.userId, user.id), eq(rateLimit.versionId, versionId)));
    }

    const isVersionExist = await db
      .select()
      .from(versions)
      .where(eq(versions.id, versionId));
    if (isVersionExist.length === 0) {
      return NextResponse.json({ message: "Version not found" }, { status: 404 });
    }

    const testId = await getGenerateTypeTestFromVersionAndTest({ versionId, assessmentId });

    if (testId) {
      const existingTest = await db
        .select()
        .from(Tests)
        .where(eq(Tests.id, testId));
      if (existingTest[0]?.id) {
        await deleteAll(existingTest, assessmentId, versionId);
      }
    }

    let prompt = "";

    switch (generateBy) {
      case "job description":
        prompt = generatePrompt(description, questionsCount);
        break;
      case "pdf":
        prompt = generatePrompt(pdf, questionsCount);
        break;
      case "link":
        const response = await fetch(link);
        const data = await response.text();
        const text = extractTextsFromHtml(data);
        prompt = generatePrompt(text, questionsCount);
        break;
      default:
        throw new Error("Invalid generation type");
    }

    return generate({ prompt, title, versionId, duration, questionsCount, assessmentId });
  } catch (error: any) {
    console.error("Error during POST:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

const deleteAll = async (
  existingTest: SelectTests[],
  assessmentId: number,
  versionId: number
) => {
  const multipleChoicesQuestions = await db
    .select()
    .from(MultipleChoicesQuestions)
    .where(eq(MultipleChoicesQuestions.testId, existingTest[0].id));

  await db.transaction(async (tx) => {
    try {
      await tx
        .delete(VersionAndTest)
        .where(
          and(
            eq(VersionAndTest.versionId, versionId),
            eq(VersionAndTest.assessmentId, assessmentId),
            eq(VersionAndTest.testId, existingTest[0].id)
          )
        );

      for (const question of multipleChoicesQuestions) {
        await tx
          .delete(MultipleChoiceAnswers)
          .where(eq(MultipleChoiceAnswers.optionId, question.id));

        await tx
          .delete(Options)
          .where(eq(Options.multipleChoicesQuestionId, question.id));
      }

      await tx
        .delete(MultipleChoicesQuestions)
        .where(eq(MultipleChoicesQuestions.testId, existingTest[0].id));

      await tx.delete(Tests).where(eq(Tests.id, existingTest[0].id));
    } catch (error: any) {
      console.error("Error during deleteAll:", error.message);
      throw new error; // Ensures transaction rolls back
    }
  });
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