import { useState } from 'react';

interface CMSLogoEditorProps {
  content: {
    title: string;
    items: Array<{
      name: string;
      logo: string;
    }>;
  };
  updateContent: (newContent: Partial<CMSLogoEditorProps['content']>) => void;
}

const CMSLogoEditor = ({ content, updateContent }: CMSLogoEditorProps) => {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalContent({
      ...localContent,
      [name]: value
    });
    updateContent({ [name]: value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...localContent.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    setLocalContent({
      ...localContent,
      items: updatedItems
    });
    
    updateContent({ items: updatedItems });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Integration Logos Section</h2>
      <p className="text-gray-600">Edit the integration logos section title and company logos.</p>
      
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
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Company Logos</h3>
        
        {localContent.items.map((item, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <h4 className="font-medium mb-2">Logo {index + 1}</h4>
            
            <div className="space-y-3">
              <div>
                <label htmlFor={`item-${index}-name`} className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id={`item-${index}-name`}
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor={`item-${index}-logo`} className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  id={`item-${index}-logo`}
                  value={item.logo}
                  onChange={(e) => handleItemChange(index, 'logo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              {item.logo && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="h-12 object-contain bg-gray-100 p-2 rounded"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSLogoEditor;
