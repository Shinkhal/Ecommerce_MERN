import React from "react";
import {
  FaShippingFast,
  FaClipboardCheck,
  FaUniversity,
} from "react-icons/fa";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <FaShippingFast className="text-xl" />,
    },
    {
      label: "Confirm Order",
      icon: <FaClipboardCheck className="text-xl" />,
    },
    {
      label: "Payment",
      icon: <FaUniversity className="text-xl" />,
    },
  ];

  return (
    <div className="flex justify-between items-center w-full max-w-3xl mx-auto mt-8">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <div key={index} className="flex flex-col items-center text-center w-full relative">
            {/* Line between steps */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1 z-0 ${
                  activeStep > index ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}

            {/* Step Icon */}
            <div
              className={`z-10 w-10 h-10 flex items-center justify-center rounded-full text-white mb-2 ${
                isCompleted || isActive ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {step.icon}
            </div>

            {/* Label */}
            <div
              className={`text-sm font-medium ${
                isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
