import { useState } from 'react';

interface CMSPricingEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    plans: Array<{
      name: string;
      description: string;
      monthlyPrice: number;
      annualPrice: number;
      features: string[];
      cta: string;
      popular: boolean;
    }>;
  };
  updateContent: (newContent: Partial<CMSPricingEditorProps['content']>) => void;
}

const CMSPricingEditor = ({ content, updateContent }: CMSPricingEditorProps) => {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalContent({
      ...localContent,
      [name]: value
    });
    updateContent({ [name]: value });
  };

  const handlePlanChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedPlans = [...localContent.plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [field]: value
    };
    
    setLocalContent({
      ...localContent,
      plans: updatedPlans
    });
    
    updateContent({ plans: updatedPlans });
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...localContent.plans];
    const updatedFeatures = [...updatedPlans[planIndex].features];
    updatedFeatures[featureIndex] = value;
    
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures
    };
    
    setLocalContent({
      ...localContent,
      plans: updatedPlans
    });
    
    updateContent({ plans: updatedPlans });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pricing Section</h2>
      <p className="text-gray-600">Edit the pricing section content and individual pricing plans.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Section Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={localContent.subtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={localContent.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Section Description
          </label>
          <textarea
            id="description"
            name="description"
            value={localContent.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Pricing Plans</h3>
        
        {localContent.plans.map((plan, planIndex) => (
          <div key={planIndex} className="mb-8 p-4 border border-gray-200 rounded-md">
            <h4 className="font-medium mb-2">Plan {planIndex + 1}</h4>
            
            <div className="space-y-4">
              <div>
                <label htmlFor={`plan-${planIndex}-name`} className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  id={`plan-${planIndex}-name`}
                  value={plan.name}
                  onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor={`plan-${planIndex}-description`} className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Description
                </label>
                <textarea
                  id={`plan-${planIndex}-description`}
                  value={plan.description}
                  onChange={(e) => handlePlanChange(planIndex, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`plan-${planIndex}-monthly`} className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Price
                  </label>
                  <input
                    type="number"
                    id={`plan-${planIndex}-monthly`}
                    value={plan.monthlyPrice}
                    onChange={(e) => handlePlanChange(planIndex, 'monthlyPrice', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor={`plan-${planIndex}-annual`} className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Price (per month)
                  </label>
                  <input
                    type="number"
                    id={`plan-${planIndex}-annual`}
                    value={plan.annualPrice}
                    onChange={(e) => handlePlanChange(planIndex, 'annualPrice', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`plan-${planIndex}-cta`} className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  id={`plan-${planIndex}-cta`}
                  value={plan.cta}
                  onChange={(e) => handlePlanChange(planIndex, 'cta', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`plan-${planIndex}-popular`}
                  checked={plan.popular}
                  onChange={(e) => handlePlanChange(planIndex, 'popular', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`plan-${planIndex}-popular`} className="ml-2 block text-sm text-gray-700">
                  Mark as Popular
                </label>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Features</h5>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder={`Feature ${featureIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSPricingEditor;
