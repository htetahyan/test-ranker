import { limit } from "@/service/middleware.service";
import { GetRequest, PostRequest } from "@/service/paddle.service";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest,props:{params:Promise<{subscriptionId:string}>})=>{
    try{
    /*     const ip = req.headers.get('X-Forwarded-For') ?? 'unknown';

        const isRateLimitExceed=limit(ip)
        if(isRateLimitExceed) return NextResponse.json({message:"Rate limit exceeded, please try again after 1 minute"},{status:429})
      */   const {subscriptionId}=await props.params
       const res=await GetRequest(`/subscriptions/${subscriptionId}`)
       const data=await res.json()
      console.log(data);
        return NextResponse.json({message:"success",url:data?.data!.management_urls!.update_payment_method},{status:200})

    }
    catch(err:any){return NextResponse.json({message:err.message},{status:500})
    }}