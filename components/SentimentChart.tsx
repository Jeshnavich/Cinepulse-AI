
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sentiment } from '../types';

interface SentimentChartProps {
  sentiment: Sentiment;
}

const SentimentChart: React.FC<SentimentChartProps> = ({ sentiment }) => {
  // Mapping sentiment to a distribution for visualization
  const getChartData = (s: Sentiment) => {
    switch (s) {
      case Sentiment.VERY_POSITIVE: return [
        { name: 'Pos', value: 90, color: '#10b981' },
        { name: 'Neg', value: 10, color: '#334155' }
      ];
      case Sentiment.POSITIVE: return [
        { name: 'Pos', value: 75, color: '#22c55e' },
        { name: 'Neg', value: 25, color: '#334155' }
      ];
      case Sentiment.MIXED: return [
        { name: 'Pos', value: 50, color: '#f59e0b' },
        { name: 'Neg', value: 50, color: '#334155' }
      ];
      case Sentiment.NEGATIVE: return [
        { name: 'Pos', value: 30, color: '#f97316' },
        { name: 'Neg', value: 70, color: '#334155' }
      ];
      case Sentiment.VERY_NEGATIVE: return [
        { name: 'Pos', value: 10, color: '#ef4444' },
        { name: 'Neg', value: 90, color: '#334155' }
      ];
      default: return [];
    }
  };

  const data = getChartData(sentiment);

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-tighter text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data[0]?.color }}></div>
          Positive Focus
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data[1]?.color }}></div>
          Critical Focus
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;
