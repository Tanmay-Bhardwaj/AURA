import React, { useRef, useState, useEffect } from 'react';
import { analyzeAura } from '../lib/gemini';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    async function setupCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setVideoError(true);
          return;
        }
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setVideoError(true);
      }
    }
    setupCamera();
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    setAnalysisResult(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/jpeg');

      try {
        const data = await analyzeAura('spatial', { imageBase64 });
        setAnalysisResult(data);
      } catch (err) {
        console.error("Analysis failed", err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const getOccupancyColor = (occ: string) => {
    if (occ === 'High') return 'text-aura-warning';
    if (occ === 'Low') return 'text-amber-600';
    return 'text-aura-navy';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Spatial Consciousness Engine</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Real-time physical space utilization and anomaly detection.</p>
      </div>

      {/* Top Section */}
      <div>
        <h2>Live Space Intelligence</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
        
        <div className="aura-card overflow-hidden">
          <div className="bg-aura-parchment px-4 py-2 border-b border-aura-rule flex justify-between items-center">
            <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-navy">Hotel Spatial Intelligence Feed</span>
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-aura-gold animate-pulse"></div>
              <span className="font-montserrat text-[0.6rem] uppercase tracking-wider text-aura-gold">Live</span>
            </div>
          </div>
          
          <div className="relative aspect-video bg-aura-navy/5 flex items-center justify-center">
            {(!stream || videoError) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-aura-parchment border-l-4 border-aura-warning p-6 z-10">
                <h3 className="text-aura-warning mb-2 not-italic">Permission Required</h3>
                <p className="aura-body text-center">Camera access is required for Spatial Engine analysis. Please allow access in your browser.</p>
              </div>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* 3x3 Grid Overlay */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              {['A1','A2','A3','B1','B2','B3','C1','C2','C3'].map((id) => (
                <div key={id} className="border border-aura-navy/30 relative">
                  <div className="absolute top-1 left-1 bg-aura-navy/60 text-aura-white font-montserrat text-[0.5rem] px-1 rounded-sm">
                    {id}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-aura-white border-t border-aura-rule flex justify-center">
            <button 
              onClick={captureAndAnalyze} 
              disabled={isScanning || !stream}
              className="aura-btn-primary w-64 disabled:opacity-50"
            >
              {isScanning ? 'Scanning Space...' : 'Scan & Analyse Space'}
            </button>
          </div>
        </div>

        {/* Analysis Result Grid */}
        {analysisResult && (
          <div className="mt-6 grid grid-cols-3 md:grid-cols-9 gap-2 animate-in fade-in duration-300">
            {analysisResult.zones?.map((zone: any) => (
              <div key={zone.id} className="aura-card p-2 flex flex-col items-center justify-center text-center">
                <div className="font-playfair text-[0.9rem] text-aura-navy mb-1">{zone.id}</div>
                <div className={`font-montserrat text-[0.55rem] uppercase tracking-wider mb-2 ${getOccupancyColor(zone.occupancy)}`}>
                  {zone.occupancy}
                </div>
                <div className="w-full h-[3px] bg-aura-parchment rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-aura-navy" 
                    style={{ width: `${zone.cleanlinessScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
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
