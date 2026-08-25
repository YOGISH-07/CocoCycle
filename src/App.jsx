import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ListingDetailModal from './components/ListingDetailModal';
import InquiryModal from './components/InquiryModal';
import EditProfileModal from './components/EditProfileModal';
import LandingView from './views/LandingView';
import MarketplaceView from './views/MarketplaceView';
import CreateListingView from './views/CreateListingView';
import SellerDashboardView from './views/SellerDashboardView';
import BuyerDashboardView from './views/BuyerDashboardView';
import AdminDashboardView from './views/AdminDashboardView';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  MapPin 
} from 'lucide-react';

export default function App() {
  const { 
    activeTab, 
    userRole, 
    currentUser, 
    isLoggedIn,
    toasts, 
    removeToast 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl shadow-xl backdrop-blur-md border flex items-start justify-between gap-3 animate-slide-in ${
              toast.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-200'
                : toast.type === 'info'
                ? 'bg-sky-950/95 border-sky-500/40 text-sky-200'
                : 'bg-amber-950/95 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Global Modals */}
      <AuthModal />
      <EditProfileModal />
      <ListingDetailModal />
      <InquiryModal />

      {/* Main Header Component */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Role Bar (Visible when logged in except on Landing view) */}
        {isLoggedIn && currentUser && activeTab !== 'landing' && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentUser.avatar || '🌴'}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Authenticated Role:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    userRole === 'BUYER' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    userRole === 'SELLER' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {userRole} Mode
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-0.5">
                  {currentUser.name} {currentUser.company && <span className="text-slate-400 font-normal">({currentUser.company})</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {currentUser.location || 'Location Not Set'} ({currentUser.pincode || 'Pincode'})
              </span>
              <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-amber-400 font-bold">
                ★ {currentUser.rating ?? 0} Rating
              </span>
            </div>
          </div>
        )}

        {/* TAB 0: LANDING PAGE VIEW */}
        {activeTab === 'landing' && <LandingView />}

        {/* TAB 1: MARKETPLACE CATALOG VIEW */}
        {activeTab === 'marketplace' && <MarketplaceView />}

        {/* TAB 2: CREATE LISTING VIEW */}
        {activeTab === 'create_listing' && <CreateListingView />}

        {/* TAB 3: SELLER DASHBOARD VIEW */}
        {activeTab === 'seller_dashboard' && <SellerDashboardView />}

        {/* TAB 4: BUYER DASHBOARD VIEW */}
        {activeTab === 'buyer_dashboard' && <BuyerDashboardView />}

        {/* TAB 5: GENERIC DASHBOARD ROUTER (Fallback based on active userRole) */}
        {activeTab === 'dashboard' && (
          userRole === 'SELLER' ? <SellerDashboardView /> : userRole === 'BUYER' ? <BuyerDashboardView /> : <AdminDashboardView />
        )}

        {/* TAB 6: ADMIN OPERATIONS HUB VIEW */}
        {activeTab === 'admin' && <AdminDashboardView />}

      </main>

      {/* Main Footer Component */}
      <Footer />
    </div>
  );
}
