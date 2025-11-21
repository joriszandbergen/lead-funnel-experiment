'use client';

import React, { useState } from 'react';
import { FormData, initialFormData } from '../types/form';
import { LocationStep } from './steps/LocationStep';
import { HomeDetailsStep } from './steps/HomeDetailsStep';
import { HeatingSystemStep } from './steps/HeatingSystemStep';
import { ContactStep } from './steps/ContactStep';
import { ProgressBar } from './ui/ProgressBar';
import { Button } from './ui/Button';
import { CheckCircle } from 'lucide-react';

export const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const totalSteps = 4;

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        console.log('Form submitted:', formData);
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    We have received your details. One of our experts will contact you shortly with a personalized quote.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Start New Calculation
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="mb-8">
                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                </div>

                <div className="min-h-[400px] flex flex-col justify-between">
                    <div>
                        {currentStep === 1 && (
                            <LocationStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 2 && (
                            <HomeDetailsStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 3 && (
                            <HeatingSystemStep formData={formData} updateFormData={updateFormData} />
                        )}
                        {currentStep === 4 && (
                            <ContactStep formData={formData} updateFormData={updateFormData} />
                        )}
                    </div>

                    <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={currentStep === 1 ? 'invisible' : ''}
                        >
                            Back
                        </Button>

                        {currentStep < totalSteps ? (
                            <Button onClick={handleNext}>
                                Next Step
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Get Quote'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
