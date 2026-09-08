import React from 'react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  isLoginMode, 
  setIsLoginMode, 
  authForm, 
  setAuthForm, 
  onAuthSubmit 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-amber-200">
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h3 className="text-xl font-serif font-bold text-[#2D2A26]">
            {isLoginMode ? 'Login to LuxeCart' : 'Create an Account'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black font-bold text-lg cursor-pointer">✕</button>
        </div>

        <form onSubmit={onAuthSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full border border-amber-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-[#2D2A26]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full border border-amber-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-[#2D2A26]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full border border-amber-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-[#2D2A26]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition shadow cursor-pointer mt-2"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>

          <div className="text-center mt-4">
            <button 
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs text-amber-900 hover:underline font-medium cursor-pointer"
            >
               {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}