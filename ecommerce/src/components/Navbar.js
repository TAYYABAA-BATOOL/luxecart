import React, { useState } from 'react';

export default function Navbar({ 
  searchTerm, 
  onSearchChange, 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  onWishlistClick,
  currentUser,
  onLoginClick,
  onLogoutClick
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#F5E6C8] border-b border-amber-200 sticky top-0 z-50 shadow-sm">
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#2D2A26] p-2 rounded-lg hover:bg-amber-200/50 transition cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Brand Logo */}
            <a href="/" className="text-xl sm:text-2xl font-serif tracking-widest font-bold text-[#2D2A26]">
              LuxeCart
            </a>
          </div>

          {/* Desktop Interactive Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full flex">
              <input 
                type="text" 
                value={searchTerm}
                onChange={onSearchChange} 
                placeholder="Search products..." 
                className="w-full bg-white/90 border border-amber-300 rounded-l-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 text-[#2D2A26]"
              />
              <button className="bg-[#2D2A26] hover:bg-black text-[#F5E6C8] px-6 rounded-r-lg text-sm font-medium transition flex items-center justify-center cursor-pointer">
                Search
              </button>
            </div>
          </div>

          {/* Right Actions (Wishlist, Cart & Login/Profile for Desktop) */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-[#2D2A26]">
            {/* Wishlist Button */}
            <div 
              onClick={onWishlistClick} 
              className="flex items-center space-x-1 cursor-pointer bg-white/65 hover:bg-white px-2.5 sm:px-3.5 py-2 rounded-full border border-amber-300 shadow-inner transition"
              title="Wishlist"
            >
              <span>❤️</span>
              <span className="text-xs sm:text-sm font-semibold hidden xs:inline">({wishlistCount})</span>
            </div>

            {/* Cart Button */}
            <div 
              onClick={onCartClick} 
              className="flex items-center space-x-1 cursor-pointer bg-white/65 hover:bg-white px-2.5 sm:px-3.5 py-2 rounded-full border border-amber-300 shadow-inner transition"
              title="Cart"
            >
              <span>🛒</span>
              <span className="text-xs sm:text-sm font-semibold">({cartCount})</span>
            </div>

            {/* Desktop User Login / Profile Section */}
            <div className="hidden md:flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-2 bg-white/80 px-3 py-1.5 rounded-full border border-amber-300 shadow-inner">
                  <span className="text-xs font-bold text-[#2D2A26]">Hi, {currentUser.name}</span>
                  <button 
                    onClick={onLogoutClick}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer px-1"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="bg-[#2D2A26] hover:bg-black text-[#F5E6C8] px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider transition cursor-pointer shadow-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Horizontal Divider Line */}
      <div className="w-full border-t border-amber-300/60"></div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 py-3 text-sm font-medium text-[#2D2A26]">
          <a href="/" className="hover:text-amber-800 transition">Home</a>
          <a href="#products" className="hover:text-amber-800 transition">Shop Collection</a>
          <a href="#about" className="hover:text-amber-800 transition">About Us</a>
          <a href="#contact" className="hover:text-amber-800 transition">Contact</a>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F5E6C8] border-b border-amber-300 px-4 pt-3 pb-5 space-y-4 shadow-xl transition-all animate-fadeIn">
          {/* Mobile Search Bar */}
          <div className="relative w-full flex">
            <input 
              type="text" 
              value={searchTerm}
              onChange={onSearchChange} 
              placeholder="Search products..." 
              className="w-full bg-white border border-amber-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none text-[#2D2A26]"
            />
            <button className="bg-[#2D2A26] text-[#F5E6C8] px-4 rounded-r-lg text-xs font-medium">
              Search
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#2D2A26] pt-1">
            <a 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1 border-b border-amber-200/50"
            >
              Home
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1 border-b border-amber-200/50"
            >
              Shop Collection
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1 border-b border-amber-200/50"
            >
              About Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Contact
            </a>
          </div>

          {/* Mobile User Login/Logout Section */}
          <div className="pt-2 border-t border-amber-300/80 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-[#2D2A26]">Hi, {currentUser.name}</span>
                <button 
                  onClick={() => { onLogoutClick(); setIsMobileMenuOpen(false); }}
                  className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-md font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                className="w-full bg-[#2D2A26] text-[#F5E6C8] py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider text-center"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}