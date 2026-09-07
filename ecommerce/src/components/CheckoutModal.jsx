import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, cart, totalPrice = 0, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate card details if Credit/Debit card is selected
    if (formData.paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.expiry || !cardData.cvc || !cardData.cardholderName) {
        alert('Please fill in all required secure card details.');
        return;
      }
    }

    // Validate JazzCash number if JazzCash is selected
    if (formData.paymentMethod === 'jazzcash') {
      if (!formData.jazzcashNumber || formData.jazzcashNumber.length < 11) {
        alert('Please enter a valid 11-digit JazzCash mobile account number.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate secure payment gateway verification delay
    setTimeout(() => {
      setIsProcessing(false);

      let paymentLabel = 'Cash on Delivery (COD)';
      let orderStatus = 'Pending';

      if (formData.paymentMethod === 'card') {
        paymentLabel = 'Credit Card (Paid)';
        orderStatus = 'Processing';
      } else if (formData.paymentMethod === 'jazzcash') {
        paymentLabel = 'JazzCash Mobile Account (Paid)';
        orderStatus = 'Processing';
      }

      // Naya Order object banana jo Admin dashboard mein show hoga
      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString().split('T')[0],
        customer: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}`,
        items: cart,
        total: totalPrice,
        status: orderStatus,
        paymentMethod: paymentLabel,
        cardDetails: formData.paymentMethod === 'card' ? { ...cardData, cardNumber: '**** **** **** ' + cardData.cardNumber.slice(-4) } : null,
        jazzcashNumber: formData.paymentMethod === 'jazzcash' ? formData.jazzcashNumber : null
      };

      // Purane orders fetch karke naya order add karna
      const existingOrders = JSON.parse(localStorage.getItem('luxecart_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('luxecart_orders', JSON.stringify(updatedOrders));

      // Success callback run karna
      if (typeof onOrderSuccess === 'function') {
        onOrderSuccess(newOrder);
      }
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 relative animate-fadeIn my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-2xl font-serif font-bold text-[#2D2A26] mb-2">Checkout Details</h3>
        <p className="text-xs text-gray-600 mb-6">Please provide your shipping information and payment preference.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              required 
              value={formData.fullName} 
              onChange={handleChange}
              placeholder="Tayyaba Batool"
              className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2A26]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange}
                placeholder="tayyaba@example.com"
                className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2A26]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                required 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2A26]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Shipping Address</label>
            <textarea 
              name="address" 
              required 
              rows="2"
              value={formData.address} 
              onChange={handleChange}
              placeholder="House #, Street, Area"
              className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2A26]"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">City</label>
              <input 
                type="text" 
                name="city" 
                required 
                value={formData.city} 
                onChange={handleChange}
                placeholder="Mian Channu / Lahore"
                className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D2A26]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Payment Method</label>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none bg-amber-50/50 cursor-pointer"
              >
                <option value="cod">Cash on Delivery (COD)</option>
                <option value="card">Credit / Debit Card</option>
                <option value="jazzcash">JazzCash Mobile Account</option>
              </select>
            </div>
          </div>

          {/* Dynamic Card Inputs (Only displays when Credit/Debit Card is selected) */}
          {formData.paymentMethod === 'card' && (
            <div className="p-4 bg-gray-50 rounded-xl border border-amber-200 space-y-3 mt-3 animate-fadeIn">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Secure Card Information</h4>
              
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  required
                  placeholder="Tayyaba Batool"
                  value={cardData.cardholderName}
                  onChange={handleCardChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber"
                  maxLength="16"
                  required
                  placeholder="4532 0000 0000 8920"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-800 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiry"
                    required
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1">CVC / CVV</label>
                  <input 
                    type="password" 
                    name="cvc"
                    maxLength="4"
                    required
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dynamic JazzCash Inputs (Only displays when JazzCash is selected) */}
          {formData.paymentMethod === 'jazzcash' && (
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-300 space-y-3 mt-3 animate-fadeIn">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">JazzCash Account Details</h4>
              
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1">JazzCash Mobile Number</label>
                <input 
                  type="text" 
                  name="jazzcashNumber"
                  maxLength="11"
                  required
                  placeholder="03001234567"
                  value={formData.jazzcashNumber || ''}
                  onChange={handleChange}
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-800 bg-white"
                />
                <p className="text-[10px] text-gray-500 mt-1">An MPIN prompt will be triggered on this mobile number.</p>
              </div>
            </div>
          )}

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-4">
            <div className="flex justify-between text-sm font-medium text-gray-800">
              <span>Total Payable Amount:</span>
              <span className="font-bold text-amber-900">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-3 rounded-xl font-semibold text-sm transition tracking-wider uppercase shadow-md cursor-pointer mt-2 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <span>Processing Payment...</span>
            ) : (
              <span>
                {formData.paymentMethod === 'card' 
                  ? `Pay $${totalPrice.toFixed(2)} Now` 
                  : formData.paymentMethod === 'jazzcash' 
                    ? `Pay via JazzCash ($${totalPrice.toFixed(2)})` 
                    : 'Confirm & Place Order'}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}