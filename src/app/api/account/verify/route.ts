import db from "@/db";
import { Users } from "@/db/schema/schema";
import { currentUser } from "@/service/auth.service";
import { generateEmailVerificationToken, sendEmailWithRetry } from "@/service/oauth.service";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const user= await currentUser()
        if(!user) return NextResponse.json({ message: "Please login" }, { status: 401 });
        if(user.emailVerified) return NextResponse.json({ message: "Mail is already verified" }, { status: 401 });
        if (new Date(user?.emailTokenSentAt!).getTime() > Date.now() - 3 * 60 * 1000) {
            console.log("Attempt to resend within 3 minutes.");
            return NextResponse.json({message: 'message already sent! Try After 3 min '}, {status: 401});
        }
const mailVerifToken=  generateEmailVerificationToken()
        await db.update(Users).set({emailVerifToken: mailVerifToken,emailTokenSentAt: new Date()}).where(eq(Users.id,user.id))
        await sendEmailWithRetry(user, mailVerifToken);

        return NextResponse.json({message: 'Email sent successfully'}, {status: 200});
    } catch (err: any) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }}
export const GET=async(req:NextRequest)=>{
    try{
        const mailVerifToken=req.nextUrl.searchParams.get('token') as string
        if(!mailVerifToken){return NextResponse.json({message:"token not found or invalid"},{status:400})}
        const user=await db.select().from(Users).where(eq(Users.emailVerifToken,mailVerifToken)).then((data)=>data[0])
        if(!user){return NextResponse.json({message:"user not found or invalid"},{status:400})}
        await db.update(Users).set({emailVerified:true,emailVerifToken:''}).where(eq(Users.emailVerifToken,mailVerifToken))
        return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL+'/dashboard/my-settings' || 'http://localhost:3000/dashboard')

       
    }
    catch(err:any){return NextResponse.json({message:err.message},{status:500})}
}