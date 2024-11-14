import MySettings from '@/components/dashboard/MySettings';
import { currentUser } from '@/service/auth.service';
import React from 'react';

const SettingsPage =async () => {
  const user=await currentUser()
  if(!user) return
  return (
 <MySettings user={user}/>
  );
};

export default SettingsPage;
