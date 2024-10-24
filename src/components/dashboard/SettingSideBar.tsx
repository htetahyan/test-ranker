import { currentUser } from '@/service/auth.service'
import { Divider, User } from '@nextui-org/react'
import Link from 'next/link';
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdPaid } from 'react-icons/md';
import { PiSnowflakeFill } from "react-icons/pi";
import { RiLogoutBoxRFill } from 'react-icons/ri';

const SettingSideBar = async () => {
  const user = await currentUser()
  

  const routes = [
    { name: 'Profile', link: '/dashboard/my-profile', icon: <FaUser /> },
    {name:'credits',link:'/dashboard/my-settings/my-credits',icon:<PiSnowflakeFill />
    },
    { name: 'Billing', link: '/dashboard/my-settings/billing', icon: <MdPaid />
    },
  
    
  ]

  return (
    <div className='w-[250px] justify-between h-full p-4 border-r shadow-lg bg-white flex flex-col'>
      {/* User Info */}
      <div className='mb-6'>
        <User
          name={user?.name}
          description={user?.email}
          avatarProps={{
            src: 'https://i.pravatar.cc/300',
          }}
        />
      </div>
      <Divider />

      {/* Routes */}
      <div className='flex-1 mt-4 space-y-4'>
        {routes.map((route, index) => (
        <Link href={route.link} key={index}> <div
            key={index}
            className='flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors'
          >
            <div className='mr-4 text-lg'>{route.icon}</div>
            <span className='text-sm font-medium'>{route.name}</span>
          </div></Link> 
        ))}
        <Divider />
      </div>
      <div>
        <div
          className='flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors'>
          <div className='mr-4 text-lg'><RiLogoutBoxRFill /></div>
          <span className='text-sm text-red-500 font-medium'>Logout</span>
          </div>
      </div>
    </div>
  )
}

export default SettingSideBar
