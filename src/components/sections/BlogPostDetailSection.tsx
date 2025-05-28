import React from 'react';
import { BlogEntry } from '../cms/CMSPanel'; // Adjust path as needed

interface BlogPostDetailSectionProps {
  post: BlogEntry;
  onClose: () => void; // Function to go back to the list view
}

const BlogPostDetailSection: React.FC<BlogPostDetailSectionProps> = ({ post, onClose }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <button
          onClick={onClose}
          className="mb-8 text-primary hover:text-primary-dark font-medium transition-colors flex items-center group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 transition-transform duration-150 group-hover:-translate-x-1"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Blog List
        </button>

        <article 
          className="prose lg:prose-xl max-w-3xl mx-auto bg-gray-50 p-6 md:p-10 rounded-xl shadow-soft border border-gray-100 
                     prose-headings:text-gray-800 prose-a:text-primary hover:prose-a:text-primary-dark 
                     prose-strong:text-gray-700 prose-blockquote:border-primary prose-blockquote:text-gray-600
                     prose-code:bg-gray-200 prose-code:p-1 prose-code:rounded prose-code:text-sm
                     prose-img:rounded-lg prose-img:shadow-md"
        >
          <h1>{post.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
            <span className="mr-3">By {post.author}</span>
            <span className="mr-3">|</span>
            <span className="mr-3">Published on {new Date(post.publicationDate).toLocaleDateString()}</span>
            {post.tags && post.tags.length > 0 && <span className="mr-1">|</span>}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-block bg-primary-50 text-primary rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-1 mt-1">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Render HTML content from rich text editor */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </section>
  );
};

export default BlogPostDetailSection;
