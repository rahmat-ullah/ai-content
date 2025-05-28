import React from 'react';
import { BlogEntry } from '../cms/CMSPanel'; // Adjust path as needed

interface BlogListSectionProps {
  posts: BlogEntry[];
}

const BlogListSection: React.FC<BlogListSectionProps> = ({ posts }) => {
  const publishedPosts = posts.filter(post => post.status === 'published');

  if (publishedPosts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Blog</h2>
          <p className="text-gray-600 text-lg">No posts published yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold block mb-2">LATEST INSIGHTS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            From Our Blog
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
              {/* Optional: Placeholder for post.coverImage */}
              {/* <img src={post.coverImage || 'https://via.placeholder.com/400x250'} alt={post.title} className="w-full h-48 object-cover" /> */}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  <a href={`#/blog/${post.slug}`} className="hover:underline">{post.title}</a>
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  By {post.author} on {new Date(post.publicationDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 pt-0 mt-auto">
                <a href={`#/blog/${post.slug}`} className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogListSection;
