import React, { useState } from 'react';

const faqsData = [
  {
    question: "What is your shipping policy?",
    answer: "We offer fast and secure shipping on all orders across Europe and international destinations. Standard delivery typically takes 3 to 5 business days, while express shipping options are available at checkout."
  },
  {
    question: "Are all products 100% authentic?",
    answer: "Yes, absolutely! Every item, fragrance, accessory, and home essential in our collection is 100% genuine, sourced directly from certified luxury brands and trusted global manufacturers."
  },
  {
    question: "What is your return and refund policy?",
    answer: "We want you to love your purchase. If you are not entirely satisfied, you can return unwrapped and unused items within 14 days of delivery for a full refund or exchange."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a confirmation email containing your tracking number and a link to monitor your shipment status in real-time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, and secure localized payment options to ensure a smooth checkout experience."
  }
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold bg-[#F5E6C8]/60 px-3 py-1 rounded-md border border-amber-200">
          Got Questions?
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2D2A26] mt-3">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-lg mx-auto">
          Everything you need to know about our products, shipping, and services.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 sm:space-y-4">
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-amber-200/70 shadow-sm overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none cursor-pointer gap-4"
              >
                <span className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#2D2A26]">
                  {faq.question}
                </span>
                <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5E6C8]/60 text-amber-900 flex items-center justify-center text-xs sm:text-sm font-bold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-[#2D2A26] text-[#F5E6C8]' : ''}`}>
                  ↓
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-amber-100/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}