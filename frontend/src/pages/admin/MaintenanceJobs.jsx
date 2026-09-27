import { useState, useMemo } from 'react';
import { Plus, Trash2, Filter, Search, Sparkles, AlertCircle } from 'lucide-react';
import { mockJobs, mockSections } from '../../data/mock/data';

const deptColor = {
  TMS: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  SMMS: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  TDMS: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
};

const priorityColor = {
  Critical: 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse',
  High: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  Medium: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  Low: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};

const statusColor = {
  Pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Scheduled: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
};

const emptyJob = { id: '', dept: 'TMS', section: 'S05', defect: '', duration: 2, priority: 'Critical', status: 'Pending', severity: 5, score: 92 };

export default function MaintenanceJobs() {
  const [jobs, setJobs] = useState(mockJobs);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyJob);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const matchP = priorityFilter === 'All' || j.priority === priorityFilter;
      const matchD = deptFilter === 'All' || j.dept === deptFilter;
      const matchS = search === '' ||
        j.id.toLowerCase().includes(search.toLowerCase()) ||
        j.defect.toLowerCase().includes(search.toLowerCase()) ||
        j.section.toLowerCase().includes(search.toLowerCase());
      return matchP && matchD && matchS;
    });
  }, [jobs, priorityFilter, deptFilter, search]);

  const addJob = () => {
    if (!form.id || !form.defect) return;
    const score = Math.round({ Critical: 90, High: 70, Medium: 50, Low: 30 }[form.priority] * (form.severity / 5));
    setJobs([{ ...form, score }, ...jobs]);
    setShowModal(false);
    setForm(emptyJob);
  };

  const prefillDemo = () => {
    setForm({
      id: `TMS_${Math.floor(100 + Math.random() * 900)}`,
      dept: 'TMS',
      section: 'S05',
      defect: 'Critical Rail Fracture on SBC–BNC Line',
      duration: 2,
      priority: 'Critical',
      status: 'Pending',
      severity: 5,
      score: 94
    });
  };

  const deleteJob = (id) => {
    if (window.confirm(`Are you sure you want to delete job ${id}?`)) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>Unified Maintenance Jobs</span>
            <span className="text-xs px-2.5 py-1 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20 font-mono">
              3 DEPARTMENTS SYNCED
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Consolidated maintenance log from Track (TMS), Signalling (SMMS), and Traction (TDMS)
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neon-blue text-black font-bold text-sm rounded-lg hover:bg-[#00d0ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Maintenance Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-dark-card p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {['All', 'TMS', 'SMMS', 'TDMS'].map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deptFilter === d ? 'bg-neon-blue text-black font-bold' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {d === 'TMS' ? 'Track (TMS)' : d === 'SMMS' ? 'Signals (SMMS)' : d === 'TDMS' ? 'OHE (TDMS)' : 'All Departments'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-semibold">Priority:</span>
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  priorityFilter === p ? 'bg-purple-600 text-white font-bold' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search job / defect..."
              className="bg-[#0b0f19] border border-gray-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue w-44"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-dark-card rounded-xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left bg-gray-900/60">
                {['Job ID', 'Department', 'Corridor Section', 'Defect Description', 'Severity', 'AI Priority', 'Status', 'Duration', 'Block Allotment', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider ${i === 9 ? 'text-right' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-500 text-xs">
                    No maintenance jobs match your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(job => (
                  <tr key={job.id} className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs text-neon-blue font-bold">{job.id}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${deptColor[job.dept] || 'bg-gray-500/20 text-gray-400'}`}>
                        {job.dept}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-200 font-medium">
                      <span className="font-mono text-xs">{job.section}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-200 font-medium max-w-[220px] truncate" title={job.defect}>
                      {job.defect}
                    </td>
                    <td className="px-4 py-3.5 text-gray-300 font-semibold">{job.severity}/5</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${priorityColor[job.priority] || ''}`}>
                        {job.priority} ({job.score})
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColor[job.status] || 'bg-gray-500/20 text-gray-400'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 font-mono text-xs">{job.duration} hr</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400">
                      {job.block ? <span className="text-amber-400 font-bold">{job.block}</span> : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-card w-full max-w-lg rounded-2xl border border-gray-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Log Maintenance Request</h3>
                <p className="text-xs text-gray-500">Inputs will be scored by AI Priority Engine</p>
              </div>
              <button
                type="button"
                onClick={prefillDemo}
                className="flex items-center gap-1.5 text-xs text-neon-blue bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/30 px-3 py-1.5 rounded-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> Quick Demo Prefill
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Job Identifier</label>
                <input
                  value={form.id}
                  onChange={e => setForm({ ...form, [ 'id' ]: e.target.value })}
                  placeholder="e.g. TMS099"
                  className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Defect Description</label>
                <input
                  value={form.defect}
                  onChange={e => setForm({ ...form, [ 'defect' ]: e.target.value })}
                  placeholder="e.g. Critical Rail Fracture / Weld Joint Failure"
                  className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Department</label>
                  <select
                    value={form.dept}
                    onChange={e => setForm({ ...form, [ 'dept' ]: e.target.value })}
                    className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                  >
                    <option value="TMS">Track (TMS)</option>
                    <option value="SMMS">Signalling (SMMS)</option>
                    <option value="TDMS">Traction / OHE (TDMS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Corridor Section</label>
                  <select
                    value={form.section}
                    onChange={e => setForm({ ...form, [ 'section' ]: e.target.value })}
                    className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue font-mono"
                  >
                    {mockSections.map(s => (
                      <option key={s.id} value={s.id}>{s.id} ({s.from}–{s.to})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Priority Classification</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, [ 'priority' ]: e.target.value })}
                    className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                  >
                    <option value="Critical">Critical (Immediate Block)</option>
                    <option value="High">High (24h Window)</option>
                    <option value="Medium">Medium (Scheduled)</option>
                    <option value="Low">Low (Routine)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Estimated Duration</label>
                  <select
                    value={form.duration}
                    onChange={e => setForm({ ...form, [ 'duration' ]: Number(e.target.value) })}
                    className="w-full bg-[#0b0f19] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue font-mono"
                  >
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addJob}
                className="flex-1 py-2.5 rounded-lg bg-neon-blue text-black font-bold text-xs hover:bg-[#00d0ff] shadow-lg"
              >
                Submit to Optimization Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
