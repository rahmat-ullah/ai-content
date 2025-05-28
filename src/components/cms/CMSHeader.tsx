import { motion } from 'framer-motion';

interface CMSHeaderProps {
  saveContent: () => void;
  isSaving: boolean;
  saveStatus: string;
}

const CMSHeader = ({ saveContent, isSaving, saveStatus }: CMSHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">
          AI Content Generator CMS
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {saveStatus && (
          <span className={`text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </span>
        )}
        
        <motion.button
          className={`px-4 py-2 rounded-md font-medium ${
            isSaving 
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-600'
          }`}
          onClick={saveContent}
          disabled={isSaving}
          whileHover={!isSaving ? { scale: 1.05 } : {}}
          whileTap={!isSaving ? { scale: 0.95 } : {}}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </header>
  );
};

export default CMSHeader;
