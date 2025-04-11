import React, { useState } from 'react';
import { Input, Button, Form, Alert } from 'antd';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      console.log('Register success:', res.data);
      alert('✅ Registration successful');
    } catch (err) {
      console.error('Register error:', err.response?.data?.message || err.message);
      setError('❌ Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Register</h2>
      {error && <Alert message={error} type="error" showIcon />}
      <Form onSubmit={handleRegister}>
        <Form.Item label="Name">
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
