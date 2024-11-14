import nodemailer from 'nodemailer';
import { addMinutes, isBefore } from 'date-fns'; // date utility library
import {randomBytes} from "node:crypto";
import db from '@/db';
import { Pricing, Users } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import { v7 as uuidv7 } from 'uuid';
interface GoogleOAuthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export const getGoogleOAuthToken = async (code: string): Promise<GoogleOAuthToken> => {
    const url = "https://oauth2.googleapis.com/token";
    const utils = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
        client_secret: process.env.GOOGLE_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
        grant_type: "authorization_code"
    };

    // Check if all required environment variables are set
    if (!utils.client_id || !utils.client_secret || !utils.redirect_uri) {
        throw new Error("Google OAuth environment variables are not set.");
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(utils).toString(), // URL-encode the body
        });


        if (!res.ok) {
            throw new Error(`Failed to get Google OAuth token: ${res.status} ${res.text } ${res.url}`);
        }
        return await res.json();
    } catch (error  ) {

        throw error;
    }
};

export const getGoogleUserInfo = async (id_token: string, access_token: string) => {
try {
    const res = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
    });
    return await res.json();
}catch (error) {

    throw error;
}}

const MAX_RETRIES = 10000;
const RETRY_DELAY = 3000; // 3 seconds

export async function sendEmailWithRetry(user: any, emailToken: string): Promise<void> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const mail = {

                from: "contentally@gmail.com",
                to: user?.email,
                subject: 'Verify your email',
                html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
      <h2 style="color: #333;">Hello <strong>${user.name}</strong>,</h2>
      <p style="color: #555;">Please verify your email by clicking the link below:</p>
      <a href='https://contentally.ai/api/oauth/email?token=${emailToken}' 
         style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
        Click here
      </a>
      <p style="color: #555; margin-top: 20px;">Thank you!</p>
    </div>
  `,
            };

console.log(mail);

            await transporter.sendMail(mail);
            break;
        } catch (error) {
            console.error(`Error sending email attempt ${retries + 1}:`, error);

            if (retries === MAX_RETRIES - 1) {
                throw new Error(`Failed to send email after ${MAX_RETRIES} attempts`);
            }

            retries++;
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
}
export const transporter=nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: Number(587),
    auth: {
        user: "htetahyan@gmail.com",
        pass: "xsmtpsib-ed37e78482a625aabc4f4d1e6eac72fca3ed0e55653622c8c5dc6b0ee2744cf0-4JsyXPrg5kZ2OxTU",
    },
});

export const generateEmailVerificationToken = () => {
    // generates a buffer containing 32 random bytes.
    // The 32 indicates the number of bytes to generate, and it is commonly used
    // for creating secure tokens or identifiers.
    return uuidv7();
};
export const sentPasswordResetLink = async (email: string) => {
  const user = await db.select().from(Users).where(eq(Users.email, email)).then((data) => data[0]);

  // Check if the user exists
  if (!user) {
    throw new Error("User not found");
  }

  // Check if 3 minutes have passed since the last email token was sent
  if (user.emailTokenSentAt && isBefore(new Date(), addMinutes(user.emailTokenSentAt,3))) {
    throw new Error("Please wait 3 minutes before requesting another reset link.");
  }

  const emailToken = generateEmailVerificationToken();

  // Update the user with the new token and timestamp
  await db.update(Users).set({emailVerifToken: emailToken, emailTokenSentAt: new Date()}).where(eq(Users.email, email));

  const url = `${process.env.BASE_URL}/mail/${emailToken}`;

  try {
      const mail = {
          
          from: "contentally@gmail.com",
          to: user.email,
          subject: 'Password Reset to your Contentally Account',
          html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
      <h2 style="color: #333;">Hello <strong>${user.name}</strong>,</h2>
      <p style="color: #555;">Please reset your password by clicking the link below:</p>
      <a href='${url}' style="display: inline-block; padding: 10px 15px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Click here</a>
      <p style="color: #555; margin-top: 20px;">Thank you!</p>
    </div>
  `,
      };

      console.log(mail);

   const sender= await transporter.sendMail(mail);

   if(sender.rejected) throw new Error("having load traffic try again later")
  } catch (error:any) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
export const findExistORCreateUserGoogle = async (email: string, name: string, picture: string) => {
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .then((data) => data[0]);

  if (user) {
    return user;
  }

  const newUser =await  createNewUserWithPricing({email,name,password:'',picture,provider:'google',emailVerified:true});
  return newUser;
}
export const createNewUserWithPricing=async({email,password,name,picture,provider,emailVerified}:{email:string,password:string,name:string,picture:string,provider:string,emailVerified:boolean})=>{
    return await db.transaction(async (tx) => {
         const u=  await tx.insert(Users).values({name,email,password,role:'Company',picture,provider,emailVerified}).returning({id:Users.id}).then((data)=>data[0])
       await tx.insert(Pricing).values({userId:u.id,endDate:new Date(),startDate:new Date(),priceId:'free',nextBillDate:new Date(),status:'active',paymentMethod:'free'}).returning({id:Pricing.id}).then((data)=>data[0])
       return u
       })
 }