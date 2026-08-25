import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Trash2, 
  Star, 
  Eye, 
  Palmtree, 
  Layers, 
  Flame, 
  Leaf, 
  Box, 
  Recycle, 
  Scale, 
  MapPin, 
  IndianRupee, 
  Send, 
  Clock, 
  ShieldAlert,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardView() {
  const { 
    userRole, 
    currentUser, 
    listings, 
    inquiries, 
    approveListing, 
    flagListing, 
    featureListing, 
    rejectListing, 
    deleteListing, 
    setSelectedListing, 
    setActiveTab, 
    marketStats 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'flagged' | 'rejected' | 'featured'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Confirmation Modal state for destructive actions
  const [confirmModal, setConfirmModal] = useState(null); // { type: 'delete' | 'reject', listing: item }

  // Security Check: Only allow Admin users
  if (userRole !== 'ADMIN' || !currentUser) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl mx-auto">
          <ShieldAlert className="w-8 h-8 text-indigo-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Admin Access Required</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            This console is strictly restricted to CocoCycle platform supervisors for marketplace moderation and quality control.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('marketplace')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md inline-flex items-center gap-2"
        >
          Return to Marketplace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Calculate status count tallies
  const pendingCount = listings.filter((i) => i.status === 'pending_approval' || i.status === 'pending').length;
  const activeCount = listings.filter((i) => i.status === 'approved' || i.status === 'active').length;
  const flaggedCount = listings.filter((i) => i.status === 'flagged').length;
  const rejectedCount = listings.filter((i) => i.status === 'rejected').length;
  const featuredCount = listings.filter((i) => i.featured || i.status === 'featured').length;
  const totalTonsListed = listings.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);

  // Filter listings for moderation table
  let filteredListings = listings.filter((item) => {
    // Status tab filter
    let matchesStatus = true;
    if (statusFilter === 'pending') matchesStatus = item.status === 'pending_approval' || item.status === 'pending';
    else if (statusFilter === 'approved') matchesStatus = item.status === 'approved' || item.status === 'active';
    else if (statusFilter === 'flagged') matchesStatus = item.status === 'flagged';
    else if (statusFilter === 'rejected') matchesStatus = item.status === 'rejected';
    else if (statusFilter === 'featured') matchesStatus = item.featured || item.status === 'featured';

    // Category filter
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

    // Search query
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.title.toLowerCase().includes(q) ||
      item.sellerName.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q) ||
      item.pincode.toLowerCase().includes(q);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Apply sorting
  filteredListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price_high') return b.pricePerUnit - a.pricePerUnit;
    if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === 'quantity_high') return b.quantity - a.quantity;
    return b.id.localeCompare(a.id); // newest
  });

  // Calculate real market price index per category
  const calculateCategoryBenchmark = (catKey) => {
    const items = listings.filter((i) => i.category === catKey);
    if (items.length === 0) return { avgPrice: 0, count: 0, unit: 'Ton' };
    const totalPrice = items.reduce((sum, i) => sum + Number(i.pricePerUnit || 0), 0);
    return {
      avgPrice: Math.round(totalPrice / items.length),
      count: items.length,
      unit: items[0].unit || 'Ton'
    };
  };

  const huskBenchmark = calculateCategoryBenchmark('coconut_husk');
  const sheathBenchmark = calculateCategoryBenchmark('areca_sheath');
  const pithBenchmark = calculateCategoryBenchmark('coir_pith');
  const shellBenchmark = calculateCategoryBenchmark('coconut_shell');

  const handleConfirmAction = () => {
    if (!confirmModal) return;
    const { type, listing } = confirmModal;
    if (type === 'delete') {
      deleteListing(listing.id);
    } else if (type === 'reject') {
      rejectListing(listing.id);
    }
    setConfirmModal(null);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. ADMIN HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950/50 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-950 text-indigo-400 border border-indigo-800/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Superuser Console
            </span>
            <span className="text-xs text-slate-400">• Operations & Moderation</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            CocoCycle Admin Operations
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Monitor platform activity, inspect waste listings, moderate seller quality, and track regional market price benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl shrink-0">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <div className="text-left text-xs">
            <p className="font-bold text-white">Superuser Mode Active</p>
            <p className="text-[10px] text-slate-400">{currentUser?.name || 'Admin Ops'}</p>
          </div>
        </div>
      </div>


      {/* 2. DYNAMIC PLATFORM STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Active Listings</p>
          <p className="text-2xl font-black text-emerald-400">{activeCount}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Tonnage</p>
          <p className="text-2xl font-black text-white">{totalTonsListed} <span className="text-xs text-slate-500 font-normal">Tons</span></p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Pending Review</p>
          <p className="text-2xl font-black text-amber-400">{pendingCount}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Active RFQs</p>
          <p className="text-2xl font-black text-sky-400">{inquiries ? inquiries.length : 0}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Verified Sellers</p>
          <p className="text-2xl font-black text-emerald-300">{marketStats.activeSellersCount || 340}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Industrial Buyers</p>
          <p className="text-2xl font-black text-indigo-400">{marketStats.activeBuyersCount || 180}</p>
        </div>
      </div>


      {/* 3. MARKET PRICE BENCHMARK INDEX CARD */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Regional Market Price Benchmark Index
          </h2>
          <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-lg">
            Calculated from active listings
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-300">Coconut Husk</p>
            <p className="text-lg font-black text-emerald-400">₹{huskBenchmark.avgPrice.toLocaleString()} / Ton</p>
            <p className="text-[10px] text-slate-500">{huskBenchmark.count} Active Listings</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-300">Areca Sheaths</p>
            <p className="text-lg font-black text-amber-400">₹{sheathBenchmark.avgPrice.toLocaleString()} / Ton</p>
            <p className="text-[10px] text-slate-500">{sheathBenchmark.count} Active Listings</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-300">Coir Pith / Peat</p>
            <p className="text-lg font-black text-sky-400">₹{pithBenchmark.avgPrice.toLocaleString()} / Ton</p>
            <p className="text-[10px] text-slate-500">{pithBenchmark.count} Active Listings</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-300">Coconut Shells</p>
            <p className="text-lg font-black text-indigo-400">₹{shellBenchmark.avgPrice.toLocaleString()} / Ton</p>
            <p className="text-[10px] text-slate-500">{shellBenchmark.count} Active Listings</p>
          </div>
        </div>
      </div>


      {/* 4. LISTING MODERATION SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Supply Listing Moderation ({filteredListings.length})
          </h2>
        </div>

        {/* Status Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All (${listings.length})` },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'approved', label: `Active (${activeCount})` },
            { id: 'flagged', label: `Flagged (${flaggedCount})` },
            { id: 'featured', label: `Featured (${featuredCount})` },
            { id: 'rejected', label: `Rejected (${rejectedCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, seller, category, pincode..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 font-bold focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Category: All</option>
              <option value="coconut_husk">Coconut Husk</option>
              <option value="coir_pith">Coir Pith</option>
              <option value="coconut_shell">Coconut Shell</option>
              <option value="areca_sheath">Areca Sheaths</option>
              <option value="areca_husk">Areca Husk</option>
              <option value="tender_coconut">Tender Coconut</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 font-bold focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Sort: Newest</option>
              <option value="quantity_high">Highest Quantity</option>
              <option value="price_high">Highest Price</option>
              <option value="price_low">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Moderation Items Table / Cards */}
        {filteredListings.length > 0 ? (
          <div className="space-y-3">
            {filteredListings.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                {/* Info Left */}
                <div className="flex items-start gap-3">
                  <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-indigo-950 text-indigo-400 border border-indigo-800/40 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                        {item.categoryName}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase border ${
                        item.status === 'flagged' ? 'bg-rose-950 text-rose-400 border-rose-500/40' :
                        item.status === 'rejected' ? 'bg-slate-900 text-slate-500 border-slate-800' :
                        item.featured || item.status === 'featured' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
                        'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {item.status || 'Active'}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setSelectedListing(item)}
                      className="text-sm font-extrabold text-white hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400">
                      Seller: <strong className="text-slate-200">{item.sellerName}</strong> • {item.location} ({item.pincode})
                    </p>
                  </div>
                </div>

                {/* Specs Middle */}
                <div className="flex items-center justify-between md:justify-end gap-5 text-xs shrink-0 border-t border-slate-800 md:border-t-0 pt-2 md:pt-0">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Quantity</p>
                    <p className="font-extrabold text-white">{item.quantity} {item.unit}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Price / {item.unit}</p>
                    <p className="font-extrabold text-emerald-400">₹{item.pricePerUnit.toLocaleString()}</p>
                  </div>

                  {/* Moderation Actions */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => setSelectedListing(item)}
                      title="Inspect Details"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => approveListing(item.id)}
                      title="Approve Listing"
                      className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => featureListing(item.id)}
                      title="Toggle Featured"
                      className={`p-2 rounded-xl border ${item.featured ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-900 border-slate-800 text-amber-400'}`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => flagListing(item.id)}
                      title="Flag Listing"
                      className="p-2 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-500/30 text-amber-400"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setConfirmModal({ type: 'reject', listing: item })}
                      title="Reject Listing"
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 border border-slate-800 text-rose-400"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setConfirmModal({ type: 'delete', listing: item })}
                      title="Delete Listing"
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 border border-slate-800 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {activeStatusTab === 'pending' ? 'All Pending Listings Moderated!' : 'No Listings Found'}
            </h3>
            <p className="text-xs text-slate-400">
              {activeStatusTab === 'pending'
                ? 'There are no pending waste supply listings awaiting administrator approval at this time.'
                : 'No listings match the current status and category filters.'}
            </p>
          </div>
        )}
      </div>


      {/* 5. RFQ / TRANSACTION MONITOR SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <Send className="w-4 h-4 text-sky-400" />
          Recent RFQs & Trade Activity Monitor ({inquiries ? inquiries.length : 0})
        </h2>

        {inquiries && inquiries.length > 0 ? (
          <div className="space-y-2">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">#{inq.id}</span>
                    <span className="text-slate-400 font-medium">• {inq.createdAt}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      inq.status === 'accepted' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-slate-300 font-bold">{inq.listingTitle}</p>
                  <p className="text-slate-500 text-[10px]">Buyer: {inq.buyerName} ({inq.buyerCompany}) $\rightarrow$ Seller: {inq.sellerName}</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Total RFQ Value</p>
                  <p className="font-black text-emerald-400 text-sm">₹{(inq.totalAmount || (inq.requestedQuantity * inq.offeredPricePerUnit)).toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">{inq.requestedQuantity} {inq.unit} @ ₹{inq.offeredPricePerUnit}/{inq.unit}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No active quote requests registered yet.</p>
        )}
      </div>


      {/* 6. DESTRUCTIVE ACTION CONFIRMATION MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center text-xl mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-white">Confirm Admin Action</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to <strong className="text-rose-400 uppercase">{confirmModal.type}</strong> listing <br />
                <span className="text-white font-bold">"{confirmModal.listing.title}"</span>?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAction}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-black py-2.5 rounded-xl text-xs shadow-md"
              >
                Confirm {confirmModal.type === 'delete' ? 'Delete' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
