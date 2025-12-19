
import React from 'react';
import { Clapperboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            CINESENSE AI
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">API</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
        </nav>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors">
          Join Beta
        </button>
      </div>
    </header>
  );
};

export default Header;
