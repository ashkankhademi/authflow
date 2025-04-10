const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  let token;

  // Check for Authorization header with Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request (without password)
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to the next middleware/route
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = auth;
