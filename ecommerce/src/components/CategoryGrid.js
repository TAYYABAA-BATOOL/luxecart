import React from 'react';

const categoriesList = [
  { id: 1, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Home', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Electronics', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=400' },
];

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="bg-[#F9F1E7] border border-amber-200/60 rounded-2xl p-4 sm:p-8 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-amber-200/50">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold">Explore Collections</span>
            <h2 className="text-xl sm:text-3xl font-serif text-[#2D2A26] mt-1">Nos Univers</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mt-2 md:mt-0">
            Discover our carefully curated selections designed to elevate your everyday living.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoriesList.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-amber-200/70 shadow-sm hover:shadow-md transition flex flex-col active:scale-95 duration-200"
            >
              <div className="h-28 sm:h-36 overflow-hidden bg-amber-50">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-2.5 sm:p-3 text-center bg-white flex-grow flex items-center justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-[#2D2A26] group-hover:text-amber-900 transition truncate">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}