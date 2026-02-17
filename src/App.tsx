import React, { useState } from 'react';
import { 
  Zap, Target, Clock, ShieldCheck, ChevronRight, 
  ChevronLeft, TrendingUp, Sparkles, Star, Lock 
} from 'lucide-react';

/**
 * NOVANOTE REPAIR KIT
 * Instructions:
 * 1. Replace "YOUR_ID_HERE" on Line 17 with your Formspree ID.
 * 2. Select ALL and Paste into GitHub.
 */

export default function App() {
  // --- PASTE YOUR FORMSPREE ID HERE ---
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan"; 
  // ------------------------------------

  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [customTime, setCustomTime] = useState('');

  const basePrices = { spark: 1, blast: 5 };
  const timingAddons = { anytime: 0, window: 1, exact: 5 };
  const totalPrice = (basePrices[tier] || 0) + (timingAddons[timing] || 0);

  const handleNext = () => { setStep((s) => s + 1); window.scrollTo(0,0); };
  const handleBack = () => { setStep((s) => s - 1); window.scrollTo(0,0); };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="fill-white text-white" />
            </div>
            <span className="font-bold text-xl italic uppercase tracking-tighter">NovaNote</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">12 Spots Left</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 max-w-xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-10 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-indigo-500 flex-[2]' : 'bg-white/10 flex-1'}`} />
          ))}
        </div>

        {/* STEP 1: SELECT PAYLOAD */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">The Payload</h1>
              <p className="text-slate-400">Select your celebration volume.</p>
            </header>
            <div className="space-y-4">
              <button 
                type="button"
                onClick={() => setTier('spark')} 
                className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex justify-between mb-4">
                  <TrendingUp className={tier === 'spark' ? 'text-indigo-400' : 'text-slate-500'} />
                  <span className="text-2xl font-black italic">$1</span>
                </div>
                <h3 className="font-bold text-lg">The Spark</h3>
                <p className="text-xs text-slate-500 leading-relaxed">25 rapid-fire celebration texts sent to their device.</p>
              </button>
              
              <button 
                type="button"
                onClick={() => setTier('blast')} 
                className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${tier === 'blast' ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/5'}`}
              >
                <div className="flex justify-between mb-4">
                  <Sparkles className={tier === 'blast' ? 'text-amber-400' : 'text-slate-500'} />
                  <span className="text-2xl font-black italic">$5</span>
                </div>
                <h3 className="font-bold text-lg">The Blast</h3>
                <p className="text-xs text-slate-500 leading-relaxed">100+ celebration texts + curated emojis and a custom finale.</p>
              </button>
            </div>
            <button onClick={handleNext} className="w-full py-5 bg-indigo-600 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">Set Timing</button>
          </div>
        )}

        {/* STEP 2: TIMING */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <header>
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">The Timing</h1>
              <p className="text-slate-400">When should the storm hit?</p>
            </header>
            <div className="space-y-3">
              {[
                { id: 'anytime', label: 'Standard Delivery', sub: 'Within 24 hours', price: 'FREE' },
                { id: 'window', label: 'Priority Window', sub: '2-hour block', price: '+$1' },
                { id: 'exact', label: 'Exact Moment', sub: 'The precise minute', price: '+$5' }
              ].map((t) => (
                <button 
                  key={t.id} 
                  type="button"
                  onClick={() => setTiming(t.id)} 
                  className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center ${timing === t.id ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}
                >
                  <div className="text-left">
                    <div className="font-bold">{t.label}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{t.sub}</div>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">{t.price}</span>
                </button>
              ))}
            </div>
            {(timing !== 'anytime') && (
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Select Target Time</label>
                <input 
                  type="time" 
                  className="w-full bg-slate-900 border-none rounded-xl p-4 text-xl font-bold text-white focus:ring-1 focus:ring-indigo-500" 
                  onChange={(e) => setCustomTime(e.target.value)} 
                  value={customTime} 
                />
              </div>
            )}
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 py-5 bg-white/5 rounded-2xl font-bold text-slate-400">Back</button>
              <button onClick={handleNext} className="flex-[2] py-5 bg-indigo-600 rounded-2xl font-bold text-white shadow-lg">Logistics</button>
            </div>
          </div>
        )}

        {/* STEP 3: LOGISTICS */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <header>
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">Logistics</h1>
              <p className="text-slate-400">Enter delivery details.</p>
            </header>
            
            <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="space-y-6">
              <input type="hidden" name="Tier" value={tier} />
              <input type="hidden" name="Timing" value={timing} />
              <input type="hidden" name="Time" value={customTime} />
              <input type="hidden" name="Total_Price" value={`$${totalPrice}`} />
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Email</label>
                <input 
                  type="email" name="sender_email" required 
                  placeholder="you@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-indigo-500 outline-none" 
                  value={email} onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Phone</label>
                <input 
                  type="tel" name="target_phone" required 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-indigo-500 outline-none" 
                  value={targetPhone} onChange={(e) => setTargetPhone(e.target.value)} 
                />
              </div>

              <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/40 space-y-6">
                <div className="flex justify-between items-end text-white">
                  <div>
                    <span className="text-[10px] block font-bold uppercase tracking-widest mb-1 opacity-70">Total Due</span>
                    <span className="text-5xl font-black italic tracking-tighter">${totalPrice}</span>
                  </div>
                  <div className="text-right pb-1">
                     <span className="text-[10px] block font-bold uppercase tracking-widest opacity-70 italic">Secure Checkout</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-transform"
                >
                  PAY & DEPLOY
                </button>
              </div>
            </form>
            <button onClick={handleBack} className="w-full text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">Edit Configuration</button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto px-5 py-3 bg-white/5 border border-white/10 rounded-full flex justify-center backdrop-blur-xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            <span className="text-indigo-400">124</span> Storms Deployed Today
          </p>
        </div>
      </footer>
    </div>
  );
}

