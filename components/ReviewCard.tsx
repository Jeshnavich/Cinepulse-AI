
import React, { useMemo } from 'react';
// Fix: Added missing Sparkles import from lucide-react
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Info, ExternalLink, Activity, Sparkles } from 'lucide-react';
import { ReviewData, Sentiment } from '../types';
import SentimentChart from './SentimentChart';

interface ReviewCardProps {
  review: ReviewData;
  sources: any[];
}

const getSentimentColor = (sentiment: Sentiment) => {
  switch (sentiment) {
    case Sentiment.VERY_POSITIVE: return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20';
    case Sentiment.POSITIVE: return 'text-green-400 bg-green-400/10 border-green-500/20';
    case Sentiment.MIXED: return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
    case Sentiment.NEGATIVE: return 'text-orange-400 bg-orange-400/10 border-orange-500/20';
    case Sentiment.VERY_NEGATIVE: return 'text-red-400 bg-red-400/10 border-red-500/20';
    default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
  }
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, sources }) => {
  const sentimentColorClass = useMemo(() => getSentimentColor(review.overallSentiment), [review.overallSentiment]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Summary & Stats */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-3xl font-black mb-1">{review.movieName}</h2>
            {review.releaseYear && <p className="text-slate-500 mb-4">{review.releaseYear} • {review.genre}</p>}
            
            <div className="relative mb-4">
              <div className="text-6xl font-black text-indigo-400">{review.rating}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Score / 5</div>
            </div>

            <div className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${sentimentColorClass}`}>
              {review.overallSentiment}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                Emotional Pulse
              </h3>
              <div className="flex flex-wrap gap-2">
                {review.emotions.map((emotion, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700">
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emotions Visualization */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Sentiment Breakdown
          </h3>
          <SentimentChart sentiment={review.overallSentiment} />
        </div>

        {/* Sources/Grounding */}
        {sources.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Verified Sources
            </h3>
            <ul className="space-y-3">
              {sources.map((source, idx) => (
                source.web && (
                  <li key={idx}>
                    <a 
                      href={source.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-start gap-2 group"
                    >
                      <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2 group-hover:underline">{source.web.title}</span>
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column: Detailed Analysis */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <MessageSquare className="w-40 h-40" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-indigo-600/20 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </span>
              AI Review Synthesis
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-300 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-indigo-500">
                {review.reviewText}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-950/10 border border-emerald-900/30 p-6 rounded-2xl">
            <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Strengths
            </h4>
            <ul className="space-y-3">
              {review.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-emerald-500 mt-1">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/10 border border-rose-900/30 p-6 rounded-2xl">
            <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
              <ThumbsDown className="w-5 h-5" />
              Weaknesses
            </h4>
            <ul className="space-y-3">
              {review.weaknesses.map((w, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-rose-500 mt-1">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
