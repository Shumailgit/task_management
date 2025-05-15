import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({ total: 0, pending: 0, completed: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => window.location.href = '/login');

    // You can update this to call a real /tasks/summary route later
    setSummary({ total: 10, pending: 4, completed: 6 });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total Tasks: {summary.total}</div>
        <div className="bg-yellow-100 p-4 rounded">Pending: {summary.pending}</div>
        <div className="bg-green-100 p-4 rounded">Completed: {summary.completed}</div>
      </div>
      <button
        onClick={() => window.location.href = '/tasks'}
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Manage Tasks
      </button>
    </div>
  );
};

export default Dashboard;
