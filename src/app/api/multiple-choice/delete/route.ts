import db from "@/db"
import { MultipleChoiceAnswers, MultipleChoicesQuestions, Options } from "@/db/schema/schema"
import { eq, gt, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      throw new Error("Please provide id")
    }

    // Get the order of the question being deleted
    const questionToDelete = await db
      .select({
        order: MultipleChoicesQuestions.order,
      })
      .from(MultipleChoicesQuestions)
      .where(eq(MultipleChoicesQuestions.id, id))
      

    if (!questionToDelete) {
      throw new Error("Question not found")
    }

    const { order } = questionToDelete[0]

    // Delete the question
  await db.transaction(async (tx) => {  
    await tx.delete(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.id, id)),
    await tx.delete(Options).where(eq(Options.multipleChoicesQuestionId, id)),
    await tx.delete(MultipleChoiceAnswers).where(eq(MultipleChoiceAnswers.optionId, id)) })

    // Decrement the order of the remaining questions that have an order greater than the deleted question's order
    await db
      .update(MultipleChoicesQuestions)
      .set({
        order: sql`${MultipleChoicesQuestions.order} - 1`
      })
      .where(gt(MultipleChoicesQuestions.order, order))

    return NextResponse.json({ message: "success" }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
