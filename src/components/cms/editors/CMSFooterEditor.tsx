import { useState } from 'react';

interface CMSFooterEditorProps {
  content: {
    companyName: string;
    description: string;
    copyright: string;
    links: {
      product: Array<{ label: string; url: string }>;
      resources: Array<{ label: string; url: string }>;
      company: Array<{ label: string; url: string }>;
    };
    social: Array<{ platform: string; url: string }>;
  };
  updateContent: (newContent: any) => void;
}

const CMSFooterEditor = ({ content, updateContent }: CMSFooterEditorProps) => {
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
      <h2 className="text-2xl font-bold">Footer Section</h2>
      <p className="text-gray-600">Edit the footer content and links.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={localContent.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Company Description
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
          <label htmlFor="copyright" className="block text-sm font-medium text-gray-700 mb-1">
            Copyright Text
          </label>
          <input
            type="text"
            id="copyright"
            name="copyright"
            value={localContent.copyright}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Preview</h3>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h4 className="font-bold">{localContent.companyName}</h4>
          <p className="mt-2 text-gray-600">{localContent.description}</p>
          <p className="mt-4 text-sm text-gray-500">{localContent.copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default CMSFooterEditor;
