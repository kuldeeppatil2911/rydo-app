const Booking = require('../models/Booking');
const User = require('../models/User');
const Driver = require('../models/Driver');
const notificationService = require('../services/notificationService');

exports.estimateFare = (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  // Mock fare calculation
  const baseFare = rideType === 'Premium' ? 100 : 50;
  const distance = Math.floor(Math.random() * 15) + 5; // 5 to 20 km
  const time = distance * 2; // approx 2 mins per km
  const fare = baseFare + (distance * 10);

  res.json({
    distance: `${distance} km`,
    time: `${time} mins`,
    fare: `₹${fare}`
  });
};

exports.bookRide = async (req, res) => {
  try {
    const { pickup, dropoff, rideType, paymentMode, tripMode, distance, fare, time } = req.body;
    
    // Generate a random 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const booking = new Booking({
      user: req.user.id,
      pickup,
      dropoff,
      rideType,
      paymentMode,
      tripMode,
      distance,
      fare,
      time,
      otp,
      status: 'Searching' 
    });

    await booking.save();

    // Trigger Emergency Alert if enabled
    const user = await User.findById(req.user.id);
    await notificationService.sendEmergencyAlert(user, booking);

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getRideStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('driver');
    if (!booking) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
