import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Payload passed from RideBooking
  const payload = location.state?.payload;

  if (!payload) return <div>Invalid Checkout Session</div>;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const res = await axios.post('/ride/book', payload);
        setSuccess(true);
        setTimeout(() => {
          navigate(`/track/${res.data.booking._id}`);
        }, 1500);
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert('Payment failed, please try again.');
      }
    }, 2000);
  };

  if (success) {
    return (
      <div className="auth-container" style={{ textAlign: 'center' }}>
        <div className="auth-card glass">
          <CheckCircle size={64} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ color: 'var(--secondary)' }}>Payment Successful!</h2>
          <p>Redirecting to tracking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass" style={{ maxWidth: '500px' }}>
        <h2>Complete Payment</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          Amount to pay: <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>{payload.fare}</span>
        </p>
        
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input type="text" className="glass-input" required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" className="glass-input" required placeholder="XXXX XXXX XXXX XXXX" maxLength="19" />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" className="glass-input" required placeholder="MM/YY" maxLength="5" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="password" className="glass-input" required placeholder="123" maxLength="3" />
            </div>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem' }} disabled={loading}>
            <CreditCard size={20} /> {loading ? 'Processing...' : `Pay ${payload.fare}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
