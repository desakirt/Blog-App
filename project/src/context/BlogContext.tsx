import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Post, Comment } from '../types';
import { samplePosts, sampleComments } from '../utils/sampleData';

interface BlogContextType {
  posts: Post[];
  comments: Comment[];
  addPost: (title: string, content: string) => void;
  updatePost: (id: string, title: string, content: string) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, content: string) => void;
  deleteComment: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : samplePosts;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : sampleComments;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addPost = (title: string, content: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      authorId: user.id,
      author: user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: string, title: string, content: string) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, title, content, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    setComments(comments.filter(comment => comment.postId !== id));
  };

  const addComment = (postId: string, content: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      authorId: user.id,
      author: user.username,
      postId,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <BlogContext.Provider value={{
      posts,
      comments,
      addPost,
      updatePost,
      deletePost,
      addComment,
      deleteComment,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};