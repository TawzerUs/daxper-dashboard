'use client';

export default function DashboardHeader() {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🛰️</div>
            <div>
              <h1 className="text-2xl font-bold text-white">DaxPer Dashboard</h1>
              <p className="text-slate-400 text-sm">Autonomous AI Operator</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-white font-semibold">Tawzer</p>
              <p className="text-slate-400 text-sm">Casablanca, Morocco</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
