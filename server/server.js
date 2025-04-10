// Load environment variables (MONGO_URI, JWT_SECRET, PORT, etc.)
const dotenv = require('dotenv');
dotenv.config();

// Import core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route handlers
const authRoutes = require('./routes/authRoutes');

// Create the Express app
const app = express();

// Global Middleware
app.use(cors());               // Enable Cross-Origin requests
app.use(express.json());       // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes); // All auth routes prefixed with /api/auth

// Root route (optional — helps test if backend is up)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and launch server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

