
import { currentUser } from '@/service/auth.service'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
export const metadata:Metadata = {
  title: 'Skill Test AI',
  description: 'Ai Skill Test Generator',}
const HomeHeader=dynamic(()=>import('@/components/home/HomeHeader'),)
const Footer=dynamic(()=>import('@/components/home/HomeFooter'))
const layout = async({children}:{children:React.ReactNode}) => {
  return (
    <div>
     <Suspense fallback={<div>loading...</div>}>   <HomeHeader />

      {children}
      <Footer/>     </Suspense> 
    </div>
  )
}

export default layout
