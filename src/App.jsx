import React, { useState, useEffect } from 'react';
import { 
  Zap, Smartphone, Bell, Play, MessageSquare, 
  Battery, Wifi, Signal, Lock, ShieldCheck, 
  Loader2, ArrowRight, Volume2, VolumeX,
  Gift, Trophy, Ghost, PartyPopper, CheckCircle2,
  Shield, Clock, Target, ArrowLeft, Calendar, Info
} from 'lucide-react';

// --- CONFIGURATION ---
const FORMSPREE_ID = "maqdywan";
const STRIPE_LINKS = {
  1: "https://buy.stripe.com/5kQ7sL5LQbJIbc09nxfQI02",
  2: "https://buy.stripe.com/00w9ATb6a4hg2FugPZfQI03",
  5: "https://buy.stripe.com/4gM4gzb6a298eoc57hfQI04",
  6: "https://buy.stripe.com/8x2eVd5LQcNM5RGfLVfQI05",
  10: "https://buy.stripe.com/14A00jfmqdRQgwkgPZfQI06"
};

const BARRAGE_TEXTS = {
  birthday: ["HAPPY BIRTHDAY!!! 🎂", "Another year older! 🎉", "Let's party!! 🎈", "Make a wish! ✨", "BDAY VIBES ONLY 🎊", "Cake time!! 🍰", "Enjoy your day! ❤️", "HBD!! 🎁", "Party hard! 🥳", "Best day ever! 🌟"],
  congrats: ["YOU DID IT! 🏆", "So proud!! 👏", "Big moves! 🚀", "Champ! 🥇", "Victory!! 🎉", "Way to go! 🙌", "Congrats!! 🎊", "Next level! ⚡"],
  prank: ["LOOK BEHIND YOU 👻", "Run. 🏃‍♂️", "I see you... 👀", "Who is this?? 🤨", "SYSTEM ERROR ⚠️", "Incoming... ☄️", "Don't blink. 👁️", "WAKE UP ⏰"]
};

export default function App() {
  const [view, setView] = useState('landing'); 
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [vibe, setVibe] = useState('birthday');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const triggerHaptics = () => {
    if (!soundEnabled) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    gain1.gain.setValueAtTime(0.1, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc1.start(); osc1.stop(ctx.currentTime + 0.2);
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    gain2.gain.setValueAtTime(0.05, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.start(); osc2.stop(ctx.currentTime + 0.15);
  };

  const startSimulation = () => {
    if (isSimulating) return;
    setNotifications([]); setProgress(0); setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 25) { clearInterval(interval); setIsSimulating(false); return; }
      triggerHaptics();
      const msgs = BARRAGE_TEXTS[vibe];
      const newNotif = { id: Date.now() + count, text: msgs[Math.floor(Math.random() * msgs.length)] };
      setNotifications(prev => [newNotif, ...prev]);
      count++; setProgress(count);
    }, 400);
  };

  const calculateTotal = () => {
    let base = tier === 'blast' ? 5 : 1;
    let extra = timing === 'window' ? 1 : (timing === 'exact' ? 5 : 0);
    return base + extra;
  };

  const deploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, tier, timing, total: `$${calculateTotal()}` })
      });
      setRedirecting(true);
      setTimeout(() => { window.location.href = STRIPE_LINKS[calculateTotal()]; }, 1500);
    } catch (err) {
      alert("Error."); setLoading(false);
    }
  };

  if (redirecting) return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <Shield className="w-20 h-20 text-indigo-500 animate-pulse mb-8" />
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter uppercase leading-none">Logistics Secured</h1>
      <p className="text-slate-400 mb-10 max-w-xs">Forwarding to Stripe for secure checkout...</p>
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      {view === 'landing' ? (
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-700">
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-indigo-500 fill-indigo-500 w-8 h-8" />
              <span className="font-black text-3xl italic tracking-tighter text-white">NOVANOTE</span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-black italic tracking-tighter uppercase leading-[0.75] mb-6 text-white">
              DIGITAL <br/><span className="text-indigo-500">BARRAGE</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-md italic mb-10">
              "25 celebration texts in 10 seconds." Launch a phone explosion they'll never forget.
            </p>
            <button onClick={() => setView('checkout')} className="px-12 py-7 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2.5rem] font-black text-3xl shadow-2xl shadow-indigo-600/40 flex items-center gap-4 transition-all active:scale-95">
              START BARRAGE <ArrowRight size={32} />
            </button>
            <div className="bg-slate-900/80 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-xl mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Recipient Simulation</h3>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-full ${soundEnabled ? 'text-indigo-400' : 'text-slate-600'}`}>{soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {['birthday', 'congrats', 'prank'].map(v => (
                  <button key={v} onClick={() => setVibe(v)} disabled={isSimulating} className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${vibe === v ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-white/5 bg-white/5 text-slate-500'}`}>{v}</button>
                ))}
              </div>
              <button onClick={startSimulation} disabled={isSimulating} className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3">{isSimulating ? `TRANSMITTING ${progress}/25...` : "TEST SOUNDS"}</button>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className={`absolute inset-0 bg-indigo-600/30 blur-[120px] rounded-full transition-opacity duration-500 ${isSimulating ? 'opacity-100' : 'opacity-20'}`} />
            <div className={`relative w-full max-w-[340px] aspect-[9/19.5] bg-black rounded-[4rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col ${isSimulating ? 'animate-vibrate' : ''}`}>
              <div className="h-14 px-10 pt-5 z-30 flex justify-between text-white font-bold text-sm"><span>9:41</span><div className="flex gap-1.5"><Signal size={14}/><Wifi size={14}/><Battery size={16}/></div></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-3xl z-40 border border-white/10" />
              <div className="flex-1 px-5 pt-12 relative overflow-hidden z-20">
                <div className="text-center mb-12"><div className="text-8xl font-thin text-white/90 tracking-tighter leading-none mb-1">9:41</div><div className="text-sm font-medium text-white/60">Wednesday, Feb 18</div></div>
                <div className="absolute bottom-10 left-0 right-0 px-4 space-y-2.5 flex flex-col-reverse max-h-[480px]">
                  {notifications.map((n, idx) => (
                    <div key={n.id} className="bg-white/10 backdrop-blur-3xl border border-white/20 p-4 rounded-[1.75rem] flex items-start gap-3.5 animate-in slide-in-from-bottom-8 shadow-xl" style={{ opacity: 1 - (idx * 0.12), transform: `scale(${1 - (idx * 0.02)})` }}>
                      <div className="bg-indigo-500 p-2.5 rounded-2xl shrink-0"><MessageSquare size={14} className="text-white fill-white" /></div>
                      <div className="flex-1 min-w-0"><p className="text-[13px] font-bold text-white truncate leading-tight">{n.text}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-8 flex justify-center pb-3"><div className="w-32 h-1.5 bg-white/20 rounded-full" /></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full mx-auto animate-in slide-in-from-right-12 duration-500">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 text-slate-500 hover:text-white mb-12 font-bold uppercase tracking-widest text-xs"><ArrowLeft size={16} /> Home</button>
          {checkoutStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white">Payload</h2>
              <button onClick={() => setTier('spark')} className={`w-full p-8 rounded-[2.5rem] border-2 text-left ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40'}`}><div className="flex justify-between mb-2"><span className="text-2xl font-black text-indigo-400 italic">SPARK</span><span className="text-2xl font-black">$1</span></div><p className="text-slate-500 text-sm">25 celebration texts.</p></button>
              <button onClick={() => setTier('blast')} className={`w-full p-8 rounded-[2.5rem] border-2 text-left ${tier === 'blast' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}><div className="flex justify-between mb-2"><span className="text-2xl font-black text-amber-500 italic">BLAST</span><span className="text-2xl font-black">$5</span></div><p className="text-slate-500 text-sm">100+ texts + emoji storm.</p></button>
              <button onClick={() => setCheckoutStep(2)} className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl">CONTINUE</button>
            </div>
          )}
          {checkoutStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white">Timing</h2>
              {['anytime', 'window', 'exact'].map(t => (
                <button key={t} onClick={() => setTiming(t)} className={`w-full p-6 rounded-[2rem] border-2 flex justify-between items-center ${timing === t ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-800 bg-slate-900/40 text-slate-500'}`}><span className="font-black text-lg capitalize">{t}</span><span className="font-black text-indigo-400">{t === 'anytime' ? 'FREE' : t === 'window' ? '+$1' : '+$5'}</span></button>
              ))}
              {timing !== 'anytime' && <input type="time" onChange={e => setTime(e.target.value)} className="w-full p-6 bg-slate-900 border-2 border-slate-800 rounded-3xl text-white text-4xl font-black text-center" />}
              <div className="flex gap-4"><button onClick={() => setCheckoutStep(1)} className="flex-1 py-6 bg-slate-900 rounded-2xl font-bold">BACK</button><button onClick={() => setCheckoutStep(3)} className="flex-[2] py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl">LOGISTICS</button></div>
            </div>
          )}
          {checkoutStep === 3 && (
            <form onSubmit={deploy} className="space-y-6">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase text-white">Logistics</h2>
              <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white" />
              <input type="tel" required placeholder="Target Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white" />
              <div className="bg-indigo-600 p-10 rounded-[3rem] text-center shadow-2xl shadow-indigo-600/40 relative overflow-hidden"><div className="relative z-10"><div className="text-xs font-black opacity-70 uppercase tracking-widest mb-2 text-white">Grand Total</div><div className="text-8xl font-black italic mb-10 text-white">${calculateTotal()}</div><button disabled={loading} type="submit" className="w-full py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black text-2xl shadow-xl">{loading ? <Loader2 className="animate-spin" /> : "PAY & DEPLOY"}</button></div></div>
            </form>
          )}
        </div>
      )}
      <footer className="fixed bottom-8 text-center pointer-events-none opacity-20"><p className="text-[9px] font-black uppercase tracking-[0.5em]">NovaNote Messaging Service</p></footer>
      <style>{`@keyframes vibrate { 0% { transform: translate(0, 0); } 25% { transform: translate(1px, -1px); } 50% { transform: translate(-1px, 1px); } 100% { transform: translate(0, 0); } } .animate-vibrate { animation: vibrate 0.1s infinite; }`}</style>
    </div>
  );
}
