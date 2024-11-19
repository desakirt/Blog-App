import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Heart } from 'lucide-react';
import type { Post } from '../types';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { comments } = useBlog();
  const { user } = useAuth();
  const postComments = comments.filter(comment => comment.postId === post.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
            alt={post.author}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-red-500">
              <Heart className="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <Link to={`/post/${post.id}`} className="flex items-center text-gray-500 hover:text-indigo-600">
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>{postComments.length}</span>
            </Link>
          </div>
          
          {user && user.id === post.authorId && (
            <Link
              to={`/edit/${post.id}`}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Edit post
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};