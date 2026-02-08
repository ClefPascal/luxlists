import React, { useState, useEffect } from 'react';
import { Product, Category, CATEGORIES } from '../types';
import { getProducts } from '../services/storage';
import ProductCard from '../components/ProductCard';
import { HERO_IMAGE } from '../constants';

interface HomePageProps {
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  useEffect(() => {
    // In a real app, we might subscribe to changes, 
    // but here we just load on mount. 
    // For admin updates to reflect immediately, we might need a context, 
    // but a refresh works for this scope.
    setProducts(getProducts());
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative w-full pt-20 group/design-root min-h-screen pb-10">
      
      {/* Hero Section */}
      <div className="@container w-full px-4 mb-6 animate-in fade-in duration-700">
        <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/5] md:aspect-video shadow-xl group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" 
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-left flex flex-col items-start gap-4">
            <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-secondary/90 backdrop-blur-sm rounded-full shadow-sm border border-white/10 animate-in slide-in-from-left-4 duration-500 delay-100">
              <span className="material-symbols-outlined text-[14px] mr-1">verified</span>
              Curator's Choice
            </span>
            <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <h2 className="text-4xl md:text-5xl font-bold leading-[0.95] tracking-tight text-white">
                Essentials for the<br />Modern Creator
              </h2>
              <p className="text-gray-200 text-sm md:text-base font-normal leading-relaxed max-w-[85%] md:max-w-lg opacity-90">
                Hand-picked tools to elevate your productivity and define your workspace style.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white text-black font-bold text-sm py-3 px-6 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-lg shadow-black/20 animate-in zoom-in duration-300 delay-300">
              <span>Explore Collection</span>
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="sticky top-[72px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md py-3 mb-2 border-b border-gray-100 dark:border-gray-800/50 shadow-sm shadow-gray-200/50 dark:shadow-none transition-all">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-primary text-white font-bold shadow-lg shadow-primary/25 scale-105' 
                  : 'bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary active:bg-gray-50 dark:active:bg-gray-800'}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Transparency Note */}
      <div className="px-8 py-10 text-center mt-6">
        <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full mb-6"></div>
        <p className="text-[10px] text-primary uppercase tracking-widest font-bold mb-3">Transparency</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
          We independently review everything we recommend. When you buy through our links, we may earn a commission.
        </p>
      </div>
    </main>
  );
};

export default HomePage;
