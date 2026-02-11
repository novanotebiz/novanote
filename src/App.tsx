import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  // ==========================================
  // 1. YOUR FORMSPREE LINK (Inside the quotes)
  const FORMSPREE_URL = "https://formspree.io/f/maqdywan";

  // 2. YOUR STRIPE LINK (Inside the quotes)
  const STRIPE_LINK = "https://buy.stripe.com/00w5kDeim1543Jy8jtfQI01";
  // ==========================================

  // --- STATE ---
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [simMessages, setSimMessages] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Check for the success redirect from Stripe
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('status') === 'success') {
        setIsSuccess(true);
      }
    }
  }, []);

  // Handle the text "explosion" simulation
  useEffect(() => {
    let interval: any;
    if (isSimulating || isSuccess) {
      interval = setInterval(() => {
        setSimMessages(prev => {
          const id = Math.floor(Math.random() * 900) + 100;
          const msg = isSuccess ? `Founder #${id} Verified ✅` : `Happy Birthday! 🎈 #${id}`;
          return [msg, ...prev].slice(0, 5);
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isSimulating, isSuccess]);

  // Submit email to Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_URL || FORMSPREE_URL.includes("PASTE")) {
      alert("Please add your Formspree URL at the top of the code!");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: "Founder_Lead" })
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  // Redirect to Stripe
  const handlePay = () => {
    if (!STRIPE_LINK || STRIPE_LINK.includes("PASTE")) {
      alert("Please add your Stripe Link at the top of the code!");
      return;
    }
    window.location.href = STRIPE_LINK;
  };

  // --- STYLES ---
  const pageStyle: React.CSSProperties = {
    fontFamily: '-apple-system, system-ui, sans-serif',
    minHeight: '100vh',
    backgroundColor: isSuccess ? '#4f46e5' : '#fff',
    color: isSuccess ? '#fff' : '#111',
    margin: 0,
    padding: '20px',
    textAlign: 'center'
  };

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div style={pageStyle}>
        <div style={{ marginTop: '100px' }}>
          <div style={{ fontSize: '60px' }}>⚡️</div>
          <h1 style={{ fontSize: '40px', fontWeight: 900 }}>YOU'RE A FOUNDER</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Check your email. We will contact you soon.</p>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px', margin: '20px auto', maxWidth: '300px', textAlign: 'left' }}>
            {simMessages.map((m, i) => <div key={i} style={{ fontSize: '12px', marginBottom: '5px' }}>{m}</div>)}
          </div>
          <button onClick={() => window.location.href = window.location.origin} style={{ padding: '15px 30px', borderRadius: '30px', border: 'none', background: '#fff', color: '#4f46e5', fontWeight: 'bold', cursor: 'pointer' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div style={pageStyle}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <div style={{ fontWeight: 900, color: '#4f46e5' }}>⚡ NOVANOTE</div>
        <div style={{ fontSize: '10px', background: '#fee2e2', color: '#b91c1c', padding: '5px 10px', borderRadius: '20px', fontWeight: 'bold' }}>84 SPOTS LEFT</div>
      </nav>

      <div style={{ marginTop: '60px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '10px' }}>THE $1 <span style={{ color: '#4f46e5' }}>FOUNDER</span> SPOT.</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Send 100 texts at once. Secure your beta spot.</p>
        
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '18px 40px', borderRadius: '40px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
        >
          Join the Beta
        </button>

        {/* Demo Phone */}
        <div style={{ background: '#000', width: '240px', height: '400px', margin: '50px auto', borderRadius: '35px', border: '8px solid #222', padding: '20px', overflow: 'hidden' }}>
          {simMessages.map((m, i) => (
            <div key={i} style={{ background: '#4f46e5', color: 'white', padding: '8px', borderRadius: '10px', marginBottom: '10px', fontSize: '11px', textAlign: 'left' }}>{m}</div>
          ))}
          {simMessages.length === 0 && (
            <div 
              onMouseEnter={() => setIsSimulating(true)} 
              onMouseLeave={() => { setIsSimulating(false); setSimMessages([]); }}
              style={{ marginTop: '150px', color: '#444', fontSize: '12px', cursor: 'pointer' }}
            >
              [ Hover to Test ]
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '25px', maxWidth: '320px', width: '90%' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontWeight: 900, marginBottom: '10px' }}>Step 1: Email</h2>
                <input required type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '15px', border: '2px solid #eee', boxSizing: 'border-box' }} />
                <button type="submit" disabled={isSending} style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>{isSending ? 'Saving...' : 'Next →'}</button>
              </form>
            ) : (
              <div>
                <h2 style={{ fontWeight: 900, marginBottom: '10px' }}>Step 2: Payment</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>Email saved! Pay $1 to lock in your spot.</p>
                <button onClick={handlePay} style={{ width: '100%', background: '#000', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Pay $1 via Stripe</button>
              </div>
            )}
            <button onClick={() => setShowModal(false)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

