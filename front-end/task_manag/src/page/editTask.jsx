import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', assignedTo: '', status: 'Pending' });

  useEffect(() => {
    axios.get(`/api/tasks/${id}`).then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/tasks/${id}`, formData);
    navigate('/tasks');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} className="border w-full p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="date" name="deadline" value={formData.deadline?.slice(0, 10)} onChange={handleChange} className="border w-full p-2 rounded" />
        <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="border w-full p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="border w-full p-2 rounded">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Task</button>
      </form>
    </div>
  );
}

