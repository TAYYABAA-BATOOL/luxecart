import React, { useState } from 'react';

export default function ProductDetail({ product, onAddToCart, onBackToShop }) {
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  
  const availableSizes = product?.sizes || (product?.category?.toLowerCase().includes('bag') || product?.category?.toLowerCase().includes('accessory') ? [] : ['S', 'M', 'L', 'XL']);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || 'Standard');

  const availableColors = product?.colors || [];
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const galleryImages = product?.images?.length > 0 
    ? product.images 
    : [product?.image].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Back Button */}
      <button 
        onClick={() => {
          onBackToShop();
          setTimeout(() => {
            const productsSection = document.getElementById('products');
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }}
        className="mb-6 sm:mb-8 px-4 sm:px-5 py-2.5 bg-[#2D2A26] text-[#F5E6C8] hover:bg-black rounded-lg text-xs sm:text-sm font-medium flex items-center space-x-2 transition shadow-md cursor-pointer w-fit"
      >
        <span>← Back to Collection</span>
      </button>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left: Dynamic Image Gallery Section */}
        <div className="space-y-4">
          <div 
            onClick={() => setIsZoomOpen(true)}
            className="h-[350px] sm:h-[450px] lg:h-[550px] bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-sm relative cursor-zoom-in group flex items-center justify-center"
          >
            <img 
              src={selectedImage || product?.image} 
              alt={product?.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition">
              🔍 Click to Zoom
            </div>
          </div>
          
          {galleryImages.length > 1 && (
            <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition flex-shrink-0 ${
                    selectedImage === img ? 'border-amber-900 scale-105' : 'border-amber-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Options */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-semibold">
              {product?.category || 'General'}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2D2A26] mt-2 mb-3 sm:mb-4">
              {product?.name}
            </h1>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="text-amber-500 text-xs sm:text-sm">★★★★★</div>
              <span className="text-[11px] sm:text-xs text-gray-500">(Verified Store Item)</span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-amber-900 mb-4 sm:mb-6">
              ${product?.price}
            </div>
            
            {/* Real Admin Description */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              {product?.description || 'No detailed description provided for this product yet.'}
            </p>

            {/* Conditional Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 uppercase">Select Size</label>
                  <span className="text-xs font-medium text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    Selected: <strong className="font-bold">{selectedSize}</strong>
                  </span>
                </div>
                <div className="flex space-x-3">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 h-10 sm:h-12 rounded-lg text-xs sm:text-sm font-medium border transition cursor-pointer flex items-center justify-center ${
                        selectedSize === size 
                          ? 'bg-[#2D2A26] text-[#F5E6C8] border-[#2D2A26]' 
                          : 'bg-white text-gray-700 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conditional Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 uppercase">Select Color</label>
                  <span className="text-xs font-medium text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    Selected: <strong className="font-bold">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex space-x-3">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border transition cursor-pointer ${
                        selectedColor === color 
                          ? 'bg-[#2D2A26] text-[#F5E6C8] border-[#2D2A26]' 
                          : 'bg-white text-gray-700 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Counter & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex items-center border border-amber-300 rounded-lg bg-white overflow-hidden w-fit">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3.5 sm:px-4 py-3 bg-gray-50 hover:bg-gray-100 font-bold text-xs sm:text-sm text-gray-700 cursor-pointer"
                >
                  -
                </button>
                <span className="px-5 sm:px-6 text-xs sm:text-sm font-semibold text-[#2D2A26]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3.5 sm:px-4 py-3 bg-gray-50 hover:bg-gray-100 font-bold text-xs sm:text-sm text-gray-700 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => onAddToCart({ 
                  ...product, 
                  quantity, 
                  size: selectedSize, 
                  color: selectedColor 
                })}
                className="flex-grow bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-3.5 px-6 sm:px-8 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>🛒 Add To Cart ({selectedSize})</span>
              </button>
            </div>
          </div>

          {/* Additional Meta Info */}
          <div className="border-t border-amber-200 pt-6 space-y-2 text-[11px] sm:text-xs text-gray-500">
            <p><span className="font-semibold text-gray-700">SKU:</span> LUX-{product?.id || product?._id || '100'}48</p>
            <p><span className="font-semibold text-gray-700">Category:</span> {product?.category || 'General'}</p>
            <p><span className="font-semibold text-gray-700">Shipping:</span> Free shipping on orders over $50</p>
          </div>
        </div>

      </div>

      {/* Tabs Section */}
      <div className="mt-12 sm:mt-20 border-t border-amber-200 pt-8 sm:pt-10">
        <div className="flex justify-center space-x-6 sm:space-x-8 border-b border-amber-200 pb-4 overflow-x-auto">
          {['description', 'reviews', 'shipping'].map(tab => (
            <button
              key={tab}
              className={`text-xs sm:text-sm font-medium uppercase tracking-wider transition pb-2 border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-[#2D2A26] text-[#2D2A26]' 
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto py-6 sm:py-8 text-xs sm:text-sm text-gray-600 leading-relaxed text-center px-4">
          {activeTab === 'description' && (
            <p>{product?.description || 'No detailed specifications available for this product.'}</p>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4 text-left">
              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm">Tayyaba Batool</span>
                  <span className="text-amber-500 text-xs">★★★★★</span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-500">Verified purchase. Excellent quality that matches the store listing perfectly!</p>
              </div>
            </div>
          )}
          {activeTab === 'shipping' && (
            <p>
              We ship worldwide. Standard orders take 3-5 business days to arrive. Express shipping options are available at checkout. Hassle-free 14-day return policy.
            </p>
          )}
        </div>
      </div>

      {/* Image Zoom / Quick View Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2">
            <button 
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center font-bold hover:bg-black transition cursor-pointer"
            >
              ✕
            </button>
            <div className="max-h-[85vh] overflow-hidden flex items-center justify-center bg-gray-100 rounded-xl">
              <img 
                src={selectedImage || product?.image} 
                alt="Zoomed Product" 
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}   