import { useState } from 'react';
import { motion } from 'framer-motion';

interface CMSHeroEditorProps {
  content: any;
  updateContent: (newContent: any) => void;
}

const CMSHeroEditor = ({ content, updateContent }: CMSHeroEditorProps) => {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalContent({
      ...localContent,
      [name]: value
    });
    updateContent({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Hero Section</h2>
      <p className="text-gray-600">Edit the main hero section content that appears at the top of your landing page.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
            Headline
          </label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={localContent.headline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="subheadline" className="block text-sm font-medium text-gray-700 mb-1">
            Subheadline
          </label>
          <textarea
            id="subheadline"
            name="subheadline"
            value={localContent.subheadline}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-1">
            CTA Button Text
          </label>
          <input
            type="text"
            id="ctaText"
            name="ctaText"
            value={localContent.ctaText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="secondaryCtaText" className="block text-sm font-medium text-gray-700 mb-1">
            Secondary CTA Text
          </label>
          <input
            type="text"
            id="secondaryCtaText"
            name="secondaryCtaText"
            value={localContent.secondaryCtaText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="trustText" className="block text-sm font-medium text-gray-700 mb-1">
            Trust Text
          </label>
          <input
            type="text"
            id="trustText"
            name="trustText"
            value={localContent.trustText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Preview</h3>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h1 className="text-2xl font-bold">{localContent.headline}</h1>
          <p className="mt-2 text-gray-600">{localContent.subheadline}</p>
          <div className="mt-4 flex space-x-4">
            <motion.button
              className="bg-primary text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              {localContent.ctaText}
            </motion.button>
            <motion.button
              className="border border-primary text-primary px-4 py-2 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              {localContent.secondaryCtaText}
            </motion.button>
          </div>
          <p className="mt-4 text-sm text-gray-500">{localContent.trustText}</p>
        </div>
      </div>
    </div>
  );
};

export default CMSHeroEditor;
