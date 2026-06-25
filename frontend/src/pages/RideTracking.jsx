import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ShieldCheck, CheckCircle, Car } from 'lucide-react';

const RideTracking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // For simulation purposes, setting a fixed coordinate for the map
  const position = [19.0760, 72.8777]; // Mumbai coordinates as default

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(`/ride/${id}`);
        setBooking(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRide();
    
    // Polling to simulate status updates
    const interval = setInterval(fetchRide, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center' }}>Loading ride details...</div>;
  if (!booking) return <div style={{ textAlign: 'center' }}>Ride not found.</div>;

  return (
    <div className="grid-2">
      {/* Tracking Details */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Ride Status: {booking.status}</h2>
        
        <div className="glass" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Car /> Driver Details
          </h3>
          {booking.driver ? (
            <>
              <p><strong>Name:</strong> {booking.driver.name}</p>
              <p><strong>Vehicle:</strong> {booking.driver.vehicle}</p>
              <p><strong>Plate:</strong> {booking.driver.plate}</p>
              <p><strong>Rating:</strong> ⭐ {booking.driver.rating}</p>
            </>
          ) : (
            <p>Assigning driver...</p>
          )}
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck color="var(--secondary)" /> Safety Information
          </h3>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--secondary)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}><strong>OTP to share with driver:</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--secondary)' }}>{booking.otp}</span></p>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            If emergency alerts are enabled, your emergency contact has been notified with these details.
          </p>
        </div>
      </div>

      {/* Map Simulation */}
      <div className="glass" style={{ overflow: 'hidden', height: '500px' }}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Driver's approximate location.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default RideTracking;
