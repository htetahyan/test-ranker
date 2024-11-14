import UserPricing from '@/components/dashboard/UserPricing'
import db from '@/db'
import { Assessments, Candidates, Pricing } from '@/db/schema/schema'
import { currentUser } from '@/service/auth.service'
import { and, count, eq } from 'drizzle-orm'
import React from 'react'

const page = async() => {
  const user=await currentUser()
  const pricing=await db.select().from(Pricing).where(and(eq(Pricing.status,'active'),eq(Pricing.userId,user?.id!)))
  const assessmentCounts=await db.select({count:count()}).from(Assessments).where(eq(Assessments.companyId,user?.id!))
  return (
    <div>
      <UserPricing user={user!} pricing={pricing[0]} />
    </div>
  )
}

export default page
