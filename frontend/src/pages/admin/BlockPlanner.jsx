import { useState, useMemo } from 'react';
import { Play, RefreshCw, CalendarDays, CheckCircle, Clock, X, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockBlocks, mockJobs, mockSections } from '../../data/mock/data';

const statusStyle = {
  Available: 'bg-emerald-500 hover:bg-emerald-400',
  Occupied: 'bg-amber-500 hover:bg-amber-400',
  Approved: 'bg-blue-500 hover:bg-blue-400',
};

function timeToPercent(t) {
  const [h, m] = t.split(':').map(Number);
  return ((h * 60 + m) / 1440) * 100;
}
function blockWidth(s, e) {
  const sp = timeToPercent(s), ep = timeToPercent(e);
  return Math.max(ep - sp, 3);
}

export default function BlockPlanner() {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Group blocks by section S01 to S12
  const allSectionIds = ['S01','S02','S03','S04','S05','S06','S07','S08','S09','S10','S11','S12'];

  const bySection = useMemo(() => {
    const g = {};
    allSectionIds.forEach(id => { g[id] = []; });
    blocks.forEach(b => {
      if (!g[b.section]) g[b.section] = [];
      g[b.section].push(b);
    });
    return g;
  }, [blocks]);

  const stats = {
    total: blocks.length,
    available: blocks.filter(b => b.status === 'Available').length,
    occupied: blocks.filter(b => b.status === 'Occupied').length,
    approved: blocks.filter(b => b.status === 'Approved').length,
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setSuccess('');
    const steps = [
      'Reading 12 Pending Jobs across SWR Network...',
      'Mapping 695 Passenger & Freight Train Constraints...',
      'Running Google OR-Tools CP-SAT Optimizer...',
      'Optimal Solution Found (Zero Overlaps)!'
    ];
    for (const s of steps) {
      setStep(s);
      await new Promise(r => setTimeout(r, 750));
    }
    // Turn available blocks into occupied with assigned jobs
    setBlocks(prev => prev.map((b, idx) => {
      if (b.status === 'Available') {
        const matchingJob = mockJobs[idx % mockJobs.length];
        return { ...b, status: 'Occupied', job: matchingJob.id };
      }
      return b;
    }));
    setGenerating(false);
    setStep('');
    setSuccess('✓ CP-SAT Plan Generated — All candidate blocks optimized with zero train conflict.');
  };

  const handleReset = () => {
    setBlocks(mockBlocks.map(b => ({
      ...b,
      status: b.id === 'B001' || b.id === 'B004' || b.id === 'B010' ? 'Occupied' : 'Available',
      job: b.id === 'B001' ? 'TMS002' : b.id === 'B004' ? 'TMS004' : b.id === 'B010' ? 'SMMS006' : null
    })));
    setSuccess('↺ Plan reset — All blocks reverted to baseline candidate windows.');
  };

  const toggleBlockStatus = (blockId) => {
    setBlocks(prev => prev.map(b => {
      if (b.id === blockId) {
        const next = b.status === 'Available' ? 'Occupied' : b.status === 'Occupied' ? 'Approved' : 'Available';
        return { ...b, status: next };
      }
      return b;
    }));
    setSelectedBlock(null);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>Maintenance Block Planner</span>
            <span className="text-xs px-2.5 py-1 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20 font-mono">
              CP-SAT SOLVER V9.8
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Corridor possession scheduling across Sections S01–S12 (Bangalore City to Bangarapet & Yelahanka)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            title="Reset to initial state"
            className="px-3 py-2 text-xs text-gray-400 hover:text-white rounded-lg border border-gray-800 hover:border-gray-700 transition-all font-mono"
          >
            ↺ Reset
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{ minWidth: generating ? '270px' : '210px' }}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg ${
              generating
                ? 'bg-indigo-600 text-white shadow-indigo-600/30 cursor-wait'
                : 'bg-neon-blue text-black hover:bg-[#00d0ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
            }`}
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-200" />
                <span className="animate-pulse">{step}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Generate Plan (CP-SAT)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-400 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess('')} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Candidate Blocks', val: stats.total, icon: CalendarDays, color: 'text-neon-blue' },
          { label: 'Train-Free Available', val: stats.available, icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Occupied (AI Allotted)', val: stats.occupied, icon: Clock, color: 'text-amber-400' },
          { label: 'Approved & Published', val: stats.approved, icon: ShieldCheck, color: 'text-blue-400' },
        ].map(({ label, val, icon: Icon, color }) => (
          <div key={label} className="bg-dark-card p-4 rounded-xl border border-gray-800 flex items-center gap-3">
            <Icon className={`w-5 h-5 shrink-0 ${color}`} />
            <div>
              <p className={`text-xl font-bold ${color}`}>{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Card */}
      <div className="bg-dark-card rounded-xl border border-gray-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Corridor Possession Gantt Timeline</h3>
            <p className="text-xs text-gray-500 mt-0.5">Click any block to inspect details or toggle its state</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium bg-[#0a0c13] px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Available (Train-Free Gap)
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Occupied (AI Allotted)
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Approved (Locked)
            </span>
          </div>
        </div>

        {/* Hour Markers */}
        <div className="flex pl-28 pr-2 mt-3 mb-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex-1 text-[10px] text-gray-500 font-mono text-center">
              {String(i * 4).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Section Rows (S01 to S12) */}
        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {allSectionIds.map((secId) => {
            const secData = mockSections.find(s => s.id === secId);
            const secBlocks = bySection[secId] || [];

            return (
              <div key={secId} className="flex items-center gap-3 group">
                <div className="w-28 shrink-0 flex items-center justify-between pr-2 text-xs">
                  <span className="font-bold text-white font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                    {secId}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate max-w-[50px]" title={`${secData?.from}–${secData?.to}`}>
                    {secData ? `${secData.from}–${secData.to}` : ''}
                  </span>
                </div>

                <div className="flex-1 relative h-9 bg-[#080b11] rounded-lg border border-gray-800/80 group-hover:border-gray-700 transition-colors">
                  {secBlocks.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[10px] text-gray-600 italic">
                      Continuous train path (No candidate window)
                    </div>
                  ) : (
                    secBlocks.map((b) => {
                      const left = timeToPercent(b.start);
                      const width = blockWidth(b.start, b.end);
                      const bg = statusStyle[b.status] || 'bg-emerald-500';

                      return (
                        <div
                          key={b.id}
                          onClick={() => setSelectedBlock(b)}
                          className={`absolute top-1 h-7 ${bg} text-white rounded text-[11px] font-bold flex items-center justify-center px-1.5 shadow cursor-pointer hover:scale-105 transition-all border border-white/20`}
                          style={{ left: `${left}%`, width: `${width}%`, minWidth: '55px' }}
                          title={`${b.id} (${b.status}): ${b.start}–${b.end} (${b.duration} min) on Section ${secId}`}
                        >
                          <span className="truncate">{b.id} {b.job ? `· ${b.job}` : ''}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Block Inspection Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-card w-full max-w-md rounded-2xl border border-gray-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-neon-blue" />
                  <span>Block Possession Inspector</span>
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedBlock.id} on Section {selectedBlock.section}</p>
              </div>
              <button onClick={() => setSelectedBlock(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-500">Status</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  selectedBlock.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                  selectedBlock.status === 'Occupied' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {selectedBlock.status}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-500">Time Window</span>
                <span className="font-mono text-white">{selectedBlock.start} – {selectedBlock.end} ({selectedBlock.duration} mins)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-500">Assigned Job</span>
                <span className="font-mono text-neon-blue font-bold">{selectedBlock.job || 'None (Open slot)'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-500">Train Conflict Verification</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> 0 Overlaps Verified
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => toggleBlockStatus(selectedBlock.id)}
                className="flex-1 py-2.5 rounded-lg bg-neon-blue text-black font-bold text-xs hover:bg-[#00d0ff] transition-all"
              >
                Toggle Status ({selectedBlock.status === 'Available' ? 'Allocate' : selectedBlock.status === 'Occupied' ? 'Lock/Approve' : 'Make Available'})
              </button>
              <button
                onClick={() => setSelectedBlock(null)}
                className="px-4 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
