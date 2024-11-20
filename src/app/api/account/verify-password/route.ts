import db from "@/db"
import { Users } from "@/db/schema/schema"
import { hashPassword } from "@/service/auth.service"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
    try{
        const body=await req.json()
        const {password,id}=body
        if(!password){
            throw new Error("Please provide password")
        }
        const user=await db.select().from(Users).where(eq(Users.id,id)).then((data)=>data[0])

        if(!user) return NextResponse.json({message:"User not found"},{status:400})
            await db.update(Users).set({password:hashPassword(password),emailVerifToken:""}).where(eq(Users.id,id))
        return NextResponse.json({message:"success"},{status:200})
    }catch(err:any){return NextResponse.json({message:err.message},{status:500})}
}