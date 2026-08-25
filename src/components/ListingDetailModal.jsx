import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Scale, 
  Percent, 
  ShieldCheck, 
  Heart, 
  Send, 
  Package, 
  Calendar, 
  CheckCircle2, 
  Palmtree, 
  Sparkles, 
  PhoneCall, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ListingDetailModal() {
  const { 
    selectedListing, 
    setSelectedListing, 
    setInquiryListing, 
    savedListingIds, 
    toggleSaveListing 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lock background scroll and add Escape key listener while modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedListing(null);
    };

    if (selectedListing) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedListing, setSelectedListing]);

  if (!selectedListing) return null;

  const item = selectedListing;
  const isSaved = savedListingIds ? savedListingIds.includes(item.id) : false;

  const images = Array.isArray(item?.images) && item.images.length > 0 
    ? item.images 
    : ['https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800'];
  const displayImage = images[activeImageIndex] || images[0];
  const priceFormatted = (Number(item?.pricePerUnit) || 0).toLocaleString();
  const applicationsList = Array.isArray(item?.applications) 
    ? item.applications 
    : typeof item?.applications === 'string' && item.applications.trim() 
      ? item.applications.split(',').map((s) => s.trim()) 
      : [];

  const handleOpenRFQ = () => {
    const targetListing = item;
    setSelectedListing(null);
    setInquiryListing(targetListing);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/40 uppercase">
              {item.categoryName || 'Agro Waste'}
            </span>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
              item.condition === 'Dry' 
                ? 'bg-amber-950/90 text-amber-400 border-amber-500/40' 
                : 'bg-sky-950/90 text-sky-400 border-sky-500/40'
            }`}>
              {item.condition || 'Raw'} ({item.moisturePercent ?? 10}% Moisture)
            </span>
          </div>

          <button
            onClick={() => setSelectedListing(null)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Title & Seller Headline */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {item.title}
            </h2>
            
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">{item.sellerName || 'Agro Supplier'}</span>
                {item.sellerVerified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" /> Verified Supplier
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold">★ {item.sellerRating ?? 4.8} Trust Rating</span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Posted {item.postedAt || 'Recently'}
                </span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img 
                src={displayImage} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-300 border border-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {item.location || 'South India'} ({item.pincode || 'Location Set'})
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Available Quantity</p>
              <p className="text-base font-black text-white mt-0.5">{item.quantity} {item.unit || 'Tons'}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Min Order: {item.minOrder || 1} {item.unit || 'Tons'}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Price per {item.unit || 'Ton'}</p>
              <p className="text-base font-black text-emerald-400 mt-0.5">₹{priceFormatted}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Ex-warehouse rate</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase">State & Moisture</p>
              <p className="text-base font-black text-amber-400 mt-0.5">{item.condition}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{item.moisturePercent}% Moisture Content</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Packaging Format</p>
              <p className="text-base font-black text-sky-400 mt-0.5">{item.packaging || 'Baled'}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Ready for transport</p>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Material Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {item.description}
            </p>
          </div>

          {/* Recommended Applications (if available) */}
          {applicationsList.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Recommended Uses</h3>
              <div className="flex flex-wrap gap-2">
                {applicationsList.map((app, idx) => (
                  <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-xl font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Seller Information Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg">
                🌴
              </div>
              <div>
                <p className="text-xs font-bold text-white">{item.sellerName}</p>
                <p className="text-[10px] text-slate-400">{item.location} • Phone: {item.sellerPhone}</p>
              </div>
            </div>

            <span className="text-xs bg-slate-900 border border-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-xl">
              ★ {item.sellerRating} Trust Rating
            </span>
          </div>

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => toggleSaveListing(item.id)}
            className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${
              isSaved 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
            {isSaved ? 'Saved' : 'Save Supply'}
          </button>

          <button
            onClick={handleOpenRFQ}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-6 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Request Quote (Send RFQ)
          </button>
        </div>
      </div>
    </div>
  );
}
