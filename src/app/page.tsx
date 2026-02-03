'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ToolsPanel from '@/components/ToolsPanel';
import DashboardHeader from '@/components/DashboardHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Chat Section - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          {/* Tools Section - Takes 1/3 on large screens */}
          <div className="lg:col-span-1">
            <ToolsPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
