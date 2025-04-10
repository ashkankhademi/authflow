import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('Login success:', res.data);
      alert('✅ Login successful');
      // Optionally store the token
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      alert('❌ Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
