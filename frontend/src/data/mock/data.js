export const mockStations = [
  { code: 'SBC', name: 'Bangalore City Jn', lat: 12.977595, lng: 77.568083, zone: 'SWR' },
  { code: 'BNC', name: 'Bangalore Cant', lat: 12.993674, lng: 77.599327, zone: 'SWR' },
  { code: 'BNCE', name: 'Bangalore East', lat: 13.001480, lng: 77.618470, zone: 'SWR' },
  { code: 'BYPL', name: 'Baiyyappanahalli', lat: 12.990198, lng: 77.650886, zone: 'SWR' },
  { code: 'BAND', name: 'Banaswadi', lat: 13.005730, lng: 77.628196, zone: 'SWR' },
  { code: 'KJM', name: 'Krishnarajapuram', lat: 13.000534, lng: 77.674016, zone: 'SWR' },
  { code: 'WFD', name: 'Whitefield', lat: 12.995253, lng: 77.761305, zone: 'SWR' },
  { code: 'BWT', name: 'Bangarapet', lat: 12.984808, lng: 78.178188, zone: 'SWR' },
  { code: 'YPR', name: 'Yesvantpur Jn', lat: 13.022839, lng: 77.551174, zone: 'SWR' },
  { code: 'YNK', name: 'Yelhanka Jn', lat: 13.102795, lng: 77.593069, zone: 'SWR' },
];

export const mockSections = [
  { id: 'S01', from: 'KJM', to: 'WFD', distanceKm: 9.48, electrified: true, trains: 93, status: 'Occupied' },
  { id: 'S02', from: 'BWT', to: 'WFD', distanceKm: 45.18, electrified: true, trains: 91, status: 'Clear' },
  { id: 'S03', from: 'BNC', to: 'BNCE', distanceKm: 2.25, electrified: true, trains: 86, status: 'Clear' },
  { id: 'S04', from: 'BNCE', to: 'BYPL', distanceKm: 3.73, electrified: true, trains: 86, status: 'Occupied' },
  { id: 'S05', from: 'BNC', to: 'SBC', distanceKm: 3.83, electrified: true, trains: 83, status: 'Clear' },
  { id: 'S06', from: 'BYPL', to: 'KJM', distanceKm: 2.76, electrified: true, trains: 79, status: 'Clear' },
  { id: 'S07', from: 'SBC', to: 'YPR', distanceKm: 5.35, electrified: true, trains: 56, status: 'Occupied' },
  { id: 'S08', from: 'YNK', to: 'YPR', distanceKm: 9.98, electrified: true, trains: 44, status: 'Alert' },
  { id: 'S09', from: 'BAND', to: 'YPR', distanceKm: 8.56, electrified: true, trains: 36, status: 'Clear' },
  { id: 'S10', from: 'BAND', to: 'BYPL', distanceKm: 3.0, electrified: true, trains: 36, status: 'Clear' },
  { id: 'S11', from: 'BYPL', to: 'YNK', distanceKm: 14.0, electrified: true, trains: 20, status: 'Clear' },
  { id: 'S12', from: 'KJM', to: 'YNK', distanceKm: 14.36, electrified: true, trains: 10, status: 'Clear' },
];

export const mockJobs = [
  { id: 'TMS001', dept: 'TMS', section: 'S11', defect: 'Gauge Widening', duration: 1, priority: 'Critical', status: 'Pending', severity: 5, score: 92 },
  { id: 'TMS002', dept: 'TMS', section: 'S04', defect: 'Rail Crack Detection', duration: 2, priority: 'Critical', status: 'Scheduled', severity: 5, score: 90, block: 'B001' },
  { id: 'SMMS003', dept: 'SMMS', section: 'S02', defect: 'Signal Cable Fault', duration: 1, priority: 'High', status: 'Pending', severity: 4, score: 75 },
  { id: 'TMS004', dept: 'TMS', section: 'S07', defect: 'Weld Joint Inspection', duration: 3, priority: 'Medium', status: 'Scheduled', severity: 3, score: 58, block: 'B004' },
  { id: 'TDMS005', dept: 'TDMS', section: 'S03', defect: 'OHE Wire Replacement', duration: 2, priority: 'High', status: 'Pending', severity: 4, score: 72 },
  { id: 'SMMS006', dept: 'SMMS', section: 'S01', defect: 'Track Circuit Failure', duration: 1, priority: 'Critical', status: 'Scheduled', severity: 5, score: 88, block: 'B010' },
  { id: 'TMS007', dept: 'TMS', section: 'S06', defect: 'Sleeper Replacement', duration: 4, priority: 'Low', status: 'Pending', severity: 2, score: 35 },
  { id: 'TDMS008', dept: 'TDMS', section: 'S08', defect: 'Pantograph Contact Wear', duration: 2, priority: 'High', status: 'Pending', severity: 4, score: 70 },
  { id: 'TMS009', dept: 'TMS', section: 'S05', defect: 'Ballast Cleaning', duration: 3, priority: 'Medium', status: 'Pending', severity: 3, score: 52 },
  { id: 'SMMS010', dept: 'SMMS', section: 'S09', defect: 'Relay Room Inspection', duration: 1, priority: 'Low', status: 'Completed', severity: 2, score: 30 },
  { id: 'TMS011', dept: 'TMS', section: 'S10', defect: 'Switch Point Grinding', duration: 2, priority: 'Medium', status: 'Pending', severity: 3, score: 55 },
  { id: 'TDMS012', dept: 'TDMS', section: 'S12', defect: 'Mast Foundation Checking', duration: 2, priority: 'Low', status: 'Pending', severity: 2, score: 38 },
];

export const mockBlocks = [
  { id: 'B001', section: 'S04', date: '2026-09-27', start: '00:36', end: '01:27', duration: 51, status: 'Occupied', job: 'TMS002' },
  { id: 'B002', section: 'S04', date: '2026-09-27', start: '01:52', end: '02:55', duration: 63, status: 'Available', job: null },
  { id: 'B003', section: 'S06', date: '2026-09-27', start: '00:50', end: '02:50', duration: 120, status: 'Available', job: null },
  { id: 'B004', section: 'S07', date: '2026-09-27', start: '00:10', end: '03:15', duration: 185, status: 'Occupied', job: 'TMS004' },
  { id: 'B005', section: 'S07', date: '2026-09-27', start: '14:15', end: '15:00', duration: 45, status: 'Available', job: null },
  { id: 'B006', section: 'S08', date: '2026-09-27', start: '00:10', end: '02:50', duration: 160, status: 'Available', job: null },
  { id: 'B007', section: 'S08', date: '2026-09-27', start: '11:25', end: '12:45', duration: 80, status: 'Available', job: null },
  { id: 'B008', section: 'S10', date: '2026-09-27', start: '00:40', end: '03:01', duration: 141, status: 'Available', job: null },
  { id: 'B009', section: 'S10', date: '2026-09-27', start: '12:33', end: '13:46', duration: 73, status: 'Available', job: null },
  { id: 'B010', section: 'S01', date: '2026-09-27', start: '01:00', end: '04:00', duration: 180, status: 'Occupied', job: 'SMMS006' },
  { id: 'B011', section: 'S01', date: '2026-09-27', start: '12:00', end: '14:00', duration: 120, status: 'Available', job: null },
  { id: 'B012', section: 'S02', date: '2026-09-27', start: '02:00', end: '04:00', duration: 120, status: 'Available', job: null },
  { id: 'B013', section: 'S03', date: '2026-09-27', start: '03:00', end: '05:00', duration: 120, status: 'Available', job: null },
  { id: 'B014', section: 'S05', date: '2026-09-27', start: '01:30', end: '03:30', duration: 120, status: 'Available', job: null },
  { id: 'B015', section: 'S09', date: '2026-09-27', start: '02:15', end: '04:15', duration: 120, status: 'Available', job: null },
  { id: 'B016', section: 'S11', date: '2026-09-27', start: '00:30', end: '02:00', duration: 90, status: 'Available', job: null },
  { id: 'B017', section: 'S12', date: '2026-09-27', start: '01:00', end: '03:00', duration: 120, status: 'Available', job: null },
];

export const mockCrews = [
  { id: 'C01', name: 'Team Alpha', skill: 'Track Welding', section: 'S04', status: 'Active', job: 'TMS002' },
  { id: 'C02', name: 'Team Beta', skill: 'Signal Engineering', section: 'S01', status: 'Active', job: 'SMMS006' },
  { id: 'C03', name: 'Team Gamma', skill: 'OHE Maintenance', section: null, status: 'Standby', job: null },
  { id: 'C04', name: 'Team Delta', skill: 'Track Inspection', section: 'S07', status: 'Active', job: 'TMS004' },
  { id: 'C05', name: 'Team Epsilon', skill: 'General Maintenance', section: null, status: 'Standby', job: null },
];
