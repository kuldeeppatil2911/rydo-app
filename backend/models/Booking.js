const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  rideType: { type: String, required: true },
  paymentMode: { type: String, required: true },
  tripMode: { type: String, required: true },
  distance: { type: String },
  fare: { type: String },
  time: { type: String },
  otp: { type: String, required: true },
  status: { type: String, default: 'Searching', enum: ['Searching', 'Assigned', 'Arriving', 'In Progress', 'Completed', 'Cancelled'] },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
