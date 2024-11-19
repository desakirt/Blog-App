import React from 'react';
import { PostCard } from '../components/PostCard';
import { useBlog } from '../context/BlogContext';

export const HomePage: React.FC = () => {
  const { posts } = useBlog();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">No posts yet</h2>
          <p className="mt-2 text-gray-600">Be the first to create a post!</p>
        </div>
      )}
    </div>
  );
};