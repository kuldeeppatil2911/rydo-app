import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navigation, MapPin } from 'lucide-react';

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRides = async () => {
    try {
      const res = await axios.get('/driver/pending');
      const newRides = res.data;
      
      // Check for new rides to trigger notification
      if (newRides.length > rides.length && rides.length !== 0) {
        if (Notification.permission === 'granted') {
          new Notification('New Ride Request', {
            body: `A new ride request is available!`,
            icon: '/vite.svg'
          });
        }
      }

      setRides(newRides);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    fetchRides();
    const interval = setInterval(fetchRides, 5000); // Poll for new rides
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      await axios.post('/driver/accept', { bookingId });
      alert('Ride Accepted!');
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept ride');
    }
  };

  if (loading) return <div>Searching for rides...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Driver Dashboard - Available Rides</h2>
      
      {rides.length === 0 ? (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No rides available right now. Waiting for requests...</p>
        </div>
      ) : (
        rides.map(ride => (
          <div key={ride._id} className="glass" style={{ padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{ride.user?.name}</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <MapPin size={16} /> Pickup: {ride.pickup}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Navigation size={16} /> Dropoff: {ride.dropoff}
              </p>
              <p style={{ color: 'var(--secondary)' }}>Fare: {ride.fare} • Distance: {ride.distance}</p>
            </div>
            <button onClick={() => handleAccept(ride._id)} className="btn" style={{ width: 'auto', padding: '12px 32px' }}>
              Accept Ride
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DriverDashboard;
