import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    window.open('/auth/logout', '_self');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">Logout</button>
    </div>
  );
}