'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';

const BackButton = () => {
    const router=useRouter()
    const back=()=>{
        router.back()
    }
  return (
    <Button startContent={<IoMdArrowRoundBack />} className='bg-black text-white hover:bg-gray-800' onClick={back}>
        back
    </Button>
  )
}

export default BackButton
