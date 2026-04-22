import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';

function CameraImageFeed({ imageUrl, cssFilter }: { imageUrl: string, cssFilter: string }) {
  return (
    <div className="flex-1 relative w-full h-full overflow-hidden bg-[#0a1628]">
      <img
        src={imageUrl}
        alt="Camera feed"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 mix-blend-luminosity"
        style={{ filter: cssFilter }}
      />
      <div className="absolute inset-0 bg-blue-900/20 z-0 pointer-events-none mix-blend-overlay"></div>
      {/* CCTV Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,22,40,0.8)_100%)]"></div>
      {/* CCTV Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 3px)' }}></div>
      <div className="absolute bottom-4 left-4 text-white/50 font-mono text-[0.6rem] z-30 tracking-widest">
        REC • {new Date().toISOString().split('T')[1].substring(0, 8)}
      </div>
    </div>
  );
}

function InteractiveHotelModel({ onSelectRoom }: { onSelectRoom: (id: number) => void }) {
  const rooms = [];
  // Generate a 4x4 tower of rooms
  for (let floor = 0; floor < 4; floor++) {
    for (let x = 0; x < 2; x++) {
      for (let z = 0; z < 2; z++) {
        const roomId = 801 + floor * 10 + x * 2 + z;
        // Occupancy color logic
        const isOccupied = (roomId % 3 === 0);
        const isVIP = (roomId % 7 === 0);
        const color = isVIP ? '#E2C275' : isOccupied ? '#0D1B3E' : '#FFFFFF';
        
        rooms.push(
          <group key={roomId} position={[x * 2 - 1, floor * 1.5, z * 2 - 1]}>
            <Box args={[1.8, 1.2, 1.8]} 
                 onClick={(e) => { e.stopPropagation(); onSelectRoom(roomId); }}
                 onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
                 onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}>
              <meshStandardMaterial color={color} transparent opacity={0.9} roughness={0.2} metalness={0.1} />
            </Box>
            <Text position={[0, 0, 1.01]} fontSize={0.3} color={isOccupied || isVIP ? '#FFF' : '#0D1B3E'}>
              {roomId}
            </Text>
            <Text position={[0, 0, -1.01]} rotation={[0, Math.PI, 0]} fontSize={0.3} color={isOccupied || isVIP ? '#FFF' : '#0D1B3E'}>
              {roomId}
            </Text>
            <Text position={[1.01, 0, 0]} rotation={[0, Math.PI/2, 0]} fontSize={0.3} color={isOccupied || isVIP ? '#FFF' : '#0D1B3E'}>
              {roomId}
            </Text>
            <Text position={[-1.01, 0, 0]} rotation={[0, -Math.PI/2, 0]} fontSize={0.3} color={isOccupied || isVIP ? '#FFF' : '#0D1B3E'}>
              {roomId}
            </Text>
          </group>
        );
      }
    }
  }

  return (
    <group position={[0, -2, 0]}>
      {rooms}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#E8E2D2" />
      </mesh>
    </group>
  );
}

export default function SpatialEngine() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [staffData, setStaffData] = useState([
    { zone: "Restaurant", curr: 3, rec: 5, stat: "⚠️ Understaffed", statColor: "text-amber-500" },
    { zone: "Pool Area", curr: 2, rec: 2, stat: "✅ Optimal", statColor: "text-green-500" },
    { zone: "Reception", curr: 4, rec: 3, stat: "🔵 Overstaffed", statColor: "text-blue-500" }
  ]);
  const [activeZone, setActiveZone] = useState('Main Dining');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleAutoOptimize = () => {
    setStaffData(staffData.map(r => ({...r, curr: r.rec, stat: "✅ Optimal", statColor: "text-green-500"})));
    setShowToast("All zones auto-optimized to recommended levels");
    setTimeout(() => setShowToast(null), 3000);
  };

  const deployAlert = (zone: string) => {
    setShowToast(`Staff reallocation request sent to ${zone}`);
    setTimeout(() => setShowToast(null), 3000);
  };

  const tables = Array.from({ length: 24 }).map((_, i) => {
    // some logic for colors: 10 Avail (green), 11 Occ (red), 3 Res (yellow)
    let status = 'Available';
    let color = 'bg-green-100 border-green-500';
    if (i < 11) { status = 'Occupied'; color = 'bg-red-100 border-red-500'; }
    else if (i < 14) { status = 'Reserved'; color = 'bg-amber-100 border-amber-500'; }
    
    return { id: i + 1, status, color };
  });

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-aura-navy text-white px-6 py-3 rounded shadow-lg animate-in fade-in slide-in-from-top-4 flex items-center space-x-3">
           <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
           <span className="font-source text-sm">{showToast}</span>
        </div>
      )}

      <div>
        <h1>Spatial Consciousness Engine</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Real-time physical space utilization and anomaly detection.</p>
      </div>

      {/* Top Section */}
      <div>
        <h2>Common Area Surveillance Intelligence</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { id: 1, loc: "Restaurant — Main Dining", count: 12, alert: "High Crowd Density", alertColor: "text-amber-500", img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000", filter: "hue-rotate(15deg) contrast(1.1) brightness(1.2)" },
             { id: 2, loc: "Poolside — West Zone", count: 5, alert: null, alertColor: "", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", filter: "grayscale(70%) contrast(1.3) brightness(1.3) hue-rotate(180deg)" },
             { id: 3, loc: "Reception / Lobby", count: 8, alert: "Staff Required", alertColor: "text-amber-500", img: "https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?q=80&w=1000", filter: "sepia(50%) hue-rotate(-10deg) contrast(1.1) brightness(1.1)" }
           ].map(cam => (
             <div key={cam.id} className="relative bg-[#0a1628] border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.1)] rounded overflow-hidden flex flex-col h-64 group">
                <div className="absolute top-3 left-3 bg-red-600/30 border border-red-500/80 text-white text-[0.6rem] uppercase tracking-wider px-2 py-1 flex items-center gap-2 z-20 backdrop-blur-md shadow-lg rounded-sm">
                   <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(248,113,113,1)]"></div> LIVE
                </div>
                <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/60 text-green-400 text-[0.6rem] uppercase tracking-wider px-2 py-1 z-20 backdrop-blur-md shadow-lg rounded-sm">
                   Monitoring Active
                </div>
                
                <div className="flex-1 flex items-center justify-center relative">
                   <CameraImageFeed imageUrl={cam.img} cssFilter={cam.filter} />
                </div>
                <div className="p-4 bg-[#0a1628]/95 absolute bottom-0 w-full flex justify-between items-end border-t border-white/10 z-30">
                   <div>
                     <div className="text-white text-[0.85rem] font-source font-semibold mb-1">{cam.loc}</div>
                     <div className="text-aura-slate font-montserrat text-[0.65rem] uppercase tracking-wider">{cam.count} guests detected</div>
                   </div>
                   {cam.alert && (
                     <div className={`text-[0.65rem] uppercase tracking-wider font-semibold ${cam.alertColor} bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20`}>
                       ⚠️ {cam.alert}
                     </div>
                   )}
                </div>
             </div>
           ))}
           
           <div className="relative bg-aura-surface border border-dashed border-aura-rule rounded flex items-center justify-center h-64 cursor-pointer hover:bg-aura-parchment transition">
              <div className="text-aura-navy font-montserrat text-[0.7rem] uppercase tracking-wider font-semibold flex flex-col items-center gap-2">
                 <div className="text-2xl font-light">+</div>
                 Add Camera
              </div>
           </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-end mb-3">
          <h2>AI Manpower Deployment</h2>
          <button 
            className="aura-btn-primary animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]" 
            onClick={handleAutoOptimize}
          >
            Auto-Optimize All
          </button>
        </div>
        <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
        
        {/* Glassmorphism Table Replacement */}
        <div className="mb-4">
          <div className="grid grid-cols-5 text-left px-6 py-2 mb-2">
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted">Zone</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted text-center">Current Staff</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted text-center">AI Recommended</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted">Status</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted text-right">Action</div>
          </div>
          
          <div className="space-y-3">
             {staffData.map(r => (
               <div key={r.zone} className="grid grid-cols-5 items-center bg-[#0a1628]/90 backdrop-blur-md border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] rounded px-6 py-4 hover:bg-[#0a1628] hover:border-blue-400/60 transition-all duration-300 group">
                 <div className="text-white font-source text-[0.95rem] font-medium">{r.zone}</div>
                 <div className="text-center text-white/70 font-source text-[0.95rem]">{r.curr}</div>
                 <div className="text-center text-white font-source text-[1.05rem] font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{r.rec}</div>
                 <div className={`font-montserrat text-[0.65rem] tracking-wider uppercase font-semibold ${r.statColor}`}>{r.stat}</div>
                 <div className="text-right">
                    <button 
                       className="aura-btn-primary text-[0.65rem] uppercase tracking-wider px-4 py-1.5 rounded-sm shrink-0" 
                       onClick={() => deployAlert(r.zone)}
                    >
                      Deploy Now
                    </button>
                 </div>
               </div>
             ))}
          </div>
        </div>
        <div className="bg-amber-500/5 border-l-[3px] border-amber-500 p-5 rounded-r">
          <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-amber-600 mb-2 font-semibold">AI Insight Summary</div>
          <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed">
            Based on current footfall at the Restaurant (12 guests) and Pool (5 guests), AURA recommends redeploying 2 staff from Reception to the Restaurant immediately.
          </p>
        </div>
      </div>

      <div className="mt-12 mb-12">
        <h2>Restaurant Management Hub</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <div className="aura-card p-5 border-t-[3px] border-t-blue-500">
             <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1 flex items-center gap-2">🍽️ Covers Served Today</div>
             <div className="font-cormorant text-[1.8rem] font-semibold text-aura-navy">142</div>
           </div>
           <div className="aura-card p-5 border-t-[3px] border-t-blue-500">
             <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1 flex items-center gap-2">⏱️ Avg Turnover Time</div>
             <div className="font-cormorant text-[1.8rem] font-semibold text-aura-navy">45m</div>
           </div>
           <div className="aura-card p-5 border-t-[3px] border-t-blue-500">
             <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1 flex items-center gap-2">💰 F&B Revenue</div>
             <div className="font-cormorant text-[1.8rem] font-semibold text-aura-navy">₹85,400</div>
           </div>
           <div className="aura-card p-5 border-t-[3px] border-t-amber-500 bg-amber-50/30">
             <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-2">📉 Idle Table %</div>
             <div className="font-cormorant text-[1.8rem] font-semibold text-amber-700">22%</div>
             <div className="text-[0.6rem] text-amber-600 mt-1 uppercase tracking-wider">Above threshold (20%)</div>
           </div>
        </div>

        {/* Zones */}
        <div className="flex gap-2 mb-6 border-b border-aura-rule pb-2 overflow-x-auto">
          {['Main Dining', 'Outdoor Terrace', 'Private Dining', 'Bar Area'].map(zone => (
            <button 
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-4 py-2 font-montserrat text-[0.7rem] uppercase tracking-wider rounded-t transition ${activeZone === zone ? 'bg-blue-500/10 text-blue-700 font-bold border-b-2 border-blue-500' : 'text-aura-slate hover:bg-aura-surface'}`}
            >
              {zone}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
           {/* Floor Plan */}
           <div className="aura-card p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)] relative">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-2">Table & Layout Overview - {activeZone}</h3>
              <div className="font-source text-[0.8rem] text-aura-slate mb-6">Tables: 24 Total | 10 Available | 11 Occupied | 3 Reserved</div>
              
              <div className="grid grid-cols-6 gap-3 lg:gap-4 md:grid-cols-6">
                 {tables.map(t => (
                    <div 
                      key={t.id} 
                      onClick={() => setSelectedTable(t.id)}
                      className={`relative aspect-square border-2 rounded-[0.5rem] flex items-center justify-center cursor-pointer transition transform hover:scale-105 shadow-sm ${t.color} ${selectedTable === t.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    >
                      <span className="font-source text-[0.85rem] font-bold text-gray-800 absolute opacity-60">T{t.id}</span>
                    </div>
                 ))}
              </div>

              {selectedTable && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded border border-aura-rule p-5 z-20 w-[240px] animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-start mb-3 border-b border-aura-rule pb-2">
                    <div className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-navy font-bold">Table {selectedTable} Details</div>
                    <button onClick={() => setSelectedTable(null)} className="text-aura-slate hover:text-aura-navy"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2 font-source text-[0.85rem] text-aura-slate">
                    <div className="flex justify-between"><span>Guest:</span> <span className="font-semibold text-aura-navy">Mr. R. Sharma</span></div>
                    <div className="flex justify-between"><span>Time:</span> <span>19:30</span></div>
                    <div className="flex justify-between"><span>Orders:</span> <span className="text-amber-600 font-semibold">2 Pending</span></div>
                    <div className="flex justify-between"><span>Waiter:</span> <span>Amit V.</span></div>
                  </div>
                </div>
              )}
           </div>

           {/* Reservation Queue */}
           <div className="aura-card p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)] flex flex-col h-[400px]">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-4">Reservation Queue</h3>
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[0.85rem] p-4 rounded mb-4 shadow-sm border-l-4 border-l-amber-500">
                 <strong className="font-montserrat text-[0.65rem] uppercase tracking-wider block mb-1">AI Insight</strong>
                 <p className="font-source text-[0.9rem] leading-snug">Peak in 30 mins — prepare 4 tables near window for incoming party groups.</p>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                 {[
                   { time: "20:00", name: "Gupta Family", pax: 4, req: "Window Seat" },
                   { time: "20:15", name: "D. Banerjee", pax: 2, req: "Anniversary" },
                   { time: "20:30", name: "Corporate Group", pax: 8, req: "Private Area" },
                   { time: "20:45", name: "S. Patel", pax: 3, req: "None" },
                   { time: "21:00", name: "M. Khan", pax: 2, req: "Allergic to Nuts" },
                 ].map((res, i) => (
                   <div key={i} className="flex flex-col bg-aura-surface border border-aura-rule p-3 hover:bg-aura-parchment transition">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-source font-semibold text-aura-navy text-[0.9rem] flex items-center gap-2">
                           {res.time} <span className="w-1 h-1 rounded-full bg-aura-slate"></span> {res.name}
                        </div>
                        <div className="font-montserrat text-[0.6rem] uppercase bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded">
                           {res.pax} Pax
                        </div>
                      </div>
                      <div className="font-source text-[0.8rem] text-aura-slate flex items-center gap-1">
                        <span className="text-aura-gold">✦</span> Request: {res.req}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10">
        {/* Left: Floor Map */}
        <div>
          <h2>Floor Intelligence Map</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="aura-card p-6">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              {/* Corridor */}
              <rect x="100" y="160" width="600" height="80" fill="var(--color-aura-parchment)" />
              
              {/* Service Room Left */}
              <rect x="20" y="160" width="80" height="80" fill="var(--color-aura-surface)" stroke="var(--color-aura-rule)" />
              <text x="60" y="205" textAnchor="middle" className="font-montserrat text-[10px] fill-aura-muted">SRV</text>
              
              {/* Elevator Right */}
              <rect x="700" y="160" width="80" height="80" fill="var(--color-aura-surface)" stroke="var(--color-aura-rule)" />
              <text x="740" y="205" textAnchor="middle" className="font-montserrat text-[10px] fill-aura-muted">ELEV</text>

              {/* Top Rooms (801-810) */}
              {[...Array(10)].map((_, i) => {
                const isOccupied = [0, 2, 3, 5, 8].includes(i);
                const isVIP = i === 5;
                const isHWC = i === 2;
                const fill = isVIP ? 'var(--color-aura-gold)' : isHWC ? 'var(--color-aura-rule-dark)' : isOccupied ? 'var(--color-aura-navy)' : 'var(--color-aura-surface)';
                const textFill = (isOccupied || isVIP || isHWC) ? 'white' : 'var(--color-aura-slate)';
                return (
                  <g key={`top-${i}`} onClick={() => setSelectedRoom(801 + i)} className="cursor-pointer hover:opacity-80 transition-opacity">
                    <rect x={100 + i * 60} y="40" width="60" height="120" fill={fill} stroke="var(--color-aura-white)" strokeWidth="2" />
                    <text x={130 + i * 60} y="105" textAnchor="middle" className="font-montserrat text-[12px]" fill={textFill}>80{i+1}</text>
                  </g>
                );
              })}

              {/* Bottom Rooms (811-820) */}
              {[...Array(10)].map((_, i) => {
                const isOccupied = [1, 4, 6, 7, 9].includes(i);
                const isVIP = i === 9;
                const fill = isVIP ? 'var(--color-aura-gold)' : isOccupied ? 'var(--color-aura-navy)' : 'var(--color-aura-surface)';
                const textFill = (isOccupied || isVIP) ? 'white' : 'var(--color-aura-slate)';
                return (
                  <g key={`bot-${i}`} onClick={() => setSelectedRoom(811 + i)} className="cursor-pointer hover:opacity-80 transition-opacity">
                    <rect x={100 + i * 60} y="240" width="60" height="120" fill={fill} stroke="var(--color-aura-white)" strokeWidth="2" />
                    <text x={130 + i * 60} y="305" textAnchor="middle" className="font-montserrat text-[12px]" fill={textFill}>81{i+1}</text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-aura-navy"></div>
                <span className="font-montserrat text-[0.65rem] uppercase text-aura-slate">Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-aura-surface border border-aura-rule"></div>
                <span className="font-montserrat text-[0.65rem] uppercase text-aura-slate">Vacant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-aura-gold"></div>
                <span className="font-montserrat text-[0.65rem] uppercase text-aura-slate">VIP</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-aura-rule-dark"></div>
                <span className="font-montserrat text-[0.65rem] uppercase text-aura-slate">HWC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Strategic Yield & Inventory */}
        <div>
          <h2>Strategic Override Engine</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          {/* Inventory Holdback Module */}
          <div className="aura-card overflow-hidden mb-6">
            <div className="bg-aura-parchment px-4 py-2 border-b border-aura-rule flex justify-between items-center">
              <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-navy">Inventory Holdback Status</span>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-aura-warning animate-pulse"></div>
                <span className="font-montserrat text-[0.6rem] uppercase tracking-wider text-aura-warning">Lockdown</span>
              </div>
            </div>
            <div className="flex justify-between items-center px-6 py-4 bg-aura-white border-b border-aura-rule">
              <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">Urgent Reserves</span>
              <span className="font-cormorant font-semibold text-[1.6rem] text-aura-navy">12 Rooms</span>
            </div>
            
            <div className="p-4 bg-aura-surface text-center">
               <span className="font-source text-[0.85rem] text-aura-slate block mb-2">
                 <strong>AI Reasoning:</strong> Storm trajectory escalating. Local flight cancellation rate &gt;50. Reserving block for stranded CIP/high-tier guests.
               </span>
            </div>
          </div>

          {/* Dynamic Pricing Module */}
          <div className="aura-card overflow-hidden mb-6">
            <div className="bg-aura-parchment px-4 py-2 border-b border-aura-rule flex justify-between items-center">
              <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-navy">Real-Time Premium Pricing</span>
            </div>
            {[
              { label: 'Base Rate (Standard)', value: '₹12,000' },
              { label: 'Scarcity Multiplier', value: '2.4x' },
              { label: 'Premium Offer Rate', value: '₹28,800' },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-4 ${i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-parchment'}`}>
                <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">{row.label}</span>
                <span className={`font-cormorant font-semibold text-[1.6rem] ${i === 2 ? 'text-aura-gold' : 'text-aura-navy'}`}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Booking Queue Module */}
          <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-navy p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-navy font-bold">Intelligent Waitlist Active</div>
              <span className="aura-badge">4 In Queue</span>
            </div>
            <div className="font-source text-[0.95rem] text-aura-slate leading-relaxed mb-4">
              Regular inventory sold out. Evaluating queue Priority Scores for 12 held-back rooms. Waitlisted guests will receive automated premium offers based on USI (Urgency-Scarcity Index).
            </div>
            <button className="aura-btn-secondary w-full">Manage Overflow Queue</button>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full mt-10 mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        <div>
          <h2>Interactive 3D Masterplan</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          <p className="font-source text-[0.95rem] text-aura-slate leading-relaxed mb-6">
            Rotate and navigate the 3D property masterplan to preview specific room details. Hotspots provide real-time window views, layout availability, and spatial geometry.
          </p>
          <div className="w-full h-[500px] bg-aura-surface border border-aura-rule rounded-[2px] relative overflow-hidden flex items-center justify-center">
            <Canvas camera={{ position: [6, 4, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <InteractiveHotelModel onSelectRoom={(id) => setSelectedRoom(id)} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
          </div>
        </div>
        
        <div>
           <h2>3D Filters & Overlays</h2>
           <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
           <div className="aura-card p-6 mb-6">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-4">View Modes</h3>
              <div className="space-y-3">
                <button className="aura-btn-gold w-full text-left flex justify-between">
                  <span>Occupancy Status</span>
                  <span>Active</span>
                </button>
                <button className="bg-aura-surface border border-aura-rule px-4 py-2 text-[0.8rem] text-aura-slate font-montserrat uppercase tracking-wider w-full text-left hover:bg-aura-parchment transition-colors flex justify-between">
                  <span>Thermal Imaging</span>
                  <span>Inactive</span>
                </button>
                <button className="bg-aura-surface border border-aura-rule px-4 py-2 text-[0.8rem] text-aura-slate font-montserrat uppercase tracking-wider w-full text-left hover:bg-aura-parchment transition-colors flex justify-between">
                  <span>Structural Integrity</span>
                  <span>Inactive</span>
                </button>
              </div>
           </div>
           
           <div className="bg-aura-parchment border-l-[3px] border-l-aura-navy p-5">
              <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">3D Navigation Tip</div>
              <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed">
                Click and drag to rotate the tower. Scroll to zoom in on specific spatial geometry. Left-click any room to pull its live sensory profile.
              </p>
           </div>
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-white/85 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-aura-white border border-aura-rule rounded-[4px] border-l-[3px] border-l-aura-navy max-w-[500px] w-full p-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.8rem] mb-0">Room {selectedRoom}</h2>
              <button onClick={() => setSelectedRoom(null)} className="text-aura-slate hover:text-aura-navy">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Status</span>
                <span className="font-source text-[0.9rem] text-aura-navy font-medium">
                  {selectedRoom === 806 || selectedRoom === 820 ? 'VIP Occupied' : 
                   selectedRoom === 803 ? 'HWC Occupied' : 
                   [801, 804, 809, 812, 815, 817, 818].includes(selectedRoom) ? 'Occupied' : 'Vacant'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Temperature</span>
                <span className="font-source text-[0.9rem] text-aura-navy">22.5°C</span>
              </div>
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Lighting Mode</span>
                <span className="font-source text-[0.9rem] text-aura-navy">Evening Relax</span>
              </div>
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Last Entry</span>
                <span className="font-source text-[0.9rem] text-aura-slate">14 mins ago</span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedRoom(null)} className="aura-btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
