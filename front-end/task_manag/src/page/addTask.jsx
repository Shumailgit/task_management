import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const [formData, setFormData] = useState({
    title: '', description: '', deadline: '', assignedTo: '', status: 'Pending'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/tasks', formData);
    navigate('/tasks');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} required placeholder="Title" className="border w-full p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border w-full p-2 rounded" />
        <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required className="border w-full p-2 rounded" />
        <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} required placeholder="Assigned To" className="border w-full p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="border w-full p-2 rounded">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
      </form>
    </div>
  );
}
