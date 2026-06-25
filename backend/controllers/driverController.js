const Booking = require('../models/Booking');
const Driver = require('../models/Driver');

exports.getPendingRides = async (req, res) => {
  try {
    const rides = await Booking.find({ status: 'Searching' }).populate('user', 'name phone').sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.acceptRide = async (req, res) => {
  try {
    const { bookingId } = req.body;
    let booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Ride not found' });
    if (booking.status !== 'Searching') return res.status(400).json({ message: 'Ride no longer available' });

    // Ensure there is at least one driver to assign in this mock demo
    let driver = await Driver.findOne();
    if (!driver) {
      driver = new Driver({ name: 'Demo Driver', vehicle: 'Tesla Model 3', plate: 'EV-01-XX-9999' });
      await driver.save();
    }

    booking.status = 'Assigned';
    booking.driver = driver._id;
    await booking.save();

    res.json({ message: 'Ride accepted successfully', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
