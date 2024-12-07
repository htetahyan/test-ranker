'use client';
import React from 'react'; 
import { Avatar, Button } from '@nextui-org/react';
import { SelectUsers } from '@/db/schema/schema';

import EmailVerification from './EmailVerification';
import Logout from './Logout';

const MySettings = ({ user }: { user: SelectUsers }) => {
  const isGoogleUser = user.provider === 'google';

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-md flex flex-col items-center sm:items-start gap-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 w-full text-center sm:text-left mb-4">Account Settings</h1>
        
        {/* User Information Section */}
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar isBordered color="primary" src={user.picture} size="lg" />
          <div className="flex flex-col w-full gap-3 text-center sm:text-left">
            <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
            
            <p className="text-gray-700">
              <span className="font-semibold">Email: </span>
              <span className="p-1 bg-blue-50 text-blue-700 rounded">{user.email}</span>
            </p>
            
            <p className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">Email Verified:</span>
              <span className={`p-1 rounded ${user.emailVerified ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {user.emailVerified ? "Yes" : "No"}
              </span>
            </p>
            
            <p className="text-gray-700">
              <span className="font-semibold">Provider: </span>
              <span className={`p-1 rounded ${isGoogleUser ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-700'}`}>
                {user.provider}
              </span>
            </p>
          </div>
        </div>

        {/* Action Components */}
        <div className="w-full flex flex-col gap-4 mt-6">
          <EmailVerification user={user} />
        
          <Logout />
        </div>

        {/* Update Profile Button for Mobile */}
        <div className="sm:hidden w-full mt-4">
          <Button fullWidth color="primary" size="lg">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MySettings;
