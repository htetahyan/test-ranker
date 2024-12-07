'use client';
import { SelectPricing, SelectUsers } from '@/db/schema/schema';
import { Button, Progress, Chip } from '@nextui-org/react';
import React from 'react';
import CheckoutButton from '../payment/CheckOutButton';
import { useCancelSubscriptionMutation, useManageSubscriptionMutation } from '@/quries/AccoutQuery';
import { useRouter } from 'next/navigation';

const UserPricing = ({ pricing, user, usage }: { pricing: SelectPricing, user: SelectUsers, usage: any }) => {
  console.log(pricing);

  const OneTimeUsage = (used: number, candidateUsed: number, pricingId: string | null) => {
    const limits = pricingLimits.find(pl => pl.pricingId === pricingId) || { assessmentsLimit: 100000000, candidatesLimit: 100000000 };
    return {
      assessments: { used, total: limits.assessmentsLimit || 100000000 },
      candidates: { used: candidateUsed, total: limits.candidatesLimit || 100000000 },
    };
  };

  const subscriptionData = {
    plan: pricing?.priceId === 'free' ? 'Free' : '',
    status: pricing?.status,
    startDate: pricing?.priceId === 'free' ? null : pricing?.startDate ? new Date(pricing?.startDate).toLocaleDateString() : null,
    endDate: pricing?.priceId === 'free' ? null : pricing?.endDate ? new Date(pricing?.endDate).toLocaleDateString() : null,
    cost: pricing?.priceId === 'free' ? 'Free' : `$${pricing?.amount}/month`,
    renewalDate: pricing?.priceId === 'free' ? null : pricing?.nextBillDate ? new Date(pricing?.nextBillDate).toLocaleDateString() : null,
    usage: OneTimeUsage(usage?.assessments || 0, usage?.candidates || 0, pricing?.priceId || null),
  };

  const [mutate] = useManageSubscriptionMutation();
  const [cancelMutate] = useCancelSubscriptionMutation();
  const router = useRouter();

  const cancelSubscription = async () => {
    const res = await cancelMutate({ subscriptionId: pricing.subscriptionId ?? '' }).unwrap();
  };

  const manageSubscription = async () => {
    const res = await mutate({ subscriptionId: pricing.subscriptionId ?? '' }).unwrap();

    if (res?.url) router.push(res.url);
  };

  return (
    <div className="w-full p-4 h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 h-full">
        <h2 className="text-xl font-bold mb-6">Plan & Billing</h2>

        {/* Current Plan Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Current plan</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">{subscriptionData.cost}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                {subscriptionData.plan}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                {subscriptionData.status}
              </span>
              {pricing?.isCancled && (
                <Chip color="primary" isDisabled>
                  Canceled
                </Chip>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Start Date: <span className="font-semibold">{subscriptionData.startDate || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            End Date: <span className="font-semibold">{subscriptionData.endDate || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Renewal Date: <span className="font-semibold">{subscriptionData.renewalDate || 'N/A'}</span>
          </p>
        </div>

        {/* Usage Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Usage</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Assessments */}
            <div className="bg-gray-100 p-4 rounded-lg text-center flex-col flex items-center">
              <p className="text-sm text-gray-600">Assessments</p>
              <p className="text-xl font-bold">
                {subscriptionData.usage.assessments.used} of {subscriptionData.usage.assessments.total === 100000000 ? '∞' : subscriptionData.usage.assessments.total}
              </p>
              <Progress
                size="sm"
                radius="sm"
                value={(subscriptionData.usage.assessments.used / subscriptionData.usage.assessments.total) * 100}
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                showValueLabel={false}
              />
            </div>

            {/* Candidates */}
            <div className="bg-gray-100 p-4 rounded-lg text-center flex-col flex items-center">
              <p className="text-sm text-gray-600">Candidates</p>
              <p className="text-xl font-bold">
                {subscriptionData.usage.candidates.used} of {subscriptionData.usage.candidates.total === 100000000 ? 'Unlimited' : subscriptionData.usage.candidates.total}
              </p>
              <Progress
                size="sm"
                radius="sm"
                value={(subscriptionData.usage.candidates.used / subscriptionData.usage.candidates.total) * 100}
                classNames={{
                  base: "max-w-md",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                showValueLabel={false}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
      {pricing.priceId!=='free' &&  ( <><Button onClick={manageSubscription} color="danger" className="text-white">Manage Subscription</Button>
          <Button onClick={cancelSubscription} color="danger" className="text-white">Cancel Subscription</Button>
          </> )  }
          <CheckoutButton user={user} pricing={pricing} currentPricingId={pricing?.priceId}/>
        </div>
      </div>
    </div>
  );
};

export default UserPricing;

const pricingLimits = [{
  pricingId: 'free', assessmentsLimit: 1, candidatesLimit: 1
}, {
  pricingId: 'pri_01jc3hccwern15ex41rw5h7bz7', assessmentsLimit: 1, candidatesLimit: null,
}, {
  pricingId: 'pri_01jc3hehprwp718k0f247dpwqd', assessmentsLimit: 10, candidatesLimit: null
}, {
  pricingId: 'pri_01jc3hgpynvy9ac71829kq23t9', assessmentsLimit: 30, candidatesLimit: null
}];
