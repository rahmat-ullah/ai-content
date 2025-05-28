import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { BlogContent, BlogEntry } from '../CMSPanel'; // Adjust path as necessary

interface CMSBlogEditorProps {
  content: BlogContent;
  updateContent: (newBlogContent: BlogContent) => void;
}

const CMSBlogEditor: React.FC<CMSBlogEditorProps> = ({ content, updateContent }) => {
  const [posts, setPosts] = useState<BlogEntry[]>(content.posts);
  const [currentPost, setCurrentPost] = useState<BlogEntry | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setPosts(content.posts);
  }, [content.posts]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const handleCreateNewPost = () => {
    const newId = `post_${Date.now()}`;
    setCurrentPost({
      id: newId, 
      title: '',
      slug: '',
      content: '',
      author: '',
      publicationDate: new Date().toISOString(),
      tags: [],
      status: 'draft',
      excerpt: '',
    });
    setIsEditing(true);
  };

  const handleSelectPost = (post: BlogEntry) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleSavePost = () => {
    if (!currentPost) return;

    let updatedPosts;
    const existingPost = posts.find(p => p.id === currentPost.id);

    if (existingPost) {
      updatedPosts = posts.map(p => (p.id === currentPost.id ? currentPost : p));
    } else {
      updatedPosts = [...posts, currentPost];
    }
    
    setPosts(updatedPosts);
    updateContent({ posts: updatedPosts });
    handleBackToList();
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const updatedPosts = posts.filter(p => p.id !== postId);
      setPosts(updatedPosts);
      updateContent({ posts: updatedPosts });

      if (currentPost?.id === postId) {
        setIsEditing(false);
        setCurrentPost(null);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentPost) return;
    const { name, value } = e.target;

    if (name === "title") {
        const newSlug = currentPost.slug === '' || currentPost.slug === generateSlug(currentPost.title) 
                        ? generateSlug(value) 
                        : currentPost.slug;
        setCurrentPost({ ...currentPost, [name]: value, slug: newSlug });
    } else if (name === "tags") {
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      setCurrentPost({ ...currentPost, tags: tagsArray });
    } else {
      setCurrentPost({ ...currentPost, [name]: value });
    }
  };
  
  const handleQuillChange = (value: string) => {
    if (!currentPost) return;
    setCurrentPost({ ...currentPost, content: value });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const commonInputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary focus:outline-none sm:text-sm";

  if (isEditing && currentPost) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-start">
            <button 
                onClick={handleBackToList} 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-150 text-sm font-medium"
            >
                Back to List
            </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{posts.find(p => p.id === currentPost.id) ? 'Edit Post' : 'Create New Post'}</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              value={currentPost.title} 
              onChange={handleInputChange}
              className={commonInputClass}
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input 
              type="text" 
              name="slug" 
              id="slug" 
              value={currentPost.slug} 
              onChange={handleInputChange}
              className={commonInputClass}
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              type="text" 
              name="author" 
              id="author" 
              value={currentPost.author} 
              onChange={handleInputChange}
              className={commonInputClass}
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input 
              type="text" 
              name="tags" 
              id="tags" 
              value={currentPost.tags.join(', ')} 
              onChange={handleInputChange}
              className={commonInputClass}
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea 
              name="excerpt" 
              id="excerpt" 
              value={currentPost.excerpt} 
              onChange={handleInputChange}
              rows={4}
              className={commonInputClass}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              id="status"
              value={currentPost.status}
              onChange={handleInputChange}
              className={`${commonInputClass} bg-white`}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <ReactQuill 
              theme="snow" 
              value={currentPost.content} 
              onChange={handleQuillChange} 
              modules={quillModules}
              formats={quillFormats}
              className="bg-white rounded-md border border-gray-300" // Added border for consistency
            />
          </div>
        </div>

        <button 
          onClick={handleSavePost} 
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Save Post
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-start">
        <button 
          onClick={handleCreateNewPost} 
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create New Post
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Existing Blog Posts</h2>
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No blog posts yet. Click "Create New Post" to get started.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-150">
              <span 
                onClick={() => handleSelectPost(post)} 
                className="cursor-pointer text-lg font-medium text-primary hover:text-primary/90"
              >
                {post.title || 'Untitled Post'}
              </span>
              <div className="space-x-3">
                <button 
                  onClick={() => handleSelectPost(post)} 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePost(post.id)} 
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-150"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CMSBlogEditor;
