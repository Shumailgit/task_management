import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? task.status === statusFilter : true)
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Task Report', 14, 15);
    doc.autoTable({
      head: [['Title', 'Assigned To', 'Status', 'Deadline']],
      body: filteredTasks.map(task => [
        task.title,
        task.assignedTo,
        task.status,
        new Date(task.deadline).toLocaleDateString()
      ]),
    });
    doc.save('task_report.pdf');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Download PDF
        </button>
      </div>

      <table className="w-full border table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.assignedTo}</td>
              <td className="border px-4 py-2">{new Date(task.deadline).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={`/edit/${task._id}`} className="text-blue-500">Edit</Link>
                <button onClick={() => deleteTask(task._id)} className="text-red-500">Delete</button>
                <Link to={`/view/${task._id}`} className="text-green-500">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
