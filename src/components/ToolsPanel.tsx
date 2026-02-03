'use client';

import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  status: 'active' | 'idle' | 'running';
  lastRun?: string;
}

const toolsData: Tool[] = [
  { id: '1', name: 'GitHub', icon: '🐙', category: 'Development', status: 'idle' },
  { id: '2', name: 'Browser', icon: '🌐', category: 'Automation', status: 'idle' },
  { id: '3', name: 'Calendar', icon: '📅', category: 'Productivity', status: 'active' },
  { id: '4', name: 'Social Media', icon: '📱', category: 'Marketing', status: 'idle' },
  { id: '5', name: 'Memory', icon: '🧠', category: 'Core', status: 'active' },
  { id: '6', name: 'Security', icon: '🔒', category: 'System', status: 'idle' },
  { id: '7', name: 'Voice Call', icon: '📞', category: 'Communication', status: 'idle' },
  { id: '8', name: 'Research', icon: '🔍', category: 'Intelligence', status: 'idle' },
  { id: '9', name: 'Analytics', icon: '📊', category: 'Insights', status: 'idle' },
  { id: '10', name: 'File Manager', icon: '📁', category: 'System', status: 'active' },
];

export default function ToolsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [results, setResults] = useState<Array<{ tool: string; output: string; timestamp: Date }>>([
    {
      tool: 'Memory',
      output: '✓ Daily briefing completed successfully',
      timestamp: new Date(),
    },
  ]);

  const categories = ['All', ...Array.from(new Set(toolsData.map((t) => t.category)))];

  const filteredTools =
    selectedCategory === 'All'
      ? toolsData
      : toolsData.filter((t) => t.category === selectedCategory);

  const getStatusColor = (status: Tool['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'running':
        return 'bg-yellow-500 animate-pulse';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Available Tools */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 flex-1 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <span>🛠️</span> Available Tools
          </h2>
        </div>

        {/* Category Filter */}
        <div className="px-4 py-3 border-b border-purple-500/20">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Tools Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-700/50 border border-purple-500/20 rounded-xl p-3 hover:bg-slate-700/80 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(tool.status)}`} />
                </div>
                <h3 className="text-white font-semibold text-sm">{tool.name}</h3>
                <p className="text-slate-400 text-xs">{tool.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 h-64 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <span>📊</span> Recent Results
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {results.length === 0 ? (
            <p className="text-slate-400 text-center text-sm">No recent results</p>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                className="bg-slate-700/50 border border-purple-500/20 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">
                    {result.tool}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {result.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{result.output}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
