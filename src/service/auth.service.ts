import db from "@/db"
import { Users } from "@/db/schema/schema"
import { eq } from "drizzle-orm"
import {
    genSaltSync,
    hashSync,
    compareSync,
    getRounds,
    getSaltSync,
  } from 'bcrypt-edge';
import { cookies } from "next/headers";
import { decodeJWTToken } from "./jwt.service";
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

const hashPassword=(password:string)=>{
    return hashSync(password, genSaltSync(10))
}
export const currentUser=async()=>{
    const token= cookies().get('ac')?.value
    if(!token) return
    const payload = await decodeJWTToken(token) as any
    console.log(payload);
    
    if(!payload) return
    const user=await db.select().from(Users).where(eq(Users.id,parseInt(payload.sub?.id!)!))
    return user[0]

}