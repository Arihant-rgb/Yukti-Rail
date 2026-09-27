import { useState } from 'react';
import { Cpu, Sparkles, Sliders, RefreshCw } from 'lucide-react';
import { mockJobs } from '../../data/mock/data';

export default function PriorityEngine() {
  const [selectedId, setSelectedId] = useState(mockJobs[0].id);
  const selected = mockJobs.find(j => j.id === selectedId) || mockJobs[0];

  // Interactive sandbox values for live demonstration
  const [simSeverity, setSimSeverity] = useState(selected.severity);
  const [simUrgencyDays, setSimUrgencyDays] = useState(selected.status === 'Pending' ? 8 : 2);
  const [simAssetImpact, setSimAssetImpact] = useState(
    selected.priority === 'Critical' ? 90 : selected.priority === 'High' ? 70 : 50
  );

  // Dynamic formula calculation
  const criticality = Math.min(100, simSeverity * 20);
  const urgency = Math.min(100, simUrgencyDays * 12);
  const assetImpact = simAssetImpact;
  const sectionNum = parseInt(selected.section?.replace('S', '') || '5', 10);
  const delayRisk = Math.min(100, 45 + sectionNum * 4);
  const totalScore = Math.round(0.45 * criticality + 0.25 * urgency + 0.20 * assetImpact + 0.10 * delayRisk);

  const resetToSelected = (job) => {
    setSelectedId(job.id);
    setSimSeverity(job.severity);
    setSimUrgencyDays(job.status === 'Pending' ? 8 : 2);
    setSimAssetImpact(job.priority === 'Critical' ? 90 : job.priority === 'High' ? 70 : 50);
  };

  const Bar = ({ label, value, color, weight }) => (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label} <span className="text-gray-600">({weight}% weight)</span></span>
        <span className="font-bold text-white font-mono">{value} / 100</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>AI Priority Engine</span>
            <span className="text-xs px-2.5 py-1 rounded bg-neon-purple/10 text-neon-purple border border-neon-purple/20 font-mono">
              DYNAMIC MULTI-FACTOR HEURISTIC
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ranks every defect objectively using 4 weighted operational criteria before feeding into CP-SAT
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Job Selector */}
        <div className="bg-dark-card rounded-xl border border-gray-800 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neon-purple" /> Defect Catalog
            </span>
            <span className="text-xs text-gray-500 font-mono">{mockJobs.length} Jobs Logged</span>
          </div>

          <div className="overflow-y-auto max-h-[540px]">
            {mockJobs.map(job => (
              <button
                key={job.id}
                onClick={() => resetToSelected(job)}
                className={`w-full text-left px-4 py-3.5 border-b border-gray-800/60 transition-all flex justify-between items-center ${
                  selectedId === job.id
                    ? 'bg-neon-purple/15 border-l-4 border-l-neon-purple'
                    : 'hover:bg-gray-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neon-blue">{job.id}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-800 text-gray-400">{job.dept}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{job.section}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 truncate max-w-[170px]" title={job.defect}>
                    {job.defect}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-base font-black font-mono ${
                    job.score >= 80 ? 'text-red-400' : job.score >= 60 ? 'text-amber-400' : 'text-gray-400'
                  }`}>
                    {job.score}
                  </span>
                  <p className="text-[10px] text-gray-500 uppercase">{job.priority}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Breakdown & Live Sliders */}
        <div className="lg:col-span-2 space-y-5">
          {/* Score Header Card */}
          <div className="bg-dark-card rounded-xl border border-gray-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-neon-blue/10 text-neon-blue font-mono">
                  {selected.id}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-300">
                  {selected.dept} Division
                </span>
                <span className="text-xs text-gray-500 font-mono">Section {selected.section}</span>
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-2">
                <Sparkles className="w-5 h-5 text-neon-purple shrink-0" />
                <span>{selected.defect}</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Estimated Duration: <strong className="text-white">{selected.duration} hrs</strong> · Initial Severity: <strong className="text-white">{selected.severity}/5</strong>
              </p>
            </div>

            <div className="text-right bg-[#0a0d15] p-4 rounded-xl border border-gray-800/80 shrink-0 min-w-[140px]">
              <p className="text-xs text-gray-500 uppercase font-semibold">Calculated Score</p>
              <p className={`text-5xl font-black font-mono mt-0.5 ${
                totalScore >= 80 ? 'text-red-400' : totalScore >= 60 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {totalScore}
              </p>
              <p className="text-[11px] font-bold text-gray-400 uppercase mt-0.5">
                {totalScore >= 80 ? 'CRITICAL (Tier 1)' : totalScore >= 60 ? 'HIGH (Tier 2)' : 'STANDARD (Tier 3)'}
              </p>
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="bg-dark-card rounded-xl border border-gray-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neon-blue" />
                <span>Interactive Parameter Sandbox (Adjust live to re-score)</span>
              </h3>
              <button
                onClick={() => resetToSelected(selected)}
                className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Severity: <strong className="text-white">{simSeverity} / 5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={simSeverity}
                  onChange={e => setSimSeverity(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Overdue Days: <strong className="text-white">{simUrgencyDays} days</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={simUrgencyDays}
                  onChange={e => setSimUrgencyDays(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Asset Weight: <strong className="text-white">{simAssetImpact} pts</strong>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="10"
                  value={simAssetImpact}
                  onChange={e => setSimAssetImpact(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Score Component Bars */}
            <div className="space-y-3.5 pt-2">
              <Bar label="1. Criticality (Severity x 20)" value={criticality} color="bg-red-500" weight={45} />
              <Bar label="2. Urgency (Overdue Backlog Days)" value={urgency} color="bg-amber-500" weight={25} />
              <Bar label="3. Asset Strategic Impact" value={assetImpact} color="bg-blue-500" weight={20} />
              <Bar label="4. Passenger Train Delay Risk" value={delayRisk} color="bg-purple-500" weight={10} />
            </div>

            {/* Formula Explanation Banner */}
            <div className="p-3.5 bg-[#080b11] rounded-xl border border-gray-800 text-xs text-gray-400 font-mono leading-relaxed">
              <div className="flex justify-between items-center text-gray-500 text-[11px] mb-1">
                <span>FORMULA ENGINE</span>
                <span>MATHEMATICALLY BOUNDED [0 – 100]</span>
              </div>
              <span className="text-gray-300">Total Score</span> = 0.45({criticality}) + 0.25({urgency}) + 0.20({assetImpact}) + 0.10({delayRisk}) = <span className="text-neon-blue font-bold text-sm">{totalScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
