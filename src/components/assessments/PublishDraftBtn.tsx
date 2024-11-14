import { SelectVersions } from '@/db/schema/schema'
import { useTogglePublishMutation } from '@/quries/BaseQuery'
import { Button } from '@nextui-org/react'
import React from 'react'

const PublishDraftBtn = ({currentVersion}:{currentVersion:SelectVersions}) => {
    const [mutate,{isLoading}]=useTogglePublishMutation()

    const submit=async()=>{
        const res=await mutate({versionId:currentVersion.id,type:currentVersion.isPublished?'DRAFT':'PUBLISH',assessmentId:currentVersion.assessmentId}).unwrap().finally(() => {window.location.reload();});
    }
  return (
          <Button isLoading={isLoading} onClick={submit}
          color='primary'            endContent={
              <div className={`w-3 h-3 rounded-full ${currentVersion?.isPublished ? 'bg-green-500' : 'bg-red-500'}`} />
            }
            variant="flat"
          >
            {currentVersion.isPublished ? 'Published' : 'Draft'}
          </Button>
  )
}

export default PublishDraftBtn
