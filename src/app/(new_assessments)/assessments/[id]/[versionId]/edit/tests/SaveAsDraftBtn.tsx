import { Button } from '@nextui-org/react'
import React from 'react'
import { RiDraftLine } from 'react-icons/ri'

const SaveAsDraftBtn = ({versionId,assessmentId}:{versionId:number,assessmentId:number}) => {
  return (
    <div>
      <Button className='bg-black text-white' startContent={<RiDraftLine />}>Save as draft</Button>
    </div>
  )
}

export default SaveAsDraftBtn
