import React from 'react';
import { FormData } from '../../types/form';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Home, Building2, Warehouse, Building, Thermometer, ThermometerSun, Snowflake, Wind } from 'lucide-react';

interface HomeDetailsStepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export const HomeDetailsStep: React.FC<HomeDetailsStepProps> = ({ formData, updateFormData }) => {
    const houseTypes = [
        { id: 'detached', label: 'Detached', icon: Home },
        { id: 'semi-detached', label: 'Semi-detached', icon: Building2 },
        { id: 'terraced', label: 'Terraced', icon: Warehouse },
        { id: 'apartment', label: 'Apartment', icon: Building },
    ];

    const insulationTypes = [
        { id: 'poor', label: 'Poor', description: 'Single glazing, no wall insulation', icon: Snowflake },
        { id: 'average', label: 'Average', description: 'Double glazing, some insulation', icon: Wind },
        { id: 'good', label: 'Good', description: 'HR++ glass, good insulation', icon: Thermometer },
        { id: 'excellent', label: 'Excellent', description: 'Triple glazing, full insulation', icon: ThermometerSun },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your home</h2>
                <p className="text-gray-500">This helps us calculate your potential savings.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Type of House</label>
                    <div className="grid grid-cols-2 gap-3">
                        {houseTypes.map((type) => (
                            <Card
                                key={type.id}
                                selected={formData.houseType === type.id}
                                onClick={() => updateFormData({ houseType: type.id as any })}
                                className="text-center py-4 flex flex-col items-center gap-3"
                            >
                                <type.icon className={`w-8 h-8 ${formData.houseType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className="font-medium">{type.label}</span>
                            </Card>
                        ))}
                    </div>
                </div>

                <Input
                    label="Year of Construction"
                    type="number"
                    placeholder="e.g. 1995"
                    value={formData.buildYear}
                    onChange={(e) => updateFormData({ buildYear: e.target.value })}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Insulation Level</label>
                    <div className="space-y-3">
                        {insulationTypes.map((type) => (
                            <Card
                                key={type.id}
                                selected={formData.insulation === type.id}
                                onClick={() => updateFormData({ insulation: type.id as any })}
                                className="flex items-center gap-4 p-4"
                            >
                                <div className={`p-2 rounded-lg ${formData.insulation === type.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <type.icon className={`w-6 h-6 ${formData.insulation === type.id ? 'text-blue-600' : 'text-gray-500'}`} />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-sm text-gray-500">{type.description}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
