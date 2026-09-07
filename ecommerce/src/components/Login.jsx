import React, { useState } from 'react';
import { loginUser, signupUser } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      if (isSignup) {
        // Signup API call
        await signupUser(formData);
        setSuccessMsg('Account created successfully! Please login now.');
        setIsSignup(false);
      } else {
        // Login API call
        const { data } = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome back, ${data.user.name}! Role: ${data.user.role}`);
        if (onLoginSuccess) onLoginSuccess(data.user);
      }
    } catch (err) {
setError(err.response?.data?.error || err.response?.data?.message || err.message || 'Something went wrong!');    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-amber-200/70 shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-[#2D2A26] text-center mb-2">
          {isSignup ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          {isSignup ? 'Sign up to get started with our luxury store' : 'Login to access your dashboard'}
        </p>

        {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 border border-red-200">{error}</div>}
        {successMsg && <div className="bg-green-50 text-green-600 text-xs p-3 rounded-lg mb-4 border border-green-200">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-600"
                placeholder="Tayyaba Batool"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-600"
              placeholder="admin@luxury.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-600"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2.5 bg-[#2D2A26] text-[#F5E6C8] rounded-lg text-sm font-bold hover:bg-black transition cursor-pointer"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button 
            onClick={() => setIsSignup(!isSignup)} 
            className="text-xs text-amber-800 hover:underline font-medium cursor-pointer"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}