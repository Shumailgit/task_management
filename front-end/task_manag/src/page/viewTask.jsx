import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`/api/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
    </div>
  );
}