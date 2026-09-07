import React from 'react';

export default function PromoBanners({ onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* 1. Two-Column Product / Collection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        
        {/* Column 1: Accessories */}
        <div className="relative rounded-2xl overflow-hidden shadow-md group h-72 sm:h-80 bg-amber-50 border border-amber-200/60">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" 
            alt="Luxury Cosmetics & Accessories" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">New Trend</span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3">Minimalist Accessories</h3>
            <button 
              onClick={() => onSelectCategory && onSelectCategory('Accessories')}
              className="self-start bg-[#F5E6C8] text-[#2D2A26] hover:bg-white px-4 sm:px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer"
            >
              Discover More
            </button>
          </div>
        </div>

        {/* Column 2: Home Decor */}
        <div className="relative rounded-2xl overflow-hidden shadow-md group h-72 sm:h-80 bg-amber-50 border border-amber-200/60">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" 
            alt="Elegant Home Decor" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">Special Edition</span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3">Cozy Home Decor</h3>
            <button 
              onClick={() => onSelectCategory && onSelectCategory('Home')}
              className="self-start bg-[#F5E6C8] text-[#2D2A26] hover:bg-white px-4 sm:px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer"
            >
              Shop Collection
            </button>
          </div>
        </div>

      </div>

      {/* 2. Full-Width Promotional Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#2D2A26] text-[#F5E6C8] p-6 sm:p-10 lg:p-16 shadow-xl border border-amber-900/40">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200" 
            alt="Background Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-xl">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-md border border-amber-800/60 inline-block mb-3 sm:mb-4">
            Limited Time Offer
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
            Get 20% Off Your First Luxury Order
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Sign up or shop today to enjoy exclusive discounts on our top-rated lifestyle and electronic essentials.
          </p>
          <a 
            href="#products" 
            className="inline-block bg-[#F5E6C8] text-[#2D2A26] hover:bg-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-lg cursor-pointer"
          >
            Explore Products
          </a>
        </div>
      </div>

    </section>
  );
}