import { useState } from 'react';
import { AlertTriangle, CalendarCheck, Layers, RefreshCw, ArrowRight } from 'lucide-react';
import { mockJobs, mockBlocks } from '../../data/mock/data';

export default function Replanning() {
  const [tab, setTab] = useState('forward');
  const [fwdJob, setFwdJob] = useState(mockJobs[0].id);
  const [fwdResult, setFwdResult] = useState(null);
  const [fwdLoading, setFwdLoading] = useState(false);
  const [revBlock, setRevBlock] = useState(mockBlocks[2].id);
  const [revResult, setRevResult] = useState(null);
  const [revLoading, setRevLoading] = useState(false);
  const [emgSection, setEmgSection] = useState('S01');
  const [emgResult, setEmgResult] = useState(null);
  const [emgLoading, setEmgLoading] = useState(false);

  const handleForward = async () => {
    setFwdLoading(true); setFwdResult(null);
    await new Promise(r => setTimeout(r, 1200));
    const job = mockJobs.find(j => j.id === fwdJob);
    const candidates = mockBlocks.filter(b => b.status === 'Available').slice(0, 3).map((b, i) => ({
      ...b, fitScore: 95 - i * 8, leftover: b.duration - (job.duration * 60), reasons: ['Section matches job corridor','Block duration exceeds job requirement','No train conflict in window']
    }));
    setFwdResult({ job, candidates });
    setFwdLoading(false);
  };

  const handleReverse = async () => {
    setRevLoading(true); setRevResult(null);
    await new Promise(r => setTimeout(r, 1200));
    const block = mockBlocks.find(b => b.id === revBlock);
    const bundled = mockJobs.filter(j => j.status === 'Pending').slice(0, 3);
    setRevResult({ block, bundled, totalUtil: 87 });
    setRevLoading(false);
  };

  const handleEmergency = async () => {
    setEmgLoading(true); setEmgResult(null);
    await new Promise(r => setTimeout(r, 2000));
    const evicted = mockJobs.find(j => j.priority === 'Low' || j.priority === 'Medium');
    setEmgResult({
      emergencyId: `EMG_${Date.now().toString().slice(-4)}`,
      evictedJob: evicted,
      assignedBlock: 'B010',
      section: emgSection,
    });
    setEmgLoading(false);
  };

  const tabs = [
    { id: 'forward', label: 'Forward (Job → Block)', icon: CalendarCheck },
    { id: 'reverse', label: 'Reverse (Block → Bundle)', icon: Layers },
    { id: 'emergency', label: 'Emergency CP-SAT', icon: AlertTriangle },
  ];

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Replanning Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Three AI-driven planning modes. Same constraint engine.</p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { n: '1', title: 'Forward Planning', desc: 'Job is fixed. Which block fits it best?' },
          { n: '2', title: 'Reverse Planning', desc: 'Block is granted. Which jobs can share it?' },
          { n: '3', title: 'Emergency Replan', desc: 'Defect detected. Re-solve the day instantly.' },
        ].map(s => (
          <div key={s.n} className="bg-dark-card p-4 rounded-xl border border-gray-800">
            <p className="text-[10px] font-bold text-neon-blue uppercase mb-1">Step {s.n}</p>
            <p className="text-sm font-semibold text-white">{s.title}</p>
            <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-card p-1 rounded-lg border border-gray-800 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              tab === id ? 'bg-neon-blue text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* Forward Tab */}
      {tab === 'forward' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-card p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-2">Select Job</h3>
            <select value={fwdJob} onChange={e => setFwdJob(e.target.value)} className="w-full bg-[#0f111a] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {mockJobs.map(j => <option key={j.id} value={j.id}>{j.id} · {j.defect} · {j.section}</option>)}
            </select>
            <button onClick={handleForward} disabled={fwdLoading} className="w-full py-2.5 bg-neon-blue text-black font-bold rounded-lg flex items-center justify-center gap-2 text-sm">
              {fwdLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Searching...</> : <><ArrowRight className="w-4 h-4" /> Find Matching Windows</>}
            </button>
          </div>
          <div className="lg:col-span-2 bg-dark-card p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-2">Candidate Windows</h3>
            {fwdResult ? fwdResult.candidates.map(b => (
              <div key={b.id} className="p-4 border border-gray-800 rounded-lg hover:border-neon-blue/30 transition-all space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-sm font-bold text-neon-blue">{b.id}</span>
                    <span className="ml-2 text-xs text-gray-500 font-mono">{b.start} – {b.end}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Fit Score {b.fitScore}%</span>
                </div>
                <div className="space-y-1">
                  {b.reasons.map(r => <p key={r} className="text-xs text-gray-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{r}</p>)}
                </div>
              </div>
            )) : <p className="text-sm text-gray-500 py-8 text-center">Select a job and click "Find Matching Windows"</p>}
          </div>
        </div>
      )}

      {/* Reverse Tab */}
      {tab === 'reverse' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-card p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-2">Select Block</h3>
            <select value={revBlock} onChange={e => setRevBlock(e.target.value)} className="w-full bg-[#0f111a] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {mockBlocks.filter(b => b.status === 'Available').map(b => <option key={b.id} value={b.id}>{b.id} · {b.section} · {b.start}–{b.end} · {b.duration}min</option>)}
            </select>
            <button onClick={handleReverse} disabled={revLoading} className="w-full py-2.5 bg-neon-blue text-black font-bold rounded-lg flex items-center justify-center gap-2 text-sm">
              {revLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Bundling...</> : <><Layers className="w-4 h-4" /> Find Job Bundle</>}
            </button>
          </div>
          <div className="lg:col-span-2 bg-dark-card p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-2">Optimal Bundle</h3>
            {revResult ? (
              <>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                  Block {revResult.block.id} ({revResult.block.duration} min) can accommodate {revResult.bundled.length} jobs from different departments. Utilization: <strong>{revResult.totalUtil}%</strong>
                </div>
                {revResult.bundled.map(j => (
                  <div key={j.id} className="p-3 border border-gray-800 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="font-mono text-xs font-bold text-neon-blue">{j.id}</span>
                      <span className="ml-2 text-xs text-gray-500">{j.defect}</span>
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">{j.dept}</span>
                  </div>
                ))}
              </>
            ) : <p className="text-sm text-gray-500 py-8 text-center">Select a block and click "Find Job Bundle"</p>}
          </div>
        </div>
      )}

      {/* Emergency Tab */}
      {tab === 'emergency' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-dark-card p-5 rounded-xl border border-red-900/30 space-y-4">
            <h3 className="font-semibold text-red-400 border-b border-gray-800 pb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Emergency Parameters
            </h3>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Emergency Section</label>
              <select value={emgSection} onChange={e => setEmgSection(e.target.value)} className="w-full bg-[#0f111a] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
                {['S01','S02','S03','S04','S05','S06','S07','S08'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Defect Type</label>
              <input defaultValue="Critical Signal Failure" className="w-full bg-[#0f111a] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={handleEmergency} disabled={emgLoading} className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 text-sm transition-all">
              {emgLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Re-solving Network...</> : <><AlertTriangle className="w-4 h-4" /> Trigger Emergency CP-SAT</>}
            </button>
          </div>
          <div className="lg:col-span-2 bg-dark-card p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-2">Replan Result</h3>
            {emgResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-blue-300">
                  Emergency job <strong className="text-white">{emgResult.emergencyId}</strong> on Section <strong className="text-white">{emgResult.section}</strong> has been inserted. Network re-solved in <strong>214ms</strong> using CP-SAT preemption.
                </div>
                <div className="p-4 bg-red-500/5 border border-red-800/30 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-red-400 uppercase">Evicted (Lowest Priority)</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-mono text-sm font-bold text-white">{emgResult.evictedJob.id}</p>
                      <p className="text-xs text-gray-500">{emgResult.evictedJob.defect}</p>
                    </div>
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">{emgResult.evictedJob.priority}</span>
                  </div>
                  <p className="text-xs text-gray-500">Returned to Pending queue. Rescheduled on next available window.</p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-xs font-bold text-emerald-400 uppercase">Emergency Assigned</p>
                  <p className="font-mono text-sm font-bold text-white mt-1">{emgResult.emergencyId} → {emgResult.assignedBlock}</p>
                  <p className="text-xs text-gray-500 mt-1">All safety constraints satisfied. Zero overlapping conflicts.</p>
                </div>
              </div>
            ) : <p className="text-sm text-gray-500 py-8 text-center">Configure emergency and click "Trigger Emergency CP-SAT"</p>}
          </div>
        </div>
      )}
    </div>
  );
}
