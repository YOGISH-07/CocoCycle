import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Scale, 
  Percent, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Palmtree, 
  Leaf, 
  Sparkles 
} from 'lucide-react';

export default function ListingCard({ item, layout = 'grid' }) {
  const { setSelectedListing, savedListingIds, toggleSaveListing } = useApp();

  const isSaved = savedListingIds ? savedListingIds.includes(item.id) : false;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleSaveListing(item.id);
  };

  const handleDetailsClick = () => {
    setSelectedListing(item);
  };

  // Horizontal List View Layout
  if (layout === 'list') {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 hover:border-slate-700 transition-all group">
        {/* Left Image & Badges */}
        <div className="relative w-full md:w-56 h-40 md:h-36 rounded-xl overflow-hidden bg-slate-950 shrink-0">
          <img 
            src={item.images[0]} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-500/40 uppercase">
              {item.categoryName}
            </span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
              item.condition === 'Dry' 
                ? 'bg-amber-950/90 text-amber-400 border-amber-500/40' 
                : 'bg-sky-950/90 text-sky-400 border-sky-500/40'
            }`}>
              {item.condition}
            </span>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
              isSaved 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                : 'bg-slate-950/60 text-slate-400 border-slate-700/50 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400' : ''}`} />
          </button>
        </div>

        {/* Center Specs & Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300 flex items-center gap-1">
              {item.sellerName}
              {item.sellerVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            </span>
            <span className="text-amber-400 font-bold">★ {item.sellerRating}</span>
          </div>

          <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong className="text-white">{item.quantity}</strong> {item.unit}</span>
            </div>
            <div className="flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-sky-400" />
              <span><strong className="text-white">{item.moisturePercent}%</strong> Moisture</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.location} ({item.pincode})</span>
            </div>
          </div>
        </div>

        {/* Right Price & Details Action */}
        <div className="md:border-l md:border-slate-800 md:pl-5 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 border-t border-slate-800/80 md:border-t-0 pt-3 md:pt-0">
          <div className="text-left md:text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Price / {item.unit}</p>
            <p className="text-xl font-black text-white">₹{item.pricePerUnit.toLocaleString()}</p>
          </div>

          <button
            onClick={handleDetailsClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Vertical Grid View Layout (Default)
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all">
      <div>
        {/* Card Image Header */}
        <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
          <img 
            src={item.images[0]} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/40 uppercase">
              {item.categoryName}
            </span>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
              item.condition === 'Dry' 
                ? 'bg-amber-950/90 text-amber-400 border-amber-500/40' 
                : 'bg-sky-950/90 text-sky-400 border-sky-500/40'
            }`}>
              {item.condition} ({item.moisturePercent}%)
            </span>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
              isSaved 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                : 'bg-slate-950/60 text-slate-400 border-slate-700/50 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300 flex items-center gap-1 truncate max-w-[160px]">
              {item.sellerName}
              {item.sellerVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            </span>
            <span className="text-amber-400 font-bold shrink-0">★ {item.sellerRating}</span>
          </div>

          <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80 flex items-center gap-1.5 text-slate-300">
              <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong className="text-white">{item.quantity}</strong> {item.unit}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80 flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{item.pincode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Pricing & CTA */}
      <div className="p-5 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Price / {item.unit}</p>
          <p className="text-lg font-black text-white">₹{item.pricePerUnit.toLocaleString()}</p>
        </div>

        <button
          onClick={handleDetailsClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
