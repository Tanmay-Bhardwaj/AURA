import React, { useState, useEffect } from 'react';

export default function CommandBridge() {
  const [souls, setSouls] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = 847;
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setSouls(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  const [feedEvents, setFeedEvents] = useState([
    { text: "UGI updated · Room 814 · CIP Profile · 3 preferences synced", time: "Just now", warning: false },
    { text: "Blackout Alert: IPL Final · 18 days ahead · Revenue lock engaged", time: "1m ago", warning: true },
    { text: "Empathy Engine: Fussy guest flagged · Room 402 · Staff briefed", time: "2m ago", warning: true },
    { text: "PAR Monitor: Linen at 3.2 PAR · Auto-reorder initiated", time: "5m ago", warning: false },
    { text: "Spatial scan: Zone B2 occupancy detected", time: "8m ago", warning: false },
    { text: "Revenue Intel: Rate adjusted +12% for weekend blackout", time: "12m ago", warning: false },
    { text: "Cultural Engine: Arabic guest arrival · Language mode EN/AR activated", time: "15m ago", warning: false },
    { text: "Integration: Oracle OPERA sync · 847 records updated", time: "18m ago", warning: false },
    { text: "Biometric: Guest Mr. Mehta proximity detected · Floor 8 · Door unlocked", time: "22m ago", warning: false },
    { text: "Supply chain: Towel stock below 3.0 PAR threshold", time: "25m ago", warning: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedEvents(prev => {
        const newEvents = [...prev];
        const first = newEvents.shift();
        if (first) newEvents.push(first);
        return newEvents;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1>Command Bridge</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Real-time intelligence across all seven hemispheres of Project AURA.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="aura-card p-6 border-t-[3px] border-t-aura-gold">
          <div className="aura-metric">{souls}</div>
          <div className="aura-badge uppercase mt-1">Live Guests</div>
        </div>
        <div className="aura-card p-6">
          <div className="flex items-baseline space-x-3">
            <span className="aura-metric">8 / 8</span>
          </div>
          <div className="aura-badge uppercase mt-1 mb-3">Hemispheres Active</div>
          <div className="flex space-x-1.5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-aura-navy"></div>
            ))}
          </div>
        </div>
        <div className="aura-card p-6">
          <div className="flex items-baseline space-x-1">
            <span className="aura-metric">94.2</span>
            <span className="font-cormorant font-semibold text-[1.8rem] text-aura-navy">%</span>
          </div>
          <div className="aura-badge uppercase mt-1 mb-3">Empathy Score</div>
          <div className="h-[3px] bg-aura-parchment w-full">
            <div className="h-full bg-aura-navy w-[94.2%]"></div>
          </div>
        </div>
        <div className="aura-card p-6">
          <div className="aura-metric">₹4.2 Cr</div>
          <div className="aura-badge uppercase mt-1 mb-3">Revenue Index</div>
          <svg width="100%" height="20" className="overflow-visible">
            <polyline 
              points="0,15 20,12 40,18 60,8 80,10 100,2" 
              fill="none" 
              stroke="var(--color-aura-navy)" 
              strokeWidth="1.5" 
            />
          </svg>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
        {/* Left: Feed */}
        <div>
          <h2>Intelligence Feed</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
          <div className="space-y-3 h-[320px] overflow-hidden relative">
            {feedEvents.map((event, i) => (
              <div key={i} className="flex items-start space-x-4 py-2 transition-all duration-500">
                <div className={`mt-1.5 w-1.5 h-1.5 shrink-0 ${event.warning ? 'bg-aura-warning' : 'bg-aura-navy'}`}></div>
                <div className="flex-1 font-source font-light text-[0.95rem] text-aura-slate leading-snug">
                  {event.text}
                </div>
                <div className="aura-badge shrink-0 pt-1">{event.time}</div>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-aura-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Right: Occupancy */}
        <div>
          <h2>Property Occupancy</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-aura-rule)" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="var(--color-aura-navy)" strokeWidth="12" 
                  strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.78)} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-cormorant font-semibold text-[2.4rem] text-aura-navy leading-none">78%</span>
                <span className="aura-badge mt-1">Occupied</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center px-4 py-2 bg-aura-surface border border-aura-rule rounded-sm">
                <span className="font-source text-[0.9rem] text-aura-slate">Occupied</span>
                <span className="font-source font-medium text-[0.9rem] text-aura-navy">312 Rooms</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-aura-white border border-aura-rule rounded-sm">
                <span className="font-source text-[0.9rem] text-aura-slate">Vacant</span>
                <span className="font-source font-medium text-[0.9rem] text-aura-navy">88 Rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Hemisphere Status Panel */}
      <div className="bg-aura-parchment border border-aura-rule rounded-[4px] p-6">
        <h3 className="mb-6">Intelligence Hemisphere Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 divide-x divide-aura-rule-dark">
          {[
            "Unified Guest Intel (UGI)", "Spatial Engine", "PAR Intelligence", 
            "Empathy Engine", "Revenue Intel", "Cultural Intel", "Privacy Sov", "Integration Layer"
          ].map((name, i) => (
            <div key={i} className={`flex flex-col items-center text-center px-1 ${i === 0 ? 'pl-0 border-l-0' : ''} ${i % 4 === 0 && i !== 0 ? 'md:border-l-0 lg:border-l' : ''} ${i % 2 === 0 && i !== 0 ? 'border-l-0 md:border-l' : ''}`}>
              <span className="font-montserrat font-medium text-[0.6rem] xl:text-[0.65rem] uppercase tracking-wider text-aura-navy mb-3">{name}</span>
              <span className="aura-badge-pill flex-shrink-0 text-aura-success border-aura-success/20 bg-aura-success/5">● Online</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
