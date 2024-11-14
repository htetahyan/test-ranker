import { GetRequest, PostRequest } from "@/service/paddle.service";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest,props:{params:Promise<{subscriptionId:string}>})=>{
    try{
        const {subscriptionId}=await props.params
       const res=await GetRequest(`/subscriptions/${subscriptionId}`)
       const data=await res.json()
      console.log(data);
        return NextResponse.json({message:"success",url:data?.data!.management_urls!.update_payment_method},{status:200})

    }
    catch(err:any){return NextResponse.json({message:err.message},{status:500})
    }}