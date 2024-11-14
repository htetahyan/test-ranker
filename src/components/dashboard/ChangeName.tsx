import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { SelectUsers } from '@/db/schema/schema';

const ChangeName = ({ user }: { user: SelectUsers }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Change Name</h2>
      <div className="flex items-center gap-4">
        <Input defaultValue={user.name} id="name" placeholder="Enter your new name" fullWidth />
        <Button className="bg-black text-white">Save</Button>
      </div>
    </div>
  );
};

export default ChangeName;
