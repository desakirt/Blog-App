import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Edit2, MessageSquare } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, comments, deletePost, addComment, deleteComment } = useBlog();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  const post = posts.find(p => p.id === id);
  const postComments = comments.filter(comment => comment.postId === id);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                alt={post.author}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{post.author}</h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            {user && user.id === post.authorId && (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="p-2 text-gray-500 hover:text-indigo-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="prose max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
        
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-600 mb-8">Please log in to comment.</p>
        )}

        <div className="space-y-6">
          {postComments.map(comment => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`}
                    alt={comment.author}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                {user && user.id === comment.authorId && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
          
          {postComments.length === 0 && (
            <p className="text-gray-600 text-center py-4">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};