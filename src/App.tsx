import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  // --- LEVEL 1 STORAGE SETUP ---
  // Step: Paste your Formspree URL between the quotes on the line below!
  const FORMSPREE_URL = "PASTE_YOUR_FORMSPREE_URL_HERE";

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
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Server error. Please check your Formspree URL!");
      }
    } catch (error) {
      alert("Connection error. Check your internet!");
    } finally {
      setIsSending(false);
    }
  };

  const containerStyle: React.CSSProperties = { 
    fontFamily: 'sans-serif', 
    minHeight: '100vh', 
    backgroundColor: '#fff', 
    color: '#1a1a1a', 
    padding: '20px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <div style={{ fontWeight: 900, color: '#4f46e5' }}>⚡ NOVANOTE</div>
        <div style={{ fontSize: '10px', background: '#eee', padding: '4px 10px', borderRadius: '10px' }}>WAITLIST ACTIVE</div>
      </nav>

      <div style={{ marginTop: '60px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '10px' }}>
          THE PHONE <span style={{ color: '#4f46e5' }}>EXPLOSION</span> IS COMING.
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Send 250 celebratory texts in 5 minutes.</p>
        
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Join Waitlist
        </button>
        
        <button 
          onMouseEnter={() => setIsSimulating(true)}
          onMouseLeave={() => { setIsSimulating(false); setSimulatedMessages([]); }}
          style={{ background: 'white', border: '1px solid #ddd', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', marginLeft: '10px', cursor: 'pointer' }}
        >
          See Simulation
        </button>

        <div style={{ 
          background: '#111', 
          width: '240px', 
          height: '450px', 
          margin: '50px auto', 
          borderRadius: '30px', 
          border: '8px solid #333',
          padding: '20px',
          overflow: 'hidden'
        }}>
          {simulatedMessages.map((msg, i) => (
            <div key={i} style={{ background: '#4f46e5', color: 'white', padding: '8px', borderRadius: '10px', marginBottom: '10px', fontSize: '12px', textAlign: 'left' }}>
              {msg}
            </div>
          ))}
          {simulatedMessages.length === 0 && <div style={{ color: '#444', marginTop: '150px', fontSize: '11px' }}>Hover "See Simulation"</div>}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', maxWidth: '300px', width: '90%' }}>
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit}>
                <h2 style={{ margin: '0 0 10px 0', fontWeight: 900 }}>Join the List</h2>
                <p style={{ color: '#666', fontSize: '12px', marginBottom: '15px' }}>Get your first barrage for $1.</p>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <button 
                  disabled={isSending}
                  type="submit" 
                  style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', opacity: isSending ? 0.7 : 1 }}
                >
                  {isSending ? "Sending..." : "Claim My $1 Spot"}
                </button>
                <button onClick={() => setShowModal(false)} type="button" style={{ background: 'none', border: 'none', color: '#999', marginTop: '15px', cursor: 'pointer' }}>Close</button>
              </form>
            ) : (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
                <h2 style={{ fontWeight: 900 }}>You're In!</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>We'll email you soon.</p>
                <button onClick={() => setShowModal(false)} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '10px', fontWeight: 'bold' }}>Awesome</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

