import { useState } from 'react';

interface CMSTestimonialEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      quote: string;
      author: string;
      position: string;
      avatar: string;
    }>;
  };
  updateContent: (newContent: Partial<CMSTestimonialEditorProps['content']>) => void;
}

const CMSTestimonialEditor = ({ content, updateContent }: CMSTestimonialEditorProps) => {
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Testimonials Section</h2>
      <p className="text-gray-600">Edit the testimonials section content and individual testimonial items.</p>
      
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
        <h3 className="text-lg font-medium mb-4">Testimonial Items</h3>
        
        {localContent.items.map((item, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <h4 className="font-medium mb-2">Testimonial {index + 1}</h4>
            
            <div className="space-y-3">
              <div>
                <label htmlFor={`item-${index}-quote`} className="block text-sm font-medium text-gray-700 mb-1">
                  Quote
                </label>
                <textarea
                  id={`item-${index}-quote`}
                  value={item.quote}
                  onChange={(e) => handleItemChange(index, 'quote', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor={`item-${index}-author`} className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  id={`item-${index}-author`}
                  value={item.author}
                  onChange={(e) => handleItemChange(index, 'author', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor={`item-${index}-position`} className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Company
                </label>
                <input
                  type="text"
                  id={`item-${index}-position`}
                  value={item.position}
                  onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor={`item-${index}-avatar`} className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL
                </label>
                <input
                  type="text"
                  id={`item-${index}-avatar`}
                  value={item.avatar}
                  onChange={(e) => handleItemChange(index, 'avatar', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSTestimonialEditor;
