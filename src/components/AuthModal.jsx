import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Palmtree, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INITIAL_USER_ROLES } from '../data/mockData';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithEmail,
    registerWithEmail,
    loginDemoPersona,
    setActiveTab, 
    addToast 
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('BUYER'); // 'SELLER' | 'BUYER'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form input states
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  // Lock background scroll and add Escape key listener while modal is active
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAuthModalOpen(false);
    };

    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleQuickDemoLogin = async (roleKey) => {
    setError('');
    setIsLoading(true);
    const res = await loginDemoPersona(roleKey);
    setIsLoading(false);
    if (!res.success && res.error) {
      setError(typeof res.error === 'string' ? res.error : res.error.message || 'Demo sign in failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please enter your email and password.');
        setIsLoading(false);
        return;
      }

      const res = await loginWithEmail(formData.email, formData.password);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error?.message || 'Invalid login credentials.');
      } else {
        if (selectedRole === 'SELLER') setActiveTab('seller_dashboard');
        else if (selectedRole === 'BUYER') setActiveTab('buyer_dashboard');
        else setActiveTab('admin');
      }
    } else {
      // Registration validation
      if (!formData.fullName.trim()) {
        setError('Please enter your full name.');
        setIsLoading(false);
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
      }
      if (!formData.phone.trim()) {
        setError('Please enter your mobile phone number.');
        setIsLoading(false);
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      const res = await registerWithEmail(formData.email, formData.password, {
        fullName: formData.fullName,
        companyName: formData.companyName,
        phone: formData.phone,
        pincode: formData.pincode,
        role: selectedRole
      });
      setIsLoading(false);

      if (!res.success) {
        setError(res.error?.message || 'Registration failed.');
      } else {
        if (selectedRole === 'SELLER') setActiveTab('seller_dashboard');
        else setActiveTab('buyer_dashboard');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Palmtree className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">
                Coco<span className="text-emerald-400">Cycle</span> Authentication
              </h2>
              <p className="text-[10px] text-slate-400">Coconut & Areca Waste Exchange Portal</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Quick Demo Persona Switcher Banner (Gated by VITE_ENABLE_DEMO_PERSONAS) */}
          {import.meta.env.VITE_ENABLE_DEMO_PERSONAS !== 'false' && (
            <>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Quick 1-Click Demo Persona Login
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">Dev Mode Feature</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('BUYER')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
                  >
                    <div className="text-base">🏬</div>
                    <p className="font-bold text-white group-hover:text-emerald-400 truncate text-[11px]">Buyer Persona</p>
                    <p className="text-[9px] text-slate-400 truncate">EcoTable Corp</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('SELLER')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <div className="text-base">🌴</div>
                    <p className="font-bold text-white group-hover:text-amber-400 truncate text-[11px]">Seller Persona</p>
                    <p className="text-[9px] text-slate-400 truncate">Kallada Coir Mill</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('ADMIN')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group"
                  >
                    <div className="text-base">⚡</div>
                    <p className="font-bold text-white group-hover:text-indigo-400 truncate text-[11px]">Admin Ops</p>
                    <p className="text-[9px] text-slate-400 truncate">Superuser Hub</p>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Or Use Custom Credentials</span>
              </div>
            </>
          )}

          {/* Login / Register Toggle Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Register Account
            </button>
          </div>

          {/* Inline Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selector (Seller vs Buyer) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">
                Select Account Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('BUYER')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    selectedRole === 'BUYER'
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedRole === 'BUYER' ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'}`}>
                    {selectedRole === 'BUYER' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Buyer / Recycler</p>
                    <p className="text-[10px] text-slate-400">Buy bulk raw waste</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('SELLER')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    selectedRole === 'SELLER'
                      ? 'bg-amber-950/80 border-amber-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedRole === 'SELLER' ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                    {selectedRole === 'SELLER' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Seller / Farmer</p>
                    <p className="text-[10px] text-slate-400">Supply husks & sheaths</p>
                  </div>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                * Note: Admin access is restricted to verified CocoCycle platform supervisors.
              </p>
            </div>

            {/* Registration Specific Fields */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="auth-fullName" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="auth-fullName"
                        aria-label="Full Name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ramesh Kumar"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="auth-companyName" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Company / Mill Name</label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="auth-companyName"
                        aria-label="Company Name"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Kallada Coir Pvt Ltd"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="auth-phone" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="auth-phone"
                        aria-label="Phone Number"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98470 12345"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="auth-pincode" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Location Pincode</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        id="auth-pincode"
                        aria-label="Location Pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="642001 (Pollachi)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="auth-email" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-email"
                  aria-label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@business.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="auth-password" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="auth-password"
                    aria-label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label htmlFor="auth-confirmPassword" className="block text-[10px] font-bold text-slate-300 uppercase mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {mode === 'login' ? 'Sign In to CocoCycle' : 'Complete Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
