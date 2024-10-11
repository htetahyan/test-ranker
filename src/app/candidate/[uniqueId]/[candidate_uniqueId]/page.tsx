import db from '@/db'
import { Assessments, Candidates } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async({ params }: { params: { uniqueId: string, candidate_uniqueId: string }}) => {
  const { uniqueId, candidate_uniqueId } = params
  const assessment = await db.select().from(Assessments).where(eq(Assessments.uniqueId, uniqueId))
  const candidate = await db.select().from(Candidates).where(eq(Candidates.generatedUrl, candidate_uniqueId)).then((data) => data[0])
  const current_step=candidate?.currentStep
  console.log(current_step);
  
  switch (current_step) {
    case 'intro':
      redirect('/candidate/' + uniqueId + '/' + candidate_uniqueId + '/intro')
    case 'sign':
      redirect('/candidate/' + uniqueId + '/' + candidate_uniqueId + '/sign')
    case 'test':
      redirect('/candidate/' + uniqueId + '/' + candidate_uniqueId + '/test')
  }
  return (
    <div>
      
    </div>
  )
}

export default page
