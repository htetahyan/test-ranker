import db from "@/db"
import { Assessments, Candidates, Pricing, SelectUsers, Users, usuage } from "@/db/schema/schema"
import { and, count, eq, gt } from "drizzle-orm"
import {
    genSaltSync,
    hashSync,
    compareSync,
    getRounds,
    getSaltSync,
  } from 'bcrypt-edge';
import { cookies } from "next/headers";
import { decodeJWTToken } from "./jwt.service";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export const signInWithEmailAndPassword = async ({email,password}:{
    email:string,
    password:string
})=>{

    try {
const existingUser = await db.select().from(Users).where(eq(Users.email, email))
if(existingUser.length === 0){
    throw new Error("User does not exist")
}
       return existingUser[0]
    } catch (error:any) {

        throw new Error(error.message)
    }
}
export const comparePassword=(password:string,hashedPassword:string)=>{
    return compareSync(password,hashedPassword)
}
export const hashPassword=(password:string)=>{
    return hashSync(password, genSaltSync(10))
}
export const currentUser=async()=>{
    const token=  (await cookies()).get('ac')?.value
    if(!token) return 
    const payload = await decodeJWTToken(token) as any
    console.log(payload);
    
    if(!payload) return
    const user=await db.select().from(Users).where(eq(Users.id,parseInt(payload.sub!)!))
    return user[0]

}
export const getUserUsage = async (pricingId:number) => {
const myUsuage = await db.select().from(usuage).where(eq(usuage.pricingId,pricingId)).then((data) => data[0]);
    return {
      assessments: myUsuage.totalAssessments,
      candidates: myUsuage.totalCandidates,};
  };
  export const checkPlanLimitExceeded = async (user:SelectUsers) => {
const plan=await db.select().from(Pricing).where(and(eq(Pricing.status,'active'),eq(Pricing.userId,user.id!)))
    const usuage=await getUserUsage(plan[0].id)
    switch (plan[0].priceId) {
      case "free":
        return usuage.assessments >= 1 || usuage.candidates >= 1;
      case "pri_01jc3hccwern15ex41rw5h7bz7":
        return usuage.assessments >= 1;
      case "pri_01jc3hehprwp718k0f247dpwqd":
        return usuage.assessments >= 10;
      case "pri_01jc3hgpynvy9ac71829kq23t9":
        return usuage.assessments >= 30 ;
      default:
        return false;
    }
  }
  export const getCurrentPricing=async()=>{
    const user=await currentUser()
    const pricing=await db.select().from(Pricing).where(and(eq(Pricing.status,'active'),eq(Pricing.userId,user?.id!)))
    return pricing[0]
  }
  export const checkAssessmentLimitExceeded=async()=>{
    const user=await currentUser()
    if(!user) return null;
    const plan=await db.select().from(Pricing).where(and(eq(Pricing.status,'active'),eq(Pricing.userId,user!.id!)))
    const usuage=await getUserUsage(plan[0].id)
    console.log(plan,usuage);
    
    switch (plan[0].priceId) {
      case "free":
        return usuage.assessments >= 1;
      case "pri_01jc3hccwern15ex41rw5h7bz7":
        return usuage.assessments >= 1;
      case "pri_01jc3hehprwp718k0f247dpwqd":
        return usuage.assessments >= 10;
      case "pri_01jc3hgpynvy9ac71829kq23t9":
        return usuage.assessments >= 30 ;
      default:
        return false;
    }
  }