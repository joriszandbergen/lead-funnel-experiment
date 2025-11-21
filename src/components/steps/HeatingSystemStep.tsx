import React from 'react';
import { FormData } from '../../types/form';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Flame, Zap, Droplets, Building2, Gauge } from 'lucide-react';

interface HeatingSystemStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const HeatingSystemStep: React.FC<HeatingSystemStepProps> = ({ formData, updateFormData }) => {
    const heatingTypes = [
        { id: 'gas', label: 'Gas Boiler', icon: Flame },
        { id: 'electric', label: 'Electric Heating', icon: Zap },
        { id: 'district', label: 'District Heating', icon: Building2 },
        { id: 'oil', label: 'Oil Boiler', icon: Droplets },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flame className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Heating System</h2>
                <p className="text-gray-500">What are you currently using to heat your home?</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                    {heatingTypes.map((type) => (
                        <Card
                            key={type.id}
                            selected={formData.currentHeating === type.id}
                            onClick={() => updateFormData({ currentHeating: type.id as any })}
                            className="text-center py-6 flex flex-col items-center gap-3"
                        >
                            <type.icon className={`w-8 h-8 ${formData.currentHeating === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span className="font-medium">{type.label}</span>
                        </Card>
                    ))}
                </div>

                {formData.currentHeating === 'gas' && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <Input
                            label="Annual Gas Usage (m³)"
                            type="number"
                            placeholder="e.g. 1500"
                            value={formData.gasUsage || ''}
                            onChange={(e) => updateFormData({ gasUsage: e.target.value })}
                            icon={Gauge}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
