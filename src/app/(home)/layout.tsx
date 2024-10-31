import dynamic from 'next/dynamic'
import React from 'react'
const HomeHeader=dynamic(()=>import('@/components/home/HomeHeader'),{})
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <HomeHeader/>
      [{children}]
    </div>
  )
}

export default layout
