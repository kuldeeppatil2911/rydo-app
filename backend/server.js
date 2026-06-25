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

const { MongoMemoryServer } = require('mongodb-memory-server');

// Database connection
const connectDB = async () => {
  try {
    let dbUri = process.env.MONGODB_URI;
    
    if (!dbUri) {
      console.log("No MONGODB_URI found in .env. Starting up in-memory MongoDB for testing...");
      const mongoServer = await MongoMemoryServer.create();
      dbUri = mongoServer.getUri();
    }

    await mongoose.connect(dbUri);
    console.log(`MongoDB connected successfully at ${dbUri}`);
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
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/driver', require('./routes/driverRoutes'));

app.get('/', (req, res) => {
  res.send('Rydo Backend API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
