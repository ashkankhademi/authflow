const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as necessary

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user in DB
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check password (add your hashing logic here)
  const isMatch = await user.matchPassword(password); // if you use bcrypt

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { userId: user._id },    // payload
    process.env.JWT_SECRET,  // secret key
    { expiresIn: '1h' }      // token expiration
  );

  // Send token to frontend
  res.json({ token });
});

