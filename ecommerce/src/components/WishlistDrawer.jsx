import React from 'react';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlist, 
  onAddToCart, 
  onToggleWishlist, 
  onSelectProduct 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 bg-[#F5E6C8] border-b border-amber-200">
            <h2 className="text-lg font-serif font-bold text-[#2D2A26]">My Wishlist ({wishlist.length})</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-black text-xl font-bold cursor-pointer">
              ✕
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
            {wishlist.length === 0 ? (
              <p className="text-center text-gray-500 py-12">Your wishlist is empty.</p>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div 
                    className="flex items-center space-x-3 cursor-pointer" 
                    onClick={() => { onSelectProduct(item); onClose(); }}
                  >
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-semibold text-amber-900 mt-1">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button 
                      onClick={() => { 
                        onAddToCart({ ...item, quantity: 1, size: 'M' }); 
                        onToggleWishlist(item); 
                        onClose(); 
                      }}
                      className="px-3 py-1 bg-[#2D2A26] text-[#F5E6C8] text-xs rounded font-medium cursor-pointer"
                    >
                      Move to Cart
                    </button>
                    <button 
                      onClick={() => onToggleWishlist(item)}
                      className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}