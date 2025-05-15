import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './page/taskList';
import AddTask from './page/addTask';
import EditTask from './page/editTask';
import ViewTask from './page/viewTask';
import Profile from './page/profile';
import NotFound from './page/page';

function App() {
  const user = { name: 'Admin', email: 'shumailcr7@gmail.com' }; // Replace with actual user session check

  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/view/:id" element={<ViewTask />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


