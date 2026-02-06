import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  // ==========================================
  // 1. PASTE YOUR FORMSPREE LINK BETWEEN THE QUOTES:
  const FORMSPREE_URL = https://formspree.io/f/maqdywan;

  // 2. PASTE YOUR STRIPE PAYMENT LINK BETWEEN THE QUOTES:
  const STRIPE_LINK = https://buy.stripe.com/test_5kQ3cuazMbPEbC4dpqe7m00;
  // ==========================================

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedMessages, setSimulatedMessages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulatedMessages(prev => {
          const newMessage = `Happy Birthday! 🎈 #${Math.floor(Math.random() * 100)}`;
          const next = [newMessage, ...prev];
          return next.slice(0, 5);
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, subject: "New Founders Club Signup" })
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Waitlist error. Make sure your Formspree URL is correct!");
      }
    } catch (error) {
      alert("Connection error.");
    } finally {
      setIsSending(false);
    }
  };

  const containerStyle: React.CSSProperties = { 
    fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#fff', color: '#1a1a1a', padding: '20px', textAlign: 'center' 
  };

  return (
    <div style={containerStyle}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <div style={{ fontWeight: 900, color: '#4f46e5' }}>⚡ NOVANOTE</div>
        <div style={{ fontSize: '10px', background: '#eee', padding: '4px 10px', borderRadius: '10px' }}>FOUNDERS' PRE-SALE</div>
      </nav>

      <div style={{ marginTop: '60px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '10px' }}>
          THE $1 <span style={{ color: '#4f46e5' }}>FOUNDERS</span> SPOT.
        </h1>
        <p style={{ color: '#666', marginBottom: '30px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          Secure your spot in the private beta. Get your first birthday barrage for just $1.
        </p>
        
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '18px 40px', borderRadius: '40px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)' }}
        >
          Claim My Spot
        </button>
        
        <div style={{ background: '#111', width: '240px', height: '400px', margin: '50px auto', borderRadius: '30px', border: '8px solid #333', padding: '20px', overflow: 'hidden', position: 'relative' }}>
          {simulatedMessages.map((msg, i) => (
            <div key={i} style={{ background: '#4f46e5', color: 'white', padding: '8px', borderRadius: '10px', marginBottom: '10px', fontSize: '12px', textAlign: 'left' }}>
              {msg}
            </div>
          ))}
          {simulatedMessages.length === 0 && (
            <button 
              onMouseEnter={() => setIsSimulating(true)} 
              onMouseLeave={() => { setIsSimulating(false); setSimulatedMessages([]); }}
              style={{ marginTop: '150px', background: 'none', border: '1px solid #444', color: '#666', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
            >
              Hover for Demo
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '30px', maxWidth: '320px', width: '90%', textAlign: 'center' }}>
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit}>
                <h2 style={{ margin: '0 0 10px 0', fontWeight: 900 }}>Step 1: Email</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Where should we send your beta invite?</p>
                <input 
                  required
                  type="email" 
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '15px', border: '2px solid #eee', boxSizing: 'border-box', fontSize: '16px' }}
                />
                <button 
                  disabled={isSending}
                  type="submit" 
                  style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', opacity: isSending ? 0.7 : 1, fontSize: '16px' }}
                >
                  {isSending ? "Saving..." : "Next →"}
                </button>
                <button onClick={() => setShowModal(false)} type="button" style={{ background: 'none', border: 'none', color: '#999', marginTop: '15px', cursor: 'pointer' }}>Cancel</button>
              </form>
            ) : (
              <div>
                <h2 style={{ fontWeight: 900, margin: '0 0 10px 0' }}>Step 2: Payment</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>
                  Email saved! Now, pay your $1 to officially lock in your spot in the Founders' Club.
                </p>
                <a 
                  href={STRIPE_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'block', width: '100%', background: '#000', color: 'white', textDecoration: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginBottom: '15px' }}
                >
                  Pay $1 via Stripe
                </a>
                <p style={{ fontSize: '10px', color: '#999' }}>Clicking opens Stripe in a new secure tab.</p>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>I'll pay later</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

