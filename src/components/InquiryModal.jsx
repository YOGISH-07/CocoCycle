import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Scale, 
  IndianRupee, 
  MapPin, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Building2, 
  CheckCircle2,
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';

export default function InquiryModal() {
  const { inquiryListing, setInquiryListing, currentUser, submitRFQ } = useApp();

  const [requestedQuantity, setRequestedQuantity] = useState(10);
  const [offeredPrice, setOfferedPrice] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Lock background scroll and add Escape key listener while modal is active & prefill form
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setInquiryListing(null);
    };

    if (inquiryListing) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setRequestedQuantity(inquiryListing.minOrder || 5);
      setOfferedPrice(inquiryListing.pricePerUnit || 1000);
      setDeliveryLocation(currentUser?.pincode ? `${currentUser.location} (${currentUser.pincode})` : 'Bengaluru, Karnataka');
      
      // Default delivery date: 7 days in future
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      setExpectedDate(futureDate.toISOString().split('T')[0]);
      
      setMessage(`We require ${inquiryListing.minOrder || 5} ${inquiryListing.unit || 'Tons'} of ${inquiryListing.title}. Please confirm availability and delivery timeline.`);
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inquiryListing, currentUser, setInquiryListing]);

  if (!inquiryListing) return null;

  const item = inquiryListing;

  // Calculate dynamic total value
  const qtyNum = Number(requestedQuantity) || 0;
  const priceNum = Number(offeredPrice) || 0;
  const totalValue = qtyNum * priceNum;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (qtyNum <= 0) {
      setError('Target requested quantity must be greater than 0.');
      return;
    }
    if (priceNum <= 0) {
      setError('Offered price per unit must be greater than 0.');
      return;
    }
    if (!deliveryLocation.trim()) {
      setError('Please specify your preferred delivery location / pincode.');
      return;
    }
    if (!expectedDate) {
      setError('Please specify expected delivery date.');
      return;
    }

    setIsLoading(true);
    const res = await submitRFQ(
      item,
      qtyNum,
      priceNum,
      deliveryLocation,
      expectedDate,
      message
    );
    setIsLoading(false);

    if (res && !res.success) {
      setError(res.error?.message || 'Failed to submit RFQ. Please check details and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
              RFQ
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">Request Quote / Send RFQ</h2>
              <p className="text-[10px] text-slate-400">Direct B2B Procurement Offer</p>
            </div>
          </div>

          <button
            onClick={() => setInquiryListing(null)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* Target Listing Summary Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="uppercase font-bold text-emerald-400">{item.categoryName}</span>
              <span>Seller: {item.sellerName}</span>
            </div>
            <p className="text-xs font-black text-white line-clamp-1">{item.title}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Supply Available: <strong>{item.quantity} {item.unit}</strong></span>
              <span>Listing Price: <strong className="text-white">₹{item.pricePerUnit.toLocaleString()} / {item.unit}</strong></span>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buyer Profile Information */}
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-bold text-slate-200">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400">{currentUser?.company || 'Procurement Buyer'}</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded-md font-mono">
              {currentUser?.role || 'BUYER'}
            </span>
          </div>

          {/* Quantity & Price Offer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">
                Requested Quantity ({item.unit})
              </label>
              <div className="relative">
                <Scale className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={requestedQuantity}
                  onChange={(e) => setRequestedQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-extrabold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">
                Offered Price (₹ / {item.unit})
              </label>
              <div className="relative">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-extrabold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Delivery Location & Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">
                Delivery Location / Pincode
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Bengaluru (560001)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">
                Expected Delivery Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Message / Specifications Textarea */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-300 uppercase mb-1">
              Message & Specifications for Seller
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Include moisture expectations, packaging guidelines, or transport requirements..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Dynamic Estimated Total Value Summary Card */}
          <div className="bg-gradient-to-r from-emerald-950/60 to-slate-950 p-4 rounded-2xl border border-emerald-800/60 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">Estimated Total Order Value</p>
              <p className="text-xl font-black text-emerald-400 mt-0.5">
                ₹{totalValue.toLocaleString()}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
              {qtyNum} {item.unit} @ ₹{priceNum.toLocaleString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setInquiryListing(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting RFQ...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit RFQ to Seller
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
