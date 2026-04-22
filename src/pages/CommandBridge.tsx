import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { 
  Globe, Droplet, Zap, TrendingUp, Users, 
  Building, Recycle, Scale, Handshake, 
  ChevronDown, ChevronUp, Check, FileText, Download, Share2
} from 'lucide-react';

const footprintData = [
  { month: 'Apr', preAura: 120, withAura: 120 },
  { month: 'May', preAura: 125, withAura: 118 },
  { month: 'Jun', preAura: 130, withAura: 115 },
  { month: 'Jul', preAura: 140, withAura: 110 },
  { month: 'Aug', preAura: 145, withAura: 105 },
  { month: 'Sep', preAura: 135, withAura: 98 },
  { month: 'Oct', preAura: 125, withAura: 90 },
  { month: 'Nov', preAura: 120, withAura: 85 },
  { month: 'Dec', preAura: 130, withAura: 82 },
  { month: 'Jan', preAura: 125, withAura: 78 },
  { month: 'Feb', preAura: 115, withAura: 75 },
  { month: 'Mar', preAura: 110, withAura: 72 },
  { month: 'Apr', preAura: 115, withAura: 71.8 },
];

const esgCards = [
  { id: 6, title: "Clean Water & Sanitation", Icon: Droplet, color: "border-l-[#26BDE2]", metric: "Water Saved This Month: 48,000 L", progress: 74, insight: "AI optimized laundry cycles saved 12,000L this week" },
  { id: 7, title: "Affordable & Clean Energy", Icon: Zap, color: "border-l-[#FCC30B]", metric: "Energy Reduction: -28% vs last month", progress: 82, insight: "Smart HVAC reduced energy draw by 18% during low-occupancy hours" },
  { id: 8, title: "Decent Work & Economic Growth", Icon: TrendingUp, color: "border-l-[#A21942]", metric: "Staff Wellbeing Score: 87/100", progress: 87, insight: "AI shift optimization reduced overtime hours by 31%" },
  { id: 10, title: "Reduced Inequalities", Icon: Users, color: "border-l-[#DD1367]", metric: "Inclusive Hiring Rate: 34% diverse workforce", progress: 68, insight: "4 accessibility-first room configurations deployed this week" },
  { id: 11, title: "Sustainable Cities & Communities", Icon: Building, color: "border-l-[#FD6925]", metric: "Local Vendor Sourcing: 61%", progress: 61, insight: "AURA recommended 3 new local F&B suppliers this month" },
  { id: 12, title: "Responsible Consumption", Icon: Recycle, color: "border-l-[#BF8B2E]", metric: "Food Waste Reduced: -42% vs baseline", progress: 79, insight: "AI buffet forecasting cut over-production by 38% this quarter" },
  { id: 13, title: "Climate Action", Icon: Globe, color: "border-l-[#3F7E44]", metric: "Carbon Footprint: -31% YoY", progress: 91, insight: "Equivalent to removing 34 cars from road this year" },
  { id: 16, title: "Peace, Justice & Strong Institutions", Icon: Scale, color: "border-l-[#00689D]", metric: "Compliance Score: 98.4%", progress: 98, insight: "All guest data practices fully GDPR & DPDP Act compliant" },
  { id: 17, title: "Partnerships for the Goals", Icon: Handshake, color: "border-l-[#19486A]", metric: "Active ESG Partnerships: 7", progress: 70, insight: "2 new NGO collaborations onboarded via AURA this month" },
];

export default function CommandBridge() {
  const [souls, setSouls] = useState(0);
  const [isEsgExpanded, setIsEsgExpanded] = useState(false);
  const [esgScore, setEsgScore] = useState(0);

  const [selectedSdg, setSelectedSdg] = useState<number | null>(null);

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

  useEffect(() => {
    if (isEsgExpanded) {
      let current = 0;
      const interval = setInterval(() => {
          if (current < 84) {
             current+=2;
             setEsgScore(current);
          } else {
             setEsgScore(84);
             clearInterval(interval);
          }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isEsgExpanded]);

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

  const [aiActions, setAiActions] = useState([
    { id: 1, type: "high", text: "Switch rooftop HVAC Unit 3 to eco-mode — saves est. $420/month", status: "open" },
    { id: 2, type: "med", text: "Reduce pool heating by 1.5°C between 11PM–6AM — saves est. 900 kWh/month", status: "open" },
    { id: 3, type: "implemented", text: "AI linen reuse prompts reduced laundry loads by 22% ✓", status: "done" },
    { id: 4, type: "new", text: "Source mangoes from Nashik supplier — reduces food miles by 340 km", status: "open" },
  ]);

  const handleAction = (id: number, action: 'done' | 'dismiss') => {
    setAiActions(actions => actions.map(a => a.id === id ? { ...a, status: action } : a));
  };

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
    <div className="space-y-8 relative">
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

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Sustainability & SDG Intelligence Section */}
      <div className="relative border border-aura-rule rounded-[4px] bg-aura-parchment overflow-hidden">
        {/* Subtle green particles background pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#22C55E 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Header (Collapsible toggle) */}
        <div 
          className="p-6 flex items-center justify-between cursor-pointer hover:bg-aura-surface/50 transition z-10 relative"
          onClick={() => setIsEsgExpanded(!isEsgExpanded)}
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Globe className="w-6 h-6 text-green-500 animate-[spin_10s_linear_infinite]" />
              <h2 className="m-0">Sustainability & SDG Intelligence</h2>
            </div>
            <p className="font-source text-[0.95rem] text-aura-slate">AURA tracks your property's real-time contribution to UN Sustainable Development Goals</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="aura-badge flex items-center space-x-2 border-green-500/30 bg-green-500/10 text-green-700">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               <span>ESG Live Monitoring — Active</span>
            </div>
            {isEsgExpanded ? <ChevronUp className="w-5 h-5 text-aura-navy" /> : <ChevronDown className="w-5 h-5 text-aura-navy" />}
          </div>
        </div>

        {/* Collapsible Content */}
        {isEsgExpanded && (
          <div className="p-6 pt-2 border-t border-aura-rule z-10 relative grid grid-cols-1 gap-10">
            
            {/* Top Row: Hero Widget & AI Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
               
               {/* OVERALL ESG SCORE WIDGET */}
               <div className="bg-[#0a1628]/90 backdrop-blur-md border border-white/10 rounded-[4px] p-8 flex flex-col items-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 pointer-events-none"></div>
                  
                  <div className="relative w-40 h-40 mb-6">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="40" fill="none" 
                        stroke="url(#esg-gradient)" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray="251.2" strokeDashoffset={251.2 - (esgScore / 100) * 251.2} 
                        className="transition-all duration-300 ease-out"
                      />
                      <defs>
                        <linearGradient id="esg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22C55E" />
                          <stop offset="100%" stopColor="#0D9488" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-cormorant font-semibold text-[2rem] text-white leading-none">{esgScore}</span>
                      <span className="font-montserrat text-[0.55rem] text-white/50 uppercase tracking-widest mt-1">/ 100</span>
                    </div>
                  </div>
                  
                  <h3 className="text-white text-[1.2rem] mb-1 font-playfair font-normal tracking-wide">AURA ESG Score</h3>
                  <div className="flex items-center space-x-2 mb-2">
                     <span className="text-yellow-400">🏅</span>
                     <span className="font-source text-[0.9rem] text-white/90">Gold Tier Property</span>
                  </div>
                  <div className="font-source text-[0.75rem] text-white/40 mb-6">Top 12% of properties globally</div>
                  
                  <div className="w-full grid grid-cols-3 gap-2 text-center divide-x divide-white/10 border-t border-white/10 pt-4">
                     <div>
                       <div className="text-green-400 mb-1">🌱</div>
                       <div className="font-montserrat text-[0.6rem] text-white/60 uppercase tracking-wider mb-1">Environmental</div>
                       <div className="font-source font-semibold text-white">88</div>
                     </div>
                     <div>
                       <div className="text-pink-400 mb-1">👥</div>
                       <div className="font-montserrat text-[0.6rem] text-white/60 uppercase tracking-wider mb-1">Social</div>
                       <div className="font-source font-semibold text-white">79</div>
                     </div>
                     <div>
                       <div className="text-blue-400 mb-1">🏛️</div>
                       <div className="font-montserrat text-[0.6rem] text-white/60 uppercase tracking-wider mb-1">Governance</div>
                       <div className="font-source font-semibold text-white">91</div>
                     </div>
                  </div>
               </div>

               {/* AI SUSTAINABILITY RECOMMENDATIONS FEED */}
               <div className="bg-[#0a1628]/90 backdrop-blur-md border border-white/10 rounded-[4px] p-6 flex flex-col shadow-lg">
                  <h3 className="text-white text-[1.1rem] mb-4 font-playfair font-normal flex items-center gap-2 tracking-wide">
                     <Zap className="w-4 h-4 text-yellow-400" /> AURA Sustainability Actions
                  </h3>
                  <div className="flex-1 overflow-auto pr-2 space-y-3 aura-scrollbar">
                     {aiActions.map((action, idx) => (
                        <div 
                           key={action.id} 
                           className={`p-4 rounded-[2px] border transition-all duration-500 animate-in fade-in slide-in-from-right-4 
                             ${action.status === 'done' ? 'bg-white/5 border-white/5 opacity-50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                           style={{ animationDelay: `${idx * 50}ms` }}
                        >
                           <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                 {action.type === 'high' && <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>}
                                 {action.type === 'med' && <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>}
                                 {action.type === 'new' && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>}
                                 {action.type === 'implemented' && <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>}
                                 
                                 <p className={`font-source text-[0.85rem] m-0 ${action.status === 'done' ? 'text-white/40 line-through' : 'text-white/80'}`}>
                                    {action.text}
                                 </p>
                              </div>
                           </div>
                           
                           {action.status === 'open' && (
                             <div className="flex justify-end gap-2 mt-3">
                                <button 
                                  onClick={() => handleAction(action.id, 'dismiss')}
                                  className="px-3 py-1 bg-transparent text-white/40 hover:text-white/80 font-montserrat text-[0.65rem] uppercase tracking-wider transition">
                                  Dismiss
                                </button>
                                <button 
                                  onClick={() => handleAction(action.id, 'done')}
                                  className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition font-montserrat text-[0.65rem] uppercase tracking-wider flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Implement
                                </button>
                             </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="h-[1px] bg-aura-rule w-full my-2"></div>

            {/* SDG IMPACT TRACKER — CARD GRID */}
            <div>
               <h3 className="mb-6">UN SDG Impact Tracker</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {esgCards.map((card, i) => (
                   <div key={card.id} className={`group bg-[#0a1628]/90 backdrop-blur-md border border-white/5 border-l-4 ${card.color} p-5 rounded-[2px] relative overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                      <div className="absolute -right-6 -bottom-8 font-cormorant text-[8rem] text-white/5 font-bold leading-none pointer-events-none select-none z-0 transition-transform duration-500 group-hover:scale-110">
                        {card.id}
                      </div>
                      
                      <div className="relative z-10 flex-1">
                         <div className="flex items-center gap-3 mb-4">
                           <div className={`p-2 rounded bg-white/5`}>
                              <card.Icon className="w-5 h-5 text-white/80" />
                           </div>
                           <h4 className="font-playfair font-normal text-white m-0 text-[1.05rem] tracking-wide">SDG {card.id}</h4>
                         </div>
                         
                         <div className="font-source text-[0.8rem] text-white/60 mb-2 min-h-[40px] leading-snug">
                            {card.metric}
                         </div>
                         
                         <div className="w-full bg-white/10 h-1.5 rounded-full mb-4 overflow-hidden">
                            <div 
                               className={`h-full rounded-full transition-all duration-1000 ease-out`}
                               style={{ width: `${card.progress}%`, backgroundColor: 'white' }}
                            ></div>
                         </div>
                         
                         <div className="bg-white/5 p-3 rounded-[2px] border border-white/10 mt-auto">
                            <div className="font-montserrat text-[0.55rem] text-white/40 uppercase tracking-widest mb-1.5">AURA Insight</div>
                            <div className="font-source text-[0.75rem] text-white/80 leading-snug italic">
                               "{card.insight}"
                            </div>
                         </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-white/10 relative z-10">
                         <button 
                           onClick={() => setSelectedSdg(card.id)}
                           className="text-white/40 hover:text-white/90 font-montserrat text-[0.65rem] uppercase tracking-wider transition w-full text-center">
                            View Details
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="h-[1px] bg-aura-rule w-full my-2"></div>

            {/* CARBON FOOTPRINT TIMELINE CHART */}
            <div className="bg-[#0a1628]/90 backdrop-blur-md border border-white/10 rounded-[4px] p-6 shadow-lg">
               <h3 className="text-white text-[1.1rem] mb-1 font-playfair font-normal tracking-wide">Carbon Footprint Reduction &mdash; 12 Month Trend</h3>
               <p className="font-source text-[0.8rem] text-white/50 mb-6">Tracking monthly CO₂ equivalent emissions (tonnes)</p>
               
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={footprintData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#ffffff60', fontSize: 12, fontFamily: 'Source Sans Pro' }} 
                     />
                     <RechartsTooltip 
                       contentStyle={{ backgroundColor: '#0a1628', borderColor: '#ffffff20', color: '#fff', borderRadius: '4px', fontFamily: 'Source Sans Pro' }}
                       itemStyle={{ color: '#fff' }}
                     />
                     <Area 
                       type="monotone" 
                       dataKey="preAura" 
                       stroke="#64748b" 
                       strokeWidth={2}
                       fill="transparent" 
                       name="Baseline (Pre-AURA)" 
                     />
                     <Area 
                       type="monotone" 
                       dataKey="withAura" 
                       stroke="#22C55E" 
                       strokeWidth={2}
                       fillOpacity={1} 
                       fill="url(#colorSavings)" 
                       name="With AURA Active"
                       activeDot={{ r: 6, fill: '#22C55E', stroke: '#0a1628', strokeWidth: 2 }}
                     />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               
               <div className="mt-4 flex items-center justify-center p-3 bg-green-500/5 border border-green-500/20 rounded-[2px]">
                  <div className="font-source font-medium text-[0.9rem] text-green-400">Total CO₂ saved with AURA: 48.2 tonnes this year</div>
               </div>
            </div>

            {/* SUSTAINABILITY REPORT EXPORT BUTTON */}
            <div className="bg-aura-surface border border-aura-rule rounded-[4px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
               <div>
                 <h3 className="mb-1 text-[1.2rem]">Generate ESG Report</h3>
                 <p className="font-source text-[0.9rem] text-aura-slate m-0">Export your property's UN SDG alignment report for investors, certifications & stakeholders</p>
               </div>
               <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                 <div className="flex flex-wrap gap-3">
                   <button className="aura-btn-outline flex items-center gap-2 whitespace-nowrap bg-white text-aura-navy border-aura-rule hover:bg-aura-parchment">
                      <FileText className="w-4 h-4" /> PDF Report
                   </button>
                   <button className="aura-btn-outline flex items-center gap-2 whitespace-nowrap bg-white text-aura-navy border-aura-rule hover:bg-aura-parchment">
                      <Download className="w-4 h-4" /> Excel Data
                   </button>
                   <button className="aura-btn-primary flex items-center gap-2 whitespace-nowrap">
                      <Share2 className="w-4 h-4" /> Share Link
                   </button>
                 </div>
                 <div className="font-montserrat text-[0.6rem] text-aura-muted uppercase tracking-wider">
                   Last report generated: April 15, 2026
                 </div>
               </div>
            </div>

          </div>
        )}
      </div>
      
      {/* End of Sustainability Section */}

      {/* Modal Overlay for SDG Details */}
      {selectedSdg !== null && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aura-navy/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-[#0a1628] border border-white/10 p-8 rounded-[4px] max-w-xl w-full shadow-2xl relative">
              <button 
                onClick={() => setSelectedSdg(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition w-8 h-8 flex items-center justify-center"
              >
                 <span className="text-2xl leading-none">&times;</span>
              </button>
              
              {esgCards.filter(c => c.id === selectedSdg).map(card => (
                 <div key={card.id}>
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`p-3 rounded bg-white/5 border-l-4 ${card.color}`}>
                          <card.Icon className="w-6 h-6 text-white" />
                       </div>
                       <div>
                          <h3 className="text-white text-[1.4rem] m-0 font-playfair font-normal">SDG {card.id}</h3>
                          <div className="font-source text-[0.9rem] text-white/60">{card.title}</div>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div>
                          <div className="font-montserrat text-[0.65rem] text-white/40 uppercase tracking-widest mb-2">Key Metric</div>
                          <div className="font-source text-[1.1rem] text-white border-b border-white/10 pb-3">{card.metric}</div>
                       </div>
                       
                       <div>
                          <div className="font-montserrat text-[0.65rem] text-white/40 uppercase tracking-widest mb-2">Progress vs Target</div>
                          <div className="flex items-center justify-between mb-1">
                             <span className="font-source text-white/80">{card.progress}% Completed</span>
                             <span className="font-source text-white/40">Target: 100%</span>
                          </div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                             <div 
                               className="h-full rounded-full"
                               style={{ width: `${card.progress}%`, backgroundColor: 'var(--color-aura-gold)' }}
                             ></div>
                          </div>
                       </div>
                       
                       <div className="bg-white/5 p-4 border border-white/10 rounded-[2px]">
                          <div className="font-montserrat text-[0.65rem] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Zap className="w-3 h-3 text-yellow-500" /> AURA Direct Action Insight
                          </div>
                          <div className="font-source text-[0.95rem] text-white/90 leading-relaxed">
                             "{card.insight}"
                          </div>
                       </div>
                       
                       <div>
                          <div className="font-montserrat text-[0.65rem] text-white/40 uppercase tracking-widest mb-2">Historical Trend (Simulated)</div>
                          <div className="h-[100px] bg-white/5 border border-white/5 rounded-[2px] flex items-end px-2 space-x-1 pt-6">
                             {/* Simple simulated bar chart using HTML */}
                             {[40, 45, 55, 50, 60, 65, 75, 70, 85, 90, 80, 95].map((val, i) => (
                               <div key={i} className="flex-1 bg-white/20 hover:bg-white/40 transition" style={{ height: `${val}%` }}></div>
                             ))}
                          </div>
                       </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                       <button 
                         onClick={() => setSelectedSdg(null)}
                         className="aura-btn-primary"
                       >
                          Close Details
                       </button>
                    </div>
                 </div>
              ))}
           </div>
         </div>
      )}

    </div>
  );
}
