import React from 'react';
import { Input, Button } from '@nextui-org/react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 w-screen">
      <div className=" mx-auto bg-white shadow-md rounded-lg p-6 w-2/3">
        <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

        {/* Change Name Section */}
        <div className="mb-8 w-2/3">
          <h2 className="text-lg font-medium mb-4">Change Name</h2>
          <div className="flex items-center gap-4 ">
            <Input
              id="name"
              placeholder="Enter your new name"
              fullWidth
              className="flex-1"
            />
            <Button className='bg-black text-white' >
              Save
            </Button>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Change Password</h2>
          <div className="space-y-4">
          <Input
              id="password"
              placeholder="Enter your old password"
              fullWidth
            />
            <Input
              id="password"
              placeholder="Enter your new password"
              fullWidth
            />
            <Input
              id="confirm-password"
              placeholder="Confirm your new password"
              fullWidth
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button color="primary" >
              Save
            </Button>
          </div>
        </div>

        {/* Other settings can be added here in a similar manner */}

      </div>
    </div>
  );
};

export default SettingsPage;
