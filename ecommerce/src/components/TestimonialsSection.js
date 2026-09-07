import React, { useRef } from 'react';

const reviewsData = [
  {
    id: 1,
    title: "Impeccable service & elegance",
    rating: "5.0",
    stars: "★★★★★",
    comment: "Order arrived quickly, the items are authentic and the packaging is exceptionally elegant. I will definitely be back!",
    name: "Marie C.",
    location: "Belgium"
  },
  {
    id: 2,
    title: "Fast delivery, premium quality",
    rating: "5.0",
    stars: "★★★★★",
    comment: "I was impressed by how quickly my order arrived. The product quality is top-notch and long-lasting. Highly recommended!",
    name: "Sophie L.",
    location: "Germany"
  },
  {
    id: 3,
    title: "My absolute favourite collection",
    rating: "4.8",
    stars: "★★★★★",
    comment: "The quality is exceptional and the finish lasts all day. Delivery was fast and the packaging felt truly luxurious. Almost perfect!",
    name: "Nadine R.",
    location: "France"
  },
  {
    id: 4,
    title: "Absolute masterpiece design",
    rating: "5.0",
    stars: "★★★★★",
    comment: "Exquisite craftsmanship! It draws so many compliments every time I use it. Worth every single penny.",
    name: "Elena M.",
    location: "Italy"
  },
  {
    id: 5,
    title: "Exceptional customer care",
    rating: "5.0",
    stars: "★★★★★",
    comment: "Outstanding support team and gorgeous products. Everything exceeded my expectations completely.",
    name: "Clara V.",
    location: "Spain"
  }
];

export default function TestimonialsSection() {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Header with Navigation Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-12 border-b border-amber-200/60 pb-6">
        <div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold bg-[#F5E6C8]/60 px-3 py-1 rounded-md border border-amber-200 inline-block mb-2 sm:mb-0">
            Trusted Across Europe
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2D2A26] mt-2 sm:mt-3">
            What Real Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Genuine reviews from people who’ve experienced our luxury collections.
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={() => scroll('left')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2D2A26] text-[#F5E6C8] flex items-center justify-center text-sm sm:text-base hover:bg-black transition shadow-sm cursor-pointer"
          >
            ‹
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2D2A26] text-[#F5E6C8] flex items-center justify-center text-sm sm:text-base hover:bg-black transition shadow-sm cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Slider Cards */}
      <div 
        ref={scrollRef}
        className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviewsData.map((review) => (
          <div 
            key={review.id}
            className="min-w-[280px] sm:min-w-[380px] max-w-[400px] flex-shrink-0 bg-white rounded-2xl border border-amber-200/70 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between snap-start relative group"
          >
            {/* Decorative Quote Mark */}
            <div className="absolute top-4 right-6 sm:top-6 sm:right-8 text-amber-200 font-serif text-5xl sm:text-6xl select-none pointer-events-none group-hover:text-amber-300 transition">
              “
            </div>

            <div>
              {/* Rating and Stars */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-amber-500 text-xs sm:text-sm tracking-wider">{review.stars}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                  {review.rating} / 5.0
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D2A26] mb-2 sm:mb-3">
                {review.title}
              </h3>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 sm:mb-8 relative z-10">
                "{review.comment}"
              </p>
            </div>

            {/* Customer Details */}
            <div className="border-t border-amber-100 pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900">{review.name}</h4>
                <span className="text-[11px] sm:text-xs text-gray-500">{review.location}</span>
              </div>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5E6C8]/60 text-amber-900 flex items-center justify-center text-xs font-bold border border-amber-200">
                {review.name.charAt(0)}
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}