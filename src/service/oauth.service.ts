import nodemailer from 'nodemailer';
import { addMinutes, isBefore } from 'date-fns'; // date utility library
import {randomBytes} from "node:crypto";
import { Resend } from "resend";

import db from '@/db';
import { Pricing, Users, usuage } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';
import { v7 as uuidv7 } from 'uuid';
import { VerifyEmailTemplate } from '@/utils/EmailTemplate';
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

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // 3 seconds
const resend = new Resend(process.env.RESEND_API_KEY);



export async function sendEmailWithRetry(user: any, emailToken: string): Promise<void> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            await transporter.sendMail({
                to: user.email,
                subject: "Verify your email address",
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email address</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 2rem;
    }
    .container {
      margin: 0 auto;
      padding: 1.5rem;
      margin-top: 1.25rem;
      margin-bottom: 3rem;
      background: #f9f9f9;
      border-radius: 8px;
      max-width: 600px;
    }
    .header {
      font-weight: bold;
      font-size: 1.25rem;
    }
    .hr {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border: 0;
      height: 1px;
      background: #ddd;
    }
    .text {
      font-size: 1rem;
      margin: 0.5rem 0;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #0070f3;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      font-size: 1rem;
      margin-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="header">Verify Your Email Address</p>
    <hr class="hr">
    <p class="text">
      Hello, we received a request to verify your email address: <strong>${user.email}</strong>.
    </p>
    <p class="text">
      To complete the verification process, please click the button below:
    </p>
    <a href="${emailToken}" class="button" target="_blank" rel="noopener noreferrer">
      Verify Email
    </a>
    <hr class="hr">
    <p class="text">
      If you did not request this, please ignore this email or contact support.
    </p>
    <p class="text">Thank you,</p>
    <p class="text" style="font-style: italic;">The Eimaam Dev Team</p>
  </div>
</body>
</html>`,
            });
            console.log('Email sent successfully');
            break; // Exit loop if email is sent successfully
        } catch (error) {
            console.error(`Attempt ${retries + 1} failed: `, error);
            retries++;
            if (retries < MAX_RETRIES) {
                console.log(`Retrying... (${retries + 1}/${MAX_RETRIES})`);
            } else {
                console.log('Max retries reached, failed to send email');
                throw new Error('Failed to send email after maximum retries');
            }
        }
    }
}

export const transporter=nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
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

   if(sender.rejected) throw new Error("having load traffic try again later"+sender.response)

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
      const p= await tx.insert(Pricing).values({userId:u.id,endDate:new Date(),startDate:new Date(),priceId:'free',nextBillDate:new Date(),status:'active',paymentMethod:'free'}).returning({id:Pricing.id}).then((data)=>data[0])
const ua=await tx.insert(usuage).values({totalAssessments:0,pricingId:p.id,userId:u.id,totalCandidates:0}).returning({id:usuage.id}).then((data)=>data[0])
       return u
       })
 }