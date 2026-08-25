import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palmtree, 
  Leaf, 
  ShieldCheck, 
  HeartHandshake, 
  Globe, 
  Mail, 
  MapPin, 
  PhoneCall, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  const { setActiveTab, setSelectedCategory } = useApp();
  const [activeLegalModal, setActiveLegalModal] = React.useState(null); // 'privacy' | 'terms' | 'contact' | null

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-20 md:pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Column 1: Brand Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Palmtree className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Coco<span className="text-emerald-400">Cycle</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Connecting farmers, tender coconut vendors, oil mills, and areca growers with industrial buyers, recyclers, biomass plants, and eco-product manufacturers.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-400 pt-1">
              <span className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-800/50 px-3 py-1 rounded-lg text-emerald-300 font-semibold">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Circular Bio-Economy
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Zero Waste Initiative
              </span>
            </div>
          </div>

          {/* Column 2: Coconut Waste Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Coconut Waste</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li 
                onClick={() => handleCategoryClick('coconut_husk')} 
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Sun-Dried Coconut Husks</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('coir_pith')} 
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Coir Pith & Coco Peat</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('coconut_shell')} 
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Coconut Shell Charcoal</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('tender_coconut')} 
                className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Urban Tender Coconut Waste</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* Column 3: Areca Waste Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Areca Waste</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li 
                onClick={() => handleCategoryClick('areca_sheath')} 
                className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Grade A Areca Sheaths</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('areca_sheath')} 
                className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Eco-Plate Raw Stock</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('areca_husk')} 
                className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Shredded Areca Biomass</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li 
                onClick={() => handleCategoryClick('areca_husk')} 
                className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1 group"
              >
                <span>Boiler Pellet Feedstock</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Regional Support Hubs */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Regional Hubs</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pollachi • Shivamogga • Kozhikode • Bengaluru</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <button onClick={() => setActiveLegalModal('contact')} className="hover:text-white transition-colors">hello@cococycle.io</button>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 8000-COCO-CYCLE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CocoCycle Platform. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => setActiveTab('landing')} className="hover:text-slate-200 cursor-pointer transition-colors">Home</button>
            <button onClick={() => setActiveTab('marketplace')} className="hover:text-slate-200 cursor-pointer transition-colors">Marketplace</button>
            <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-slate-200 cursor-pointer transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveLegalModal('terms')} className="hover:text-slate-200 cursor-pointer transition-colors">Terms of Service</button>
            <button onClick={() => setActiveLegalModal('contact')} className="hover:text-slate-200 cursor-pointer transition-colors">Contact Support</button>
          </div>
        </div>
      </div>

      {/* Legal & Support Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-black text-white">
                {activeLegalModal === 'privacy' && 'Privacy Policy'}
                {activeLegalModal === 'terms' && 'Terms of Service'}
                {activeLegalModal === 'contact' && 'Contact Support & Inquiries'}
              </h2>
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {activeLegalModal === 'privacy' && (
                <>
                  <p className="font-bold text-amber-400 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                    [BUSINESS OWNER LEGAL PLACEHOLDER]: Replace this text with your registered company privacy policy statement.
                  </p>
                  <p>CocoCycle values your privacy. Account information (name, company, phone, pincode) is used strictly for connecting raw material buyers and sellers across verified agricultural supply chains.</p>
                  <p>User credentials are encrypted and stored via Supabase Authentication. We do not sell or lease personal contact details to unverified third parties.</p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <p className="font-bold text-amber-400 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                    [BUSINESS OWNER LEGAL PLACEHOLDER]: Replace this text with your registered business terms & conditions.
                  </p>
                  <p>By listing or requesting quotes on CocoCycle, sellers warrant that listed coconut and areca waste materials conform to stated moisture, quantity, and quality specifications.</p>
                  <p>CocoCycle facilitates direct buyer-seller RFQs and quote negotiations. Logistics, transport, and payments are fulfilled as agreed between trading partners.</p>
                </>
              )}

              {activeLegalModal === 'contact' && (
                <>
                  <p className="font-bold text-emerald-400">CocoCycle Customer Support Hub</p>
                  <p>For platform assistance, account verification, or bulk industrial supply inquiries:</p>
                  <ul className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <li>📧 Email: <strong>hello@cococycle.io</strong></li>
                    <li>📞 Support Line: <strong>+91 8000-COCO-CYCLE</strong></li>
                    <li>📍 Regional Hub: <strong>Pollachi, Tamil Nadu & Shivamogga, Karnataka</strong></li>
                  </ul>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
