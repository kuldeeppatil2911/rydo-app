import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigation } from 'lucide-react';

const RideBooking = () => {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    rideType: 'Standard',
    paymentMode: 'Cash',
    tripMode: 'Now'
  });
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEstimate = async () => {
    if (!formData.pickup || !formData.dropoff) return;
    try {
      const res = await axios.post('/ride/estimate', formData);
      setEstimate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, ...estimate };
      const res = await axios.post('/ride/book', payload);
      navigate(`/track/${res.data.booking._id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Book a Ride</h2>
      
      <div className="glass" style={{ padding: '2rem' }}>
        <form onSubmit={handleBook}>
          <div className="form-group">
            <label>Pickup Location</label>
            <input type="text" name="pickup" className="glass-input" value={formData.pickup} onChange={handleChange} onBlur={handleEstimate} required />
          </div>
          <div className="form-group">
            <label>Drop-off Location</label>
            <input type="text" name="dropoff" className="glass-input" value={formData.dropoff} onChange={handleChange} onBlur={handleEstimate} required />
          </div>

          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label>Ride Type</label>
              <select name="rideType" className="glass-input" value={formData.rideType} onChange={handleChange} onBlur={handleEstimate}>
                <option value="Standard" style={{color: 'black'}}>Standard</option>
                <option value="Premium" style={{color: 'black'}}>Premium</option>
                <option value="Carpool" style={{color: 'black'}}>Carpool</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payment Mode</label>
              <select name="paymentMode" className="glass-input" value={formData.paymentMode} onChange={handleChange}>
                <option value="Cash" style={{color: 'black'}}>Cash</option>
                <option value="Card" style={{color: 'black'}}>Card</option>
                <option value="UPI" style={{color: 'black'}}>UPI</option>
              </select>
            </div>
          </div>

          {estimate && (
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', border: '1px solid var(--primary)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Estimate</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Distance: {estimate.distance}</span>
                <span>Time: {estimate.time}</span>
                <span style={{ fontWeight: 'bold' }}>Fare: {estimate.fare}</span>
              </div>
            </div>
          )}

          <button type="submit" className="btn" style={{ marginTop: '2rem' }} disabled={loading || !estimate}>
            <Navigation size={20} /> {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RideBooking;
