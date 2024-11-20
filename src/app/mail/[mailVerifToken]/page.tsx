import React from 'react'
import PasswordResetForm from '@/components/PasswordResetForm';
import db from '@/db';
import { Users } from '@/db/schema/schema';
import { eq } from 'drizzle-orm';

const page = async({ params}: {params: Promise<{mailVerifToken:string}>}) => {
  const {mailVerifToken} = await params;
  const user=await db.select().from(Users).where(eq(Users.emailVerifToken,mailVerifToken)).then((data)=>data[0])
if(!user) return  <h1 className={'text-3xl text-center'}>invalid reset link! This links is either expired or invalid</h1> // <h1>{params.mailToken}</h1>
  return (
    <div className={'h-screen w-screen flex items-center justify-center'}>
      <PasswordResetForm id={user?.id as number}/>
    </div>
  )
}

export default page