import { GetRequest } from "@/service/paddle.service"
import { NextRequest, NextResponse } from "next/server"

export const GET= async(req:NextRequest,props:{params:Promise<{subscriptionId:string}>})=>{
    try{
        const {subscriptionId}=await props.params
        console.log(subscriptionId);
        
       const mySubscription=await GetRequest(`/subscriptions/${subscriptionId}`)
       const subscription=await mySubscription.json()
        return NextResponse.json({message:"success",data:subscription},{status:200})
    }
    catch(err:any){return NextResponse.json({message:err.message},{status:500})
    }}