import React, { useState } from 'react';

export default function App() {
  // --- CONFIG ---
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan"; // Replace with your ID
  const spotsLeft = 12;

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');

  // --- PRICING ---
  const getPrice = () => {
    let total = tier === 'blast' ? 5 : 1;
    if (timing === 'window') total += 1;
    if (timing === 'exact') total += 5;
    return total;
  };

  const total = getPrice();

  // --- VIEW HELPERS ---
  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '22px', fontStyle: 'italic' }}>⚡ NOVANOTE</div>
      <div style={{ fontSize: '10px', color: '#818cf8', border: '1px solid #312e81', padding: '4px 10px', borderRadius: '20px' }}>
        {spotsLeft} SPOTS LEFT
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {header}

        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>THE PAYLOAD</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Choose your celebration volume.</p>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'spark' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Spark ($1)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>25 rapid-fire celebration texts.</div>
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '24px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'blast' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Blast ($5)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>100+ texts + emoji storm.</div>
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '18px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>SET TIMING</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {['anytime', 'window', 'exact'].map((t) => (
                <button key={t} onClick={() => setTiming(t)} style={{ width: '100%', padding: '18px', border: timing === t ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '12px', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{textTransform: 'capitalize'}}>{t}</span>
                  <span style={{color: '#818cf8'}}>{t === 'anytime' ? 'FREE' : t === 'window' ? '+$1' : '+$5'}</span>
                </button>
              ))}
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px', boxSizing: 'border-box' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>LOGISTICS</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>LOGISTICS</h1>
            <input type="hidden" name="Tier" value={tier} />
            <input type="hidden" name="Timing" value={timing} />
            <input type="hidden" name="Total" value={total} />
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>YOUR EMAIL</label>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>TARGET PHONE</label>
              <input type="tel" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '25px', textAlign: 'center' }}>
               <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.8, marginBottom: '5px' }}>TOTAL DUE</div>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '15px' }}>${total}</div>
               <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px' }}>DEPLOY NOW</button>
            </div>
            <button type="button" onClick={() => setStep(2)} style={{ width: '100%', textAlign: 'center', marginTop: '15px', background: 'none', border: 'none', color: '#475569', fontSize: '10px', fontWeight: 'bold' }}>EDIT ORDER</button>
          </form>
        )}
      </div>
    </div>
  );
}
