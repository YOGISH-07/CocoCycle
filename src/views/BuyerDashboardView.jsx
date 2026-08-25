import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Send, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Heart, 
  Eye, 
  MapPin, 
  Scale, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Trash2,
  Sparkles,
  UserCheck,
  X,
  Calendar,
  FileText,
  Loader2
} from 'lucide-react';

export default function BuyerDashboardView() {
  const { 
    currentUser, 
    isLoggedIn, 
    isAuthLoading,
    isInquiriesLoading,
    setIsAuthModalOpen, 
    listings, 
    inquiries, 
    savedListingIds, 
    toggleSaveListing, 
    setSelectedListing, 
    setActiveTab,
    setIsEditProfileOpen
  } = useApp();

  // State for RFQ detail view modal
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [rfqFilter, setRfqFilter] = useState('all'); // 'all' | 'pending' | 'accepted' | 'rejected'

  if (isAuthLoading) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 shadow-2xl animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-slate-950 mx-auto"></div>
        <div className="h-6 bg-slate-950 rounded-lg w-2/3 mx-auto"></div>
        <div className="h-4 bg-slate-950 rounded-lg w-full"></div>
      </div>
    );
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl mx-auto">
          🏬
        </div>
        <h2 className="text-xl font-black text-white">Sign In Required</h2>
        <p className="text-xs text-slate-400">Please sign in to your buyer account to access your RFQ quote requests and saved listings.</p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md"
        >
          Sign In as Buyer
        </button>
      </div>
    );
  }

  // Filter RFQs strictly sent by current buyer
  const buyerInquiries = inquiries.filter(
    (inq) => (currentUser?.id && inq.buyerId === currentUser.id) || (currentUser?.name && inq.buyerName === currentUser.name)
  );

  // Filter saved listings
  const savedListings = listings.filter((item) => savedListingIds && savedListingIds.includes(item.id));

  // Dynamic stats calculation
  const rfqsSentCount = buyerInquiries.length;
  const pendingResponsesCount = buyerInquiries.filter((inq) => inq.status === 'pending').length;
  const acceptedQuotesCount = buyerInquiries.filter((inq) => inq.status === 'accepted').length;
  const estimatedProcurementValue = buyerInquiries.reduce(
    (sum, inq) => sum + (inq.totalAmount || (inq.requestedQuantity * inq.offeredPricePerUnit) || 0), 
    0
  );

  // Filtered RFQs list
  const filteredInquiries = buyerInquiries.filter((inq) => {
    if (rfqFilter === 'all') return true;
    return inq.status === rfqFilter;
  });

  const handleViewListingByInquiry = (inquiryItem) => {
    const targetListing = listings.find((item) => item.id === inquiryItem.listingId);
    if (targetListing) {
      setSelectedListing(targetListing);
    } else {
      setSelectedListing({
        id: inquiryItem.listingId,
        title: inquiryItem.listingTitle,
        categoryName: 'Agro Waste',
        sellerName: inquiryItem.sellerName,
        sellerVerified: true,
        sellerRating: 4.8,
        quantity: inquiryItem.requestedQuantity,
        unit: inquiryItem.unit,
        pricePerUnit: inquiryItem.offeredPricePerUnit,
        condition: 'Dry',
        moisturePercent: 10,
        location: inquiryItem.deliveryLocation || 'South India Hub',
        pincode: '560001',
        description: 'Verified agricultural waste raw material.',
        images: ['https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80']
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. BUYER DASHBOARD HEADER & PROFILE CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Buyer Procurement Portal
            </span>
            <span className="text-xs text-slate-400">• Raw Material Sourcing</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Buyer Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Track your sent RFQ quote requests, monitor supplier responses, and manage saved waste supplies.
            </p>
          </div>

          {/* Profile Pill */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-bold text-white">
              <Building2 className="w-4 h-4 text-emerald-400" /> {currentUser.name} ({currentUser.company || 'Eco-Pack Corp'})
            </span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Recycler
            </span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400">
              📍 {currentUser.location} ({currentUser.pincode})
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
            onClick={() => setActiveTab('marketplace')}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Browse Marketplace
          </button>
        </div>
      </div>


      {/* 2. DYNAMIC STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">RFQs Sent</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{rfqsSentCount}</p>
          <p className="text-[10px] text-slate-500">Quote offers submitted</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending Responses</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">{pendingResponsesCount}</p>
          <p className="text-[10px] text-slate-500">Awaiting seller response</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accepted Quotes</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-300">{acceptedQuotesCount}</p>
          <p className="text-[10px] text-slate-500">Quotes confirmed by sellers</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Procurement Value</p>
          <p className="text-2xl sm:text-3xl font-black text-white">₹{estimatedProcurementValue.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500">Total requested trade value</p>
        </div>
      </div>


      {/* 3. BUYER SENT RFQS SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-400" />
            Your Submitted Quote Requests / RFQs ({buyerInquiries.length})
          </h2>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2">
            {['all', 'pending', 'accepted', 'rejected'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setRfqFilter(filterKey)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  rfqFilter === filterKey
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>
        </div>

        {isInquiriesLoading ? (
          <div className="space-y-3">
            {[1, 2].map((idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 animate-pulse h-24"></div>
            ))}
          </div>
        ) : filteredInquiries.length > 0 ? (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all cursor-pointer"
                onClick={() => setSelectedRFQ(inq)}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{inq.listingTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Supplier: <strong className="text-slate-200">{inq.sellerName}</strong></p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500">{inq.createdAt}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${
                      inq.status === 'accepted' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                      inq.status === 'rejected' ? 'bg-rose-950 text-rose-400 border-rose-500/40' :
                      'bg-amber-950 text-amber-400 border-amber-500/40'
                    }`}>
                      {inq.status === 'accepted' ? 'Accepted ✓' : inq.status === 'rejected' ? 'Rejected ✕' : 'Pending Response'}
                    </span>
                  </div>
                </div>

                {/* RFQ Specs */}
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
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Total Offered Value</p>
                    <p className="font-black text-white">₹{(inq.totalAmount || (inq.requestedQuantity * inq.offeredPricePerUnit)).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Delivery Target</p>
                    <p className="font-semibold text-slate-300 truncate">{inq.deliveryLocation || 'Destination set'}</p>
                  </div>
                </div>

                {/* Message preview & View listing button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-slate-400 italic flex-1 truncate">
                    "{inq.message || 'Standard quote request submitted.'}"
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedRFQ(inq); }}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1 shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" /> RFQ Details
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleViewListingByInquiry(inq); }}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> View Supply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Buyer RFQs */
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No RFQs Found</h3>
            <p className="text-xs text-slate-400">You haven't requested any bulk quotes matching this status filter. Explore the marketplace to find raw materials.</p>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              Browse Marketplace
            </button>
          </div>
        )}
      </div>


      {/* 4. BUYER SAVED / BOOKMARKED LISTINGS SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          Saved Supplies ({savedListings.length})
        </h2>

        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedListings.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0" />
                  <div className="space-y-1">
                    <span className="bg-emerald-950 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {item.categoryName}
                    </span>
                    <h3 className="text-xs font-black text-white line-clamp-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 font-bold">₹{item.pricePerUnit.toLocaleString()} / {item.unit} • {item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedListing(item)}
                    title="View Details"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleSaveListing(item.id)}
                    title="Remove Saved"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Saved Listings */
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No Saved Listings</h3>
            <p className="text-xs text-slate-400">Click the heart icon on any marketplace card to bookmark supplies for quick access.</p>
          </div>
        )}
      </div>


      {/* 5. RFQ DETAIL MODAL */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-black text-white tracking-tight">RFQ Quote Specifications</h2>
              </div>

              <button
                onClick={() => setSelectedRFQ(null)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Item: {selectedRFQ.listingTitle}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                    selectedRFQ.status === 'accepted' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                    selectedRFQ.status === 'rejected' ? 'bg-rose-950 text-rose-400 border-rose-500/40' :
                    'bg-amber-950 text-amber-400 border-amber-500/40'
                  }`}>
                    {selectedRFQ.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">Supplier: <strong>{selectedRFQ.sellerName}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Requested Quantity</p>
                  <p className="font-extrabold text-white mt-0.5">{selectedRFQ.requestedQuantity} {selectedRFQ.unit}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Offered Price</p>
                  <p className="font-extrabold text-emerald-400 mt-0.5">₹{selectedRFQ.offeredPricePerUnit.toLocaleString()} / {selectedRFQ.unit}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Total RFQ Value</p>
                  <p className="font-black text-white mt-0.5">₹{(selectedRFQ.totalAmount || (selectedRFQ.requestedQuantity * selectedRFQ.offeredPricePerUnit)).toLocaleString()}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Delivery Location</p>
                  <p className="font-semibold text-slate-300 mt-0.5 truncate">{selectedRFQ.deliveryLocation || 'Location specified'}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Message & Specifications</p>
                <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed italic">
                  "{selectedRFQ.message || 'No additional message.'}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    const rfq = selectedRFQ;
                    setSelectedRFQ(null);
                    handleViewListingByInquiry(rfq);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Waste Supply Listing
                </button>

                <button
                  onClick={() => setSelectedRFQ(null)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
