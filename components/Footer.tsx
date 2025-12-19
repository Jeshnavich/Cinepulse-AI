
import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-bold text-white mb-2">CineSense AI</span>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              Leveraging Gemini 3 Pro to provide deep insights into the world of cinema.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs border-t border-slate-900 pt-8">
          <p>© 2024 CineSense AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>using Gemini API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
