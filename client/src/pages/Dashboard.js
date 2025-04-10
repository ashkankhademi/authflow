import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      setError(err.response?.data?.message || 'Failed to fetch user info.');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (error) {
    return (
      <div>
        <h2>Dashboard</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={handleLogout}>Back to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, <strong>{user.name}</strong>! 🎉</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;



