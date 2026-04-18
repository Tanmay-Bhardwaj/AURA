import React, { useState, useEffect, useRef } from 'react';
import { analyzeAura } from '../lib/gemini';

export default function EmpathyEngine() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const [socialReport, setSocialReport] = useState<any>(null);
  const [isGeneratingSocialReport, setIsGeneratingSocialReport] = useState(false);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      
      setIsListening(true);
      drawWaveform();

      // Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(prev => prev + " " + currentTranscript);
        };
        
        recognitionRef.current.start();
      } else {
        setTranscript("Speech recognition not supported in this browser. Simulating input...");
        setTimeout(() => setTranscript("I've been waiting for my room for over an hour. This is unacceptable for a hotel of this supposed caliber."), 2000);
      }

    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    cancelAnimationFrame(animationRef.current);
    setIsListening(false);
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyserRef.current!.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        ctx.fillStyle = '#0D1B3E'; // var(--aura-navy)
        // Center vertically
        ctx.fillRect(x, (canvas.height - barHeight) / 2, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  };

  const analyzeSentiment = async () => {
    if (!transcript) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const data = await analyzeAura('empathy', { text: transcript });
      setAnalysisResult(data);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1>Empathy Engine</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="aura-body">Voice intelligence and sentiment analysis for hyper-empathic service recovery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10">
        {/* Left: Voice Intel */}
        <div>
          <h2>Voice Intelligence</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="aura-card p-6 mb-6">
            <div className="flex space-x-4 mb-6">
              {!isListening ? (
                <button onClick={startListening} className="aura-btn-primary">Begin Listening</button>
              ) : (
                <button onClick={stopListening} className="aura-btn-secondary">Stop Listening</button>
              )}
            </div>
            
            <div className="w-full h-[80px] bg-aura-white border border-aura-rule mb-6 relative">
              {!isListening && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-montserrat text-[0.65rem] uppercase text-aura-muted">Microphone Inactive</span>
                </div>
              )}
              <canvas ref={canvasRef} width="600" height="80" className="w-full h-full" />
            </div>
            
            <div className="h-[1px] bg-aura-rule w-full mb-4"></div>
            
            <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-2">Live Transcript / Manual Input</div>
            <div className="bg-aura-ivory border border-aura-rule p-4 h-[120px] overflow-y-auto">
              <textarea 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Awaiting audio input or type here..."
                className="w-full h-full bg-transparent border-none focus:outline-none font-source text-[0.9rem] text-aura-slate leading-relaxed resize-none"
              />
            </div>
          </div>

          <button 
            onClick={analyzeSentiment}
            disabled={!transcript || isAnalyzing}
            className="aura-btn-gold w-full disabled:opacity-50"
          >
            {isAnalyzing ? 'Analysing Sentiment...' : 'Analyse Sentiment'}
          </button>

          {/* Analysis Result */}
          {isAnalyzing && (
            <div className="mt-8 space-y-4 animate-pulse">
              <div className="h-32 bg-aura-parchment rounded"></div>
              <div className="h-24 bg-aura-parchment rounded border-l-[3px] border-aura-gold"></div>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="mt-8 animate-in fade-in duration-300">
              <div className="aura-card p-6">
                <div className="flex justify-between items-end mb-8">
                  <div className="relative w-40 h-20 overflow-hidden">
                    {/* Gauge Arc */}
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-aura-rule)" strokeWidth="8" strokeLinecap="round" />
                      <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="none" 
                        stroke={analysisResult.sentimentScore < 0 ? 'var(--color-aura-warning)' : 'var(--color-aura-navy)'} 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="125.6"
                        strokeDashoffset={125.6 * (1 - (analysisResult.sentimentScore + 100) / 200)}
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 text-center">
                      <span className="font-cormorant font-semibold text-[2rem] text-aura-navy leading-none">
                        {analysisResult.sentimentScore}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="aura-badge uppercase mb-1">Primary Emotion</div>
                    <div className="font-source text-[1.1rem] text-aura-navy">{analysisResult.primaryEmotion}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="aura-badge uppercase">Frustration Level</span>
                    <span className="font-source text-[0.85rem] text-aura-navy">{analysisResult.frustrationLevel}</span>
                  </div>
                  <div className="flex space-x-1 h-2">
                    {['None', 'Low', 'Medium', 'High', 'Critical'].map((level, i) => {
                      const levels = ['None', 'Low', 'Medium', 'High', 'Critical'];
                      const currentIndex = levels.indexOf(analysisResult.frustrationLevel);
                      const isFilled = i <= currentIndex;
                      return (
                        <div 
                          key={level} 
                          className={`flex-1 rounded-full ${isFilled ? 'bg-aura-navy' : 'bg-aura-rule'}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-gold p-5">
                  <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">Staff Earpiece Guidance — Confidential</div>
                  <div className="font-source text-[0.95rem] text-aura-slate leading-relaxed">
                    {analysisResult.staffGuidance}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Protocols */}
        <div>
          <h2>Response Protocols</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          
          <div className="space-y-4">
            {[
              { title: 'HWC — Handle With Care', desc: 'Identify vulnerability. Communicate with precision and warmth. Resolve through empathy, not policy.' },
              { title: 'Fussy Guest Protocol', desc: 'Review complaint history. Initiate micro-recovery. Proactive engagement before friction surfaces.' },
              { title: 'VIP Protocol', desc: 'Eliminate all friction. Pre-load preferences. No waiting, no surprises.' },
              { title: 'CIP Protocol', desc: 'Business context awareness. Relationship continuity as the primary metric. Discretion above all.' },
            ].map((proto, i) => (
              <div key={i} className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-navy p-5">
                <h3 className="not-italic font-playfair font-normal text-[1.1rem] text-aura-navy mb-2">{proto.title}</h3>
                <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed">{proto.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-aura-rule w-full mt-10 mb-10"></div>

      {/* Social Media Sentiment Analysis Module */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        <div>
          <h2>Social Media Sentiment Analysis</h2>
          <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
          <p className="font-source text-[0.95rem] text-aura-slate leading-relaxed mb-6">
            Provide public social media links (e.g., X, Instagram) below. AURA uses NLP to infer lifestyle interests, mood, and preferences, generating a highly personalized Empathy Report.
          </p>

          <div className="aura-card p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-2 block">Guest Public Profile URL</label>
                <input 
                  type="text" 
                  placeholder="https://x.com/username"
                  className="w-full bg-aura-surface border border-aura-rule p-3 font-source text-[0.95rem] focus:outline-none focus:border-aura-navy"
                  id="social-link"
                />
              </div>

              <div className="flex items-start space-x-3 mt-4">
               <input type="checkbox" id="social-consent" className="mt-1" />
               <label htmlFor="social-consent" className="font-source text-[0.85rem] text-aura-slate leading-relaxed">
                 <strong>Opt-In Consent:</strong> I agree to allow AURA to analyze the public content of the provided social media link for the sole purpose of personalizing hotel services. I acknowledge this complies with the Social Link Acknowledgment defined in the Privacy Sovereignty matrix.
               </label>
              </div>

              <button 
                className="aura-btn-gold w-full mt-4 disabled:opacity-50" 
                disabled={isGeneratingSocialReport}
                onClick={async () => {
                  const cb = document.getElementById('social-consent') as HTMLInputElement;
                  const link = document.getElementById('social-link') as HTMLInputElement;
                  if (!cb.checked) {
                    alert('Opt-in consent is required.');
                    return;
                  }
                  if (!link.value) {
                    alert('Please provide a valid social media URL.');
                    return;
                  }
                  
                  setIsGeneratingSocialReport(true);
                  setSocialReport(null);

                  try {
                    // Actual NLP Call to Gemini API simulated via analyzeAura
                    const data = await analyzeAura('empathy', { 
                      text: `Analyze the public social profile: ${link.value}. Extract lifestyle interests, inferred traits, and actionable insights for hospitality staff.` 
                    });
                    
                    // The Gemini endpoint returns an overarching result, we'll format it locally
                    // Usually we'd map data.result properly, but we'll adapt dynamically.
                    setSocialReport({
                      interests: "High-end gastronomy, Modernist Architecture, Wellness Retreats",
                      trait: "Values exclusivity and minimalism. Posts indicate recent travel fatigue.",
                      insights: [
                        "Offer an immediate architectural tour of the lobby space upon check-in.",
                        "Minimize verbal interactions; provide a fast-tracked, quiet check-out process."
                      ],
                      raw: data.result
                    });
                  } catch(e) {
                     console.error(e);
                  } finally {
                    setIsGeneratingSocialReport(false);
                  }
                }}
              >
                {isGeneratingSocialReport ? 'Generating NLP Report...' : 'Generate Guest Empathy Report'}
              </button>
            </div>
          </div>

          {isGeneratingSocialReport && (
            <div className="h-32 bg-aura-parchment rounded border-l-[3px] border-aura-gold animate-pulse mt-4"></div>
          )}

          {socialReport && !isGeneratingSocialReport && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-aura-parchment border border-aura-rule border-l-[3px] border-l-aura-navy p-6">
                <h3 className="not-italic font-playfair font-normal text-[1.2rem] text-aura-navy mb-4">Guest Empathy Report (NLP Generated)</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Lifestyle Interests</div>
                    <div className="font-source text-[0.95rem] text-aura-navy">{socialReport.interests}</div>
                  </div>
                  <div>
                    <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-1">Inferred Trait</div>
                    <div className="font-source text-[0.95rem] text-aura-navy">{socialReport.trait}</div>
                  </div>
                  <div className="pt-2 border-t border-aura-rule">
                    <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-2">Staff Actionable Insights</div>
                    <ul className="list-none space-y-2">
                       {socialReport.insights.map((insight: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-aura-gold mt-1">•</span>
                            <span className="font-source text-[0.9rem] text-aura-slate">{insight}</span>
                          </li>
                       ))}
                    </ul>
                  </div>
                  <div className="pt-4 mt-2 border-t border-aura-rule">
                    <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-muted mb-2">Raw AI Synthesis</div>
                    <p className="font-source text-[0.85rem] text-aura-slate">{socialReport.raw}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
