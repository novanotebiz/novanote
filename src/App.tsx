import React, { useState } from 'react';

export default function App() {
  // CONFIGURATION
  // Replace YOUR_ID_HERE with your Formspree ID (e.g. "mjvnpoyz")
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan";
  const spotsLeft = 12;

  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');

  // Pricing Logic
  const prices: Record<string, number> = { 
    spark: 1, 
    blast: 5, 
    anytime: 0, 
    window: 1, 
    exact: 5 
  };
  
  const totalPrice = (prices[tier] || 0) + (prices[timing] || 0);

  // Navigation
  const next = () => { setStep(s => s + 1); window.scrollTo(0,0); };
  const back = () => { setStep(s => s - 1); window.scrollTo(0,0); };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '24px', fontStyle: 'italic' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', backgroundColor: '#312e81', color: '#818cf8', padding: '4px 12px', borderRadius: '99px', border: '1px solid #3730a3' }}>
             {spotsLeft} SPOTS LEFT
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 1 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 2 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 3 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
        </div>

        {/* STEP 1: PAYLOAD */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>THE PAYLOAD</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Choose your celebration volume.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <button 
                onClick={() => setTier('spark')}
                style={{ textAlign: 'left', padding: '24px', borderRadius: '16px', border: tier === 'spark' ? '2px solid #6366f1' : '2px solid #1e293b', backgroundColor: tier === 'spark' ? '#6366f11a' : '#0f172a', color: 'white' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>📈</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$1</span>
                </div>
                <div style={{ fontWeight: 'bold' }}>The Spark</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>25 celebration texts sent rapidly.</div>
              </button>

              <button 
                onClick={() => setTier('blast')}
                style={{ textAlign: 'left', padding: '24px', borderRadius: '16px', border: tier === 'blast' ? '2px solid #f59e0b' : '2px solid #1e293b', backgroundColor: tier === 'blast' ? '#f59e0b1a' : '#0f172a', color: 'white' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>✨</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$5</span>
                </div>
                <div style={{ fontWeight: 'bold' }}>The Blast</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>100+ texts + emoji storm.</div>
              </button>
            </div>
            
            <button onClick={next} style={{ width: '100%', padding: '20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>
              SET TIMING
            </button>
          </div>
        )}

        {/* STEP 2: TIMING */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>TIMING</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>When should we strike?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setTiming('anytime')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'anytime' ? '2px solid #6366f1' : '2px solid #1e293b', backgroundColor: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                <span>🕒 Standard (24h)</span>
                <span style={{ color: '#22c55e' }}>FREE</span>
              </button>
              
              <button onClick={() => setTiming('window')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'window' ? '2px solid #6366f1' : '2px solid #1e293b', backgroundColor: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                <span>⭐ Priority Window</span>
                <span>+$1</span>
              </button>

              <button onClick={() => setTiming('exact')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'exact' ? '2px solid #6366f1' : '2px solid #1e293b', backgroundColor: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
                <span>🎯 Exact Moment</span>
                <span>+$5</span>
              </button>
            </div>

            {timing !== 'anytime' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#6366f1', display: 'block', marginBottom: '8px' }}>SELECT TIME</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{ width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: 'white', fontSize: '20px' }} 
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={back} style={{ flex: 1, padding: '16px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>BACK</button>
              <button onClick={next} style={{ flex: 2, padding: '16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>LOGISTICS</button>
            </div>
          </div>
        )}

        {/* STEP 3: LOGISTICS */}
        {step === 3 && (
          <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST">
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>LOGISTICS</h1>
            
            <input type="hidden" name="Tier" value={tier} />
            <input type="hidden" name="Timing" value={timing} />
            <input type="hidden" name="CustomTime" value={time} />
            <input type="hidden" name="TotalPrice" value={`$${totalPrice}`} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>YOUR EMAIL</label>
                <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: 'white' }} />
              </div>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>TARGET PHONE</label>
                <input type="tel" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: 'white' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#4f46e5', padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
               <div style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.7, marginBottom: '4px' }}>TOTAL MISSION COST</div>
               <div style={{ fontSize: '56px', fontWeight: '900', fontStyle: 'italic', marginBottom: '16px' }}>${totalPrice}</div>
               <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '18px' }}>
                 PAY & DEPLOY
               </button>
            </div>
            
            <button type="button" onClick={back} style={{ width: '100%', textAlign: 'center', marginTop: '16px', color: '#475569', fontSize: '10px', fontWeight: 'bold', background: 'none', border: 'none' }}>EDIT CONFIGURATION</button>
          </form>
        )}
      </div>
    </div>
  );
}
