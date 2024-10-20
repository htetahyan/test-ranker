'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = ({id}:{id:number}) => {
    const router=useRouter()
    const back=()=>{
        router.push(`/assessments/${id}/edit/assessment`)
    }
  return (
    <Button onClick={back}>
        back
    </Button>
  )
}

export default BackButton
