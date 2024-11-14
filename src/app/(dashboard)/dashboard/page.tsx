
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
 redirect('/dashboard/assessments')
  return (
    <div>page</div>
  )
}

export default page