import React, { useState } from 'react';
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
  Edit3,
  CheckCircle2, 
  XCircle, 
  Clock, 
  Tag, 
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  X,
  Loader2
} from 'lucide-react';

export default function SellerDashboardView() {
  const { 
    currentUser, 
    isLoggedIn, 
    isAuthLoading,
    isListingsLoading,
    setIsAuthModalOpen, 
    listings, 
    inquiries, 
    updateListing,
    deleteListing, 
    updateInquiryStatus, 
    setSelectedListing, 
    setActiveTab,
    setIsEditProfileOpen
  } = useApp();

  // Modal states for Editing & Delete Confirmation
  const [editingListing, setEditingListing] = useState(null);
  const [deletingListingId, setDeletingListingId] = useState(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Filter tab states
  const [listingFilter, setListingFilter] = useState('all'); // 'all' | 'approved' | 'pending'
  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all' | 'pending' | 'accepted' | 'rejected'

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    quantity: '',
    pricePerUnit: '',
    condition: 'Dry',
    moisturePercent: '',
    location: '',
    pincode: '',
    description: ''
  });

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

  // Filter listings strictly belonging to current seller
  const sellerListings = listings.filter(
    (item) => (currentUser?.id && item.sellerId === currentUser.id) || (currentUser?.name && item.sellerName === currentUser.name)
  );

  // Filter received inquiries for current seller
  const receivedInquiries = inquiries.filter(
    (inq) => (currentUser?.id && inq.sellerId === currentUser.id) || (currentUser?.name && inq.sellerName === currentUser.name)
  );

  // Calculate dynamic stats
  const activeListingsCount = sellerListings.filter(l => l.status !== 'rejected').length;
  const totalQuantityListed = sellerListings.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const receivedInquiriesCount = receivedInquiries.length;
  const estimatedListingValue = sellerListings.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.pricePerUnit) || 0), 
    0
  );

  // Filtered listings view
  const filteredSellerListings = sellerListings.filter((item) => {
    if (listingFilter === 'approved') return item.status === 'approved' || item.status === 'Active';
    if (listingFilter === 'pending') return item.status === 'pending';
    return true;
  });

  // Filtered inquiries view
  const filteredInquiries = receivedInquiries.filter((inq) => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  // Open Edit Modal
  const handleOpenEdit = (listing) => {
    setEditingListing(listing);
    setEditForm({
      title: listing.title || '',
      quantity: listing.quantity || '',
      pricePerUnit: listing.pricePerUnit || '',
      condition: listing.condition || 'Dry',
      moisturePercent: listing.moisturePercent || '',
      location: listing.location || '',
      pincode: listing.pincode || '',
      description: listing.description || ''
    });
  };

  // Submit Edit Form
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingListing) return;

    setIsSubmittingEdit(true);
    await updateListing(editingListing.id, editForm);
    setIsSubmittingEdit(false);
    setEditingListing(null);
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingListingId) return;
    await deleteListing(deletingListingId);
    setDeletingListingId(null);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. SELLER DASHBOARD HEADER & PROFILE CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-950 text-amber-400 border border-amber-800/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Seller Management Portal
            </span>
            <span className="text-xs text-slate-400">• Verified Agro-Waste Exchange</span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Palmtree className="w-5 h-5 text-amber-400" />
            Your Waste Supplies ({sellerListings.length})
          </h2>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2">
            {['all', 'approved', 'pending'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setListingFilter(filterKey)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  listingFilter === filterKey
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filterKey}
              </button>
            ))}

            <button
              onClick={() => setActiveTab('create_listing')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 ml-2"
            >
              + Post Listing
            </button>
          </div>
        </div>

        {isListingsLoading ? (
          <div className="space-y-3">
            {[1, 2].map((idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 animate-pulse h-24"></div>
            ))}
          </div>
        ) : filteredSellerListings.length > 0 ? (
          <div className="space-y-3">
            {filteredSellerListings.map((item) => (
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                      item.status === 'approved' || item.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : item.status === 'rejected'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
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
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Listing"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeletingListingId(item.id)}
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
            <h3 className="text-sm font-bold text-white">No Waste Listings Found</h3>
            <p className="text-xs text-slate-400">You haven't posted any coconut or areca waste supplies matching this filter.</p>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            Buyer Inquiries & Quote Requests ({receivedInquiries.length})
          </h2>

          {/* Inquiry Filter Pills */}
          <div className="flex items-center gap-2">
            {['all', 'pending', 'accepted', 'rejected'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setInquiryFilter(filterKey)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  inquiryFilter === filterKey
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>
        </div>

        {filteredInquiries.length > 0 ? (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
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
            <h3 className="text-sm font-bold text-white">No Buyer Inquiries Found</h3>
            <p className="text-xs text-slate-400">Quotes and inquiry messages matching this status filter will appear here.</p>
          </div>
        )}
      </div>


      {/* 5. EDIT LISTING MODAL */}
      {editingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-black text-white tracking-tight">Edit Waste Supply</h2>
              </div>

              <button
                onClick={() => setEditingListing(null)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editForm.quantity}
                    onChange={(e) => setEditForm(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Price / Unit (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editForm.pricePerUnit}
                    onChange={(e) => setEditForm(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Condition</label>
                  <select
                    value={editForm.condition}
                    onChange={(e) => setEditForm(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Dry">Dry</option>
                    <option value="Semi-Wet">Semi-Wet</option>
                    <option value="Wet">Wet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Moisture %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.moisturePercent}
                    onChange={(e) => setEditForm(prev => ({ ...prev, moisturePercent: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Location City</label>
                  <input
                    type="text"
                    required
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={editForm.pincode}
                    onChange={(e) => setEditForm(prev => ({ ...prev, pincode: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmittingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* 6. DELETE CONFIRMATION MODAL */}
      {deletingListingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-white">Delete Listing?</h3>
              <p className="text-xs text-slate-400">Are you sure you want to delete this listing from the marketplace? This action cannot be undone.</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingListingId(null)}
                className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-500 text-white font-black px-5 py-2 rounded-xl text-xs transition-all shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
