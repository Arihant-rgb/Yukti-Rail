import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import WorkerApp from './pages/WorkerApp';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import MaintenanceJobs from './pages/admin/MaintenanceJobs';
import PriorityEngine from './pages/admin/PriorityEngine';
import BlockPlanner from './pages/admin/BlockPlanner';
import Replanning from './pages/admin/Replanning';
import CrewManagement from './pages/admin/CrewManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/worker" element={<WorkerApp />} />
      <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/jobs" element={<AdminLayout><MaintenanceJobs /></AdminLayout>} />
      <Route path="/admin/priority" element={<AdminLayout><PriorityEngine /></AdminLayout>} />
      <Route path="/admin/planner" element={<AdminLayout><BlockPlanner /></AdminLayout>} />
      <Route path="/admin/replanning" element={<AdminLayout><Replanning /></AdminLayout>} />
      <Route path="/admin/crews" element={<AdminLayout><CrewManagement /></AdminLayout>} />
    </Routes>
  );
}

export default App;
