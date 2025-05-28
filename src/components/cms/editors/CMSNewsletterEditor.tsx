import { useState } from 'react';

interface CMSNewsletterEditorProps {
  content: {
    title: string;
    description: string;
    buttonText: string;
    privacyText: string;
  };
  updateContent: (newContent: Partial<CMSNewsletterEditorProps['content']>) => void;
}

const CMSNewsletterEditor = ({ content, updateContent }: CMSNewsletterEditorProps) => {
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
      <h2 className="text-2xl font-bold">Newsletter Section</h2>
      <p className="text-gray-600">Edit the newsletter signup section content.</p>
      
      <div className="space-y-4">
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
        
        <div>
          <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
            Button Text
          </label>
          <input
            type="text"
            id="buttonText"
            name="buttonText"
            value={localContent.buttonText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="privacyText" className="block text-sm font-medium text-gray-700 mb-1">
            Privacy Text
          </label>
          <input
            type="text"
            id="privacyText"
            name="privacyText"
            value={localContent.privacyText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Preview</h3>
        <div className="bg-primary p-6 rounded-lg text-white">
          <h2 className="text-xl font-bold">{localContent.title}</h2>
          <p className="mt-2">{localContent.description}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="flex-grow px-4 py-2 bg-white rounded-full text-gray-400">
              Enter your email address
            </div>
            <button className="px-4 py-2 bg-white text-primary rounded-full font-medium">
              {localContent.buttonText}
            </button>
          </div>
          <p className="mt-2 text-sm text-white/70">{localContent.privacyText}</p>
        </div>
      </div>
    </div>
  );
};

export default CMSNewsletterEditor;
