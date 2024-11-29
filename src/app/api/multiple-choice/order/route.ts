import db from "@/db";
import { MultipleChoicesQuestions } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { deleteIds, reorderList } = body as {
      deleteIds: number[]; // IDs to delete
      reorderList: Array<{ id: number; order: number }>; // Items to reorder
    };

    if (!Array.isArray(deleteIds) || !Array.isArray(reorderList)) {
      return NextResponse.json(
        { message: "Invalid input format" },
        { status: 400 }
      );
    }

    // Step 1: Delete items
    if (deleteIds.length > 0) {
      await db
        .delete(MultipleChoicesQuestions)
        .where(inArray(MultipleChoicesQuestions.id, deleteIds));
    }

    // Step 2: Reorder items
    if (reorderList.length > 0) {
      const updatePromises = reorderList.map((item) => {
        if (!item.id || typeof item.order !== "number") {
          throw new Error("Invalid data: ID or order missing");
        }
        return db
          .update(MultipleChoicesQuestions)
          .set({ order: item.order })
          .where(eq(MultipleChoicesQuestions.id, item.id));
      });

      await Promise.all(updatePromises);
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err: any) {
    console.error("Error handling delete and reorder:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
};
