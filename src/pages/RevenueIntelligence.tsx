import React, { useState } from 'react';
import { analyzeAura } from '../lib/gemini';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RevenueIntelligence() {
  const [insight, setInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const roomData = [
    { type: 'SUNK', rev: 85 },
    { type: 'SUSK', rev: 72 },
    { type: 'DLNK', rev: 94 },
    { type: 'DLSK', rev: 68 },
    { type: 'SUNT', rev: 45 },
    { type: 'SUST', rev: 30 },
  ];

  const generateInsight = async () => {
    setIsGenerating(true);
    setInsight(null);
    try {
      const data = await analyzeAura('revenue', { text: roomData });
      setInsight(data.result);
    } catch (err) {
      console.error("Failed to generate insight", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Revenue Intelligence</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Dynamic pricing and market positioning engine.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="aura-card p-6 border-t-[3px] border-t-aura-gold">
          <div className="aura-metric">₹8,420</div>
          <div className="aura-badge uppercase mt-1">RevPAR</div>
        </div>
        <div className="aura-card p-6">
          <div className="aura-metric">₹12,100</div>
          <div className="aura-badge uppercase mt-1">ADR</div>
        </div>
        <div className="aura-card p-6">
          <div className="aura-metric">78.3%</div>
          <div className="aura-badge uppercase mt-1">Occupancy</div>
        </div>
        <div className="aura-card p-6">
          <div className="aura-metric text-aura-success">+42%</div>
          <div className="aura-badge uppercase mt-1">Ancillary Yield</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Chart */}
        <div>
          <h2>Revenue by Room Classification</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="mb-8 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roomData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-aura-rule)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--color-aura-muted)', fontSize: 10, fontFamily: 'Montserrat' }} />
                <YAxis dataKey="type" type="category" tick={{ fill: 'var(--color-aura-slate)', fontSize: 12, fontFamily: 'Montserrat' }} width={50} />
                <Tooltip 
                  cursor={{ fill: 'var(--color-aura-surface)' }}
                  contentStyle={{ backgroundColor: 'var(--color-aura-white)', border: '1px solid var(--color-aura-rule)', borderRadius: '2px', fontFamily: 'Source Serif 4' }}
                  formatter={(value: number) => [`${value}%`, 'Revenue Share']}
                />
                <Bar dataKey="rev" fill="var(--color-aura-navy)" radius={[0, 2, 2, 0]}>
                  {roomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-aura-gold)' : 'var(--color-aura-navy)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <button 
            onClick={generateInsight}
            disabled={isGenerating}
            className="aura-btn-gold w-full mb-6 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate AI Revenue Insight'}
          </button>

          {isGenerating && (
            <div className="h-24 bg-aura-parchment rounded border-l-[3px] border-aura-gold animate-pulse"></div>
          )}

          {insight && !isGenerating && (
            <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-gold p-5 animate-in fade-in duration-300">
              <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">AURA Insight</div>
              <div className="font-source text-[0.95rem] text-aura-slate leading-relaxed whitespace-pre-wrap">
                {insight}
              </div>
            </div>
          )}
        </div>

        {/* Right: Calendar */}
        <div>
          <h2>7-Day Rate Intelligence</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
        <div className="w-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/5">Date</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-[25%] hidden md:table-cell">Day Type</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/5">Base Rate</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/5">AURA Rate</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-[15%]">Variance</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Oct 12', type: 'Standard', base: '₹11,500', aura: '₹11,800', var: '+2.6%', blackout: false },
                { date: 'Oct 13', type: 'Standard', base: '₹11,500', aura: '₹12,100', var: '+5.2%', blackout: false },
                { date: 'Oct 14', type: 'Weekend', base: '₹13,000', aura: '₹14,500', var: '+11.5%', blackout: false },
                { date: 'Oct 15', type: 'Event', base: '₹13,000', aura: '₹18,000', var: '+38.4%', blackout: true },
                { date: 'Oct 16', type: 'Event', base: '₹11,500', aura: '₹16,500', var: '+43.4%', blackout: true },
                { date: 'Oct 17', type: 'Standard', base: '₹11,500', aura: '₹11,000', var: '-4.3%', blackout: false },
                { date: 'Oct 18', type: 'Standard', base: '₹11,500', aura: '₹11,500', var: '0.0%', blackout: false },
              ].map((row, i) => (
                <tr key={i} className={row.blackout ? 'bg-aura-parchment border-l-[2px] border-l-aura-gold' : i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-surface'}>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule text-[0.75rem] md:text-[0.85rem] whitespace-nowrap">{row.date}</td>
                  <td className="py-3 px-2 md:px-4 border-b border-aura-rule hidden md:table-cell">
                    {row.blackout ? (
                      <span className="font-montserrat text-[0.6rem] uppercase tracking-wider text-aura-gold font-medium">Blackout</span>
                    ) : (
                      <span className="aura-table-body">{row.type}</span>
                    )}
                  </td>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule text-[0.75rem] md:text-[0.85rem]">{row.base}</td>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule font-medium text-aura-navy text-[0.75rem] md:text-[0.85rem]">{row.aura}</td>
                  <td className={`aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule text-[0.75rem] md:text-[0.85rem] ${row.var.startsWith('+') ? 'text-aura-success' : row.var.startsWith('-') ? 'text-aura-warning' : 'text-aura-slate'}`}>
                    {row.var}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Full Width: Comp Intel */}
      <div>
        <h2>Market Intelligence — Live Rate Scan</h2>
        <p className="font-source italic text-[0.9rem] text-aura-muted mt-1 mb-4">Updated 2 minutes ago · 5 properties monitored</p>
        
        <div className="w-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/3">Property</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/4">Current Rate</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-1/4">AURA Suggested</th>
                <th className="aura-table-header py-3 px-2 md:px-4 border-b border-aura-rule w-[15%] hidden md:table-cell">Position</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'The Grand Oberoi', rate: '₹14,200', aura: '₹14,500', pos: 'Below Market' },
                { name: 'ITC Windsor', rate: '₹11,800', aura: '₹12,100', pos: 'Above Market' },
                { name: 'Taj West End', rate: '₹13,500', aura: '₹13,500', pos: 'At Market' },
                { name: 'Leela Palace', rate: '₹15,000', aura: '₹14,500', pos: 'Above Market' },
                { name: 'JW Marriott', rate: '₹12,500', aura: '₹12,100', pos: 'Below Market' },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-surface'}>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule font-medium text-aura-navy truncate text-[0.75rem] md:text-[0.85rem]" title={row.name}>{row.name}</td>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule text-[0.75rem] md:text-[0.85rem]">{row.rate}</td>
                  <td className="aura-table-body py-3 px-2 md:px-4 border-b border-aura-rule font-medium text-aura-navy text-[0.75rem] md:text-[0.85rem]">{row.aura}</td>
                  <td className="py-3 px-2 md:px-4 border-b border-aura-rule hidden md:table-cell">
                    <span className="font-montserrat text-[0.6rem] uppercase tracking-wider text-aura-slate border border-aura-rule px-2 py-1 rounded-[2px] bg-aura-white">
                      {row.pos}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-[1px] bg-aura-rule w-full mt-10 mb-10"></div>

      {/* Emergency Overrides (Strictly Additive) */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10">
        <div>
           <h2>Emergency Holdback & Scarcity Matrix</h2>
           <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
           <div className="bg-aura-parchment border-l-[3px] border-l-aura-warning p-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                 <h3 className="not-italic font-playfair font-normal text-[1.2rem] text-aura-navy m-0">Environmental Trigger</h3>
                 <span className="aura-badge uppercase !text-aura-warning !border-aura-warning font-bold animate-pulse">Active</span>
              </div>
              <p className="font-source text-[0.95rem] text-aura-slate leading-relaxed mb-4">
                Sudden spike in flight cancellations detected (Flight Cancellation Rate &gt;45%). AI has autonomously decoupled 15% of standard inventory into the Emergency Overflow Pool.
              </p>
              <div className="flex justify-between items-center border-t border-aura-rule pt-4">
                 <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Rooms Held Back</span>
                 <span className="font-source text-[1.2rem] font-bold text-aura-navy">18 Rooms</span>
              </div>
           </div>

           <div className="aura-card p-6">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-4">Intelligent Booking Queue</h3>
              <p className="font-source text-[0.85rem] text-aura-slate leading-relaxed mb-4">Standard inventory is at 0%. Waitlisted guests are being algorithmically prioritized and offered emergency rooms at premium scarcity rates.</p>
              
              <div className="space-y-3">
                {[
                  { name: 'Dr. Evelyn Sato', priority: 98, status: 'Offered Rate' },
                  { name: 'Michael Chen', priority: 85, status: 'In Queue' },
                  { name: 'Sarah Jenkins', priority: 72, status: 'In Queue' }
                ].map((guest, i) => (
                  <div key={i} className="flex justify-between items-center bg-aura-surface border border-aura-rule p-3">
                    <div>
                       <div className="font-source font-medium text-[0.9rem] text-aura-navy">{guest.name}</div>
                       <div className="font-montserrat text-[0.65rem] uppercase text-aura-muted mt-1">Priority: {guest.priority}</div>
                    </div>
                    <span className={`font-montserrat text-[0.7rem] uppercase tracking-wider ${guest.status === 'Offered Rate' ? 'text-aura-gold' : 'text-aura-slate'}`}>
                      {guest.status}
                    </span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div>
           <h2>Dynamic Premium & Revenue ROI Pipeline</h2>
           <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
           
           <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="bg-aura-surface border border-aura-rule p-6">
                <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-2">Standard Base Rate</div>
                <div className="font-cormorant font-semibold text-[1.8rem] text-aura-navy">₹11,500</div>
             </div>
             <div className="bg-aura-surface border border-aura-rule border-b-[3px] border-b-aura-gold p-6">
                <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-gold font-bold mb-2">Emergency Premium Rate</div>
                <div className="font-cormorant font-semibold text-[1.8rem] text-aura-navy">₹28,750</div>
                <div className="font-source text-[0.75rem] text-aura-slate mt-2">Elasticity Multiplier: 2.5x</div>
             </div>
           </div>

           <div className="aura-card p-6">
              <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-4">AI Audit Trail: Revenue Lift</h3>
              <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed mb-6">
                Revenue generated purely from the AI Emergency Holdback algorithm this month compared to standard flat pricing.
              </p>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { category: 'General Sales', value: 850000, fill: 'var(--color-aura-navy)' },
                    { category: 'AI Premium Lift', value: 310500, fill: 'var(--color-aura-gold)' }
                  ]} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="category" type="category" tick={{ fill: 'var(--color-aura-slate)', fontSize: 12, fontFamily: 'Montserrat' }} />
                    <Tooltip cursor={{fill: 'transparent'}} formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Generated']} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                      {
                        [0,1].map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 1 ? 'var(--color-aura-gold)' : 'var(--color-aura-navy)'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center border-t border-aura-rule pt-4 mt-2">
                 <span className="font-montserrat text-[0.8rem] uppercase tracking-wider text-aura-navy font-bold">Total AI Revenue Lift</span>
                 <span className="font-source text-[1.2rem] font-bold text-aura-success">+₹3,10,500</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
