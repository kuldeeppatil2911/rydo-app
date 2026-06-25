const express = require('express');
const router = express.Router();
const { estimateFare, bookRide, getRideStatus } = require('../controllers/rideController');
const auth = require('../middleware/authMiddleware');

router.post('/estimate', auth, estimateFare);
router.post('/book', auth, bookRide);
router.get('/:id', auth, getRideStatus);

module.exports = router;
