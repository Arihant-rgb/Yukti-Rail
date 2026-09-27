import { useState } from 'react';
import { Activity, Leaf, Users, ShieldAlert, Cpu, Zap, Radio, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockJobs, mockBlocks, mockStations, mockSections } from '../../data/mock/data';

const initialAnomalies = [
  { type: 'Vibration Spike', location: 'S08 (YNK–YPR)', severity: 'Critical', time: '23:47:12' },
  { type: 'Thermal Stress Expansion', location: 'S04 (BNCE–BYPL)', severity: 'High', time: '21:30:05' },
  { type: 'OHE Voltage Drop', location: 'S01 (KJM–WFD)', severity: 'Medium', time: '19:14:22' },
];

export default function Dashboard() {
  const [scanning, setScanning] = useState(false);
  const [iotFeed, setIotFeed] = useState(initialAnomalies);
  const [selectedStation, setSelectedStation] = useState(mockStations[0]); // default SBC
  const [selectedSection, setSelectedSection] = useState(mockSections[0]); // default S01

  const pendingJobs = mockJobs.filter(j => j.status === 'Pending').length;
  const criticalJobs = mockJobs.filter(j => j.priority === 'Critical').length;
  const occupiedBlocks = mockBlocks.filter(b => b.status === 'Occupied').length;
  const availableBlocks = mockBlocks.filter(b => b.status === 'Available').length;

  const runSweep = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const randomSection = mockSections[Math.floor(Math.random() * mockSections.length)];
      setIotFeed(prev => [{
        type: 'Track Micro-Fracture Acoustic Alert',
        location: `${randomSection.id} (${randomSection.from}–${randomSection.to})`,
        severity: 'Critical',
        time: new Date().toLocaleTimeString()
      }, ...prev]);
    }, 2500);
  };

  // Station coordinate mapping on SVG canvas (850 x 300)
  const stationCoords = {
    SBC:  { x: 70,  y: 200 },
    BNC:  { x: 180, y: 170 },
    BNCE: { x: 280, y: 150 },
    BYPL: { x: 380, y: 140 },
    BAND: { x: 340, y: 80  },
    KJM:  { x: 500, y: 150 },
    WFD:  { x: 640, y: 160 },
    BWT:  { x: 780, y: 180 },
    YPR:  { x: 120, y: 80  },
    YNK:  { x: 420, y: 30  },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span>Bengaluru Division Corridor</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/30 font-mono">
              SWR ZONE · 10 STATIONS · 12 SECTIONS
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time track possession deconfliction against 695 daily passenger and freight movements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-gray-400 font-medium">CP-SAT Engine: Online (3s cycle)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Jobs', value: pendingJobs, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Critical Defects', value: criticalJobs, icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10', pulse: true },
          { label: 'Available Windows', value: availableBlocks, icon: Activity, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
          { label: 'Active Field Crews', value: '4 / 5', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map(({ label, value, icon: Icon, color, bg, pulse }) => (
          <div key={label} className="bg-dark-card p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className={`p-2.5 rounded-lg ${bg} w-fit mb-3`}>
              <Icon className={`w-5 h-5 ${color} ${pulse ? 'animate-pulse' : ''}`} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Sustainability & Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-card p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg shrink-0"><Leaf className="w-6 h-6 text-green-400" /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Carbon Emissions Prevented</p>
            <p className="text-2xl font-bold text-white mt-0.5">4,250 <span className="text-sm text-gray-500 font-normal">kg CO₂</span></p>
            <p className="text-[11px] text-emerald-400 mt-1">Reduced diesel idling via bundled mega-blocks</p>
          </div>
        </div>
        <div className="bg-dark-card p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-neon-blue/10 rounded-lg shrink-0"><Activity className="w-6 h-6 text-neon-blue" /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Network Asset Health</p>
            <p className="text-2xl font-bold text-white mt-0.5">98.4%</p>
            <p className="text-[11px] text-neon-blue mt-1">SBC–BWT mainline corridor deconflicted</p>
          </div>
        </div>
        <div className="bg-dark-card p-5 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg shrink-0"><CheckCircle className="w-6 h-6 text-purple-400" /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Active Clashes Detected</p>
            <p className="text-2xl font-bold text-white mt-0.5">0 <span className="text-xs text-green-400 font-normal bg-green-500/10 px-2 py-0.5 rounded">100% Conflict-Free</span></p>
            <p className="text-[11px] text-gray-400 mt-1">Mathematical guarantee by CP-SAT solver</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Edge Sensor Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Network Map */}
        <div className="lg:col-span-2 bg-dark-card rounded-xl border border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-white">Bengaluru Division Topological Network Map</h2>
                <p className="text-xs text-gray-500">Click any station node or section track to inspect operational stats</p>
              </div>
              <span className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded font-mono">10 Nodes / 12 Edges</span>
            </div>

            <div className="bg-[#080b11] rounded-xl border border-gray-800/80 p-4 relative overflow-hidden">
              <svg viewBox="0 0 850 250" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f3ff" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#bc13fe" />
                  </linearGradient>
                </defs>

                {/* Section Lines */}
                {mockSections.map((sec) => {
                  const p1 = stationCoords[sec.from];
                  const p2 = stationCoords[sec.to];
                  if (!p1 || !p2) return null;
                  const isSelected = selectedSection?.id === sec.id;
                  const isOccupied = sec.status === 'Occupied';
                  const isAlert = sec.status === 'Alert';
                  const strokeColor = isAlert ? '#ef4444' : isOccupied ? '#f59e0b' : '#334155';

                  return (
                    <g key={sec.id} className="cursor-pointer" onClick={() => setSelectedSection(sec)}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? 6 : 3.5}
                        strokeDasharray={isAlert ? '6,4' : undefined}
                        className="transition-all hover:stroke-neon-blue"
                      />
                      {/* Midpoint Label for Section ID */}
                      <rect
                        x={(p1.x + p2.x) / 2 - 14}
                        y={(p1.y + p2.y) / 2 - 9}
                        width="28"
                        height="16"
                        rx="4"
                        fill="#0b0f19"
                        stroke={isSelected ? '#00f3ff' : strokeColor}
                        strokeWidth="1"
                      />
                      <text
                        x={(p1.x + p2.x) / 2}
                        y={(p1.y + p2.y) / 2 + 3}
                        fill={isSelected ? '#00f3ff' : '#94a3b8'}
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {sec.id}
                      </text>
                    </g>
                  );
                })}

                {/* Station Nodes */}
                {mockStations.map((st) => {
                  const pt = stationCoords[st.code];
                  if (!pt) return null;
                  const isSelected = selectedStation?.code === st.code;
                  return (
                    <g key={st.code} className="cursor-pointer" onClick={() => setSelectedStation(st)}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 9 : 7}
                        fill="#0b0f19"
                        stroke={isSelected ? '#00f3ff' : '#64748b'}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-all"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={3}
                        fill={isSelected ? '#00f3ff' : '#cbd5e1'}
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        fill={isSelected ? '#00f3ff' : '#e2e8f0'}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {st.code}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend */}
              <div className="flex items-center justify-between border-t border-gray-800/80 pt-3 mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-emerald-500 inline-block" /> Clear Track</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-amber-500 inline-block" /> In-Work Block</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-red-500 inline-block" /> Active Alert</span>
                </div>
                <span className="text-[11px] text-gray-500">Live Bangalore SBC–BWT Trunk Route</span>
              </div>
            </div>
          </div>

          {/* Section & Station Live Details Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-800 text-xs">
            <div className="p-3 bg-gray-900/60 rounded-lg border border-gray-800">
              <span className="text-gray-500 uppercase font-semibold">Selected Station</span>
              <p className="text-sm font-bold text-white mt-0.5">{selectedStation.name} ({selectedStation.code})</p>
              <p className="text-gray-400 mt-1">Coordinates: {selectedStation.lat.toFixed(4)}° N, {selectedStation.lng.toFixed(4)}° E · Zone: {selectedStation.zone}</p>
            </div>
            <div className="p-3 bg-gray-900/60 rounded-lg border border-gray-800">
              <span className="text-gray-500 uppercase font-semibold">Selected Section</span>
              <p className="text-sm font-bold text-neon-blue mt-0.5">Section {selectedSection.id}: {selectedSection.from} ↔ {selectedSection.to}</p>
              <p className="text-gray-400 mt-1">
                Distance: {selectedSection.distanceKm} km · Electrified: Yes · Observed Trains: {selectedSection.trains}/day
              </p>
            </div>
          </div>
        </div>

        {/* Edge Sensor Feed */}
        <div className="bg-dark-card rounded-xl border border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-neon-purple" />
                <span>IoT Sensor Feed</span>
              </h2>
              <span className="flex items-center gap-1 text-[11px] text-neon-purple bg-neon-purple/10 px-2 py-0.5 rounded border border-neon-purple/20">
                <Radio className="w-3 h-3 animate-pulse" /> Telemetry Live
              </span>
            </div>

            <button
              onClick={runSweep}
              disabled={scanning}
              className={`w-full py-3 rounded-lg font-bold text-sm mb-4 transition-all border shadow-lg ${
                scanning
                  ? 'bg-gray-800 text-neon-blue border-neon-blue/40 cursor-wait'
                  : 'bg-neon-purple/20 text-neon-purple border-neon-purple/50 hover:bg-neon-purple/30 hover:shadow-[0_0_20px_rgba(188,19,254,0.3)]'
              }`}
            >
              {scanning ? (
                <span className="flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 animate-spin" /> Scanning Corridor Sensors...
                </span>
              ) : (
                '📡 Trigger IoT Sensor Sweep'
              )}
            </button>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {iotFeed.map((item, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-lg border transition-all animate-fade-in ${
                    item.severity === 'Critical'
                      ? 'border-red-800/60 bg-red-500/10'
                      : item.severity === 'High'
                      ? 'border-amber-800/60 bg-amber-500/10'
                      : 'border-gray-800 bg-[#080b11]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : item.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{item.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-200 mt-1">{item.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neon-blue shrink-0" />
                    <span>Location: {item.location}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-500 text-center">
            Simulated edge vibration & acoustic sensors on Bengaluru trunk line
          </div>
        </div>
      </div>
    </div>
  );
}
