import React from 'react';
import { Button } from '@nextui-org/react';
import { SelectUsers } from '@/db/schema/schema';
import { useVerifyEmailMutation } from '@/quries/AccoutQuery';

const EmailVerification = ({ user }: { user: SelectUsers }) => {
  const [mutate, { isLoading }] = useVerifyEmailMutation();
  const verifyEmail = async () => {
    const res=await mutate({}).unwrap()
  }
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Email Verification</h2>
      <p className="mb-4">Current Status: {user.emailVerified ? "Verified" : "Not Verified"}</p>
      {!user.emailVerified && (
        <Button onClick={verifyEmail} isLoading={isLoading} className="bg-black text-white">Send Verification Email</Button>
      )}
    </div>
  );
};

export default EmailVerification;
