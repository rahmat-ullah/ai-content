import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// CMS Panel Components
import CMSHeader from './CMSHeader';
import CMSSidebar from './CMSSidebar';
import CMSHeroEditor from './editors/CMSHeroEditor';
import CMSFeatureEditor from './editors/CMSFeatureEditor';
import CMSTestimonialEditor from './editors/CMSTestimonialEditor';
import CMSPricingEditor from './editors/CMSPricingEditor';
import CMSLogoEditor from './editors/CMSLogoEditor';
import CMSFAQEditor from './editors/CMSFAQEditor';
import CMSNewsletterEditor from './editors/CMSNewsletterEditor';
import CMSFooterEditor from './editors/CMSFooterEditor';
import CMSBlogEditor from './editors/CMSBlogEditor';

// Default content data
import { defaultContent } from '../../data/defaultContent';

// Define content type
// Ensure BlogEntry and BlogContent are exported for use in other components
export interface BlogEntry {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content from rich text editor
  author: string;
  publicationDate: string; // ISO date string
  tags: string[];
  status: 'draft' | 'published';
  excerpt: string;
  // AddcoverImage?: string; // Optional: URL to a cover image
}

export interface BlogContent {
  posts: BlogEntry[];
  // We can add other blog-wide settings here later if needed
  // e.g., defaultAuthor: string;
}

export interface ContentType {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    secondaryCtaText: string;
    trustText: string;
  };
  features: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  testimonials: {
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
  pricing: {
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
  logos: {
    title: string;
    items: Array<{
      name: string;
      logo: string;
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
    privacyText: string;
  };
  footer: {
    companyName: string;
    description: string;
    links: {
      product: Array<{ label: string; url: string }>;
      resources: Array<{ label: string; url: string }>;
      company: Array<{ label: string; url: string }>;
    };
    social: Array<{ platform: string; url: string }>;
    copyright: string;
  };
  blog: BlogContent;
}

const CMSPanel = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('cmsContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Failed to parse saved content:', error);
      }
    }
  }, []);

  // Save content to localStorage
  const saveContent = () => {
    setIsSaving(true);
    setSaveStatus('Saving...');
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        localStorage.setItem('cmsContent', JSON.stringify(content));
        setSaveStatus('Saved successfully!');
        
        // Clear status message after 3 seconds
        setTimeout(() => {
          setSaveStatus('');
        }, 3000);
      } catch (error) {
        setSaveStatus('Error saving content');
        console.error('Failed to save content:', error);
      }
      setIsSaving(false);
    }, 800);
  };

  // Update specific section content
  const updateSectionContent = (section: keyof ContentType, newContent: Partial<ContentType[keyof ContentType]>) => {
    setContent(prevContent => ({
      ...prevContent,
      [section]: {
        ...prevContent[section],
        ...newContent
      }
    }));
  };

  // Toggle CMS panel visibility
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Render active editor component based on selected section
  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <CMSHeroEditor 
            content={content.hero} 
            updateContent={(newContent: Partial<ContentType['hero']>) => updateSectionContent('hero', newContent)} 
          />
        );
      case 'features':
        return (
          <CMSFeatureEditor 
            content={content.features} 
            updateContent={(newContent: Partial<ContentType['features']>) => updateSectionContent('features', newContent)} 
          />
        );
      case 'testimonials':
        return (
          <CMSTestimonialEditor 
            content={content.testimonials} 
            updateContent={(newContent: Partial<ContentType['testimonials']>) => updateSectionContent('testimonials', newContent)} 
          />
        );
      case 'pricing':
        return (
          <CMSPricingEditor 
            content={content.pricing} 
            updateContent={(newContent: Partial<ContentType['pricing']>) => updateSectionContent('pricing', newContent)} 
          />
        );
      case 'logos':
        return (
          <CMSLogoEditor 
            content={content.logos} 
            updateContent={(newContent: Partial<ContentType['logos']>) => updateSectionContent('logos', newContent)} 
          />
        );
      case 'faq':
        return (
          <CMSFAQEditor 
            content={content.faq} 
            updateContent={(newContent: Partial<ContentType['faq']>) => updateSectionContent('faq', newContent)} 
          />
        );
      case 'newsletter':
        return (
          <CMSNewsletterEditor 
            content={content.newsletter} 
            updateContent={(newContent: Partial<ContentType['newsletter']>) => updateSectionContent('newsletter', newContent)} 
          />
        );
      case 'footer':
        return (
          <CMSFooterEditor 
            content={content.footer} 
            updateContent={(newContent: Partial<ContentType['footer']>) => updateSectionContent('footer', newContent)} 
          />
        );
      case 'blog':
        return (
          <CMSBlogEditor
            content={content.blog}
            updateContent={(newBlogContent: BlogContent) => updateSectionContent('blog', newBlogContent)}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <>
      {/* CMS Toggle Button */}
      <motion.button
        className="fixed top-20 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={togglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        )}
      </motion.button>

      {/* CMS Panel */}
      <motion.div
        className={`fixed inset-0 z-40 bg-white shadow-xl flex flex-col ${isOpen ? 'block' : 'hidden'}`}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <CMSHeader 
          saveContent={saveContent} 
          isSaving={isSaving} 
          saveStatus={saveStatus} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          <CMSSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {renderEditor()}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CMSPanel;
