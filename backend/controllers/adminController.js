const Booking = require('../models/Booking');
const User = require('../models/User');
const Driver = require('../models/Driver');

exports.getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const activeRides = await Booking.countDocuments({ status: { $in: ['Assigned', 'Arriving', 'In Progress'] } });
    
    // Mock daily revenue for chart
    const revenueData = [
      { name: 'Mon', revenue: 400 },
      { name: 'Tue', revenue: 300 },
      { name: 'Wed', revenue: 550 },
      { name: 'Thu', revenue: 700 },
      { name: 'Fri', revenue: 600 },
      { name: 'Sat', revenue: 900 },
      { name: 'Sun', revenue: 850 },
    ];

    res.json({
      totalBookings,
      totalUsers,
      totalDrivers,
      activeRides,
      revenueData
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('driver', 'name').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
