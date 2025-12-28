import React, { useState } from 'react';
import Chat from './Chat';

const Dashboard = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col w-full relative overflow-hidden font-poppins">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 right-0 z-[1000] h-[72px] w-full">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-2xl p-2 hover:bg-white/5 rounded-xl transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#6366F1" strokeWidth="12"/>
              <text x="50" y="65" textAnchor="middle" fill="#6366F1" className="text-4xl font-black italic">$</text>
            </svg>
            <span className="text-2xl font-black font-outfit tracking-tighter hidden sm:block">finago.ai</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-2xl transition-all border border-white/10 group-active:scale-95">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs ring-2 ring-indigo-500/20">
                {userData?.name?.charAt(0) || 'U'}
              </div>
              <span className="font-semibold text-sm hidden sm:block">{userData?.name || 'User'}</span>
              <span className="text-white/20 text-[10px] group-hover:translate-y-0.5 transition-transform">▼</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 shadow-2xl z-50">
              <div className="p-3 border-b border-white/5 mb-1">
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest leading-none mb-2">Connected as</p>
                <p className="font-bold text-sm truncate">{userData?.email}</p>
              </div>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-rose-500 transition-colors font-semibold text-sm"
              >
                <span>🚪</span> Logout Securely
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 pt-[72px] h-full overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className={`
          fixed md:static inset-y-0 left-0 w-[300px] h-full
          bg-[#070708] border-r border-white/5 p-6 flex flex-col gap-2 
          z-[1100] transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="mb-8 px-4">
            <h2 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mb-6">Navigator</h2>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-white/60'}
                `}
              >
                <span className={`text-xl transition-transform duration-300 ${activeTab === 'home' ? 'scale-110' : 'group-hover:scale-110'}`}>
                  🏠
                </span>
                <span className="font-bold tracking-tight">Home</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('advisor');
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${activeTab === 'advisor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-white/60'}
                `}
              >
                <span className={`text-xl transition-transform duration-300 ${activeTab === 'advisor' ? 'scale-110' : 'group-hover:scale-110'}`}>
                  🤖
                </span>
                <span className="font-bold tracking-tight">AI Advisor</span>
              </button>
            </div>
          </div>

          <div className="mt-auto p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-125 transition-transform duration-700">💎</div>
            <h3 className="font-black text-indigo-400 text-sm mb-2 uppercase tracking-tight italic">Premium Finago</h3>
            <p className="text-[11px] text-white/50 font-medium leading-relaxed mb-4 italic">
              Unlock tax-saving vaults and automatic portfolio rebalancing.
            </p>
            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40">
              Upgrade Now
            </button>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1050] md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#070708]">
          <div className="max-w-5xl mx-auto w-full">
            {activeTab === 'home' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-transparent -z-10" />
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none">
                        Good Morning, <br className="md:hidden" />
                        <span className="text-indigo-400">{userData?.name?.split(' ')[0] || 'User'}!</span>
                      </h1>
                      <p className="text-white/50 text-lg font-light max-w-lg leading-relaxed">
                        Want to know how to save more? Let's chat!
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('advisor')}
                      className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-indigo-500/20 cursor-pointer"
                    >
                      Talk to Finago
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advisor' && (
              <div className="h-[calc(100vh-72px-80px)] md:h-[calc(100vh-160px)] animate-in fade-in zoom-in-95 duration-500">
                <Chat userData={userData} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
