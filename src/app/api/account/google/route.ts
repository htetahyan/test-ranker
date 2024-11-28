import { findExistORCreateUserGoogle, getGoogleOAuthToken, getGoogleUserInfo } from "@/service/oauth.service";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import { cookieOptions,generateAccessToken,generateRefreshToken } from "@/service/jwt.service";
import {revalidateTag} from "next/cache";
import db from "@/db";
import { Users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { limit } from "@/service/middleware.service";

export const GET = async (request: NextRequest) => {
    const code= request.nextUrl.searchParams.get('code')
    try {
        const ip = request.headers.get('X-Forwarded-For') ?? 'unknown';

const isRateLimitExceed=limit(ip)
if(isRateLimitExceed) return NextResponse.json({message:"Rate limit exceeded"},{status:429})
        const {expires_in, access_token,token_type,refresh_token,scope,id_token} = await getGoogleOAuthToken(code as string);
        const google_user=await getGoogleUserInfo(id_token,access_token);
       
        const user=await findExistORCreateUserGoogle(google_user.email,google_user.name,google_user.picture) 
   
    const token=await generateAccessToken(user.id);


    (await cookies()).set('ac',token,cookieOptions(60*60*24))

        revalidateTag('profile')

return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/dashboard')}
    catch (error) {

        // @ts-ignore
        return NextResponse.json({message: error.message}, {status: 500});
    }
    //get token

}
