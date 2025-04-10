// Import React's useState hook to manage form state
import { useState } from 'react';
// Import axios to make HTTP requests
import axios from 'axios';

// Define the LoginPage component
const LoginPage = () => {
  // Set up state for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This function is triggered when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page from reloading

    try {
      // Make a POST request to your backend's login route
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,       // Send the email from state
        password     // Send the password from state
      });

      // If login is successful, store the JWT token in the browser
      localStorage.setItem('token', res.data.token);

      // Show a success message
      alert('Login successful!');
    } catch (err) {
      // If login fails, show an error message
      alert('Login failed');
    }
  };

  // This is what the user will see in the browser
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}                    // Value comes from React state
        onChange={(e) => setEmail(e.target.value)} // Update state when user types
      />
      <br />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}                 // Value comes from React state
        onChange={(e) => setPassword(e.target.value)} // Update state on input
      />
      <br />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

// Export the component so App.js can use it
export default LoginPage;

