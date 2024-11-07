import Footer from '@/components/home/HomeFooter'
import HomeHeader from '@/components/home/HomeHeader'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
export const metadata:Metadata = {
  title: 'Skill Test AI',
  description: 'Ai Skill Test Generator',}

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
     <Suspense fallback={<div>loading...</div>}>   <HomeHeader/>
     </Suspense>
      {children}
      <Footer/>
    </div>
  )
}

export default layout
