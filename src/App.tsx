import React, { useState } from 'react';

export default function App() {
  // --- CONFIGURATION ---
  // Replace the ID below. Ensure the quotes are STRAIGHT " and not CURVED ”
  const FORMSPREE_ID: string = "https://formspree.io/f/maqdywan";
  const spotsLeft: number = 12;

  // --- STATE ---
  const [step, setStep] = useState<number>(1);
  const [tier, setTier] = useState<string>('spark');
  const [timing, setTiming] = useState<string>('anytime');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [time, setTime] = useState<string>('');

  // --- PRICING FUNCTION (Safer for TypeScript than a lookup table) ---
  const calculateTotal = (): number => {
    let total = 0;
    // Base Tier
    if (tier === 'blast') { total += 5; } else { total += 1; }
    // Timing Add-on
    if (timing === 'window') { total += 1; }
    else if (timing === 'exact') { total += 5; }
    return total;
  };

  const totalPrice = calculateTotal();

  // --- NAVIGATION ---
  const next = () => { setStep(s => s + 1); window.scrollTo(0, 0); };
  const back = () => { setStep(s => s - 1); window.scrollTo(0, 0); };

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

        {/* Step 1: Payload */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>THE PAYLOAD</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <button type="button" onClick={() => setTier('spark')} style={{ textAlign: 'left', padding: '24px', borderRadius: '16px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>
                <div style={{ fontWeight: 'bold' }}>The Spark ($1)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>25 celebration texts.</div>
              </button>
              <button type="button" onClick={() => setTier('blast')} style={{ textAlign: 'left', padding: '24px', borderRadius: '16px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>
                <div style={{ fontWeight: 'bold' }}>The Blast ($5)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>100+ texts + emojis.</div>
              </button>
            </div>
            <button onClick={next} style={{ width: '100%', padding: '20px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', marginTop: '24px', border: 'none', fontWeight: 'bold' }}>SET TIMING</button>
          </div>
        )}

        {/* Step 2: Timing */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={() => setTiming('anytime')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'anytime' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Standard (Free)</button>
              <button type="button" onClick={() => setTiming('window')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'window' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Window (+$1)</button>
              <button type="button" onClick={() => setTiming('exact')} style={{ padding: '20px', borderRadius: '12px', border: timing === 'exact' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Exact (+$5)</button>
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '16px', marginTop: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '8px' }} />
            )}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" onClick={back} style={{ flex: 1, padding: '16px', backgroundColor: '#1e293b', color: 'white', borderRadius: '12px', border: 'none' }}>BACK</button>
              <button type="button" onClick={next} style={{ flex: 2, padding: '16px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', border: 'none' }}>LOGISTICS</button>
            </div>
          </div>
        )}

        {/* Step 3: Logistics */}
        {step === 3 && (
          <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST">
            <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px' }}>LOGISTICS</h1>
            <input type="hidden" name="Tier" value={tier} />
            <input type="hidden" name="Timing" value={timing} />
            <input type="hidden" name="Price" value={totalPrice} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <input type="email" name="email" required placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '12px' }} />
              <input type="tel" name="phone" required placeholder="Target Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '12px' }} />
            </div>
            <div style={{ backgroundColor: '#4f46e5', padding: '32px', borderRadius: '24px', marginTop: '32px', textAlign: 'center' }}>
               <div style={{ fontSize: '56px', fontWeight: '900' }}>${totalPrice}</div>
               <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: 'white', color: '#4f46e5', borderRadius: '12px', border: 'none', fontWeight: '900', marginTop: '16px' }}>DEPLOY</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
