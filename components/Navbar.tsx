import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/storage';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-lg">diamond</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">LuxeList</h1>
      </Link>

      <div className="flex items-center gap-3">
        {searchOpen ? (
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 animate-in fade-in slide-in-from-right-4 duration-300">
             <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-32 md:w-48 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0"
              onChange={(e) => onSearch(e.target.value)}
              autoFocus
              onBlur={() => { if(!document.activeElement?.getAttribute('value')) setSearchOpen(false); }}
            />
            <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
               <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        )}

        {isAuth ? (
          <div className="flex gap-2">
            <Link to="/admin" className="hidden md:flex items-center justify-center px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors">
              Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-2xl">person</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
