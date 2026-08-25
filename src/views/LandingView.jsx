import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palmtree, 
  Layers, 
  Flame, 
  Leaf, 
  Box, 
  Recycle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Scale, 
  Percent, 
  ShieldCheck, 
  Truck, 
  TrendingUp,
  Factory,
  Trees
} from 'lucide-react';

export default function LandingView() {
  const { 
    setActiveTab, 
    setSelectedCategory, 
    setSelectedListing,
    listings, 
    marketStats 
  } = useApp();

  // Category list mapping with icons
  const categories = [
    { id: 'coconut_husk', name: 'Coconut Husk & Fibre', icon: Palmtree, desc: 'Coir fiber extraction, matting & mattress raw material' },
    { id: 'coir_pith', name: 'Coir Pith / Coco Peat', icon: Layers, desc: 'Washed low-EC growing substrate for hydroponics & soil' },
    { id: 'coconut_shell', name: 'Coconut Shells', icon: Flame, desc: 'Feedstock for activated carbon & charcoal briquettes' },
    { id: 'areca_sheath', name: 'Areca Sheaths / Leaves', icon: Leaf, desc: 'Fungus-free leaves for eco-tableware heat pressing' },
    { id: 'areca_husk', name: 'Areca Outer Husk', icon: Box, desc: 'Shredded biomass fuel for boilers & pellet plants' },
    { id: 'tender_coconut', name: 'Tender Coconut Waste', icon: Recycle, desc: 'Fresh waste for municipal composting & biogas plants' },
  ];

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('marketplace');
  };

  // Preview featured listings
  const previewListings = listings.slice(0, 3);

  return (
    <div className="space-y-20 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800/80 p-8 sm:p-14 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Direct Agricultural & Industrial Waste Marketplace
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Turn Coconut & Areca Waste Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">Industrial Value</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              CocoCycle connects coconut farmers, tender coconut vendors, oil mills, and areca growers with verified industrial buyers, recyclers, and eco-product manufacturers.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setActiveTab('marketplace')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-7 py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('create_listing')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-4 rounded-xl text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Sell Your Waste
              </button>
            </div>

            {/* Trust Indicator Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong>12,400+</strong> Tons Upcycled</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span><strong>340+</strong> Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Pan-South India Logistics</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80" 
                alt="Coconut Fibre and Agricultural Waste" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Overlaid Stat Badges */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-white">Active Market Benchmark</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px]">LIVE DATA</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Coconut Husk</p>
                    <p className="text-sm font-black text-emerald-400">₹4,200 / Ton</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Areca Sheaths</p>
                    <p className="text-sm font-black text-amber-400">₹18,500 / Ton</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. PROBLEM -> SOLUTION SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/40">
            Why CocoCycle Matters
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Solving the Agricultural Waste Disconnect
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every year, millions of tons of coconut husks, shells, and areca leaves are wasted or burned openly. CocoCycle closes the loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Problem */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white">1. Waste Treated as Garbage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Farmers and local street vendors lack market access. Bulky coconut husks and tender coconut waste are dumped in landfills or burned, releasing heavy CO₂ emissions.
            </p>
          </div>

          {/* Card 2: Supply Bottleneck */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white">2. Buyers Struggle for Supply</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eco-tableware manufacturers, coir exporters, and biochar factories struggle to source consistent, moisture-verified bulk raw material locally.
            </p>
          </div>

          {/* Card 3: The CocoCycle Solution */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-800/60 bg-gradient-to-b from-slate-900 to-emerald-950/30 space-y-4 hover:border-emerald-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-white">3. CocoCycle Direct Exchange</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We connect both sides on a transparent marketplace with geo-location matching, moisture condition specifications, and direct quote requests.
            </p>
          </div>
        </div>
      </section>


      {/* 3. WASTE CATEGORIES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Agricultural Waste Categories</h2>
            <p className="text-xs text-slate-400 mt-1">Select a category to view live market supplies across South India.</p>
          </div>
          <button 
            onClick={() => { setSelectedCategory('all'); setActiveTab('marketplace'); }}
            className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div 
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 cursor-pointer transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:border-emerald-500/40 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    {cat.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 4. HOW COCOCYCLE WORKS */}
      <section className="bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-3xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">How CocoCycle Works</h2>
          <p className="text-xs text-slate-400">A simple 3-step marketplace process for waste generators and commercial buyers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
              1
            </div>
            <h3 className="text-base font-extrabold text-white">List Your Waste Supply</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sellers post available material, quantity (tons/truckload), moisture condition (Dry/Semi-Wet/Wet), photos, and location pincode in under 2 minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
              2
            </div>
            <h3 className="text-base font-extrabold text-white">Connect & Negotiate Quotes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Industrial buyers search by distance, review moisture specs, and submit direct purchase quote requests or RFQs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
              3
            </div>
            <h3 className="text-base font-extrabold text-white">Ship & Upcycle Material</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Material is picked up locally, delivered to processing units, upcycled into eco-products, and payment is settled.
            </p>
          </div>
        </div>
      </section>


      {/* 5. MARKETPLACE PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Active Marketplace Preview</h2>
            <p className="text-xs text-slate-400 mt-1">Real verified coconut & areca supplies currently ready for trade.</p>
          </div>
          <button 
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All Marketplace Listings <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewListings.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/40 uppercase">
                      {item.categoryName}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full border ${
                      item.condition === 'Dry' 
                        ? 'bg-amber-950/90 text-amber-400 border-amber-500/40' 
                        : 'bg-sky-950/90 text-sky-400 border-sky-500/40'
                    }`}>
                      {item.condition} ({item.moisturePercent}%)
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{item.sellerName}</span>
                    <span className="text-amber-400 font-bold">★ {item.sellerRating}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.location} ({item.pincode})</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Price / {item.unit}</p>
                  <p className="text-base font-black text-white">₹{item.pricePerUnit.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedListing(item);
                    setActiveTab('marketplace');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. IMPACT STATS SECTION */}
      <section className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-900/40 p-8 sm:p-12 rounded-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400">
              {marketStats.totalTonsUpcycled ? marketStats.totalTonsUpcycled.toLocaleString() : '12,450'}
            </p>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tons Upcycled</p>
            <p className="text-[11px] text-slate-400">Agricultural waste diverted</p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-amber-400">
              {marketStats.co2SavedTons ? marketStats.co2SavedTons.toLocaleString() : '9,320'}
            </p>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tons CO₂ Saved</p>
            <p className="text-[11px] text-slate-400">Avoided open burning emissions</p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-300">
              {marketStats.activeSellersCount ? marketStats.activeSellersCount : '340'}+
            </p>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Sellers</p>
            <p className="text-[11px] text-slate-400">Farmers, mills & vendors</p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-teal-400">
              {marketStats.activeBuyersCount ? marketStats.activeBuyersCount : '180'}+
            </p>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Industrial Buyers</p>
            <p className="text-[11px] text-slate-400">Recyclers & eco-plants</p>
          </div>
        </div>
      </section>


      {/* 7. CALL TO ACTION SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Trade Agricultural Waste?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Whether you are a farmer looking to sell coconut husks or an eco-manufacturer seeking bulk raw material, join CocoCycle today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('create_listing')}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            List Waste as Seller
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Browse Marketplace as Buyer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
