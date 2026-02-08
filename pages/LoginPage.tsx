import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/storage';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
        if (login(email, password)) {
            navigate('/admin');
        } else {
            setError('Invalid credentials. Try admin@luxelist.com / password');
        }
        setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-sm bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 mb-4">
                <span className="material-symbols-outlined text-2xl">diamond</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage your collection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
              placeholder="admin@luxelist.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-xs text-center font-medium bg-red-50 dark:bg-red-900/10 py-2 rounded-lg">
                {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-sky-600 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
                 <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
            ) : (
                'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">Demo: admin@luxelist.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
