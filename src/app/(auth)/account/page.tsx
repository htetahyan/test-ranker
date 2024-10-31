import AccountForm from '@/components/account/AccountForm'
import React from 'react'

const page = async(props:{searchParams: Promise<{callback:string}>}) => {
  const {callback}=await props.searchParams
  return (
   <AccountForm callbackUrl={callback}/>
  )
}

export default page
