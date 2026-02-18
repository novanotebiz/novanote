import React, { useState } from 'react';
import { Shield, Zap, Target, Clock, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

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

  // --- LOGIC ---
  const calculateTotal = () => {
    let base = tier === 'blast' ? 5 : 1;
    let extra = timing === 'window' ? 1 : (timing === 'exact' ? 5 : 0);
    return base + extra;
  };

  const total = calculateTotal();

  const getMissionDescription = () => {
    const payloadText = tier === 'spark' ? "The Spark (25 texts)" : "The Blast (100+ texts)";
    let timingText = timing === 'anytime' ? "within 24 hours" : timing === 'window' ? "in a 2hr window" : "at the exact moment";
    return `${payloadText} ${timingText}.`;
  };

  const deploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, phone, tier, timing, 
          mission: getMissionDescription(),
          target_time: time || "N/A",
          total: `$${total}` 
        })
      });

      setRedirecting(true);
      setTimeout(() => {
        window.location.href = STRIPE_LINKS[total];
      }, 1500);
    } catch (err) {
      alert("Network error.");
      setLoading(false);
    }
  };

  if (redirecting) return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <Shield className="w-16 h-16 text-indigo-500 mb-6 animate-pulse" />
      <h1 className="text-3xl font-black italic mb-2">LOGISTICS SECURED</h1>
      <p className="text-slate-400 mb-8">Forwarding to Stripe for your ${total} payment...</p>
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 font-sans">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center py-8">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-500 fill-indigo-500" />
            <span className="font-black text-2xl italic tracking-tighter">NOVANOTE</span>
          </div>
          <div className="text-[10px] font-bold bg-indigo-900/40 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
            {spotsLeft} SPOTS LEFT
          </div>
        </header>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-black italic mb-2 uppercase">The Payload</h1>
            <p className="text-slate-400 mb-8 italic">Choose your celebration volume.</p>
            <div className="space-y-4 mb-8">
              <button onClick={() => setTier('spark')} className={`w-full p-6 rounded-2xl border-2 text-left ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/50'}`}>
                <div className="flex justify-between mb-1"><span className="font-black italic text-indigo-400">SPARK</span><span className="font-bold">$1</span></div>
                <p className="text-sm text-slate-500">25 rapid-fire texts sent immediately.</p>
              </button>
              <button onClick={() => setTier('blast')} className={`w-full p-6 rounded-2xl border-2 text-left ${tier === 'blast' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/50'}`}>
                <div className="flex justify-between mb-1"><span className="font-black italic text-amber-500">BLAST</span><span className="font-bold">$5</span></div>
                <p className="text-sm text-slate-500">100+ texts + high-intensity emoji storm.</p>
              </button>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 bg-indigo-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">SET TIMING <ArrowRight className="w-5 h-5" /></button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h1 className="text-4xl font-black italic mb-8 uppercase">Timing</h1>
            <div className="space-y-3 mb-8">
              {['anytime', 'window', 'exact'].map((t) => (
                <button key={t} onClick={() => setTiming(t)} className={`w-full p-5 rounded-xl border-2 flex justify-between items-center ${timing === t ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/50'}`}>
                  <span className="capitalize font-bold">{t}</span>
                  <span className="font-black text-indigo-400">{t === 'anytime' ? 'FREE' : t === 'window' ? '+$1' : '+$5'}</span>
                </button>
              ))}
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-white text-2xl font-black mb-8 text-center" />
            )}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-900 text-slate-500 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-800"><ArrowLeft className="w-5 h-5" /> BACK</button>
              <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">CONTINUE <ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={deploy} className="animate-in fade-in slide-in-from-right-4">
            <h1 className="text-4xl font-black italic mb-8 uppercase">Logistics</h1>
            <div className="space-y-4 mb-8">
              <input type="email" required placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500" />
              <input type="tel" required placeholder="Target Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="bg-indigo-600 p-8 rounded-[2rem] text-center shadow-2xl shadow-indigo-600/40 relative overflow-hidden">
               <div className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-1">Total Due</div>
               <div className="text-7xl font-black italic mb-8 tracking-tighter">${total}</div>
               <button disabled={loading} type="submit" className="w-full py-4 bg-white text-indigo-600 rounded-xl font-black text-xl flex items-center justify-center gap-2">
                 {loading ? <Loader2 className="animate-spin" /> : "PAY & DEPLOY"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

