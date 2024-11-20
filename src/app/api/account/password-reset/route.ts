import db from "@/db";
import { Users } from "@/db/schema/schema";
import { sentPasswordResetLink } from "@/service/oauth.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{
    try {
        const {email}=await req.json();
        const user=await db.select().from(Users).where(eq(Users.email,email)).then((data) => data[0]);
        if(!user) return NextResponse.json({message:"User not found"},{status:400})
        await sentPasswordResetLink(email);
        return NextResponse.json({message:'Message sent! check your inbox!'},{status:200})
    } catch (e:any) {
        console.log(e.message);
        
        return NextResponse.json({message:e.message},{status:500})
    }
}