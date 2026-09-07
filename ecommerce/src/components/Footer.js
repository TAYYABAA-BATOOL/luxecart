import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2D2A26] text-[#F5E6C8] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif tracking-widest mb-3 sm:mb-4 text-amber-200">LuxeCart</h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
            Bringing elite luxury products and seamless online shopping straight to your doorstep.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 text-amber-100">Quick Links</h3>
          <ul className="text-gray-400 space-y-2 text-xs sm:text-sm font-light">
            <li><a href="/" className="hover:text-amber-200 transition">Home</a></li>
            <li><a href="#products" className="hover:text-amber-200 transition">Shop Collection</a></li>
            <li><a href="#about" className="hover:text-amber-200 transition">About Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 text-amber-100">Customer Care</h3>
          <ul className="text-gray-400 space-y-2 text-xs sm:text-sm font-light">
            <li><a href="#contact" className="hover:text-amber-200 transition">Contact Us</a></li>
            <li><a href="#shipping" className="hover:text-amber-200 transition">Shipping & Delivery</a></li>
            <li><a href="#returns" className="hover:text-amber-200 transition">Returns Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 text-amber-100">Newsletter</h3>
          <p className="text-gray-400 text-xs sm:text-sm font-light mb-3">Subscribe for exclusive offers and updates.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-[#3D3934] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none w-full border border-gray-700 rounded-l-md"
            />
            <button className="bg-amber-700 hover:bg-amber-600 text-white px-4 text-xs sm:text-sm font-medium transition rounded-r-md cursor-pointer flex-shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs tracking-wider">
        © 2026 LuxeCart. All rights reserved.
      </div>
    </footer>
  );
}