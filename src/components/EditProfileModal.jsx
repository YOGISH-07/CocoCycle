import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  Building2, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function EditProfileModal() {
  const { 
    isEditProfileOpen, 
    setIsEditProfileOpen, 
    currentUser, 
    updateProfile 
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    pincode: '',
    location: '',
    avatar: '🌴'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsEditProfileOpen(false);
    };

    if (isEditProfileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setFormData({
        name: currentUser?.name || '',
        company: currentUser?.company || '',
        phone: currentUser?.phone || '',
        pincode: currentUser?.pincode || '',
        location: currentUser?.location || '',
        avatar: currentUser?.avatar || '🌴'
      });
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditProfileOpen, currentUser, setIsEditProfileOpen]);

  if (!isEditProfileOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await updateProfile({
      fullName: formData.name,
      company: formData.company,
      phone: formData.phone,
      pincode: formData.pincode,
      location: formData.location,
      avatar: formData.avatar
    });

    setIsLoading(false);

    if (result.success) {
      setIsEditProfileOpen(false);
    } else {
      setError(result.error?.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{formData.avatar || '🌴'}</span>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">Edit Profile</h2>
              <p className="text-[10px] text-slate-400">Update your account information</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="profile-name" className="block text-[10px] font-extrabold text-slate-300 uppercase">Full Name</label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                id="profile-name"
                aria-label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ramesh Kumar"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-1">
            <label htmlFor="profile-company" className="block text-[10px] font-extrabold text-slate-300 uppercase">Company / Organization</label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                id="profile-company"
                aria-label="Company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Kallada Agro-Coir Mill"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label htmlFor="profile-phone" className="block text-[10px] font-extrabold text-slate-300 uppercase">Phone Number</label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                id="profile-phone"
                aria-label="Phone Number"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98470 12345"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Pincode & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="profile-pincode" className="block text-[10px] font-extrabold text-slate-300 uppercase">Pincode</label>
              <input
                id="profile-pincode"
                aria-label="Pincode"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="642001"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="profile-location" className="block text-[10px] font-extrabold text-slate-300 uppercase">Location / City</label>
              <input
                id="profile-location"
                aria-label="Location City"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Pollachi, Tamil Nadu"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Avatar Selector */}
          <div className="space-y-1">
            <label className="block text-[10px] font-extrabold text-slate-300 uppercase">Avatar Emoji</label>
            <div className="flex items-center gap-2">
              {['🌴', '🏬', '⚡', '🌱', '🥥', '🚜'].map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setFormData({ ...formData, avatar: emoji })}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-all ${
                    formData.avatar === emoji
                      ? 'bg-emerald-950 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
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
                  Saving via Supabase RPC...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Save Profile Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
