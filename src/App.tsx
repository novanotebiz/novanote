import React, { useState } from 'react';

type PayloadTier = 'spark' | 'blast';
type TimingTier = 'anytime' | 'window' | 'exact';

export default function App() {
  const FORMSPREE_ID: string = "https://formspree.io/f/maqdywan";
  const spotsLeft: number = 12;

  const [step, setStep] = useState<number>(1);
  const [tier, setTier] = useState<PayloadTier>('spark');
  const [timing, setTiming] = useState<TimingTier>('anytime');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const calculateTotal = (): number => {
    let cost = tier === 'blast' ? 5 : 1;
    if (timing === 'window') cost += 1;
    if (timing === 'exact') cost += 5;
    return cost;
  };

  const total: number = calculateTotal();
  const next = (): void => { setStep(s => s + 1); window.scrollTo(0, 0); };
  const back = (): void => { setStep(s => s - 1); window.scrollTo(0, 0); };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', color: '#818cf8', border: '1px solid #312e81', padding: '4px 10px', borderRadius: '20px' }}>
            {spotsLeft} SPOTS LEFT
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 1 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 2 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 3 ? '#6366f1' : '#1e293b', borderRadius: '2px' }}></div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>THE PAYLOAD</h1>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>The Spark ($1)</b><br/><small style={{color:'#94a3b8'}}>25 texts</small>
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '20px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>The Blast ($5)</b><br/><small style={{color:'#94a3b8'}}>100+ texts</small>
            </button>
            <button onClick={next} style={{ width: '100%', padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>NEXT</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => setTiming('anytime')} style={{ padding: '15px', border: timing === 'anytime' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '10px' }}>Standard (Free)</button>
              <button onClick={() => setTiming('window')} style={{ padding: '15px', border: timing === 'window' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '10px' }}>Window (+$1)</button>
              <button onClick={() => setTiming('exact')} style={{ padding: '15px', border: timing === 'exact' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '10px' }}>Exact (+$5)</button>
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={back} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white' }}>BACK</button>
              <button onClick={next} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white' }}>CONTINUE</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form action={"https://formspree.io/f/" + FORMSPREE_ID} method="POST">
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>LOGISTICS</h1>
            <input type="hidden" name="Tier" value={tier} />
            <input type="hidden" name="Timing" value={timing} />
            <input type="hidden" name="Price" value={total} />
            <input type="email" name="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            <input type="tel" name="phone" required placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />

            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
               <div style={{ fontSize: '40px', fontWeight: '900' }}>${total}</div>
               <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '10px' }}>DEPLOY</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
