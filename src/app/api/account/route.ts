import db from "@/db"
import { Pricing, Users } from "@/db/schema/schema"
import { comparePassword, hashPassword } from "@/service/auth.service"
import { cookieOptions, generateAccessToken } from "@/service/jwt.service"
import { eq } from "drizzle-orm"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{{

    try{

        const body=await req.json()
        const {email,password,type,name}=body
    
        const oldUser=await db.select().from(Users).where(eq(Users.email,email))
console.log(oldUser);

        let user
if(type==='signup'){
    if(oldUser.length>0){
        return NextResponse.json({message:"User with this email already exists"},{status:400})
    }
 user= await db.transaction(async (tx) => {
  const u=  await tx.insert(Users).values({name,email,password:hashPassword(password),role:'Company'}).returning({id:Users.id}).then((data)=>data[0])
await tx.insert(Pricing).values({userId:u.id,endDate:new Date(),startDate:new Date(),priceId:'free',nextBillDate:new Date(),status:'active',paymentMethod:'free'}).returning({id:Pricing.id}).then((data)=>data[0])
return u
})
}else{
    if(oldUser.length===0){
        return NextResponse.json({message:"User with this email does not exist"},{status:400})
    }
    if(!comparePassword(password,oldUser[0].password)){
        return NextResponse.json({message:"Incorrect password"},{status:400})
    }
    user=oldUser[0]
}


 const token=await generateAccessToken(user);
 
        (await cookies()).set('ac',token,cookieOptions(60*60*24))

        return NextResponse.json({message:"Account Success",redirect:true},{status:200})
        

    }catch(err:any){

        return NextResponse.json({message:err.message,redirect:false},{status:500})
    }
}}