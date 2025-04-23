const jwt = require('jsonwebtoken'); // Ensure you are importing this correctly
const bcrypt = require('bcryptjs'); // For hashing the password
const User = require('../models/User'); // User model

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Verify user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT if credentials are correct
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,  // Ensure this secret is set in your .env
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token });  // Send token to the client

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { loginUser };
