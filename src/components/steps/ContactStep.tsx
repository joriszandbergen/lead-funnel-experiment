import React from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';
import { User, Mail, Phone, Send } from 'lucide-react';

interface ContactStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({ formData, updateFormData }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your personal quote</h2>
                <p className="text-gray-500">We'll send the calculation to your email.</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => updateFormData({ firstName: e.target.value })}
                        icon={User}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => updateFormData({ lastName: e.target.value })}
                        icon={User}
                    />
                </div>

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    icon={Mail}
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    icon={Phone}
                />
            </div>
        </div>
    );
};
