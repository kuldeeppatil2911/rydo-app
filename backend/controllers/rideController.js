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

    // Mock driver assignment
    let driver = await Driver.findOne({ status: 'Available' });
    if (!driver) {
      // Create a mock driver if none exists
      driver = new Driver({
        name: 'John Doe',
        vehicle: 'Toyota Prius',
        plate: 'MH-01-AB-1234'
      });
      await driver.save();
    }

    driver.status = 'Busy';
    await driver.save();

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
      driver: driver._id,
      status: 'Assigned' // Skipping 'Searching' for instant demo
    });

    await booking.save();

    // Trigger Emergency Alert if enabled
    const user = await User.findById(req.user.id);
    await notificationService.sendEmergencyAlert(user, booking);

    res.status(201).json({ booking, driver });
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

    // Mocking progress if it's assigned
    if (booking.status === 'Assigned') {
      booking.status = 'Arriving';
      await booking.save();
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
