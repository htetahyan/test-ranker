import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { SelectUsers } from '@/db/schema/schema';

const ChangePassword = ({user}: {user: SelectUsers}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Change Password</h2>
      <div className="space-y-4">
        <Input id="old-password" placeholder="Enter your old password" fullWidth />
        <Input id="new-password" placeholder="Enter your new password" fullWidth />
        <Input id="confirm-password" placeholder="Confirm your new password" fullWidth />
      </div>
      <div className="flex justify-end mt-4">
        <Button className="bg-black text-white">Save</Button>
      </div>
    </div>
  );
};

export default ChangePassword;
