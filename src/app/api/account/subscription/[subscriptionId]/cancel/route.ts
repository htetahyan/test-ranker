import db from "@/db";
import { Pricing } from "@/db/schema/schema";
import { PostRequest } from "@/service/paddle.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest,props:{params:Promise<{subscriptionId:string}>})=>{
    try{
        const {subscriptionId}=await props.params
       const res=await PostRequest(`/subscriptions/${subscriptionId}/cancel`,{effective_from:"next_billing_period"})
       const data=await res.json()
       await db.update(Pricing).set({isCancled:true,}).where(eq(Pricing.subscriptionId,subscriptionId))
    console.log(data);
        return NextResponse.json({message:data?.error?.code==="subscription_locked_pending_changes"?"Already cancled":"cancled"},{status:200})

    }
    catch(err:any){return NextResponse.json({message:err.message},{status:500})
    }}