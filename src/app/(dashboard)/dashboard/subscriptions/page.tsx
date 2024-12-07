import UserPricing from '@/components/dashboard/UserPricing';
import db from '@/db';
import { Pricing } from '@/db/schema/schema';
import { currentUser, getUserUsage } from '@/service/auth.service';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  try {
    // Fetch the current user
    const user = await currentUser();
    const plan = await db.select().from(Pricing).where(and(eq(Pricing.status,'active'),eq(Pricing.userId,user!.id!)))
    const usuage=await getUserUsage(plan[0].id)
    console.log(plan,usuage,'plan');
  

    // Query the Pricing table
    const pricing = await db
      .select()
      .from(Pricing)
      .where(and(eq(Pricing.status, 'active'), eq(Pricing.userId, user?.id!)));

    // Handle the case where no active pricing is found
    const activePricing = pricing.length > 0 ? pricing[0] : null;

    return (
      <div>
        {activePricing ? (
          <UserPricing user={user!} pricing={activePricing} usage={usuage} />
        ) : (
          <div>No active subscription found.</div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading page. Please try again later.</div>;
  }
};

export default page;
