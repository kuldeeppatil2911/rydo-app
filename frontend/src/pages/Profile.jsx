import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    emergencyContact: {
      name: '',
      phone: '',
      email: ''
    },
    emergencyAlertsEnabled: false
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setProfile({
        ...profile,
        emergencyContact: { ...profile.emergencyContact, [field]: value }
      });
    } else {
      setProfile({ ...profile, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/profile', profile);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Profile & Safety Settings</h2>
      {message && <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Personal Info</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="glass-input" value={profile.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" className="glass-input" value={profile.phone || ''} onChange={handleChange} />
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Emergency Contact</h3>
        <div className="form-group">
          <label>Contact Name</label>
          <input type="text" name="emergencyContact.name" className="glass-input" value={profile.emergencyContact?.name || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" name="emergencyContact.email" className="glass-input" value={profile.emergencyContact?.email || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Phone</label>
          <input type="tel" name="emergencyContact.phone" className="glass-input" value={profile.emergencyContact?.phone || ''} onChange={handleChange} />
        </div>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <input type="checkbox" name="emergencyAlertsEnabled" id="alerts" checked={profile.emergencyAlertsEnabled} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
          <label htmlFor="alerts" style={{ margin: 0, cursor: 'pointer' }}>Enable Emergency Alerts on Ride Start</label>
        </div>

        <button type="submit" className="btn" style={{ marginTop: '1.5rem' }}>
          <Save size={20} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
