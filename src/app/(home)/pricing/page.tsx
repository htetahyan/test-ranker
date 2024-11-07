import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Badge, Chip } from "@nextui-org/react";
import { MdCheckCircleOutline } from "react-icons/md";


const pricingPlans = [
  {
    type: "One-Time Fee",
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

const  PricingPage=()=> {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8">
      <h1 className="text-3xl mt-20 font-bold text-gray-800 mb-8">Pricing Plans</h1>
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
        {pricingPlans.map((plan, index) => (
          <Card key={index} className={`max-w-[400px] ${index === 2 ? "bg-gray-900 text-white" : "bg-white text-black"} shadow-lg rounded-lg`}>
            {index === 2 && (
              <Chip  className="  bg-white">
                MOST POPULAR
              </Chip>
            )}
            <CardHeader className="flex flex-col gap-2 p-6">
              <h2 className="text-2xl font-semibold">{plan.type}</h2>
            </CardHeader>
            <Divider className={index === 2 ? "bg-gray-700" : "bg-gray-300"} />
            <CardBody className="p-6">
              <ul className="text-sm space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                  <span  className={` "+ ${index===2 ?'text-white':'text-black'}`}>  <MdCheckCircleOutline className="w-[32px] h-[32px]" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardBody>
            <Divider className={index === 2 ? "bg-gray-700" : "bg-gray-300"} />
            <CardFooter className="flex justify-between items-center p-6">
              <p className="text-lg font-bold">{plan.price}</p>
              <Button
                
               
                className={`${index===2?'bg-white text-black':'bg-black text-white'}`}
              >
                Start now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default PricingPage