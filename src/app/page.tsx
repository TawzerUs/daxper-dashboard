'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ToolsPanel from '@/components/ToolsPanel';
import DashboardHeader from '@/components/DashboardHeader';
import LoginScreen from '@/components/LoginScreen';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('daxper_token');
    if (token) {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('daxper_token');
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showLogin ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <DashboardHeader onLogout={handleLogout} />
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
        </>
      )}
    </main>
  );
}
