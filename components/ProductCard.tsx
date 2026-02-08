import React from 'react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-800 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group cursor-pointer hover:-translate-y-1 h-full flex flex-col"
    >
      <div className={`relative w-full ${product.id === '2' ? 'aspect-[3/4]' : product.id === '6' ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden bg-gray-100 dark:bg-gray-800`}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy"
        />
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2.5 py-1.5 rounded-lg text-primary shadow-sm">
            {product.badge}
          </div>
        )}
        
        {product.isStaffPick && (
          <div className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-wide shadow-sm">
            Staff Pick
          </div>
        )}
        
        {product.discount && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
            {product.discount}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white line-clamp-1">{product.name}</h3>
          {!product.badge && product.price && (
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded ml-1">
              ${product.price}
            </span>
          )}
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 flex-grow">
          {product.description}
        </p>

        {product.inStock && (
          <div className="flex items-center gap-2 mt-1 mb-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">In Stock</span>
          </div>
        )}

        {/* Dynamic Buttons based on context (approximating design) */}
        {product.id === '1' ? (
           <button className="w-full h-9 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 mt-auto group-hover/btn:bg-primary">
            <span>Shop</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        ) : product.id === '2' ? (
          <button className="w-full h-10 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-1.5 mt-auto">
             View Details
          </button>
        ) : product.id === '4' ? (
           <button className="w-full h-9 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-primary text-slate-900 dark:text-white hover:text-primary rounded-lg text-xs font-bold transition-all mt-auto">
             Check Price
           </button>
        ) : (
           <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
             <span className="text-sm font-bold text-slate-900 dark:text-white">${product.price}</span>
             <button className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors">
               <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
             </button>
           </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
