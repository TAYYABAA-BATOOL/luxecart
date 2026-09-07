import React from 'react';
import ProductSection from './ProductSection';

export default function ProductCatalog({
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  setSearchTerm,
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
  filteredProducts,
  productsData,
  wishlist,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist
}) {
  const newArrivals = productsData.filter(p => p.category === 'New Arrivals');
  const bestSellings = productsData.filter(p => p.category === 'Our Best Sellers');
  const trending = productsData.filter(p => p.category === 'Trending Collections');

  return (
    <div id="products" className="scroll-mt-20 py-10 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-[#2D2A26]">
            {searchTerm ? `Search Results for "${searchTerm}"` : selectedCategory === 'All' ? 'Our Featured Collections' : `${selectedCategory} Collection`}
          </h2>
          <p className="text-sm text-gray-600 mt-1">Explore our handpicked selection of top-tier quality items.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['All', 'Accessories', 'Home', 'Electronics'].map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                selectedCategory === cat && !searchTerm
                  ? 'bg-[#2D2A26] text-[#F5E6C8] shadow'
                  : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 bg-white p-2 rounded-lg border border-amber-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-amber-300 rounded px-2 py-1 text-xs focus:outline-none bg-amber-50/50 cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 border-l pl-4 border-amber-200">
            <span className="text-xs font-semibold text-gray-600 uppercase">Max Price: ${maxPrice}</span>
            <input 
              type="range" 
              min="30" 
              max="300" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-[#2D2A26] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-amber-200">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
            className="mt-4 px-6 py-2 bg-[#2D2A26] text-[#F5E6C8] text-xs uppercase tracking-wider font-bold rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : searchTerm || selectedCategory !== 'All' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isWishlisted = wishlist.some(item => item.id === product.id);
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden flex flex-col group hover:shadow-md transition relative"
              >
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/85 backdrop-blur-sm rounded-full shadow hover:bg-white transition cursor-pointer"
                >
                  <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <div 
                  className="h-48 overflow-hidden bg-gray-100 relative cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs text-amber-800 font-medium uppercase tracking-wider">{product.category}</span>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="text-lg font-medium text-gray-900 mt-1 hover:text-amber-900 transition line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-amber-900 font-semibold mt-2">${product.price}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart({ ...product, quantity: 1, size: 'M' })}
                    className="mt-4 w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center cursor-pointer"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-12">
          <ProductSection 
            id="new-arrivals"
            title="Our New Arrivals" 
            subtitle="Discover the latest arrivals featuring trending accessories and essentials."
            products={newArrivals} 
            onProductClick={onSelectProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlist={wishlist}
          />

          <ProductSection 
            id="best-sellings"
            title="Our Best Sellings" 
            subtitle="Explore best-selling home decor and lifestyle items."
            products={bestSellings} 
            onProductClick={onSelectProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlist={wishlist}
          />

          <ProductSection 
            id="trending"
            title="Trending Collections" 
            subtitle="Top-rated electronics and tech accessories for modern living."
            products={trending} 
            onProductClick={onSelectProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlist={wishlist}
          />
        </div>
      )}
    </div>
  );
}