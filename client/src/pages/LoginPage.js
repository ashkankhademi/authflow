import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ Add this

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ⬅️ Initialize navigator

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      alert('✅ Login successful');
      navigate('/dashboard'); // ⬅️ Redirect to protected page
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      alert('❌ Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;

