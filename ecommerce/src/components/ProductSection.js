import React, { useRef } from 'react';

export default function ProductSection({ title, subtitle, products, onProductClick, onAddToCart, onToggleWishlist, wishlist = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-amber-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#2D2A26]">{title}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
        
        {/* Scroll Arrows */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#2D2A26] text-white flex items-center justify-center text-sm hover:bg-black transition shadow cursor-pointer"
          >
            ‹
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#2D2A26] text-white flex items-center justify-center text-sm hover:bg-black transition shadow cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Product Row */}
      <div 
        ref={scrollRef}
        className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          return (
            <div 
              key={product.id} 
              className="min-w-[220px] sm:min-w-[270px] max-w-[270px] flex-shrink-0 bg-white rounded-xl border border-amber-200/80 p-3 flex flex-col justify-between hover:shadow-md transition group snap-start relative"
            >
              {/* Wishlist Heart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product);
                }}
                className="absolute top-5 right-5 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition cursor-pointer"
              >
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <div 
                onClick={() => onProductClick(product)}
                className="h-44 sm:h-48 bg-gray-50 rounded-lg overflow-hidden relative cursor-pointer"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
                {product.soldOut && (
                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>

              <div className="py-3 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">{product.category}</span>
                  <h3 
                    onClick={() => onProductClick(product)}
                    className="text-xs sm:text-sm font-medium text-gray-900 mt-1 line-clamp-1 cursor-pointer hover:text-amber-900 transition"
                  >
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1 my-1">
                    <span className="text-amber-500 text-xs">★★★★★</span>
                    <span className="text-[10px] text-gray-400">(12)</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold text-amber-900 mb-3">${product.price}</div>
                  
                  <button 
                    onClick={() => onAddToCart(product)}
                    disabled={product.soldOut}
                    className={`w-full py-2.5 rounded-lg text-[11px] sm:text-xs font-medium uppercase tracking-wider transition shadow-sm cursor-pointer ${
                      product.soldOut 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-[#2D2A26] hover:bg-black text-[#F5E6C8]'
                    }`}
                  >
                    {product.soldOut ? 'Sold out' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}