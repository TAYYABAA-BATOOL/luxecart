import React from 'react';

export default function CategoryDetail({ category, products, onAddToCart, onBack }) {
  // Is category ki sirf wahi products filter karein
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Back Button */}
      <button onClick={onBack} className="mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-amber-900 hover:text-black cursor-pointer flex items-center space-x-1">
        <span>← Back to All Categories</span>
      </button>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2D2A26] mb-8 sm:mb-12 capitalize">{category} Collection</h1>

      {/* Product Grid */}
      {categoryProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categoryProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-amber-100 p-3 sm:p-4 hover:shadow-md transition flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4" />
                <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-amber-900 font-bold text-xs sm:text-sm mt-1 mb-3 sm:mb-4">${product.price}</p>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-2 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}