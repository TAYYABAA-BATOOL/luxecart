import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full bg-[#F3D6B7] py-12 sm:py-16 lg:py-24 overflow-hidden border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-900 font-bold bg-white/60 px-3 py-1 rounded-md border border-amber-300/60 shadow-sm mb-3 sm:mb-4">
              Explore Our Collection
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D2A26] leading-tight mb-4 sm:mb-6">
              Elevate Your <br />
              <span className="italic text-amber-900 font-normal">Modern Lifestyle</span>
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-gray-700 max-w-xl leading-relaxed mb-6 sm:mb-8">
              Premium products, cozy home essentials, accessories, and electronics designed to elevate your everyday living.
            </p>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <a 
                href="#products"
                className="w-full sm:w-auto text-center bg-[#2D2A26] hover:bg-black text-[#F5E6C8] px-8 py-3.5 rounded-xl text-xs sm:text-sm font-medium uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-md lg:max-w-lg h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-amber-50">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
                alt="Curated Luxury Collection" 
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-200 font-semibold">Curated Collection</span>
                  <h3 className="text-white text-base sm:text-xl font-serif font-bold mt-0.5">Carefully Selected For You</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}