import React, { useState } from 'react';

export default function App() {
  // --- 1. CONFIGURATION ---
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan";
  
  // Create these 5 links in Stripe and paste them here:
  const STRIPE_LINKS = {
    1: "https://buy.stripe.com/5kQ7sL5LQbJIbc09nxfQI02",
    2: "https://buy.stripe.com/00w9ATb6a4hg2FugPZfQI03",
    5: "https://buy.stripe.com/4gM4gzb6a298eoc57hfQI04",
    6: "https://buy.stripe.com/8x2eVd5LQcNM5RGfLVfQI05",
    10: "https://buy.stripe.com/14A00jfmqdRQgwkgPZfQI06"
  };

  const spotsLeft = 12;

  // --- 2. STATE ---
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // --- 3. PRICING LOGIC ---
  const calculateTotal = () => {
    let base = tier === 'blast' ? 5 : 1;
    let extra = 0;
    if (timing === 'window') extra = 1;
    if (timing === 'exact') extra = 5;
    return base + extra;
  };
  const total = calculateTotal();

  // --- 4. SUBMISSION ---
  const deploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send data to Formspree first so you have the order info
      await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, phone, tier, timing, time, 
          total: "$" + total,
          payment_status: "REDIRECTED_TO_STRIPE" 
        })
      });

      // Redirect based on the calculated total
      setRedirecting(true);
      const targetLink = STRIPE_LINKS[total];
      
      setTimeout(() => {
        window.location.href = targetLink;
      }, 1200);

    } catch (err) {
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (redirecting) return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔒</div>
      <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>SECURE CHECKOUT</h1>
      <p style={{ color: '#94a3b8' }}>Forwarding to Stripe for your ${total} payment...</p>
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
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>THE PAYLOAD</h1>
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
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>LOGISTICS</button>
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
                 {loading ? "TRANSMITTING..." : "PAY & DEPLOY"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
        }
