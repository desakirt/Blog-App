import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PostPage } from './pages/PostPage';
import { EditPostPage } from './pages/EditPostPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <BlogProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/new-post" element={<EditPostPage />} />
                <Route path="/edit/:id" element={<EditPostPage />} />
              </Routes>
            </div>
          </BlogProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;