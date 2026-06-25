import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Map, ShieldAlert, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Welcome, {user?.name}</h1>
      
      <div className="grid-2">
        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <Map size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3>Book a Ride</h3>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Need to go somewhere? Book a ride now.</p>
          <Link to="/book" className="btn" style={{ textDecoration: 'none' }}>Start Booking</Link>
        </div>

        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <ShieldAlert size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
          <h3>Safety First</h3>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Manage your emergency contacts and safety alerts.</p>
          <Link to="/profile" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Manage Safety</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
