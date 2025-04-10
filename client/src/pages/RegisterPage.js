import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      alert('✅ Registration successful! Redirecting to login...');
      window.location.href = '/login';
    } catch (err) {
      console.error('Register error:', err.response?.data?.message || err.message);
      alert('❌ Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <label>Name: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} /><br />
      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
