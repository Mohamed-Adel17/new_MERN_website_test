
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4, currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Sign In', path: '/login', active: step1, current: currentStep === 1 },
    { id: 2, name: 'Shipping', path: '/shipping', active: step2, current: currentStep === 2 },
    { id: 3, name: 'Payment', path: '/payment', active: step3, current: currentStep === 3 },
    { id: 4, name: 'Place Order', path: '/placeorder', active: step4, current: currentStep === 4 }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-full">
                {/* Step Circle */}
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step.current
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : step.active
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-gray-100 text-gray-400'
                }`}>
                  {step.active ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                    step.active ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>

              {/* Step Label */}
              <div className="mt-3 text-center">
                {step.active ? (
                  <Link
                    to={step.path}
                    className={`text-sm font-medium transition-colors ${
                      step.current ? 'text-blue-600' : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    {step.name}
                  </Link>
                ) : (
                  <span className={`text-sm font-medium ${
                    step.current ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                )}
              </div>

              {/* Step Status */}
              <div className="mt-1">
                {step.current && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Current
                  </span>
                )}
                {step.active && !step.current && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
                {!step.active && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Pending
                  </span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(currentStep / steps.length) * 100}%` 
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
