import { IoMdClock } from "react-icons/io";
import { MdEventNote } from "react-icons/md";

const CircularSteps = ({currentStep}:{currentStep:number}) => {
    const steps = [
      { step: 1, title: "Role Details", icon: <MdEventNote /> },
      { step: 2, title: "Choose tests", icon: <IoMdClock /> },
      { step: 3, title: "Add questions", icon: <IoMdClock /> },
    ];
  
    return (
      <div className="flex justify-center items-center w-screen space-x-4">
        {steps.map(({ step, title }, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <div
                className={`flex justify-center items-center w-12 h-12 rounded-full text-white text-xl font-bold ${
                  index === currentStep-1 ? "bg-pink-500" : "bg-gray-300 text-gray-700"
                }`}
              >
                {step}
              </div>
              <div className="mt-2 text-sm text-gray-700">{title}</div>
            </div>
  
            {/* Line Between Steps */}
            {index !== steps.length - 1 && (
              <div className="w-24 h-px bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  export default CircularSteps