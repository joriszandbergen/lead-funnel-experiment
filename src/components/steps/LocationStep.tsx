import React from 'react';
import { FormData } from '../../types/form';
import { Input } from '../ui/Input';

import { MapPin } from 'lucide-react';

interface LocationStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ formData, updateFormData }) => {
    const [isValidating, setIsValidating] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const validateAddress = async () => {
            const cleanPostalCode = formData.postalCode.replace(/\s/g, '');

            if (cleanPostalCode.length === 6 && formData.houseNumber) {
                setIsValidating(true);
                setError(null);

                try {
                    const response = await fetch(
                        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${cleanPostalCode}+${formData.houseNumber}&fq=type:adres&rows=1`
                    );

                    if (!response.ok) throw new Error('Failed to fetch address');

                    const data = await response.json();

                    if (data.response.numFound > 0) {
                        const address = data.response.docs[0];
                        updateFormData({
                            street: address.straatnaam,
                            city: address.woonplaatsnaam
                        });
                    } else {
                        setError('Address not found');
                        updateFormData({ street: '', city: '' });
                    }
                } catch (err) {
                    console.error('Address validation error:', err);
                    setError('Could not verify address');
                    updateFormData({ street: '', city: '' });
                } finally {
                    setIsValidating(false);
                }
            }
        };

        const timeoutId = setTimeout(validateAddress, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.postalCode, formData.houseNumber, updateFormData]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Where is the house located?</h2>
                <p className="text-gray-500">We need to check if we operate in your area.</p>
            </div>

            <div className="space-y-4">
                <Input
                    label="Postal Code"
                    placeholder="1234 AB"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData({ postalCode: e.target.value.toUpperCase() })}
                    icon={MapPin}
                    maxLength={7}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="House Number"
                        placeholder="10"
                        value={formData.houseNumber}
                        onChange={(e) => updateFormData({ houseNumber: e.target.value })}
                    />
                    <Input
                        label="Addition (Optional)"
                        placeholder="A"
                        value={formData.houseNumberAddition}
                        onChange={(e) => updateFormData({ houseNumberAddition: e.target.value })}
                    />
                </div>

                {/* Validation Status */}
                <div className="min-h-[24px]">
                    {isValidating && (
                        <p className="text-sm text-blue-600 flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            Checking address...
                        </p>
                    )}

                    {!isValidating && error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    {!isValidating && !error && formData.street && formData.city && (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center animate-in fade-in zoom-in">
                            <p className="text-sm text-green-800 font-medium">Address found:</p>
                            <p className="text-green-900 font-bold text-lg">
                                {formData.street} {formData.houseNumber}{formData.houseNumberAddition ? ` ${formData.houseNumberAddition}` : ''}
                            </p>
                            <p className="text-green-700">{formData.postalCode} {formData.city}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
