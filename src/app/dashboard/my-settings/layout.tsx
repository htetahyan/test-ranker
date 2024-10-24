import SettingSideBar from '@/components/dashboard/SettingSideBar';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='h-screen overflow-hidden w-screen flex '>
      <SettingSideBar/>{
      children}
      
    </div>
  )
}

export default layout
