import dynamic from 'next/dynamic'
import React from 'react'
const AccountForm=dynamic(()=>import('@/components/account/AccountForm'))
const page = async(props:{searchParams: Promise<{callback:string}>}) => {
  const {callback}=await props.searchParams
  return (
   <AccountForm callbackUrl={callback}/>
  )
}

export default page
