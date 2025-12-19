
import React, { useState, useCallback } from 'react';
import { Search, Film, Loader2, Sparkles, History, Github } from 'lucide-react';
import { analyzeMovie } from './services/geminiService';
import { ReviewData } from './types';
import ReviewCard from './components/ReviewCard';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentReview, setCurrentReview] = useState<ReviewData | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [history, setHistory] = useState<ReviewData[]>([]);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!movieName.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const { data, sources } = await analyzeMovie(movieName);
      setCurrentReview(data);
      setSources(sources);
      setHistory(prev => [data, ...prev.slice(0, 9)]);
    } catch (err: any) {
      console.error(err);
      setError('Failed to analyze movie. Please try again with a different title.');
    } finally {
      setLoading(false);
    }
  }, [movieName]);

  const loadFromHistory = (review: ReviewData) => {
    setCurrentReview(review);
    setMovieName(review.movieName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Uncover the Cinematic Soul
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Advanced AI sentiment analysis for any movie. Get balanced reviews, emotional deep-dives, and critical insights in seconds.
          </p>
        </section>

        <section className="sticky top-4 z-40 mb-12">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Enter movie name (e.g. Interstellar, Joker, The Substance...)"
                className="relative w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg placeholder-slate-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
            <button
              type="submit"
              disabled={loading || !movieName.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Analyze</span>
                </>
              )}
            </button>
          </form>
        </section>

        {error && (
          <div className="mb-12 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-center animate-pulse">
            {error}
          </div>
        )}

        {currentReview && !loading && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ReviewCard review={currentReview} sources={sources} />
          </div>
        )}

        {!currentReview && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
            <Film className="w-16 h-16 opacity-20" />
            <p className="text-xl font-medium">Search for a movie to get started</p>
          </div>
        )}

        {history.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold">Recent Analyses</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => loadFromHistory(item)}
                  className="bg-slate-900/50 border border-slate-800 hover:border-slate-600 p-4 rounded-xl text-left transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold group-hover:text-indigo-400 transition-colors">{item.movieName}</span>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded-full">{item.rating}/5</span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-1">{item.overallSentiment}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
