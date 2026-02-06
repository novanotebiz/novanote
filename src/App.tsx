import React, { useState, useEffect } from 'react';

// This is the "Ultra-Safe" version designed to pass strict TypeScript checks
const App: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  // We tell the computer these are "strings" (text) to fix the 'never' error
  const [simulatedMessages, setSimulatedMessages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulatedMessages(prev => {
          const newMessage = `Happy Birthday! 🎈 #${Math.floor(Math.random() * 100)}`;
          // This keeps the last 5 messages
          const next = [newMessage, ...prev];
          return next.slice(0, 5);
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  // We type the 'e' as a Form Event to stop the 'any' error
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Simple styles defined as a constant
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', maxWidth: '300px', width: '90%' }}>
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit}>
                <h2 style={{ margin: '0 0 10px 0' }}>Join the List</h2>
                <input 
                  required
                  type="email" 
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <button type="submit" style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold' }}>Claim My $1 Spot</button>
                <button onClick={() => setShowModal(false)} type="button" style={{ background: 'none', border: 'none', color: '#999', marginTop: '10px', cursor: 'pointer' }}>Close</button>
              </form>
            ) : (
              <div>
                <h2>✅ You're In!</h2>
                <p>We'll email you soon.</p>
                <button onClick={() => setShowModal(false)} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Awesome</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

