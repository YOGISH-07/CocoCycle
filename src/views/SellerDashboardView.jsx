import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlusCircle, 
  Palmtree, 
  Scale, 
  IndianRupee, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Tag, 
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function SellerDashboardView() {
  const { 
    currentUser, 
    isLoggedIn, 
    setIsAuthModalOpen, 
    listings, 
    inquiries, 
    deleteListing, 
    updateInquiryStatus, 
    setSelectedListing, 
    setActiveTab,
    setIsEditProfileOpen
  } = useApp();

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl mx-auto">
          🌴
        </div>
        <h2 className="text-xl font-black text-white">Sign In Required</h2>
        <p className="text-xs text-slate-400">Please sign in to your seller account to manage your listings and received inquiries.</p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md"
        >
          Sign In as Seller
        </button>
      </div>
    );
  }

  // Filter listings for current seller
  const sellerListings = listings.filter(
    (item) => (currentUser?.id && item.sellerId === currentUser.id) || (currentUser?.name && item.sellerName === currentUser.name)
  );

  // Filter received inquiries for current seller
  const receivedInquiries = inquiries.filter(
    (inq) => (currentUser?.id && inq.sellerId === currentUser.id) || (currentUser?.name && inq.sellerName === currentUser.name)
  );

  // Calculate dynamic stats
  const activeListingsCount = sellerListings.length;
  const totalQuantityListed = sellerListings.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const receivedInquiriesCount = receivedInquiries.length;
  const estimatedListingValue = sellerListings.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.pricePerUnit) || 0), 
    0
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. SELLER DASHBOARD HEADER & PROFILE CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-950 text-amber-400 border border-amber-800/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Seller Management Portal
            </span>
            <span className="text-xs text-slate-400">• Real-Time Trade Hub</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Seller Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Manage your agricultural waste supplies, review buyer quote requests, and track sales.
            </p>
          </div>

          {/* Profile Pill */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-bold text-white">
              <span className="text-base">{currentUser.avatar || '🌴'}</span> {currentUser.name}
            </span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Supplier
            </span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-amber-400 font-bold">
              ★ {currentUser.rating} Rating
            </span>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-bold transition-colors"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="shrink-0">
          <button
            onClick={() => setActiveTab('create_listing')}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            List New Waste Supply
          </button>
        </div>
      </div>


      {/* 2. DYNAMIC STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Listings</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">{activeListingsCount}</p>
          <p className="text-[10px] text-slate-500">Live in marketplace</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Quantity Listed</p>
          <p className="text-2xl sm:text-3xl font-black text-white">{totalQuantityListed} <span className="text-xs text-slate-400 font-normal">Tons</span></p>
          <p className="text-[10px] text-slate-500">Volume available for trade</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Buyer Inquiries (RFQs)</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{receivedInquiriesCount}</p>
          <p className="text-[10px] text-slate-500">Quotes received from buyers</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Listing Value</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-300">₹{estimatedListingValue.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500">Total gross inventory value</p>
        </div>
      </div>


      {/* 3. SELLER LISTINGS SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-amber-400" />
            Your Waste Supplies ({sellerListings.length})
          </h2>

          <button
            onClick={() => setActiveTab('create_listing')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            + Post Listing
          </button>
        </div>

        {sellerListings.length > 0 ? (
          <div className="space-y-3">
            {sellerListings.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                {/* Image & Title */}
                <div className="flex items-center gap-4">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0" 
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-950 text-amber-400 border border-amber-800/40 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                        {item.categoryName}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.condition} ({item.moisturePercent}% Moisture)</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {item.location} ({item.pincode})
                    </p>
                  </div>
                </div>

                {/* Specs & Pricing */}
                <div className="flex items-center justify-between md:justify-end gap-6 text-xs border-t border-slate-800 md:border-t-0 pt-3 md:pt-0">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Quantity</p>
                    <p className="font-extrabold text-white">{item.quantity} {item.unit}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Price / {item.unit}</p>
                    <p className="font-extrabold text-emerald-400">₹{item.pricePerUnit.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Status</p>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {item.status || 'Active'}
                    </span>
                  </div>

                  {/* Listing Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedListing(item)}
                      title="View Details"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteListing(item.id)}
                      title="Delete Listing"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Seller Listings */
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Palmtree className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No Waste Listings Yet</h3>
            <p className="text-xs text-slate-400">You haven't posted any coconut or areca waste supplies for trade.</p>
            <button
              onClick={() => setActiveTab('create_listing')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              List Your Waste
            </button>
          </div>
        )}
      </div>


      {/* 4. SELLER INQUIRIES (RECEIVED RFQS) SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          Buyer Inquiries & Quote Requests ({receivedInquiries.length})
        </h2>

        {receivedInquiries.length > 0 ? (
          <div className="space-y-4">
            {receivedInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
              >
                {/* Inquiry Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white">{inq.buyerName}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({inq.buyerCompany || 'Procurement Buyer'})</span>
                    </div>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5">Item: {inq.listingTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{inq.createdAt}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${
                      inq.status === 'accepted' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                      inq.status === 'rejected' ? 'bg-rose-950 text-rose-400 border-rose-500/40' :
                      'bg-amber-950 text-amber-400 border-amber-500/40'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </div>

                {/* Inquiry Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Requested Quantity</p>
                    <p className="font-extrabold text-white">{inq.requestedQuantity} {inq.unit}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Offered Price</p>
                    <p className="font-extrabold text-emerald-400">₹{inq.offeredPricePerUnit.toLocaleString()} / {inq.unit}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Total RFQ Value</p>
                    <p className="font-black text-white">₹{(inq.totalAmount || (inq.requestedQuantity * inq.offeredPricePerUnit)).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Delivery Location</p>
                    <p className="font-semibold text-slate-300 truncate">{inq.deliveryLocation || 'Location specified'}</p>
                  </div>
                </div>

                {/* Message preview */}
                {inq.message && (
                  <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 italic">
                    "{inq.message}"
                  </p>
                )}

                {/* RFQ Action Buttons (Accept / Reject) */}
                {inq.status === 'pending' && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'rejected')}
                      className="bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject Quote
                    </button>

                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'accepted')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Accept Quote Offer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Seller Inquiries */
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No Buyer Inquiries Yet</h3>
            <p className="text-xs text-slate-400">Quotes and inquiry messages sent by industrial buyers will appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
}
