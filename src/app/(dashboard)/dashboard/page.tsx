/* import DashboardChart from '@/components/dashboard/DashboardChart'
import db from '@/db'
import { Assessments, Candidates, versions } from '@/db/schema/schema'
import { currentUser } from '@/service/auth.service'
import { eq } from 'drizzle-orm'
import React from 'react'
import { CategoryScale,registerables } from "chart.js";
import Chart from "chart.js/auto";

import * as Yup from 'yup'
Chart.register(...registerables );
const page = async() => {
  const user=await currentUser()

  const array=await db.select().from(Assessments).
  leftJoin(versions,eq(versions.assessmentId,Assessments.id)).
  leftJoin(Candidates,eq(Candidates.versionId,versions.id)).
  where(eq(Assessments.companyId,user!.id!))
  return (
    <div>
<DashboardChart/>
    </div>
  )
}

export default page
 */
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
await redirect('/dashboard/assessments')
  return (
    <div>page</div>
  )
}

export default page