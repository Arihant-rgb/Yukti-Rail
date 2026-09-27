import { mockCrews } from '../../data/mock/data';

const statusStyle = {
  Active: 'bg-green-500/20 text-green-400',
  Standby: 'bg-gray-500/20 text-gray-400',
};

export default function CrewManagement() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Crew & Resource Management</h1>
        <p className="text-sm text-gray-500 mt-1">Track field team assignments and real-time status</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCrews.map(crew => (
          <div key={crew.id} className={`bg-dark-card p-5 rounded-xl border transition-all ${crew.status === 'Active' ? 'border-green-800/40' : 'border-gray-800'}`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-white">{crew.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${statusStyle[crew.status]}`}>{crew.status}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{crew.skill}</p>
            {crew.status === 'Active' ? (
              <div className="space-y-1 text-xs text-gray-400">
                <p>Section: <span className="text-neon-blue font-bold">{crew.section}</span></p>
                <p>Job: <span className="font-mono text-white">{crew.job}</span></p>
              </div>
            ) : (
              <p className="text-xs text-gray-600 italic">Awaiting assignment</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
