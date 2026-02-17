// @ts-nocheck
import React, { useState } from 'react';

export default function App() {
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan";
  const spotsLeft = 12;

  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const getPrice = () => {
    let base = tier === 'blast' ? 5 : 1;
    let extra = timing === 'window' ? 1 : (timing === 'exact' ? 5 : 0);
    return base + extra;
  };

  const total = getPrice();

  const deploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, tier, timing, time, total: "$" + total })
      });
      if (response.ok) { setSent(true); } 
      else { alert("ID Error. Check your Formspree code."); }
    } catch (err) {
      alert("Network timeout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '10px' }}>MISSION ACCEPTED</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Order logged for {email}. Watch your inbox.</p>
      <button onClick={() => window.location.reload()} style={{ padding: '15px 30px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>RETURN</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '22px', fontStyle: 'italic' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', color: '#818cf8', border: '1px solid #312e81', padding: '4px 10px', borderRadius: '20px' }}>{spotsLeft} SPOTS LEFT</div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>THE PAYLOAD</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Choose your celebration volume.</p>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'spark' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Spark ($1)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>25 rapid celebration texts</div>
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '20px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'blast' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Blast ($5)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>100+ texts + emoji storm</div>
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>NEXT</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => setTiming('anytime')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'anytime' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Standard (Free)</button>
              <button onClick={() => setTiming('window')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'window' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Window (+$1)</button>
              <button onClick={() => setTiming('exact')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'exact' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Exact Moment (+$5)</button>
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '10px' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>CONTINUE</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={deploy}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>LOGISTICS</h1>
            <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            <input type="tel" required placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '10px' }}>${total}</div>
               <button disabled={loading} type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
                 {loading ? "TRANSMITTING..." : "DEPLOY NOW"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
