import { useState } from 'react';

interface CMSFeatureEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  updateContent: (newContent: Partial<CMSFeatureEditorProps['content']>) => void;
}

const CMSFeatureEditor = ({ content, updateContent }: CMSFeatureEditorProps) => {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const addNewFeature = () => {
    const newFeature = {
      title: 'New Feature',
      description: 'Feature description'
    };
    
    const updatedItems = [...localContent.items, newFeature];
    
    setLocalContent({
      ...localContent,
      items: updatedItems
    });
    
    updateContent({ items: updatedItems });
  };

  const removeFeature = (index: number) => {
    const updatedItems = localContent.items.filter((_, i) => i !== index);
    
    setLocalContent({
      ...localContent,
      items: updatedItems
    });
    
    updateContent({ items: updatedItems });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Features Section</h2>
      <p className="text-gray-600">Edit the features section content and individual feature items.</p>
      
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Feature Items</h3>
          <button
            onClick={addNewFeature}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Feature
          </button>
        </div>
        
        {localContent.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No features added yet. Click "Add New Feature" to get started.</p>
          </div>
        ) : (
          localContent.items.map((item, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Feature {index + 1}</h4>
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Remove feature"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor={`item-${index}-title`} className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id={`item-${index}-title`}
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor={`item-${index}-description`} className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id={`item-${index}-description`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CMSFeatureEditor;
