import { useLogoutMutation } from '@/quries/AccoutQuery'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { toast } from 'sonner'

const Logout = () => {
    const [mutate,{isLoading}]=useLogoutMutation()
    const router=useRouter()
   
const submit=async()=>{
    router.prefetch('/')
  const res=await mutate({}).unwrap()
 if(res?.isLoggedOut){
    router.push('/')
 } 
 
}


  return (
    <div className=" mt-4 w-full flex justify-end"    >
        <Button isLoading={isLoading} onClick={submit} endContent={<FaPowerOff />} className="bg-red-700 text-white">Logout</Button>
      
    </div>
  )
}

export default Logout
