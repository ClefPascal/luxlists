import React, { useState, useEffect } from 'react';
import { Product, CATEGORIES, Category } from '../types';
import { getProducts, saveProduct, deleteProduct } from '../services/storage';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Category>('Desk Setup');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [badge, setBadge] = useState('');
  const [isStaffPick, setIsStaffPick] = useState(false);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    setProducts(getProducts());
  };

  const resetForm = () => {
    setId('');
    setName('');
    setDescription('');
    setPrice(0);
    setImageUrl('');
    setCategory('Desk Setup');
    setAffiliateLink('');
    setBadge('');
    setIsStaffPick(false);
    setInStock(true);
    setIsEditing(false);
  };

  const handleEdit = (product: Product) => {
    setId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setCategory(product.category as Category);
    setAffiliateLink(product.affiliateLink);
    setBadge(product.badge || '');
    setIsStaffPick(product.isStaffPick || false);
    setInStock(product.inStock !== false);
    setIsEditing(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      refreshProducts();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: id || Date.now().toString(),
      name,
      description,
      price,
      imageUrl,
      category,
      affiliateLink,
      badge: badge || undefined,
      isStaffPick,
      inStock
    };

    saveProduct(newProduct);
    refreshProducts();
    resetForm();
    alert(isEditing ? 'Product updated!' : 'Product added!');
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-500">Manage your product catalog</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white border-b pb-2 dark:border-gray-700">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500">Price ($)</label>
                    <input type="number" required value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm">
                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">Image URL</label>
                <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">Affiliate Link</label>
                <input value={affiliateLink} onChange={e => setAffiliateLink(e.target.value)} className="w-full p-2 rounded-lg border dark:bg-black/20 dark:border-gray-700 dark:text-white text-sm" />
              </div>
              
              <div className="flex gap-4 pt-2">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isStaffPick} onChange={e => setIsStaffPick(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                    <span className="text-sm font-medium dark:text-gray-300">Staff Pick</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                    <span className="text-sm font-medium dark:text-gray-300">In Stock</span>
                 </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-sky-600 transition-colors">
                    {isEditing ? 'Update' : 'Publish'}
                </button>
                {isEditing && (
                    <button type="button" onClick={resetForm} className="px-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Cancel
                    </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Products ({products.length})</h2>
            <div className="space-y-3">
                {products.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 dark:text-white truncate">{product.name}</h3>
                            <p className="text-xs text-slate-500 truncate">{product.category} • ${product.price}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(product)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
