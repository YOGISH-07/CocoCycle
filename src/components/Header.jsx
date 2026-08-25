import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palmtree, 
  Store, 
  PlusCircle, 
  LayoutDashboard, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  ArrowRightLeft,
  LogIn,
  LogOut,
  Menu,
  X,
  Home,
  FileText
} from 'lucide-react';

export default function Header() {
  const { 
    userRole, 
    switchRole, 
    activeTab, 
    setActiveTab, 
    isLoggedIn, 
    logoutUser, 
    setIsAuthModalOpen,
    setIsEditProfileOpen,
    inquiries, 
    marketStats, 
    currentUser 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute pending inquiries count for badge
  const pendingInquiriesCount = inquiries ? inquiries.filter(i => i.status === 'pending').length : 0;

  const navigateToDashboard = () => {
    if (userRole === 'SELLER') {
      setActiveTab('seller_dashboard');
    } else if (userRole === 'BUYER') {
      setActiveTab('buyer_dashboard');
    } else {
      setActiveTab('admin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top Banner Notice - Market Ticker */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-950 to-amber-950/80 border-b border-slate-800/50 py-1.5 px-4 text-xs font-medium text-slate-300 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> CocoCycle MVP
          </span>
          <span className="hidden sm:inline text-slate-400">Direct Agricultural & Industrial Waste Exchange</span>
        </div>

        {/* Live Impact Counter Ticker */}
        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {marketStats.totalTonsUpcycled ? marketStats.totalTonsUpcycled.toLocaleString() : '12,450'} Tons Upcycled
          </span>
          <span className="hidden md:flex items-center gap-1 text-amber-400 font-semibold">
            🌱 {marketStats.co2SavedTons ? marketStats.co2SavedTons.toLocaleString() : '9,320'} T CO₂ Saved
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('landing')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
              <Palmtree className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-300">
                Coco<span className="text-emerald-400 font-extrabold">Cycle</span>
              </h1>
              <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold px-1.5 py-0.5 rounded">
                B2B
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Coconut & Areca Waste Marketplace</p>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'landing'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'marketplace'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            Marketplace
          </button>

          <button
            onClick={() => setActiveTab('create_listing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'create_listing'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            List Waste
          </button>

          <button
            onClick={navigateToDashboard}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative ${
              activeTab.includes('dashboard')
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
            {pendingInquiriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center ml-1">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'admin'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
        </nav>

        {/* Right User Role Badge & Auth Controls */}
        <div className="flex items-center gap-3">
          {/* Active Role Badge (Derived from public.profiles.role) */}
          {isLoggedIn && currentUser && (
            <div className="hidden sm:flex bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold text-slate-400">Role:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                userRole === 'BUYER' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                userRole === 'SELLER' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
                'bg-indigo-950 text-indigo-400 border-indigo-500/40'
              }`}>
                {userRole}
              </span>
            </div>
          )}

          {/* User Account Profile / Login Button */}
          {isLoggedIn && currentUser ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => setIsEditProfileOpen(true)}
                title="Edit Profile"
                className="hidden xl:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer hover:border-slate-700 transition-colors"
              >
                <span className="text-lg">{currentUser.avatar || '🌴'}</span>
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-slate-200 max-w-[120px] truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-400 font-medium capitalize flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5" /> {currentUser.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logoutUser}
                title="Logout"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In / Register
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-4 animate-fade-in">
          {/* Role selector for mobile (Gated by VITE_ENABLE_DEMO_PERSONAS) */}
          {import.meta.env.VITE_ENABLE_DEMO_PERSONAS !== 'false' && (
            <div className="sm:hidden flex bg-slate-900 border border-slate-800 p-1 rounded-xl items-center justify-around">
              <button
                onClick={() => { switchRole('BUYER'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${userRole === 'BUYER' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}
              >
                Buyer Mode
              </button>
              <button
                onClick={() => { switchRole('SELLER'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${userRole === 'SELLER' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}
              >
                Seller Mode
              </button>
              <button
                onClick={() => { switchRole('ADMIN'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${userRole === 'ADMIN' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Admin Mode
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-emerald-400" /> Home
            </button>
            <button
              onClick={() => { setActiveTab('marketplace'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-emerald-400" /> Marketplace
            </button>
            <button
              onClick={() => { setActiveTab('create_listing'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" /> List Waste
            </button>
            <button
              onClick={() => { navigateToDashboard(); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Navigation for Mobile Devices */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${
            activeTab === 'landing' ? 'text-emerald-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${
            activeTab === 'marketplace' ? 'text-emerald-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <Store className="w-4 h-4" />
          Market
        </button>
        <button
          onClick={() => setActiveTab('create_listing')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${
            activeTab === 'create_listing' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          Post
        </button>
        <button
          onClick={navigateToDashboard}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${
            activeTab.includes('dashboard') ? 'text-emerald-400 font-extrabold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${
            activeTab === 'admin' ? 'text-slate-200 font-extrabold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Admin
        </button>
      </div>
    </header>
  );
}
