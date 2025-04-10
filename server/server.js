// Load environment variables from .env (like MONGO_URI, PORT, JWT_SECRET)
const dotenv = require('dotenv');
dotenv.config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your auth routes (no parentheses — it's a router object, not a function)
const authRoutes = require('./routes/authRoutes');

// Create the express app
const app = express();

// Middleware
app.use(cors());              // Allow requests from frontend (React)
app.use(express.json());      // Parse JSON bodies from incoming requests

// Route setup — handle /api/auth/login and /register
app.use('/api/auth', authRoutes); // ✅ Don't add () here

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
