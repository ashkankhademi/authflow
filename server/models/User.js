const mongoose = require('mongoose');

// Define the schema for a User document
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
