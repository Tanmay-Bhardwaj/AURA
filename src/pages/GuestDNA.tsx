import React, { useRef, useState, useEffect } from 'react';
import { analyzeAura } from '../lib/gemini';
import { X } from 'lucide-react';

const GUESTS = [
  {
    id: 'g1',
    name: 'Mr. Arjun Mehta',
    classification: 'CIP — Commercially Important',
    complaints: '2 Incidents',
    room: 'DLNK · Floor 8+',
    languages: 'English, Hindi',
    lastStay: 'Taj Mumbai · March 2026',
    score: '91 / 100',
    history: [
      { date: '12 Mar 2026', hotel: 'Taj Mumbai', event: 'Checkout', note: 'Requested late checkout, granted.' },
      { date: '10 Mar 2026', hotel: 'Taj Mumbai', event: 'Dining', note: 'Allergic to shellfish. Noted in profile.' },
      { date: '15 Jan 2026', hotel: 'Taj Delhi', event: 'Complaint', note: 'AC noise. Room changed. Recovery successful.' }
    ]
  },
  {
    id: 'g2',
    name: 'Ms. Sarah Jenkins',
    classification: 'VIP — Corporate Executive',
    complaints: '0 Incidents',
    room: 'SUITE · High Floor',
    languages: 'English, French',
    lastStay: 'AURA London · Feb 2026',
    score: '98 / 100',
    history: [
      { date: '28 Feb 2026', hotel: 'AURA London', event: 'Spa', note: 'Prefers deep tissue massage. Booked 2 sessions.' },
      { date: '25 Feb 2026', hotel: 'AURA London', event: 'Check-in', note: 'Arrived early. Room was ready.' }
    ]
  },
  {
    id: 'g3',
    name: 'Mr. Kenji Sato',
    classification: 'HWC — Handle With Care',
    complaints: '4 Incidents',
    room: 'KING · Quiet Zone',
    languages: 'Japanese, English',
    lastStay: 'AURA Tokyo · Jan 2026',
    score: '76 / 100',
    history: [
      { date: '10 Jan 2026', hotel: 'AURA Tokyo', event: 'Complaint', note: 'Noise from adjacent room. Discount applied.' },
      { date: '08 Jan 2026', hotel: 'AURA Tokyo', event: 'Dining', note: 'Prefers green tea upon arrival. Room service customized.' },
      { date: '05 Jan 2026', hotel: 'AURA Tokyo', event: 'Check-in', note: 'Extremely sensitive to scent. Fragrance-free room prepared.' }
    ]
  },
  {
    id: 'g4',
    name: 'Dr. Emily Chen',
    classification: 'VVIP — Specialist Speaker',
    complaints: '0 Incidents',
    room: 'PRESIDENTIAL',
    languages: 'Mandarin, English',
    lastStay: 'AURA Singapore · Nov 2025',
    score: '99 / 100',
    history: [
      { date: '18 Nov 2025', hotel: 'AURA Singapore', event: 'Transport', note: 'Requested S-Class transfer. Punctual.' },
      { date: '16 Nov 2025', hotel: 'AURA Singapore', event: 'Setup', note: 'Required dual monitors in room for clinical reviews.' }
    ]
  },
  {
    id: 'g5',
    name: 'Mr. Carlos Ruiz',
    classification: 'REGULAR — High Frequency',
    complaints: '1 Incident',
    room: 'KING · Standard',
    languages: 'Spanish, English',
    lastStay: 'AURA Madrid · March 2026',
    score: '88 / 100',
    history: [
      { date: '02 Mar 2026', hotel: 'AURA Madrid', event: 'Checkout', note: 'Seamless automated checkout via app.' },
      { date: '01 Mar 2026', hotel: 'AURA Madrid', event: 'Gym', note: 'Requested extra fresh towels by the treadmill at 6 AM.' }
    ]
  }
];

export default function GuestDNA() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedGuestId, setSelectedGuestId] = useState(GUESTS[0].id);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const selectedGuest = GUESTS.find(g => g.id === selectedGuestId) || GUESTS[0];

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
        const data = await analyzeAura('guest-dna', { imageBase64 });
        setAnalysisResult(data);
      } catch (err) {
        console.error("Analysis failed", err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1>Unified Guest Intelligence (UGI)</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Real-time biometric and behavioural analysis for hyper-personalized service.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        {/* Left Column - Camera */}
        <div>
          <h2>Live Recognition Feed</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="aura-card p-4 relative overflow-hidden mb-6">
            <div className="relative aspect-video bg-aura-navy/5 rounded-sm overflow-hidden flex items-center justify-center">
              {(!stream || videoError) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-aura-parchment border-l-4 border-aura-warning p-6 z-10">
                  <h3 className="text-aura-warning mb-2 not-italic">Permission Required</h3>
                  <p className="aura-body text-center">Camera access is required for UGI analysis. Please allow access in your browser.</p>
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
              
              {/* Face Frame Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[40%] h-[60%] border border-aura-navy/40"></div>
              </div>
              
              {/* Scanning Badge */}
              <div className="absolute top-4 right-4 bg-aura-white/90 px-2 py-1 flex items-center space-x-2 rounded-sm border border-aura-rule">
                <div className="w-1.5 h-1.5 rounded-full bg-aura-gold animate-[pulse_2s_ease-in-out_infinite]"></div>
                <span className="font-montserrat text-[0.6rem] uppercase tracking-wider text-aura-navy">Scanning</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={captureAndAnalyze} 
                disabled={isScanning || !stream}
                className="aura-btn-primary w-full disabled:opacity-50"
              >
                {isScanning ? 'Analysing...' : 'Capture & Analyse Guest'}
              </button>
            </div>
          </div>

          {/* Analysis Result */}
          {isScanning && (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-aura-parchment w-1/3 rounded"></div>
              <div className="h-[1px] bg-aura-rule w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-aura-surface rounded"></div>
                <div className="h-12 bg-aura-surface rounded"></div>
              </div>
              <div className="h-24 bg-aura-parchment rounded border-l-[3px] border-aura-gold"></div>
            </div>
          )}

          {analysisResult && !isScanning && (
            <div className="animate-in fade-in duration-300">
              <h3 className="mb-3">AURA Analysis — {new Date().toLocaleTimeString()}</h3>
              <div className="h-[1px] bg-aura-rule w-full mb-4"></div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <div className="aura-badge uppercase mb-1">Emotional State</div>
                  <div className="font-source text-[1rem] text-aura-navy">{analysisResult.emotionState}</div>
                </div>
                <div>
                  <div className="aura-badge uppercase mb-1">Stress Level</div>
                  <div className="flex items-center space-x-3">
                    <span className="font-source text-[1rem] text-aura-navy">{analysisResult.stressLevel}</span>
                    <div className="flex-1 h-[3px] bg-aura-parchment">
                      <div 
                        className={`h-full ${analysisResult.stressLevel === 'High' ? 'bg-aura-warning' : analysisResult.stressLevel === 'Medium' ? 'bg-aura-gold' : 'bg-aura-success'}`} 
                        style={{ width: analysisResult.stressLevel === 'High' ? '90%' : analysisResult.stressLevel === 'Medium' ? '50%' : '20%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="aura-badge uppercase mb-1">Guest Classification</div>
                  <div className="font-source text-[1rem] text-aura-navy">{analysisResult.guestType}</div>
                </div>
                <div>
                  <div className="aura-badge uppercase mb-1">Confidence</div>
                  <div className="font-source text-[1rem] text-aura-navy">{analysisResult.confidenceScore}%</div>
                </div>
              </div>

              <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-gold p-5 mb-6">
                <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">AURA Recommendation</div>
                <div className="font-source text-[0.95rem] text-aura-slate leading-relaxed">
                  {analysisResult.auraSuggestion}
                </div>
              </div>

              <div>
                <div className="aura-badge uppercase mb-2">Behavioural Signals</div>
                <ul className="space-y-2">
                  {analysisResult.microbehaviors?.map((b: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-aura-gold mt-1">•</span>
                      <span className="font-source text-[0.9rem] text-aura-slate">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Profile */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="mb-0">Guest Profile</h2>
            <select 
              value={selectedGuestId} 
              onChange={(e) => setSelectedGuestId(e.target.value)}
              className="border border-aura-rule bg-aura-white px-3 py-1 font-montserrat text-[0.7rem] text-aura-navy focus:outline-none"
            >
              {GUESTS.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
          
          <div className="aura-card p-0 overflow-hidden mb-8">
            <div className="p-6 pb-4">
              <div className="font-cormorant font-normal text-[1.4rem] text-aura-navy">{selectedGuest.name}</div>
            </div>
            <div className="h-[1px] bg-aura-rule w-full"></div>
            <div className="flex flex-col">
              {[
                { label: 'Classification', value: selectedGuest.classification },
                { label: 'Complaint History', value: selectedGuest.complaints },
                { label: 'Preferred Room', value: selectedGuest.room },
                { label: 'Languages', value: selectedGuest.languages },
                { label: 'Last Stay', value: selectedGuest.lastStay },
                { label: 'AURA Score', value: selectedGuest.score },
                { label: 'UGI Status', value: 'Calibrated' },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between px-6 py-3 ${i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-parchment'}`}>
                  <span className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">{row.label}</span>
                  <span className="font-source text-[0.9rem] text-aura-navy">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="p-6 pt-4 border-t border-aura-rule">
              <button 
                onClick={() => setShowHistoryModal(true)}
                className="aura-btn-secondary w-full border-aura-gold text-aura-gold hover:bg-aura-gold/5"
              >
                View Full History
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-aura-rule w-full mb-6"></div>

          <div className="space-y-3">
            {[
              { badge: 'HWC', desc: 'Handle With Care. High empathy required.' },
              { badge: 'Fussy', desc: 'Pre-empt complaints. Micro-recovery active.' },
              { badge: 'VIP', desc: 'Zero friction. Pre-load all preferences.' },
              { badge: 'CIP', desc: 'Commercially Important. Focus on relationship.' },
            ].map((cat, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 border border-aura-rule rounded-[2px] bg-aura-white">
                <div className="bg-aura-navy text-aura-white font-montserrat text-[0.62rem] uppercase px-2 py-1 rounded-[2px] w-12 text-center shrink-0">
                  {cat.badge}
                </div>
                <div className="font-source text-[0.85rem] text-aura-slate">{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-white/85 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-aura-white border border-aura-rule rounded-[4px] border-l-[3px] border-l-aura-gold max-w-[600px] w-full p-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.8rem] mb-0">{selectedGuest.name} — Full History</h2>
              <button onClick={() => setShowHistoryModal(false)} className="text-aura-slate hover:text-aura-navy">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-[1px] bg-aura-rule w-full mb-6"></div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {selectedGuest.history.map((item, idx) => (
                <div key={idx} className="bg-aura-surface border border-aura-rule p-4 rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-navy font-medium">{item.event}</span>
                    <span className="font-source text-[0.8rem] text-aura-muted">{item.date} · {item.hotel}</span>
                  </div>
                  <p className="font-source text-[0.95rem] text-aura-slate m-0">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
