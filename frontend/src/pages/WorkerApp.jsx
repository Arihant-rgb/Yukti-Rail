import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, AlertTriangle, LogOut } from 'lucide-react';

export default function WorkerApp() {
  const navigate = useNavigate();
  // Mock Data for the prototype
  const [jobs, setJobs] = useState([
    { id: 'JOB-992', type: 'Thermal Stress Detection', location: 'Section S04', time: '14:00 - 16:00', priority: 'Critical', status: 'Scheduled' },
    { id: 'JOB-841', type: 'Vibration Anomaly Check', location: 'Section S02', time: '09:00 - 10:30', priority: 'Medium', status: 'Completed' },
  ]);

  const markComplete = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'Completed' } : j));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-sans max-w-md mx-auto shadow-2xl border-x border-gray-800">
      {/* App Header */}
      <div className="bg-dark-card p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-bold text-lg text-white">Yukti Rail Crew</h2>
          <p className="text-xs text-neon-blue">Team Alpha — Bengaluru Division</p>
        </div>
        <button onClick={() => navigate('/login')} className="p-2 text-gray-400 hover:text-white">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Today's Assignments</h3>
        
        {jobs.map(job => (
          <div key={job.id} className={`p-4 rounded-xl border ${job.status === 'Completed' ? 'bg-[#0a1a15] border-green-900/50' : 'bg-dark-card border-gray-700'}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">{job.id}</span>
              {job.priority === 'Critical' && job.status !== 'Completed' && (
                <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> Critical
                </span>
              )}
            </div>
            
            <h4 className={`font-bold mb-1 ${job.status === 'Completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
              {job.type}
            </h4>
            
            <div className="space-y-1.5 text-sm text-gray-400 mb-4">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-neon-blue" /> {job.location}</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-neon-blue" /> {job.time}</p>
            </div>

            {job.status === 'Completed' ? (
              <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium border border-green-500/20">
                <CheckCircle className="w-4 h-4" /> Completed
              </div>
            ) : (
              <button 
                onClick={() => markComplete(job.id)}
                className="w-full py-2.5 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded-lg text-sm font-bold transition-all shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
