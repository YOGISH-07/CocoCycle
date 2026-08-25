import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palmtree, 
  Layers, 
  Flame, 
  Leaf, 
  Box, 
  Recycle, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MapPin, 
  Scale, 
  Percent, 
  IndianRupee, 
  Package, 
  Sparkles,
  UserCheck,
  Loader2
} from 'lucide-react';

export default function CreateListingView() {
  const { 
    userRole, 
    currentUser, 
    switchRole, 
    setIsAuthModalOpen, 
    addListing, 
    setActiveTab 
  } = useApp();

  const [step, setStep] = useState(1); // 1 | 2 | 3

  // Form Fields State
  const [category, setCategory] = useState('coconut_husk');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [quantity, setQuantity] = useState(25);
  const [unit, setUnit] = useState('Ton');
  const [pricePerUnit, setPricePerUnit] = useState(4200);
  const [minOrder, setMinOrder] = useState(5);
  const [condition, setCondition] = useState('Dry');
  const [moisturePercent, setMoisturePercent] = useState(12);
  const [packaging, setPackaging] = useState('Baled');

  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [errors, setErrors] = useState({});

  // Auto-fill seller default location if available
  useEffect(() => {
    if (currentUser) {
      if (currentUser.pincode) setPincode(currentUser.pincode);
      if (currentUser.location) {
        const parts = currentUser.location.split(',');
        if (parts[0]) setCity(parts[0].trim());
        if (parts[1]) setState(parts[1].trim());
      }
    }
  }, [currentUser]);

  // Clean up Object URL preview on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Fallback mock images by category if no custom photo uploaded
  const categoryMockImages = {
    coconut_husk: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    coir_pith: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
    coconut_shell: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
    areca_sheath: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    areca_husk: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    tender_coconut: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80'
  };

  const categoryNames = {
    coconut_husk: 'Coconut Husk',
    coir_pith: 'Coir Pith',
    coconut_shell: 'Coconut Shell',
    areca_sheath: 'Areca Sheath',
    areca_husk: 'Areca Husk',
    tender_coconut: 'Tender Coconut Waste'
  };

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview('');
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Listing title is required.';
    if (!description.trim() || description.length < 15) errs.description = 'Description must be at least 15 characters long.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!quantity || Number(quantity) <= 0) errs.quantity = 'Quantity must be greater than 0.';
    if (!pricePerUnit || Number(pricePerUnit) <= 0) errs.pricePerUnit = 'Price per unit must be greater than 0.';
    if (!minOrder || Number(minOrder) <= 0) errs.minOrder = 'Minimum order quantity must be greater than 0.';
    if (moisturePercent === '' || Number(moisturePercent) < 0 || Number(moisturePercent) > 100) {
      errs.moisturePercent = 'Moisture percentage must be between 0% and 100%.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (!pincode.trim() || pincode.length < 6) errs.pincode = 'Valid 6-digit pincode is required.';
    if (!city.trim()) errs.city = 'City / District is required.';
    if (!state.trim()) errs.state = 'State is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const finalImage = imagePreview || categoryMockImages[category];

    const newListingData = {
      category,
      categoryName: categoryNames[category] || 'Agricultural Waste',
      title: title.trim(),
      description: description.trim(),
      quantity: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      minOrder: Number(minOrder),
      condition,
      moisturePercent: Number(moisturePercent),
      packaging,
      pincode: pincode.trim(),
      location: `${city.trim()}, ${state.trim()}`,
      images: [finalImage],
      applications: ['Bio-Upcycling', 'Industrial Raw Stock']
    };

    setIsSubmitting(true);
    const res = await addListing(newListingData);
    setIsSubmitting(false);

    if (res && !res.success) {
      setErrors({ submit: res.error?.message || 'Failed to post listing. Please check inputs and try again.' });
    }
  };

  // Check Seller Access restriction
  if (userRole !== 'SELLER' || !currentUser) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl mx-auto">
          🌴
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Seller Account Required</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Only registered sellers, farmers, and coir mills can publish agricultural waste supplies on CocoCycle. Buyers can browse and request quotes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Sign In / Register as Seller
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl text-xs font-bold transition-all"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Header Title */}
      <div className="text-center space-y-2">
        <span className="bg-amber-950 text-amber-400 border border-amber-800/60 text-[10px] font-black px-3 py-1 rounded-full uppercase">
          Seller Portal
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          List Your Agricultural Waste
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Turn your agricultural waste into valuable industrial raw material for recyclers and factory buyers.
        </p>
      </div>

      {/* 3-Step Progress Indicator Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-2 text-xs">
        {/* Step 1 Pill */}
        <div 
          onClick={() => setStep(1)} 
          className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${
            step === 1 ? 'bg-amber-500 text-slate-950 font-black shadow-md' : step > 1 ? 'bg-slate-950 text-emerald-400 font-bold border border-emerald-500/30' : 'bg-slate-950 text-slate-500 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === 1 ? 'bg-slate-950 text-amber-400' : step > 1 ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
            {step > 1 ? '✓' : '1'}
          </span>
          <span className="hidden sm:inline">STEP 1 — Material</span>
        </div>

        <div className="w-4 border-t border-slate-800"></div>

        {/* Step 2 Pill */}
        <div 
          onClick={() => { if (validateStep1()) setStep(2); }} 
          className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${
            step === 2 ? 'bg-amber-500 text-slate-950 font-black shadow-md' : step > 2 ? 'bg-slate-950 text-emerald-400 font-bold border border-emerald-500/30' : 'bg-slate-950 text-slate-500 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === 2 ? 'bg-slate-950 text-amber-400' : step > 2 ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
            {step > 2 ? '✓' : '2'}
          </span>
          <span className="hidden sm:inline">STEP 2 — Quantity & Quality</span>
        </div>

        <div className="w-4 border-t border-slate-800"></div>

        {/* Step 3 Pill */}
        <div 
          onClick={() => { if (validateStep1() && validateStep2()) setStep(3); }} 
          className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${
            step === 3 ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'bg-slate-950 text-slate-500 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === 3 ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
            3
          </span>
          <span className="hidden sm:inline">STEP 3 — Location & Publish</span>
        </div>
      </div>

      {/* STEP 1: MATERIAL DETAILS */}
      {step === 1 && (
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl animate-fade-in">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-black text-white">STEP 1: Waste Material Information</h2>
            <p className="text-xs text-slate-400">Select category, give your supply listing a title and detailed description.</p>
          </div>

          {/* Waste Category Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-300">Waste Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'coconut_husk', name: 'Coconut Husk & Fibre', icon: Palmtree },
                { id: 'coir_pith', name: 'Coir Pith / Coco Peat', icon: Layers },
                { id: 'coconut_shell', name: 'Coconut Shells & Charcoal', icon: Flame },
                { id: 'areca_sheath', name: 'Areca Sheaths / Leaves', icon: Leaf },
                { id: 'areca_husk', name: 'Areca Outer Husk', icon: Box },
                { id: 'tender_coconut', name: 'Tender Coconut Waste', icon: Recycle }
              ].map((cat) => {
                const IconComp = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-amber-950/80 border-amber-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Listing Title */}
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase text-slate-300">Listing Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g. "Sun-Dried Un-Crushed Coconut Husks (High Fibre)"'
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            {errors.title && <p className="text-[11px] text-rose-400 font-bold mt-1">{errors.title}</p>}
          </div>

          {/* Description Textarea */}
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase text-slate-300">Description & Industrial Quality</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain moisture control, storage condition, harvesting period, fiber length, or suitable industrial uses..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
            {errors.description && <p className="text-[11px] text-rose-400 font-bold mt-1">{errors.description}</p>}
          </div>

          {/* Photo Upload Box */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-300">Upload Photo of Waste Supply</label>
            
            {imagePreview ? (
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/40 group">
                <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-950 p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all space-y-2">
                <Upload className="w-8 h-8 text-amber-400" />
                <p className="text-xs font-bold text-slate-200">Click to upload photo from your device</p>
                <p className="text-[10px] text-slate-500">Supported: JPG, PNG, WEBP (If omitted, standard category image will be used)</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Step 1 Next Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              Continue to Step 2
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: QUANTITY & QUALITY */}
      {step === 2 && (
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl animate-fade-in">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-black text-white">STEP 2: Quantity, Pricing & Quality Condition</h2>
            <p className="text-xs text-slate-400">Specify tonnage available, price per unit, moisture state, and packaging format.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Quantity Available</label>
              <div className="relative">
                <Scale className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-3 text-xs font-black text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              {errors.quantity && <p className="text-[11px] text-rose-400 font-bold">{errors.quantity}</p>}
            </div>

            {/* Unit */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Unit of Measure</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Ton">Ton (Metric Tonne)</option>
                <option value="kg">kg (Kilograms)</option>
                <option value="Truckload">Truckload (Bulk Fleet)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price per unit */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Price per {unit} (₹)</label>
              <div className="relative">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-3 text-xs font-black text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              {errors.pricePerUnit && <p className="text-[11px] text-rose-400 font-bold">{errors.pricePerUnit}</p>}
            </div>

            {/* Min Order */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Min Order Quantity ({unit})</label>
              <input
                type="number"
                min="1"
                step="any"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              />
              {errors.minOrder && <p className="text-[11px] text-rose-400 font-bold">{errors.minOrder}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Moisture Condition */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Moisture Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Dry">Dry Condition</option>
                <option value="Semi-Wet">Semi-Wet State</option>
                <option value="Wet">Wet Condition</option>
              </select>
            </div>

            {/* Moisture Percentage */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Moisture Percentage (%)</label>
              <div className="relative">
                <Percent className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={moisturePercent}
                  onChange={(e) => setMoisturePercent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-3 text-xs font-black text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              {errors.moisturePercent && <p className="text-[11px] text-rose-400 font-bold">{errors.moisturePercent}</p>}
            </div>

            {/* Packaging */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Packaging Type</label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Baled">Baled</option>
                <option value="Loose">Loose Bulk</option>
                <option value="Bagged">Bagged</option>
                <option value="Compressed Blocks">Compressed Blocks</option>
              </select>
            </div>
          </div>

          {/* Live Summary Preview Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Live Listing Spec Summary</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Available</p>
                <p className="font-extrabold text-white">{quantity || 0} {unit}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Price</p>
                <p className="font-extrabold text-emerald-400">₹{Number(pricePerUnit || 0).toLocaleString()} / {unit}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Condition</p>
                <p className="font-extrabold text-sky-400">{condition} · {moisturePercent || 0}% moisture</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Step 1
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              Continue to Step 3
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LOCATION & PUBLISH */}
      {step === 3 && (
        <form onSubmit={handlePublish} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl animate-fade-in">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-black text-white">STEP 3: Location Pincode & Final Review</h2>
            <p className="text-xs text-slate-400">Set your warehouse pincode and review your listing before publishing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Pincode */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">Warehouse Pincode</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 642001"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-3 text-xs font-black text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              {errors.pincode && <p className="text-[11px] text-rose-400 font-bold">{errors.pincode}</p>}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">City / District</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Pollachi"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              />
              {errors.city && <p className="text-[11px] text-rose-400 font-bold">{errors.city}</p>}
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-slate-300">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Tamil Nadu"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              />
              {errors.state && <p className="text-[11px] text-rose-400 font-bold">{errors.state}</p>}
            </div>
          </div>

          {/* Location Notice Card */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>Your listing will be visible to verified industrial buyers searching nearby in South India.</p>
          </div>

          {/* Final Review Summary Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-black text-white uppercase">Final Review Preview</h3>
            <div className="flex items-center gap-3">
              <img 
                src={imagePreview || categoryMockImages[category]} 
                alt="Preview" 
                className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0" 
              />
              <div className="space-y-0.5 text-xs">
                <p className="font-extrabold text-white">{title || 'Untitled Waste Supply'}</p>
                <p className="text-slate-400">{categoryNames[category]} • {quantity} {unit} @ ₹{pricePerUnit}/{unit}</p>
                <p className="text-[10px] text-emerald-400 font-semibold">{city || 'Location'}, {state || 'State'} ({pincode || 'Pincode'})</p>
              </div>
            </div>
          </div>

          {/* Navigation & Submit Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Step 2
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-7 py-3 rounded-xl text-xs transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing Listing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Publish Waste Listing
                </>
              )}
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
