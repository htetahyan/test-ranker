import AddCustomTest from '@/components/admin/AddCustomTest'
import { TestCard } from '@/components/tests/TestLists'
import { getCustomTests } from '@/service/test.service'
import React from 'react'

const page = async() => {
    const customTests = await getCustomTests()
  return (
    <div>
      <h1>custom tests</h1>
      <AddCustomTest/>
    <div className='p-4 w-screen h-fit grid grid-cols-3 gap-4'> {customTests?.map((test) => (
       <TestCard key={test.id} isAdmin={true} test={test} />
      ))}
      </div> 
    </div>
  )
}

export default page
