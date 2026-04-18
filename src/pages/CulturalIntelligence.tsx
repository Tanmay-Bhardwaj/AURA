import React, { useState } from 'react';
import { analyzeAura } from '../lib/gemini';

export default function CulturalIntelligence() {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Japanese');
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsTranslating(true);
    setTranslation(null);
    try {
      const data = await analyzeAura('translate', { text: inputText, language: selectedLanguage });
      setTranslation(data.result);
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const cities = ['Mumbai', 'Delhi', 'Pune', 'Chennai', 'Dubai', 'London', 'New York', 'Tokyo', 'Singapore', 'Paris', 'Sydney'];

  const getCityEvents = (city: string) => {
    if (city === 'Mumbai') {
      return [
        { name: 'Diwali', demand: '+80%', par: '5.2', strategy: 'Premium Cultural Package' },
        { name: 'Bollywood Premiere', demand: '+40%', par: '3.8', strategy: 'VIP Suite Focus' }
      ];
    }
    if (city === 'New York') {
      return [
        { name: 'UNGA', demand: '+95%', par: '6.0', strategy: 'Diplomatic Core Block' },
        { name: 'Met Gala', demand: '+85%', par: '5.5', strategy: 'Ultra-Luxury Protocol' }
      ];
    }
    if (city === 'Tokyo') {
      return [
        { name: 'Olympics Anniversary', demand: '+60%', par: '4.5', strategy: 'International Rate' },
        { name: 'Cherry Blossom Season', demand: '+90%', par: '5.8', strategy: 'Leisure Max Optimization' }
      ];
    }
    if (city === 'London') {
      return [
        { name: 'Wimbledon', demand: '+85%', par: '5.2', strategy: 'Sporting VIP Block' },
        { name: 'London Fashion Week', demand: '+70%', par: '4.8', strategy: 'Dynamic Event Pricing' }
      ];
    }
    if (city === 'Singapore') {
      return [
        { name: 'F1 Grand Prix', demand: '+92%', par: '5.7', strategy: 'Grid Lock Pricing' },
        { name: 'Fintech Festival', demand: '+65%', par: '4.2', strategy: 'Corporate Volume Rate' }
      ];
    }
    if (city === 'Paris') {
      return [
        { name: 'Fashion Week', demand: '+88%', par: '5.4', strategy: 'Luxury Group Blocks' }
      ];
    }
    if (city === 'Sydney') {
      return [
        { name: 'NYE Harbour Event', demand: '+100%', par: '6.5', strategy: 'Maximum Yield Premium' }
      ];
    }
    if (city === 'Dubai') {
      return [
        { name: 'Dubai Shopping Festival', demand: '+75%', par: '4.5', strategy: 'Retail Tourism Package' },
        { name: 'COP Anniversary', demand: '+60%', par: '4.0', strategy: 'Delegation Blocks' }
      ];
    }
    return [
      { name: `${city} Regional Summit`, demand: '+50%', par: '3.8', strategy: 'Standard Yield Growth' },
      { name: `Local Arts Festival (${city})`, demand: '+35%', par: '3.2', strategy: 'Leisure Rate Optimization' }
    ];
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Temporal-Cultural Intelligence</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Global event horizon and cultural adaptation engine.</p>
      </div>

      {/* World Map */}
      <div className="aura-card p-6">
        <h2 className="mb-3">Global Event Horizon</h2>
        <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
        
        <div className="relative w-full aspect-[2/1] bg-aura-surface border border-aura-rule rounded-sm overflow-hidden">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* Simplified Continents */}
            <path d="M 200 100 Q 300 50 400 100 T 600 100 T 800 150 T 900 300 T 700 400 T 500 350 T 300 400 T 100 300 Z" fill="var(--color-aura-surface)" stroke="var(--color-aura-navy)" strokeWidth="0.8" />
            <path d="M 600 150 Q 700 100 800 200 T 750 350 T 600 300 Z" fill="var(--color-aura-surface)" stroke="var(--color-aura-navy)" strokeWidth="0.8" />
            
            {/* Dots */}
            {[
              { cx: 650, cy: 220, name: 'Mumbai', event: 'Diwali', days: '14', impact: 'High' },
              { cx: 580, cy: 200, name: 'Dubai', event: 'Expo', days: '45', impact: 'Medium' },
              { cx: 450, cy: 120, name: 'London', event: 'Wimbledon', days: '80', impact: 'High' },
              { cx: 250, cy: 150, name: 'New York', event: 'UNGA', days: '120', impact: 'Critical' },
              { cx: 850, cy: 160, name: 'Tokyo', event: 'Olympics', days: '300', impact: 'Critical' },
              { cx: 750, cy: 280, name: 'Singapore', event: 'F1', days: '60', impact: 'High' },
              { cx: 480, cy: 140, name: 'Paris', event: 'Fashion Week', days: '25', impact: 'High' },
              { cx: 880, cy: 380, name: 'Sydney', event: 'NYE', days: '74', impact: 'Critical' },
            ].map((dot, i) => (
              <g key={i} className="group cursor-pointer" onClick={() => setSelectedCity(dot.name)}>
                <circle cx={dot.cx} cy={dot.cy} r="6" fill={selectedCity === dot.name ? "var(--color-aura-navy)" : "var(--color-aura-gold)"} />
                <circle cx={dot.cx} cy={dot.cy} r="6" fill="none" stroke={selectedCity === dot.name ? "var(--color-aura-navy)" : "var(--color-aura-gold)"} strokeWidth="2" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                
                {/* Tooltip */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x={dot.cx + 15} y={dot.cy - 40} width="160" height="80" fill="var(--color-aura-ivory)" stroke="var(--color-aura-rule)" rx="2" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))" />
                  <text x={dot.cx + 25} y={dot.cy - 20} className="font-playfair font-normal text-[14px] fill-aura-navy">{dot.name}</text>
                  <text x={dot.cx + 25} y={dot.cy} className="font-source text-[12px] fill-aura-slate">{dot.event} · {dot.days} days</text>
                  <text x={dot.cx + 25} y={dot.cy + 20} className="font-montserrat text-[10px] uppercase fill-aura-warning">Impact: {dot.impact}</text>
                </g>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10">
        {/* Left: City Selector */}
        <div>
          <h2>City-Tuned Module</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-aura-white border border-aura-navy font-montserrat text-[0.85rem] text-aura-navy px-4 py-3 rounded-[2px] mb-6 focus:outline-none focus:ring-1 focus:ring-aura-navy"
          >
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="space-y-4">
            {getCityEvents(selectedCity).map((event, i) => (
              <div key={i} className={`aura-card p-4 ${i === 0 ? 'border-l-[2px] border-l-aura-gold' : ''}`}>
                <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-3">{event.name}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-source text-[0.85rem] text-aura-slate">Demand Spike</span>
                    <span className="font-source font-medium text-[0.85rem] text-aura-navy">{event.demand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-source text-[0.85rem] text-aura-slate">PAR Recommendation</span>
                    <span className="font-source font-medium text-[0.85rem] text-aura-navy">{event.par}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-source text-[0.85rem] text-aura-slate">Pricing Strategy</span>
                    <span className="font-source font-medium text-[0.85rem] text-aura-navy">{event.strategy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Matrix */}
        <div>
          <h2>Service Adaptation Matrix</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="w-full">
            <table className="w-full text-left border-collapse border border-aura-rule table-fixed">
              <thead>
                <tr>
                  <th className="p-2 lg:p-3 border border-aura-rule bg-aura-parchment w-1/4"></th>
                  {['India', 'USA', 'Japan', 'UAE'].map(c => (
                    <th key={c} className="font-montserrat text-[0.65rem] lg:text-[0.7rem] uppercase tracking-wider text-aura-navy p-2 lg:p-3 border border-aura-rule bg-aura-parchment text-center">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: 'Greeting Style', vals: ['High', 'Standard', 'High', 'High'] },
                  { dim: 'F&B Customisation', vals: ['High', 'High', 'Standard', 'High'] },
                  { dim: 'Language Mode', vals: ['Standard', 'Minimal', 'High', 'High'] },
                  { dim: 'Checkout Flexibility', vals: ['High', 'High', 'Minimal', 'Standard'] },
                  { dim: 'Privacy Level', vals: ['Standard', 'Standard', 'High', 'High'] },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="font-montserrat text-[0.65rem] lg:text-[0.72rem] text-aura-navy p-2 lg:p-3 border border-aura-rule bg-aura-white break-words">{row.dim}</td>
                    {row.vals.map((val, j) => {
                      let bg = 'bg-aura-white';
                      let text = 'text-aura-muted';
                      if (val === 'High') { bg = 'bg-aura-navy'; text = 'text-aura-white'; }
                      else if (val === 'Standard') { bg = 'bg-aura-parchment'; text = 'text-aura-navy'; }
                      
                      return (
                        <td key={j} className={`p-2 lg:p-3 border border-aura-rule text-center ${bg}`}>
                          <span className={`font-montserrat text-[0.55rem] lg:text-[0.62rem] uppercase tracking-wider ${text} break-words block`}>{val}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Translator */}
      <div>
        <h2>Cultural Communication Engine</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 mb-4">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter message to guest..."
            className="w-full bg-aura-white border border-aura-rule font-source text-[1rem] text-aura-navy px-4 py-3 rounded-[2px] focus:outline-none focus:border-aura-navy"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full bg-aura-white border border-aura-rule font-montserrat text-[0.85rem] text-aura-navy px-4 py-3 rounded-[2px] focus:outline-none focus:border-aura-navy"
          >
            {['English', 'Hindi', 'Japanese', 'Arabic', 'French', 'German'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleTranslate}
          disabled={!inputText || isTranslating}
          className="aura-btn-gold mb-6 disabled:opacity-50"
        >
          {isTranslating ? 'Translating...' : 'Translate with Cultural Tone'}
        </button>

        {isTranslating && (
          <div className="h-24 bg-aura-parchment rounded border-l-[3px] border-aura-navy animate-pulse"></div>
        )}

        {translation && !isTranslating && (
          <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-navy p-5 animate-in fade-in duration-300">
            <div className="font-source italic text-[1.1rem] text-aura-navy leading-relaxed">
              {translation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
