interface CMSSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const CMSSidebar = ({ activeSection, setActiveSection }: CMSSidebarProps) => {
  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'logos', label: 'Integration Logos' },
    { id: 'faq', label: 'FAQ' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'blog', label: 'Blog Posts' },
    { id: 'footer', label: 'Footer' },
  ];

  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Page Sections
        </h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CMSSidebar;
