import React, { useState } from 'react';

export default function ContactUs({ onBackToShop }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button 
        onClick={onBackToShop}
        className="mb-6 sm:mb-8 px-4 sm:px-5 py-2.5 bg-[#2D2A26] text-[#F5E6C8] hover:bg-black rounded-lg text-xs sm:text-sm font-medium flex items-center space-x-2 transition shadow-md cursor-pointer"
      >
        <span>← Back to Shop</span>
      </button>

      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 sm:p-12">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-semibold">Get in Touch</span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#2D2A26] mt-2 mb-2 sm:mb-3">We'd Love to Hear From You</h1>
          <p className="text-xs sm:text-sm text-gray-600">Have a question about our products, orders, or custom requests? Drop us a message below.</p>
        </div>

        {submitted ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-3">✓</div>
            <h3 className="text-lg font-serif font-bold text-[#2D2A26] mb-1">Message Sent Successfully!</h3>
            <p className="text-xs text-gray-600 mb-6">Thank you for reaching out. Our support team will get back to you shortly.</p>
            <button 
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
              className="px-6 py-2.5 bg-[#2D2A26] text-[#F5E6C8] rounded-lg text-xs uppercase tracking-wider font-medium hover:bg-black transition cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-600 mb-2">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-amber-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                placeholder="Tayyaba Batool"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-600 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-amber-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                placeholder="tayyaba@example.com"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase text-gray-600 mb-2">Your Message</label>
              <textarea 
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-amber-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2D2A26] hover:bg-black text-[#F5E6C8] py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition shadow cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}