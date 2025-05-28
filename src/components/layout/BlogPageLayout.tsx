import React from 'react';
import { BlogEntry } from '../cms/CMSPanel'; // Adjust path as needed
import BlogListSection from '../sections/BlogListSection';
import BlogPostDetailSection from '../sections/BlogPostDetailSection';

interface BlogPageLayoutProps {
  posts: BlogEntry[];
  selectedPost: BlogEntry | null;
  // currentPostSlug: string | null; // Not strictly needed here if selectedPost is derived correctly in App.tsx
  onCloseDetailView: () => void; // To navigate back to blog list view
}

const BlogPageLayout: React.FC<BlogPageLayoutProps> = ({ posts, selectedPost, onCloseDetailView }) => {
  return (
    <>
      {selectedPost ? (
        <BlogPostDetailSection post={selectedPost} onClose={onCloseDetailView} />
      ) : (
        <BlogListSection posts={posts} />
      )}
    </>
  );
};

export default BlogPageLayout;
