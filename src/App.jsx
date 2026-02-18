import React, { useState } from 'react';
import { Shield, Zap, Target, Clock, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // --- CONFIGURATION ---
  const FORMSPREE_ID = "maqdywan";
  
  const STRIPE_LINKS = {
    1: "https://buy.stripe.com/5kQ7sL5LQbJIbc09nxfQI02",
    2: "https://buy.stripe.com/00w9ATb6a4hg2FugPZfQI03",
    5: "https://buy.stripe.com/4gM4gzb6a298eoc57hfQI04",
    6: "https://buy.stripe.com/8x2eVd5LQcNM5RGfLVfQI05",
    10: "https://buy.stripe.com/14A00jfmqdRQgwkgPZfQI06"
  };

  const spotsLeft = 12;

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState(null);

  // --- LOGIC ---
  const calculateTotal = () => {
    let base = tier === 'blast' ? 5 : 1;
    let extra = timing === 'window' ? 1 : (timing === 'exact' ? 5 : 0);
    return base + extra;
  };

  const total = calculateTotal();

  const getMissionDescription = () => {
    const payloadText = tier === 'spark' ? "The Spark (25 rapid celebration texts)" : "The Blast (100+ texts + emoji storm)";
    let timingText = "";
    if (timing === 'anytime') timingText = "delivered within 24 hours.";
    if (timing === 'window') timingText = "delivered within a priority 2-hour window.";
    if (timing === 'exact') timingText = "delivered at a precise, specified minute.";
    
    return `${payloadText} ${timingText}`;
  };

  const missionDescription = getMissionDescription();

  const deploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          phone, 
          mission_summary: missionDescription,
          target_time: time || "Anytime",
          total_price: `$${total}`,
          status: "AWAITING_PAYMENT" 
        })
      });

      if (response.ok) {
        setRedirecting(true);
        const targetLink = STRIPE_LINKS[total];
        setTimeout(() => {
          window.location.href = targetLink;
        }, 1500);
      } else {
        throw new Error("Transmission failed. Please check your network.");
      }
    } catch (err) {
      setError("Network timeout. Please try again or check your connection.");
      setLoading(false);
    }
  };

  // --- REDIRECT VIEW ---
  if (redirecting) return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="relative mb-8">
        <Shield className="w-20 h-20 text-indigo-500 animate-pulse" />
        <CheckCircle2 className="w-8 h-8 text-emerald-500 absolute -bottom-1 -right-1 bg-slate-950 rounded-full" />
      </div>
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter uppercase leading-none">Logistics Secured</h1>
      <p className="text-slate-400 mb-8 max-w-xs leading-relaxed">
        Transmission successful. Forwarding to Stripe for your <span className="text-white font-bold">${total}</span> secure payment...
      </p>
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center py-8 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-indigo-500 fill-indigo-500" />
            <span className="font-black text-2xl italic tracking-tighter uppercase">NOVANOTE</span>
          </div>
          <div className="text-[10px] font-bold bg-indigo-950/50 text-indigo-400 px-3 py-1.5 rounded-full border border-indigo-500/30 tracking-widest uppercase">
            {spotsLeft} SPOTS LEFT
          </div>
        </header>

        {/* STEP 1: SELECT PAYLOAD */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h1 className="text-5xl font-black italic tracking-tighter mb-2 uppercase leading-[0.9]">The Payload</h1>
            <p className="text-slate-400 mb-10 text-lg leading-tight">Choose your celebration volume.</p>
            
            <div className="space-y-4 mb-10">
              <button 
                onClick={() => setTier('spark')}
                className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all duration-300 relative overflow-hidden ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}
              >
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className={`text-2xl font-black italic ${tier === 'spark' ? 'text-indigo-400' : 'text-slate-500'}`}>SPARK</span>
                  <span className="text-2xl font-black text-white">$1</span>
                </div>
                <p className="text-sm text-slate-400 relative z-10 leading-relaxed">25 rapid-fire celebration texts sent immediately to the recipient.</p>
              </button>

              <button 
                onClick={() => setTier('blast')}
                className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all duration-300 relative overflow-hidden ${tier === 'blast' ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}
              >
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className={`text-2xl font-black italic ${tier === 'blast' ? 'text-amber-500' : 'text-slate-500'}`}>BLAST</span>
                  <span className="text-2xl font-black text-white">$5</span>
                </div>
                <p className="text-sm text-slate-400 relative z-10 leading-relaxed">100+ celebration texts plus a curated high-intensity emoji storm.</p>
              </button>
            </div>
            
            <button 
              onClick={() => setStep(2)}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-600/30 active:scale-[0.97] transition-all flex items-center justify-center gap-3"
            >
              SET MISSION TIMING <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* STEP 2: TIMING */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h1 className="text-5xl font-black italic tracking-tighter mb-10 uppercase leading-[0.9]">Timing</h1>
            <div className="space-y-4 mb-10">
              {[
                { id: 'anytime', label: 'Standard Delivery', sub: 'Within 24 hours', price: 'FREE' },
                { id: 'window', label: 'Priority Window', sub: '2-hour block', price: '+$1' },
                { id: 'exact', label: 'Exact Moment', sub: 'Precise Minute', price: '+$5' }
              ].map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => setTiming(t.id)} 
                  className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all duration-300 ${timing === t.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40'}`}
                >
                  <div className="text-left">
                    <div className="font-bold text-lg text-white leading-tight">{t.label}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">{t.sub}</div>
                  </div>
                  <span className={`font-black text-lg ${timing === t.id ? 'text-indigo-400' : 'text-slate-700'}`}>{t.price}</span>
                </button>
              ))}
            </div>

            {timing !== 'anytime' && (
              <div className="mb-10 p-1 animate-in fade-in zoom-in-95 duration-300">
                <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-3 block px-2 text-center">Specify Target Time</label>
                <input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  className="w-full p-5 bg-slate-900 border-2 border-slate-800 rounded-2xl text-white text-4xl font-black outline-none focus:border-indigo-500 transition-all text-center shadow-inner" 
                />
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-900 border border-slate-800 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <ArrowLeft className="w-5 h-5" /> BACK
              </button>
              <button onClick={() => setStep(3)} className="flex-[2] py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/30 active:scale-[0.97] transition-all">
                CONTINUE <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: LOGISTICS */}
        {step === 3 && (
          <form onSubmit={deploy} className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h1 className="text-5xl font-black italic tracking-tighter mb-10 uppercase text-white leading-[0.9]">Logistics</h1>
            
            <div className="space-y-5 mb-10">
              <div className="group">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block px-1 group-focus-within:text-indigo-400 transition-colors">Notification Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="commander@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-800" 
                />
              </div>
              <div className="group">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block px-1 group-focus-within:text-indigo-400 transition-colors">Target Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+1 (555) 000-0000" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  className="w-full p-5 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-800" 
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 flex items-center gap-3 text-sm font-bold">
                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
              </div>
            )}
            
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2rem] mb-10 relative overflow-hidden">
              <div className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Mission Summary
              </div>
              <div className="text-base font-bold text-slate-200 leading-relaxed italic pr-4">
                "{missionDescription}"
              </div>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[3rem] text-center shadow-[0_30px_60px_-15px_rgba(79,102,241,0.5)] border border-indigo-400/30 relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="text-[12px] font-black opacity-70 uppercase tracking-[0.2em] mb-2">Deployment Fee</div>
                 <div className="text-8xl font-black italic tracking-tighter mb-10 leading-none drop-shadow-lg">${total}</div>
                 
                 <button 
                   disabled={loading} 
                   type="submit" 
                   className="w-full py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black text-2xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                 >
                   {loading ? (
                     <>
                      <Loader2 className="w-7 h-7 animate-spin" /> TRANSMITTING...
                     </>
                   ) : (
                     <>
                      PAY & DEPLOY <Zap className="w-7 h-7 fill-indigo-600" />
                     </>
                   )}
                 </button>
               </div>
            </div>
          </form>
        )}
      </div>
      
      <footer className="max-w-md mx-auto mt-12 mb-8 text-center">
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Encrypted Connection • Secure via Stripe</p>
      </footer>
    </div>
  );
}

