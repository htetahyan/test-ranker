import db from "@/db"
import { Pricing, Users } from "@/db/schema/schema"
import { comparePassword, hashPassword } from "@/service/auth.service"
import { cookieOptions, generateAccessToken } from "@/service/jwt.service"
import { limit } from "@/service/middleware.service"
import { createNewUserWithPricing } from "@/service/oauth.service"
import { eq } from "drizzle-orm"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{{

    try{
        const ip = req.headers.get('X-Forwarded-For') ?? 'unknown';

        const isRateLimitExceed=limit(ip)
        if(isRateLimitExceed) return NextResponse.json({message:"Rate limit exceeded, please try again after 1 minute"},{status:429})
        const body=await req.json()
        const {email,password,type,name}=body
    
        const oldUser=await db.select().from(Users).where(eq(Users.email,email))
console.log(oldUser);

        let user
if(type==='signup'){
    if(oldUser.length>0){
        return NextResponse.json({message:"User with this email already exists"},{status:400})
    }
 user= await createNewUserWithPricing({
    email,
    password: hashPassword(password),name,picture:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',provider:'email',emailVerified:false
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


 const token=await generateAccessToken(user.id);
 
        (await cookies()).set('ac',token,cookieOptions(60*60*24))

        return NextResponse.json({message:"Account Success",redirect:true},{status:200})
        

    }catch(err:any){

        return NextResponse.json({message:err.message,redirect:false},{status:500})
    }
}}