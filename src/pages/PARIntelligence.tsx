import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const roiData = [
  { month: 'Jan', traditionalCost: 45000, optimizedCost: 41000 },
  { month: 'Feb', traditionalCost: 42000, optimizedCost: 35000 },
  { month: 'Mar', traditionalCost: 48000, optimizedCost: 38000 },
  { month: 'Apr', traditionalCost: 51000, optimizedCost: 39000 },
  { month: 'May', traditionalCost: 65000, optimizedCost: 44000 },
  { month: 'Jun', traditionalCost: 70000, optimizedCost: 47000 },
];

export default function PARIntelligence() {
  const [isHighOccupancy, setIsHighOccupancy] = useState(false);
  const [inRoom, setInRoom] = useState(280);
  const [inLaundry, setInLaundry] = useState(185);
  const [inStorage, setInStorage] = useState(220);

  useEffect(() => {
    const interval = setInterval(() => {
      setInRoom(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setInLaundry(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setInStorage(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [reordered, setReordered] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleReorder = (item: string) => {
    setReordered(prev => ({ ...prev, [item]: true }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Resource Consciousness</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">PARIM — Predictive Availability & Resource Intelligence Model</p>
      </div>

      {/* PAR Linen Flow */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <span className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Current PAR Level</span>
              <span className="font-cormorant font-semibold text-[2.8rem] text-aura-navy leading-none">
                {isHighOccupancy ? '4.5' : '3.2'}
              </span>
            </div>
            {isHighOccupancy && (
              <div className="bg-aura-surface border border-aura-gold px-3 py-1 rounded-full ml-4">
                <span className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-gold">PAR Elevated — High Occupancy</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsHighOccupancy(!isHighOccupancy)}
            className="aura-btn-secondary"
          >
            {isHighOccupancy ? 'Deactivate High Occupancy' : 'Activate High Occupancy Mode'}
          </button>
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="aura-card p-6 flex-1 text-center">
            <div className="font-cormorant font-semibold text-[2.4rem] text-aura-navy mb-2">{inRoom}</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted">Set One — Active</div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-aura-navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <div className="aura-card p-6 flex-1 text-center">
            <div className="font-cormorant font-semibold text-[2.4rem] text-aura-navy mb-2">{inLaundry}</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted">Set Two — In Process</div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-aura-navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <div className="aura-card p-6 flex-1 text-center">
            <div className="font-cormorant font-semibold text-[2.4rem] text-aura-navy mb-2">{inStorage}</div>
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted">Set Three — Reserve</div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Forecast Chart */}
      <div>
        <h2>6-Week PAR Forecast</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="w-full h-[180px] relative">
          <svg viewBox="0 0 1000 180" className="w-full h-full preserve-aspect-ratio-none">
            {/* Grid */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" y1={i * 45} x2="1000" y2={i * 45} stroke="var(--color-aura-parchment)" strokeWidth="0.5" />
            ))}
            
            {/* Area Fill */}
            <path d="M0,126 L200,108 L400,72 L600,0 L800,45 L1000,90 L1000,180 L0,180 Z" fill="rgba(13,27,62,0.06)" />
            
            {/* Line */}
            <polyline points="0,126 200,108 400,72 600,0 800,45 1000,90" fill="none" stroke="var(--color-aura-navy)" strokeWidth="2" />
            
            {/* Event Line */}
            <line x1="600" y1="0" x2="600" y2="180" stroke="var(--color-aura-gold)" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="610" y="20" className="font-montserrat text-[10px] fill-aura-gold uppercase tracking-wider">IPL Final</text>

            {/* Y Axis Labels */}
            <text x="0" y="15" className="font-montserrat text-[10px] fill-aura-muted">6.0</text>
            <text x="0" y="175" className="font-montserrat text-[10px] fill-aura-muted">2.0</text>
            
            {/* X Axis Labels */}
            {['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((w, i) => (
              <text key={w} x={i * 200} y="175" className="font-montserrat text-[10px] fill-aura-muted">{w}</text>
            ))}
          </svg>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Bed Sheets', stock: 78, count: 1240 },
          { name: 'Pillow Covers', stock: 45, count: 890 },
          { name: 'Bath Towels', stock: 22, count: 410 },
          { name: 'Toiletries', stock: 85, count: 3500 },
          { name: 'Mini Bar Stock', stock: 60, count: 850 },
          { name: 'Room Fragrance', stock: 15, count: 120 },
        ].map((item, i) => {
          const color = item.stock > 60 ? '#2D6A4F' : item.stock > 30 ? '#92400E' : '#DC2626';
          const isReordered = reordered[item.name];
          return (
            <div key={i} className="aura-card p-5">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-4">{item.name}</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="font-cormorant font-semibold text-[1.8rem] text-aura-navy leading-none">{item.count}</span>
                {isReordered ? (
                  <span className="font-montserrat text-[0.65rem] uppercase text-aura-success">✓ Ordered</span>
                ) : (
                  <button 
                    onClick={() => handleReorder(item.name)}
                    className="font-montserrat text-[0.65rem] uppercase text-aura-navy border border-aura-navy px-3 py-1 rounded-[2px] hover:bg-aura-surface"
                  >
                    Reorder
                  </button>
                )}
              </div>
              <div className="w-full h-[3px] bg-aura-parchment rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${item.stock}%`, backgroundColor: color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Timeline */}
      <div>
        <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-4">Upcoming Revenue Events</div>
        <div className="flex flex-wrap gap-4 pb-4">
          {[
            { name: "IPL Season", days: 18, demand: "+62%", par: "4.5", high: true },
            { name: "Diwali", days: 42, demand: "+88%", par: "5.0", high: true },
            { name: "New Year's Eve", days: 74, demand: "+94%", par: "5.5", high: true },
            { name: "G20 Summit", days: 91, demand: "+71%", par: "4.8", high: false },
            { name: "ICC World Cup", days: 120, demand: "+55%", par: "4.2", high: false },
          ].map((event, i) => (
            <div key={i} className={`aura-card p-4 flex-1 min-w-[200px] max-w-[280px] ${event.high ? 'border-l-[3px] border-l-aura-gold' : ''}`}>
              <div className="font-playfair text-[1.1rem] text-aura-navy mb-3">{event.name}</div>
              <div className="space-y-1 mb-4">
                <div className="font-source text-[0.85rem] text-aura-slate">{event.days} days away</div>
                <div className="font-source text-[0.85rem] text-aura-slate">Demand: {event.demand}</div>
                <div className="font-source text-[0.85rem] text-aura-slate">PAR Rec: {event.par}</div>
              </div>
              <button 
                onClick={() => setSelectedEvent(event)}
                className="font-montserrat text-[0.65rem] uppercase text-aura-navy border border-aura-navy px-3 py-1.5 rounded-[2px] hover:bg-aura-surface w-full"
              >
                View Strategy
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full mt-10 mb-10"></div>

      {/* ROI Analytics Module - 3. PAR Intelligence ROI Graph */}
      <div>
        <h2>Supply Chain Financial Overview (ROI)</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        <div className="aura-card p-6">
          <div className="mb-4">
            <h3 className="not-italic font-playfair font-normal text-[1.2rem] text-aura-navy">Money Saved by AI PAR Analysis</h3>
            <p className="font-source text-[0.95rem] text-aura-slate leading-relaxed">
              Comparison of estimated traditional static PAR costs versus dynamically optimized AI inventory costs.
            </p>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorO" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D1B3E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0D1B3E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Source Serif 4, serif' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem' }} />
                <Area type="monotone" dataKey="traditionalCost" name="Traditional Static Cost" stroke="#DC2626" strokeWidth={2} fillOpacity={1} fill="url(#colorT)" />
                <Area type="monotone" dataKey="optimizedCost" name="AI Optimized Cost" stroke="#0D1B3E" strokeWidth={2} fillOpacity={1} fill="url(#colorO)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategy Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-white/85 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-aura-white border border-aura-rule rounded-[4px] border-l-[3px] border-l-aura-gold max-w-[600px] w-full p-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.8rem] mb-0">{selectedEvent.name} — PAR Strategy</h2>
              <button onClick={() => setSelectedEvent(null)} className="text-aura-slate hover:text-aura-navy">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-aura-surface p-4 rounded-sm">
                  <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Days Away</div>
                  <div className="font-source text-[1.2rem] text-aura-navy">{selectedEvent.days}</div>
                </div>
                <div className="bg-aura-surface p-4 rounded-sm">
                  <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Demand Surge</div>
                  <div className="font-source text-[1.2rem] text-aura-success">{selectedEvent.demand}</div>
                </div>
                <div className="bg-aura-surface p-4 rounded-sm">
                  <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Target PAR</div>
                  <div className="font-source text-[1.2rem] text-aura-navy">{selectedEvent.par}</div>
                </div>
              </div>

              <div>
                <h3 className="font-playfair italic text-[1.1rem] text-aura-navy mb-3">Action Plan</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-aura-gold mt-1">•</span>
                    <span className="font-source text-[0.95rem] text-aura-slate">Increase linen inventory by 20% starting T-14 days.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-aura-gold mt-1">•</span>
                    <span className="font-source text-[0.95rem] text-aura-slate">Schedule 3 additional laundry shifts during peak days.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-aura-gold mt-1">•</span>
                    <span className="font-source text-[0.95rem] text-aura-slate">Pre-stock VIP suites with extra amenities to reduce ad-hoc requests.</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-aura-rule flex justify-end">
                <button onClick={() => setSelectedEvent(null)} className="aura-btn-primary">Acknowledge Strategy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
