import db from "@/db";
import { MultipleChoicesQuestions } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{{

    try{
        const body=await req.json()
          const list=body.list as []

          if(!list||list.length<1){
              return NextResponse.json({message:"No changes"},{status:400})
          }

         list.forEach(async(item:{id:number,order:number})=>{
            await db.update(MultipleChoicesQuestions).set({order:item.order}).where(eq(MultipleChoicesQuestions.id,item.id))
         })

        return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){

    }
}}