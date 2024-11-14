import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Badge, Chip, SelectProps } from "@nextui-org/react";
import { MdCheckCircleOutline } from "react-icons/md";
import usePaddle from '@/service/usePaddle';
import { SelectPricing } from '@/db/schema/schema';

const pricingPlans = [
  {
    type: "One-Time Fee",
    pricingId: 'pri_01jc3hccwern15ex41rw5h7bz7',
    price: "$5 per Test",
    features: [
      "1 Custom Test Creation",
      "Unlimited Candidates (Send test to as many candidates as needed)",
      "Detailed Test Analytics (Performance breakdown, skills assessment)",
      "AI-Generated Questions (Based on job description or role)",
      "Customizable Test Formats (Modify test content and structure)"
    ]
  },
  {
    type: "Basic Monthly Plan",
    price: "$15/month",
    pricingId: 'pri_01jc3hehprwp718k0f247dpwqd',
    features: [
      "10 Custom Test Creation",
      "Unlimited Candidates (Send test to as many candidates as needed)",
      "Detailed Test Analytics (Performance breakdown, skills assessment)",
      "AI-Generated Questions (Based on job description or role)",
      "Customizable Test Formats (Modify test content and structure)",
      "Unlimited Test Generation (Modify or generate new test versions without limits)",
      "Create Comprehensive Tests (Combine pre-created expert tests to form advanced assessments)"
    ]
  },
  {
    type: "Pro Monthly Plan",
    price: "$28/month",
    pricingId: "pri_01jc3hgpynvy9ac71829kq23t9",
    features: [
      "30 Custom Test Creation",
      "Unlimited Candidates (Send test to as many candidates as needed)",
      "Detailed Test Analytics (Performance breakdown, skills assessment)",
      "AI-Generated Questions (Based on job description or role)",
      "Customizable Test Formats (Modify test content and structure)",
      "Unlimited Test Generation (Modify or generate new test versions without limits)",
      "Create Comprehensive Tests (Combine pre-created expert tests to form advanced assessments)"
    ]
  }
];

const PricingCards = ({ currentId,user,pricing }: { currentId: string,user:any,pricing: SelectPricing}) => {
  const paddle = usePaddle();
 
  const openCheckout = (priceId: string) => {
    paddle?.Checkout.open({

      
      items: [
        {
          priceId: priceId, // you can find it in the product catalog
          quantity: 1,
          
        },

      ],
    
      customer:costomerData(pricing),
      
      customData: {
        userId: user?.id,
      }
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
      {pricingPlans.map((plan, index) => (
        <Card
          key={index}
          className={`max-w-[400px] shadow-lg rounded-lg ${currentId === plan.pricingId ? 'border-2 border-blue-500' : ''}`}
        >
          {index === 2 && (<Chip className="bg-white">MOST POPULAR</Chip>)}
          <CardHeader className="flex flex-col gap-2 p-6">
            <h2 className="text-2xl font-semibold">{plan.type}</h2>
          </CardHeader>
          <Divider className={index === 2 ? "bg-gray-700" : "bg-gray-300"} />
          <CardBody className="p-6">
            <ul className="text-sm space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <MdCheckCircleOutline className={`w-[32px] h-[32px] ${index === 2 ? 'text-white' : 'text-black'}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </CardBody>
          <Divider className={index === 2 ? "bg-gray-700" : "bg-gray-300"} />
          <CardFooter className="flex justify-between items-center p-6">
            <p className="text-lg font-bold">{plan.price}</p>
            <Button 
              isDisabled={currentId === plan.pricingId} 
              onClick={() => {
                
                openCheckout(plan.pricingId);
              }} 
              className={`${index === 2 ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {currentId === plan.pricingId ? 'Current Plan' : 'Choose Plan'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PricingCards;
const costomerData=( pricing:SelectPricing)=>{
 return  pricing.customerId ?  {id:pricing.customerId,email:pricing.email}:{} as any
}