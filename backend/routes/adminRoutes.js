const express = require('express');
const router = express.Router();
const { getStats, getAllBookings } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.get('/stats', auth, getStats);
router.get('/bookings', auth, getAllBookings);

module.exports = router;
