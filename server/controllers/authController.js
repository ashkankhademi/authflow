const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 🔐 Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // 7 days
  });
};

// ✅ Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Send back token + user info
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // 3. Return user info + token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get current user info (protected route)
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
