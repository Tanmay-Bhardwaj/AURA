import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function IntegrationLayer() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [logs, setLogs] = useState([
    { time: "10:07:34", text: "[OHIP] Room 814 status update received", latency: "12ms" },
    { time: "10:07:31", text: "[IRIS-GXP] Guest sentiment flag pushed · Fussy", latency: "8ms" },
    { time: "10:07:28", text: "[IoT] PAR sensor · Laundry · Level 2.8", latency: "4ms" },
    { time: "10:07:25", text: "[MEWS] Reservation modified · Room 602", latency: "15ms" },
    { time: "10:07:22", text: "[SUPPLY-CHAIN] Linen reorder confirmed · Delivery 3 days", latency: "42ms" },
  ]);

  useEffect(() => {
    const events = [
      { text: "[OHIP] Room status sync completed", latency: "11ms" },
      { text: "[IoT] Spatial scan anomaly detected · Zone B2", latency: "3ms" },
      { text: "[REVENUE] Rate parity check passed", latency: "22ms" },
      { text: "[MARRIOTT-GXP] Profile preference updated", latency: "18ms" },
      { text: "[AGILYSYS] POS transaction logged · Table 4", latency: "9ms" },
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        newLogs.unshift({ time: timeStr, ...randomEvent });
        if (newLogs.length > 15) newLogs.pop();
        return newLogs;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 'opera', name: 'Oracle OPERA Cloud', x: 150, y: 100, protocol: 'REST / OHIP', latency: '12ms', status: 'Live' },
    { id: 'mews', name: 'Mews PMS', x: 400, y: 50, protocol: 'Webhooks', latency: '8ms', status: 'Live' },
    { id: 'agilysys', name: 'Agilysys REST', x: 650, y: 100, protocol: 'REST', latency: '15ms', status: 'Live' },
    { id: 'iris', name: 'IRIS GXP', x: 750, y: 250, protocol: 'GraphQL', latency: '22ms', status: 'Live' },
    { id: 'marriott', name: 'Marriott GXP', x: 650, y: 400, protocol: 'SOAP / REST', latency: '45ms', status: 'Syncing' },
    { id: 'revenue', name: 'Revenue Management', x: 400, y: 450, protocol: 'gRPC', latency: '5ms', status: 'Live' },
    { id: 'iot', name: 'IoT Sensor Network', x: 150, y: 400, protocol: 'MQTT', latency: '2ms', status: 'Live' },
    { id: 'supply', name: 'Supply Chain APIs', x: 50, y: 250, protocol: 'EDI / REST', latency: '120ms', status: 'Live' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1>Integration Nervous System</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Centralized API health, data flow, and system telemetry.</p>
      </div>

      {/* Architecture Diagram */}
      <div className="aura-card p-6">
        <h2>AURA Architecture Map</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="relative w-full aspect-[2/1] bg-aura-white rounded-sm overflow-hidden">
          <svg viewBox="0 0 800 500" className="w-full h-full">
            {/* Center Hexagon */}
            <polygon 
              points="400,200 450,225 450,275 400,300 350,275 350,225" 
              fill="var(--color-aura-navy)" 
              stroke="var(--color-aura-gold)" 
              strokeWidth="2" 
            />
            <text x="400" y="245" textAnchor="middle" className="font-cormorant font-light text-[24px] fill-aura-white">AURA</text>
            <text x="400" y="265" textAnchor="middle" className="font-montserrat text-[10px] uppercase fill-aura-white">Core</text>

            {/* Connections & Nodes */}
            {nodes.map((node, i) => {
              const isActive = activeNode === node.id;
              return (
                <g key={node.id}>
                  {/* Line */}
                  <line 
                    x1={node.x} y1={node.y} x2="400" y2="250" 
                    stroke="var(--color-aura-navy-mid)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                  />
                  {/* Animated Dot */}
                  <circle r="3" fill="var(--color-aura-gold)">
                    <animateMotion 
                      dur="3s" 
                      repeatCount="indefinite" 
                      path={`M 400,250 L ${node.x},${node.y}`} 
                      begin={`${i * 0.4}s`}
                    />
                  </circle>
                  
                  {/* Node Box */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                  >
                    <rect 
                      x={node.x - 70} y={node.y - 20} 
                      width="140" height="40" 
                      fill="var(--color-aura-ivory)" 
                      stroke={isActive ? 'var(--color-aura-gold)' : 'var(--color-aura-navy)'} 
                      strokeWidth="1" 
                      rx="2" 
                      className="transition-colors duration-200"
                    />
                    <text x={node.x} y={node.y + 4} textAnchor="middle" className="font-montserrat text-[10px] fill-aura-navy">{node.name}</text>
                  </g>

                  {/* Tooltip */}
                  {isActive && (
                    <g>
                      <rect x={node.x - 80} y={node.y + 30} width="160" height="70" fill="var(--color-aura-ivory)" stroke="var(--color-aura-rule)" rx="2" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))" />
                      <text x={node.x - 70} y={node.y + 50} className="font-montserrat text-[9px] uppercase fill-aura-muted">Protocol: <tspan className="fill-aura-navy">{node.protocol}</tspan></text>
                      <text x={node.x - 70} y={node.y + 65} className="font-montserrat text-[9px] uppercase fill-aura-muted">Latency: <tspan className="fill-aura-navy">{node.latency}</tspan></text>
                      <text x={node.x - 70} y={node.y + 80} className="font-montserrat text-[9px] uppercase fill-aura-muted">Status: <tspan className={node.status === 'Live' ? 'fill-aura-success' : 'fill-aura-gold'}>{node.status}</tspan></text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* API Health Table */}
      <div>
        <h2>System Health Dashboard</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="w-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule w-1/4">System</th>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule w-[15%] hidden md:table-cell">Protocol</th>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule hidden lg:table-cell">Last Sync</th>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule w-[15%]">Latency</th>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule w-[15%]">Status</th>
                <th className="aura-table-header py-3 px-2 border-b border-aura-rule w-[15%] hidden md:table-cell">Volume</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node, i) => (
                <tr key={node.id} className={i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-surface'}>
                  <td className="aura-table-body py-3 px-2 border-b border-aura-rule font-medium text-aura-navy truncate" title={node.name}>{node.name}</td>
                  <td className="aura-table-body py-3 px-2 border-b border-aura-rule hidden md:table-cell truncate" title={node.protocol}>{node.protocol}</td>
                  <td className="aura-table-body py-3 px-2 border-b border-aura-rule hidden lg:table-cell">Just now</td>
                  <td className="aura-table-body py-3 px-2 border-b border-aura-rule">{node.latency}</td>
                  <td className="py-3 px-2 border-b border-aura-rule">
                    <span className={`font-montserrat text-[0.6rem] md:text-[0.68rem] uppercase tracking-wider ${node.status === 'Live' ? 'text-aura-success' : 'text-aura-gold'}`}>
                      ● {node.status}
                    </span>
                  </td>
                  <td className="aura-table-body py-3 px-2 border-b border-aura-rule hidden md:table-cell">{Math.floor(Math.random() * 500) + 10}k / day</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        {/* Left: Event Log */}
        <div>
          <h2>Live Event Stream</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="bg-aura-surface border border-aura-rule h-[300px] overflow-hidden flex flex-col">
            {logs.map((log, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedLog(log)}
                className="flex items-center px-4 py-2 border-b border-aura-rule animate-in slide-in-from-top-2 duration-300 cursor-pointer hover:bg-aura-ivory transition-colors"
              >
                <span className="font-montserrat text-[0.65rem] text-aura-navy w-20 shrink-0">{log.time}</span>
                <span className="font-montserrat text-[0.7rem] text-aura-slate flex-1 truncate px-2">{log.text}</span>
                <span className="font-montserrat text-[0.62rem] text-aura-muted shrink-0">· {log.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Score Cards */}
        <div>
          <h2>System Performance</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="aura-card overflow-hidden">
            {[
              { label: 'Connected Systems', value: '8 / 8' },
              { label: 'API Uptime', value: '99.97%' },
              { label: 'Events Processed Daily', value: '2.4 M' },
              { label: 'Data Freshness', value: '< 1 min' },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-4 ${i % 2 === 0 ? 'bg-aura-parchment' : 'bg-aura-white'}`}>
                <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">{row.label}</span>
                <span className="font-cormorant font-semibold text-[1.6rem] text-aura-navy">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-white/85 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-aura-white border border-aura-rule rounded-[4px] border-l-[3px] border-l-aura-navy max-w-[600px] w-full p-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.8rem] mb-0">Event Payload</h2>
              <button onClick={() => setSelectedLog(null)} className="text-aura-slate hover:text-aura-navy">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Timestamp</span>
                <span className="font-source text-[0.9rem] text-aura-navy">{selectedLog.time}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Event Summary</span>
                <span className="font-source text-[0.9rem] text-aura-navy font-medium">{selectedLog.text}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-aura-rule">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">Latency</span>
                <span className="font-source text-[0.9rem] text-aura-slate">{selectedLog.latency}</span>
              </div>
              
              <div className="mt-4">
                <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted block mb-2">Raw JSON Payload</span>
                <div className="bg-aura-navy p-4 rounded-sm overflow-hidden">
                  <pre className="font-mono text-[0.75rem] text-aura-white break-words whitespace-pre-wrap">
{JSON.stringify({
  eventId: `evt_${Math.random().toString(36).substr(2, 9)}`,
  timestamp: new Date().toISOString(),
  source: selectedLog.text.split(']')[0].replace('[', ''),
  payload: {
    status: "success",
    latency_ms: parseInt(selectedLog.latency),
    message: selectedLog.text.split('] ')[1]
  }
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedLog(null)} className="aura-btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
