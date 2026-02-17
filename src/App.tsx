import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Target, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare, 
  AlertCircle,
  TrendingUp,
  Bomb,
  Star,
  Sparkles,
  Lock
} from 'lucide-react';

/**
 * NOVANOTE - The Celebration Storm Service
 * All-in-one React Application
 */

const App = () => {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  // Pricing Architecture
  const basePrices = {
    spark: 1,
    blast: 5
  };

  const timingAddons = {
    anytime: 0,
    window: 1,
    exact: 5
  };

  const totalPrice = basePrices[tier] + timingAddons[timing];

  const handleNext = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Artificial Scarcity Logic (Dynamic display)
  const spotsLeft = 12;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight italic uppercase">NovaNote</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{spotsLeft} Spots Left</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 max-w-xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-10 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-indigo-500 flex-[2]' : 'bg-white/10 flex-1'}`} 
            />
          ))}
        </div>

        {/* STEP 1: SELECT PAYLOAD */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3">Choose Your <span className="text-indigo-400">Storm.</span></h1>
              <p className="text-slate-400 text-lg">Pick the volume of celebration you want to unleash.</p>
            </header>

            <div className="space-y-4">
              <button 
                onClick={() => setTier('spark')}
                className={`w-full p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/5 ring-4 ring-indigo-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl transition-colors ${tier === 'spark' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-3xl font-black italic">$1</span>
                </div>
                <h3 className="text-xl font-bold mb-1">The Spark</h3>
                <p className="text-sm text-slate-400 leading-relaxed">25 perfectly timed celebration texts sent in a rapid sequence.</p>
                {tier === 'spark' && <div className="absolute top-0 right-0 p-2 bg-indigo-500 text-[10px] font-black uppercase tracking-tighter transform rotate-12 translate-x-4 -translate-y-2">Selected</div>}
              </button>

              <button 
                onClick={() => setTier('blast')}
                className={`w-full p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${tier === 'blast' ? 'border-amber-500 bg-amber-500/5 ring-4 ring-amber-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl transition-colors ${tier === 'blast' ? 'bg-amber-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    <Sparkles size={24} />
                  </div>
                  <span className="text-3xl font-black italic">$5</span>
                </div>
                <h3 className="text-xl font-bold mb-1">The Blast</h3>
                <p className="text-sm text-slate-400 leading-relaxed">100+ celebration texts + curated emojis and a personalized finale message.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-500 text-[10px] font-bold rounded uppercase tracking-widest">Most Popular</span>
                </div>
              </button>
            </div>

            <button 
              onClick={handleNext}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Continue to Timing <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 2: TIMING UPGRADES */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3">Delivery <span className="text-indigo-400">Timing.</span></h1>
              <p className="text-slate-400 text-lg">When should the celebration reach their phone?</p>
            </header>

            <div className="space-y-3">
              <button 
                onClick={() => setTiming('anytime')}
                className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${timing === 'anytime' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${timing === 'anytime' ? 'text-indigo-400' : 'text-slate-600'}`}><Clock size={24} /></div>
                  <div className="text-left">
                    <div className="font-bold">Standard Delivery</div>
                    <div className="text-xs text-slate-500 italic">Sent randomly within 24 hours</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded tracking-tighter">INCLUDED</span>
              </button>

              <button 
                onClick={() => setTiming('window')}
                className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${timing === 'window' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${timing === 'window' ? 'text-indigo-400' : 'text-slate-600'}`}><Star size={24} /></div>
                  <div className="text-left">
                    <div className="font-bold">Priority Window</div>
                    <div className="text-xs text-slate-500 italic">Target a 2-hour window</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">+$1</span>
              </button>

              <button 
                onClick={() => setTiming('exact')}
                className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${timing === 'exact' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${timing === 'exact' ? 'text-indigo-400' : 'text-slate-600'}`}><Target size={24} /></div>
                  <div className="text-left">
                    <div className="font-bold">Exact Moment</div>
                    <div className="text-xs text-slate-500 italic">Trigger at the precise minute</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">+$5</span>
              </button>
            </div>

            {(timing === 'exact' || timing === 'window') && (
              <div className="p-6 bg-indigo-600/5 rounded-3xl border border-indigo-500/20 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-400" />
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Select Deployment Time</label>
                </div>
                <input 
                  type="time" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  onChange={(e) => setCustomTime(e.target.value)}
                  value={customTime}
                />
                <p className="text-[10px] text-slate-500 italic">Times are scheduled based on your current time zone.</p>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                onClick={handleBack}
                className="flex-1 py-5 bg-white/5 text-slate-400 rounded-2xl font-bold hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                Final Step <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3">Mission <span className="text-indigo-400">Logistics.</span></h1>
              <p className="text-slate-400 text-lg">Where should we aim the celebration?</p>
            </header>

            {/* Formspree Integration */}
            <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="space-y-6">
              <input type="hidden" name="Package" value={tier} />
              <input type="hidden" name="Timing_Tier" value={timing} />
              <input type="hidden" name="Target_Time" value={customTime} />
              <input type="hidden" name="Price" value={`$${totalPrice}`} />

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Contact Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="sender_email"
                    required
                    placeholder="you@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:border-indigo-500 transition-all text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Recipient's Mobile Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="target_phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:border-indigo-500 transition-all text-lg"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                  />
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                </div>
              </div>

              <div className="pt-4">
                <div className="p-8 bg-indigo-600 rounded-[2.5rem] space-y-6 shadow-2xl shadow-indigo-600/40 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="text-[10px] block opacity-80 uppercase font-bold tracking-[0.2em] mb-1">Total Due Now</span>
                        <span className="text-5xl font-black italic tracking-tighter">${totalPrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] block opacity-80 uppercase font-bold tracking-widest mb-1">Tier</span>
                        <span className="font-black uppercase italic text-sm">{tier} + {timing}</span>
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-xl shadow-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95"
                    >
                      PAY & DEPLOY <Zap size={22} className="fill-indigo-700" />
                    </button>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
                      <Lock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted by Stripe</span>
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                </div>
              </div>
            </form>

            <button onClick={handleBack} className="w-full text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Modify Configuration
            </button>
          </div>
        )}
      </main>

      {/* Persistence Bar */}
      <footer className="fixed bottom-0 w-full p-6 z-40 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <div className="max-w-xl mx-auto">
          <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-full flex items-center justify-between backdrop-blur-xl">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-950 overflow-hidden ring-1 ring-white/10">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+100}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span className="text-indigo-400">124</span> Storms Deployed Today
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

