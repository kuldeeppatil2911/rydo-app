const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is not defined in .env. Running without MongoDB connection for now.");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes (to be added)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ride', require('./routes/rideRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

app.get('/', (req, res) => {
  res.send('Rydo Backend API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
