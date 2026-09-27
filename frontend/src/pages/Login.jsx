import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/worker');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="bg-dark-card w-full max-w-md p-8 rounded-2xl border border-gray-800 shadow-2xl glow-blue">
        <div className="flex items-center justify-center mb-8 gap-3 text-neon-blue">
          <Activity className="w-10 h-10" />
          <h1 className="text-3xl font-bold tracking-wider glow-text">Yukti Rail</h1>
        </div>
        
        <p className="text-gray-400 text-center mb-8 text-sm">
          AI-Powered Automatic Block Planning & Corridor Optimization
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Select Access Role</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0f111a] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all appearance-none"
              >
                <option value="admin">Admin / Dispatcher</option>
                <option value="worker">Field Crew / Technician</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neon-blue text-black font-bold text-lg py-3 rounded-lg hover:bg-[#00d0ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300"
          >
            Access System
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-600">Open Innovation Phase 1 Prototype</p>
        </div>
      </div>
    </div>
  );
}
