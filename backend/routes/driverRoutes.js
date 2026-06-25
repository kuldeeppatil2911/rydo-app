const express = require('express');
const router = express.Router();
const { getPendingRides, acceptRide } = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');

router.get('/pending', auth, getPendingRides);
router.post('/accept', auth, acceptRide);

module.exports = router;
