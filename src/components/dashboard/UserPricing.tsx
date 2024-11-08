'use client';
import { SelectPricing } from '@/db/schema/schema';
import { Button, Progress } from '@nextui-org/react';
import React from 'react';
import CheckoutButton from '../payment/CheckOutButton';

const UserPricing = ({ pricing }: { pricing: SelectPricing }) => {
  const subscriptionData = {
    plan: pricing.priceId === 'free' ? 'Free' : pricing.priceId,
    status: pricing.status,
    startDate: pricing.priceId === 'free' ? null : pricing.startDate ? new Date(pricing.startDate).toLocaleDateString() : null,
    endDate: pricing.priceId === 'free' ? null : pricing.endDate ? new Date(pricing.endDate).toLocaleDateString() : null,
    cost: pricing.priceId === 'free' ? 'Free' : `$${pricing.amount}/month`,
    renewalDate: pricing.priceId === 'free' ? null : pricing.nextBillDate ? new Date(pricing.nextBillDate).toLocaleDateString() : null,
    usage: OneTimeUsage(1,1),
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
          <p className="text-sm text-gray-600 mb-4">Your usage is renewed every month.</p>
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
          <Button color="danger" className="text-white">Cancel subscription</Button>
          <Button color="primary" className="text-white">Manage payments</Button>
          <CheckoutButton currentPricingId={pricing.priceId}/>
        </div>
      </div>
    </div>
  );
};

export default UserPricing;

const OneTimeUsage = (used: number,candidateUsed: number) => {
  return {
    assessments: { used, total: 1 },
    candidates: { used:candidateUsed, total: 1 },
  };
};
