import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import { 
  Search, 
  Filter, 
  MapPin, 
  LayoutGrid, 
  List, 
  PlusCircle, 
  X, 
  Sparkles, 
  Palmtree, 
  Layers, 
  Flame, 
  Leaf, 
  Box, 
  Recycle, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

export default function MarketplaceView() {
  const { 
    listings, 
    isListingsLoading,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedCondition, 
    setSelectedCondition, 
    pincodeSearch, 
    setPincodeSearch,
    setActiveTab 
  } = useApp();

  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price_asc' | 'price_desc' | 'quantity_desc' | 'newest'
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'list'

  // Category definitions with counts
  const categories = [
    { id: 'all', name: 'All Categories', icon: Sparkles },
    { id: 'coconut_husk', name: 'Coconut Husk', icon: Palmtree },
    { id: 'coir_pith', name: 'Coir Pith / Peat', icon: Layers },
    { id: 'coconut_shell', name: 'Coconut Shells', icon: Flame },
    { id: 'areca_sheath', name: 'Areca Sheaths', icon: Leaf },
    { id: 'areca_husk', name: 'Areca Husk', icon: Box },
    { id: 'tender_coconut', name: 'Tender Coconut', icon: Recycle },
  ];

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setPincodeSearch('');
    setSortBy('recommended');
  };

  // Filter listings based on search, category, condition, location/pincode
  let filtered = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    
    // Global search query
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.sellerName && item.sellerName.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.pincode && item.pincode.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.categoryName && item.categoryName.toLowerCase().includes(q)) ||
      (item.condition && item.condition.toLowerCase().includes(q));

    // Specific location/pincode search
    const p = pincodeSearch.toLowerCase().trim();
    const matchesPincode = !p || 
      (item.pincode && item.pincode.toLowerCase().includes(p)) ||
      (item.location && item.location.toLowerCase().includes(p));

    return matchesCategory && matchesCondition && matchesSearch && matchesPincode;
  });

  // Apply sorting options
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === 'price_desc') return b.pricePerUnit - a.pricePerUnit;
    if (sortBy === 'quantity_desc') return b.quantity - a.quantity;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0; // 'recommended' uses natural mock ordering
  });

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedCondition !== 'all' || pincodeSearch || sortBy !== 'recommended';

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. MARKETPLACE HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              B2B & B2C Marketplace
            </span>
            <span className="text-xs text-slate-400">• Verified Agro-Waste Supplies</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Agricultural Waste Marketplace
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Browse verified coconut husks, coir pith, coconut shells, and areca sheaths from farmers, mills, and vendors across South India.
          </p>
        </div>

        {/* Header Right Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('create_listing')}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            List Your Waste
          </button>
        </div>
      </div>


      {/* 2. SEARCH & CONTROLS TOOLBAR */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
        
        {/* Search & Location Bar Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Main Keyword Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search waste type, seller, description (e.g. Coir Pith, Pollachi)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location / Pincode Filter */}
          <div className="md:col-span-3 relative">
            <MapPin className="w-4 h-4 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={pincodeSearch}
              onChange={(e) => setPincodeSearch(e.target.value)}
              placeholder="Pincode / Location (e.g. 642001)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {pincodeSearch && (
              <button 
                onClick={() => setPincodeSearch('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Condition Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
            >
              <option value="all">Condition: All States</option>
              <option value="Dry">Condition: Dry Only</option>
              <option value="Semi-Wet">Condition: Semi-Wet</option>
              <option value="Wet">Condition: Wet State</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? listings.length 
              : listings.filter(item => item.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>


      {/* 3. SORTING, LAYOUT TOGGLE & RESULTS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
        
        {/* Results Counter & Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-extrabold text-white">
            Showing <span className="text-emerald-400">{filtered.length}</span> of {listings.length} Waste Supplies
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-colors ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Right Tools: Sorting Dropdown & Grid/List View Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          
          {/* Sort By Selector */}
          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-bold focus:outline-none focus:border-emerald-500"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="quantity_desc">Quantity: High to Low</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>

          {/* Grid / List Layout Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewLayout('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-all ${
                viewLayout === 'grid' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout('list')}
              title="List View"
              className={`p-1.5 rounded-lg transition-all ${
                viewLayout === 'list' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>


      {/* 4. MARKETPLACE CATALOG GRID / SKELETON LOADER / EMPTY STATE */}
      {isListingsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 animate-pulse">
              <div className="w-full h-48 bg-slate-950 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="w-2/3 h-4 bg-slate-950 rounded-lg"></div>
                <div className="w-1/3 h-3 bg-slate-950 rounded-lg"></div>
              </div>
              <div className="w-full h-10 bg-slate-950 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className={
          viewLayout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filtered.map((item) => (
            <ListingCard key={item.id} item={item} layout={viewLayout} />
          ))}
        </div>
      ) : (
        /* 5. PROFESSIONAL EMPTY STATE */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">No Matching Waste Supplies Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We couldn't find any agricultural waste listings matching your active filters. Try adjusting your keyword search, category, or location pincode.
            </p>
          </div>

          <button
            onClick={handleClearFilters}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all inline-flex items-center gap-2 shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
