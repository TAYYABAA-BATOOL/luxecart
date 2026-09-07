import React from 'react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  totalPrice, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart,
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#F5E6C8] border-b border-amber-200">
            <h2 className="text-lg font-serif font-bold text-[#2D2A26]">Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-black text-xl font-bold cursor-pointer">
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="text-base font-medium">Your cart is empty.</p>
                <p className="text-xs text-gray-400 mt-1">Add items to proceed with checkout.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between border-b pb-4 gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-amber-100" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-semibold text-gray-700">{item.size}</span></p>
                    <p className="text-xs font-bold text-amber-900 mt-1">${item.price} x {item.quantity}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2 border border-amber-200 rounded px-2 py-0.5 bg-amber-50/50">
                      <button onClick={() => decreaseQuantity(item.id, item.size)} className="text-gray-600 hover:text-black font-bold text-xs cursor-pointer">-</button>
                      <span className="text-xs font-semibold">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id, item.size)} className="text-gray-600 hover:text-black font-bold text-xs cursor-pointer">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-amber-200 space-y-4">
              <div className="flex justify-between text-base font-bold text-[#2D2A26]">
                <span>Subtotal:</span>
                <span className="text-amber-900">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-gray-500">Shipping & taxes calculated at checkout.</p>
              
              <button 
                onClick={() => {
                  onClose(); // Cart drawer band hoga
                  onProceedToCheckout(); // Foran checkout modal khulega
                }}
                className="w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-3 rounded-xl font-semibold text-sm transition tracking-wider uppercase shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}