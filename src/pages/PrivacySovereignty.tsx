import React, { useState } from 'react';
import { ShieldCheck, Trash2, Lock } from 'lucide-react';

export default function PrivacySovereignty() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'withdraw' | 'erasure' | 'sync'; hemisphere?: string } | null>(null);
  const [consentStatus, setConsentStatus] = useState<Record<string, boolean>>({
    'Unified Guest Intelligence (UGI)': true,
    'Spatial Consciousness': true,
    'Empathy Engine': true,
    'Social Media Sentiment Analysis': false,
    'Cultural Intelligence': true,
    'Cross-Property DNA Sync': false,
  });
  const [withdrawn, setWithdrawn] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const handleToggle = (hemisphere: string, isSync: boolean = false) => {
    if (isSync && !consentStatus[hemisphere]) {
      setModalState({ isOpen: true, type: 'sync', hemisphere });
    } else if (consentStatus[hemisphere]) {
      setModalState({ isOpen: true, type: 'withdraw', hemisphere });
    } else {
      // Toggle on (except sync which has modal)
      setConsentStatus(prev => ({ ...prev, [hemisphere]: true }));
      setWithdrawn(prev => ({ ...prev, [hemisphere]: false }));
    }
  };

  const handleWithdrawClick = (hemisphere: string) => {
    setModalState({ isOpen: true, type: 'withdraw', hemisphere });
  };

  const handleDownloadData = () => {
    const data = JSON.stringify(consentStatus, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aura_privacy_data.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportLog = (format: 'csv' | 'pdf') => {
    const data = "Timestamp,Guest,Action,Hemisphere,Method,Jurisdiction\n15 Apr 2026 23:14 IST,Mr. A. Mehta,Consent Granted,Unified Guest Intelligence (UGI),Pre-arrival app,India — DPDP";
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura_audit_log.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const confirmAction = () => {
    if (!modalState) return;
    
    if (modalState.type === 'withdraw' && modalState.hemisphere) {
      setConsentStatus(prev => ({ ...prev, [modalState.hemisphere]: false }));
      setWithdrawn(prev => ({ ...prev, [modalState.hemisphere]: true }));
    } else if (modalState.type === 'sync' && modalState.hemisphere) {
      setConsentStatus(prev => ({ ...prev, [modalState.hemisphere]: true }));
    } else if (modalState.type === 'erasure') {
      // Handle erasure
      setConsentStatus({
        'Unified Guest Intelligence (UGI)': false,
        'Spatial Consciousness': false,
        'Empathy Engine': false,
        'Social Media Sentiment Analysis': false,
        'Cultural Intelligence': false,
        'Cross-Property DNA Sync': false,
      });
      setWithdrawn({
        'Unified Guest Intelligence (UGI)': true,
        'Spatial Consciousness': true,
        'Empathy Engine': true,
        'Cultural Intelligence': true,
        'Cross-Property DNA Sync': true,
      });
    }

    setModalState(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getModalContent = () => {
    if (!modalState) return { title: '', body: '' };
    if (modalState.type === 'withdraw') {
      return {
        title: 'Confirm Consent Change',
        body: `Withdrawing consent for ${modalState.hemisphere} will disable its specific capability. This will take effect immediately and the collected data will be purged within 24 hours per DPDP Act Section 12(b).`
      };
    }
    if (modalState.type === 'erasure') {
      return {
        title: 'Confirm Consent Change',
        body: 'This action permanently deletes all personal data held by AURA about you, including stay history, preferences, and inferred profiles across all connected systems. This action is irreversible.'
      };
    }
    if (modalState.type === 'sync') {
      return {
        title: 'Confirm Consent Change',
        body: 'Enabling this allows your anonymised preference profile to be shared with other hotels in the AURA consortium, enabling personalised service at any member property. You may withdraw this consent at any time.'
      };
    }
    return { title: '', body: '' };
  };

  return (
    <div className="space-y-12 pb-20 relative">
      <div>
        <h1>Privacy Sovereignty</h1>
        <div className="h-[1px] bg-aura-gold w-[40%] my-4"></div>
        <p className="font-source text-[1.05rem] text-aura-slate leading-relaxed">
          The eighth and foundational hemisphere of AURA. Every intelligence capability operates within a framework of explicit consent, temporal data minimisation, and guest sovereignty.
        </p>
      </div>

      {/* SECTION 1 — CONSENT ARCHITECTURE */}
      <section>
        <h2>Guest Consent Architecture</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
        <h3 className="font-playfair italic text-[1.1rem] text-aura-navy-mid mb-8">
          Granular, unbundled consent per hemisphere — compliant with DPDP Act 2023, GDPR, and BIPA
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
          {/* LEFT — Consent Control Matrix */}
          <div className="w-full">
            <table className="w-full text-left border-collapse border-y border-aura-rule table-fixed">
              <thead>
                <tr>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Intelligence Hemisphere</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Data Collected</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Legal Basis</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Guest Consent Status</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Unified Guest Intelligence (UGI)', data: 'Facial expression, emotional inference, gait pattern', basis: 'Explicit Consent (DPDP S.6)', type: 'explicit' },
                  { name: 'Spatial Consciousness', data: 'Proximity signal, zone presence, thermal signature', basis: 'Explicit Consent', type: 'explicit' },
                  { name: 'Empathy Engine', data: 'Voice transcript, sentiment inference, tone analysis', basis: 'Explicit Consent', type: 'explicit' },
                  { name: 'Social Media Sentiment Analysis', data: 'Public posts, interests, sentiment', basis: 'Explicit Consent', type: 'explicit' },
                  { name: 'PAR Intelligence', data: 'Room usage patterns, amenity consumption', basis: 'Legitimate Interest', type: 'required' },
                  { name: 'Revenue Intelligence', data: 'Stay history, rate preferences, booking behaviour', basis: 'Contractual Necessity', type: 'required' },
                  { name: 'Cultural Intelligence', data: 'Language preference, nationality, cultural indicators', basis: 'Explicit Consent', type: 'explicit' },
                  { name: 'Cross-Property DNA Sync', data: 'Behavioural profile shared across AURA consortium hotels', basis: 'Explicit Consent (highest restriction)', type: 'sync' },
                ].map((row, i) => {
                  const isRequired = row.type === 'required';
                  const isSync = row.type === 'sync';
                  const isOn = isRequired ? true : consentStatus[row.name];
                  const isWithdrawn = withdrawn[row.name];

                  return (
                    <tr key={i} className="border-b border-aura-rule last:border-b-0">
                      <td className="aura-table-body py-4 px-4 font-medium text-aura-navy">{row.name}</td>
                      <td className="aura-table-body py-4 px-4 text-[0.75rem]">{row.data}</td>
                      <td className="aura-table-body py-4 px-4 text-[0.75rem]">{row.basis}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => !isRequired && handleToggle(row.name, isSync)}
                            disabled={isRequired}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isOn ? 'bg-aura-navy' : 'bg-aura-rule'} ${isRequired ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ transitionDuration: '240ms' }}
                            title={isRequired ? "Required for core hotel operations" : ""}
                          >
                            <span 
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition`} 
                              style={{ transitionDuration: '240ms', transform: isOn ? 'translateX(20px)' : 'translateX(4px)' }}
                            />
                          </button>
                          {isWithdrawn && (
                            <span className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-warning border border-aura-warning px-2 py-1 rounded-[2px]">Withdrawn</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {!isRequired && (
                          <button 
                            onClick={() => handleWithdrawClick(row.name)}
                            disabled={!isOn}
                            className="aura-btn-secondary text-[0.7rem] px-3 py-1 disabled:opacity-30"
                          >
                            Withdraw
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* RIGHT — Consent Status Summary */}
          <div>
            <h2>Active Consent Profile</h2>
            <div className="h-[1px] bg-aura-rule w-full mt-3 mb-6"></div>
            
            <select className="w-full bg-aura-white border border-aura-rule font-montserrat text-[0.85rem] text-aura-navy px-4 py-3 rounded-[2px] mb-6 focus:outline-none focus:border-aura-navy">
              <option>Mr. Arjun Mehta — Room 814 · CIP</option>
            </select>
            
            <div className="h-[1px] bg-aura-rule w-full mb-4"></div>

            <div className="border border-aura-rule rounded-[2px] overflow-hidden mb-6">
              {[
                { label: 'Hemispheres Consented', value: `${Object.values(consentStatus).filter(v => v).length - (consentStatus['Cross-Property DNA Sync'] ? 1 : 0)} / 5` },
                { label: 'Cross-Property Sync', value: consentStatus['Cross-Property DNA Sync'] ? 'Enabled' : 'Disabled' },
                { label: 'Consent Captured', value: '14 Apr 2026 · 09:12 IST' },
                { label: 'Consent Method', value: 'Digital — Pre-arrival app' },
                { label: 'Data Retention Period', value: '30 days post-checkout' },
                { label: 'Scheduled Purge', value: '15 May 2026' },
                { label: 'Legal Jurisdiction', value: 'India — DPDP Act 2023' },
                { label: 'Data Protection Officer', value: 'Ms. Priya Nair · dpo@aura.hotel' },
              ].map((stat, i) => (
                <div key={i} className={`flex justify-between items-center px-4 py-3 ${i % 2 === 0 ? 'bg-aura-parchment' : 'bg-aura-white'}`}>
                  <span className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-muted">{stat.label}</span>
                  <span className="font-source text-[0.85rem] text-aura-navy font-medium">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="h-[1px] bg-aura-rule w-full mb-6"></div>

            <div className="flex gap-4 mb-8">
              <button onClick={handleDownloadData} className="aura-btn-primary flex-1 text-[0.75rem]">Download My Data</button>
              <button onClick={() => setModalState({ isOpen: true, type: 'erasure' })} className="aura-btn-secondary flex-1 text-[0.75rem]">Request Full Erasure</button>
            </div>

            <div className="bg-aura-parchment border-l-[3px] border-l-aura-gold p-5">
              <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">AURA Privacy Guarantee</div>
              <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed">
                No raw biometric data leaves this property. All facial, voice, and gait signals are processed on-device and converted to anonymised inferences before any synchronisation occurs. Your face, voice, and movement patterns are never stored, never transmitted, never sold.
              </p>
            </div>

            <div className="bg-aura-surface border-l-[3px] border-l-aura-navy p-5 mt-4">
              <div className="font-montserrat text-[0.65rem] uppercase tracking-wider text-aura-navy mb-2">Social Link Acknowledgment</div>
              <p className="font-source text-[0.9rem] text-aura-slate leading-relaxed">
                If you voluntarily opt-in to the Empathy Engine by providing social media links, AURA will only access public posts. NLP sentiment analysis is strictly used for real-time service personalization (e.g., assessing mood, lifestyle preferences) and is never permanently stored, sold, or shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* SECTION 2 — DATA RESIDENCY ENGINE */}
      <section>
        <h2>Data Residency & Flow Map</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
        <h3 className="font-playfair italic text-[1.1rem] text-aura-navy-mid mb-8">
          Where your data lives, how long it stays, and where it goes
        </h3>

        <div className="w-full pb-4">
          <div className="w-full relative h-[400px] bg-aura-surface border border-aura-rule rounded-[2px] p-2 md:p-6 overflow-hidden">
            {/* Column Headers */}
            <div className="flex justify-between px-2 md:px-10 mb-8">
              <div className="font-montserrat text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider text-aura-muted w-[30%] text-center">Collection</div>
              <div className="font-montserrat text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider text-aura-muted w-[40%] text-center">Processing</div>
              <div className="font-montserrat text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider text-aura-muted w-[30%] text-center">Storage / Purge</div>
            </div>

            {/* SVG Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrow-navy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-aura-navy-mid)" />
                </marker>
                <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-aura-gold)" />
                </marker>
              </defs>
              
              {/* Collection to Edge Node */}
              <path d="M 220 120 C 300 120, 300 160, 380 160" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              <path d="M 220 160 C 300 160, 300 160, 380 160" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              <path d="M 220 200 C 300 200, 300 160, 380 160" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              
              {/* Edge Node to AURA Core */}
              <path d="M 630 160 L 680 160 L 680 230 L 480 230 L 480 260" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              <text x="580" y="155" className="font-montserrat text-[9px] fill-aura-muted text-center" textAnchor="middle">Inference only — no raw data</text>

              {/* PMS/IoT to AURA Core */}
              <path d="M 220 280 C 300 280, 300 280, 380 280" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              <path d="M 220 320 C 300 320, 300 280, 380 280" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />

              {/* AURA Core to Consent Validation */}
              <path d="M 630 280 L 680 280" fill="none" stroke="var(--color-aura-gold)" strokeWidth="1" markerEnd="url(#arrow-gold)" />

              {/* Consent Validation to Storage */}
              <path d="M 880 260 L 880 160 L 930 160" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" markerEnd="url(#arrow-navy)" />
              <path d="M 880 300 L 880 320 L 930 320" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arrow-navy)" />
              <text x="885" y="315" className="font-montserrat text-[9px] fill-aura-muted">Consent required</text>

              {/* Storage to Purge */}
              <path d="M 1080 160 C 1120 160, 1120 240, 1080 240" fill="none" stroke="var(--color-aura-muted)" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow-navy)" />
              <text x="1105" y="200" className="font-montserrat text-[9px] fill-aura-muted">Day 30</text>

              {/* Blocked Arrow */}
              <path d="M 630 140 C 750 140, 800 320, 930 320" fill="none" stroke="var(--color-aura-navy-mid)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="750" y1="220" x2="770" y2="240" stroke="#92400E" strokeWidth="2" />
              <line x1="770" y1="220" x2="750" y2="240" stroke="#92400E" strokeWidth="2" />
              <text x="760" y="210" className="font-montserrat text-[9px] fill-aura-warning" textAnchor="middle">Blocked — Raw biometrics never leave property</text>
            </svg>

            {/* Nodes */}
            <div className="relative z-10 flex justify-between px-10 h-[280px]">
              {/* Column 1: Collection */}
              <div className="flex flex-col justify-between w-[180px]">
                {['Camera Feed', 'Microphone Input', 'Proximity Sensor'].map((label, i) => (
                  <div key={i} className="bg-aura-ivory border border-aura-rule px-3 py-2 flex items-center gap-2 rounded-[2px]">
                    <ShieldCheck size={16} className="text-aura-slate" />
                    <span className="font-montserrat text-[0.72rem] text-aura-navy">{label}</span>
                  </div>
                ))}
                <div className="h-4"></div>
                {['PMS Booking Data', 'IoT Room Sensors'].map((label, i) => (
                  <div key={i} className="bg-aura-ivory border border-aura-rule px-3 py-2 flex items-center gap-2 rounded-[2px]">
                    <ShieldCheck size={16} className="text-aura-slate" />
                    <span className="font-montserrat text-[0.72rem] text-aura-navy">{label}</span>
                  </div>
                ))}
              </div>

              {/* Column 2: Processing */}
              <div className="flex flex-col justify-around w-[250px]">
                <div className="bg-aura-white border-2 border-aura-navy p-4 rounded-[2px] shadow-sm">
                  <div className="font-montserrat text-[0.75rem] font-medium text-aura-navy mb-1">On-Property Edge Node</div>
                  <div className="font-playfair italic text-[0.85rem] text-aura-navy-mid mb-2">Raw biometrics processed here. Never transmitted.</div>
                  <div className="font-montserrat text-[0.65rem] text-aura-muted">Facial / voice / gait data converted to anonymous inference only</div>
                </div>
                
                <div className="bg-aura-white border border-aura-rule p-4 rounded-[2px] shadow-sm">
                  <div className="font-montserrat text-[0.75rem] font-medium text-aura-navy">AURA Core Intelligence</div>
                </div>
              </div>

              {/* Column 3: Storage */}
              <div className="flex flex-col justify-between w-[200px]">
                <div className="bg-aura-white border border-aura-gold p-4 rounded-[2px] shadow-sm relative -left-[180px] top-[100px] w-[160px]">
                  <div className="font-montserrat text-[0.75rem] font-medium text-aura-gold">Consent Validation Layer</div>
                </div>

                <div className="bg-aura-ivory border border-aura-rule p-3 rounded-[2px]">
                  <div className="font-montserrat text-[0.75rem] font-medium text-aura-navy mb-1">On-Property Database</div>
                  <div className="font-montserrat text-[0.65rem] text-aura-muted">30-day retention · Auto-purge</div>
                </div>

                <div className="bg-aura-ivory border border-aura-rule p-3 rounded-[2px] flex items-center gap-2">
                  <Trash2 size={16} className="text-aura-slate" />
                  <div>
                    <div className="font-montserrat text-[0.75rem] font-medium text-aura-navy mb-1">Purge Engine</div>
                    <div className="font-montserrat text-[0.65rem] text-aura-muted">Scheduled deletion · DPDP S.12</div>
                  </div>
                </div>

                <div className="bg-aura-ivory border border-aura-rule p-3 rounded-[2px]">
                  <div className="font-montserrat text-[0.75rem] font-medium text-aura-navy mb-1 flex items-center gap-1">
                    <Lock size={14} /> AURA Consortium Cloud
                  </div>
                  <div className="font-montserrat text-[0.65rem] text-aura-muted">Only if Cross-Property Sync: ON</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-aura-parchment border-y border-aura-rule py-4 px-6 flex justify-between items-center mt-6">
          <div className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-navy">Raw biometrics processed on-device only</div>
          <div className="w-[1px] h-4 bg-aura-rule"></div>
          <div className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-navy">Cross-border transfers: Restricted</div>
          <div className="w-[1px] h-4 bg-aura-rule"></div>
          <div className="font-montserrat text-[0.7rem] uppercase tracking-wider text-aura-navy">Guest-initiated purge: Immediate</div>
        </div>
      </section>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* SECTION 3 — LEGAL COMPLIANCE MATRIX */}
      <section>
        <h2>Regulatory Compliance Status</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
        <h3 className="font-source italic text-[1.05rem] text-aura-slate mb-8">
          AURA operates under simultaneous compliance obligations across all guest-origin jurisdictions
        </h3>

        <div className="w-full mb-4">
          <table className="w-full text-left border-collapse border-y border-aura-rule table-fixed">
            <thead>
              <tr>
                <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Regulation</th>
                <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Jurisdiction</th>
                <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Applies to AURA</th>
                <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Key Obligation</th>
                <th className="aura-table-header py-3 px-4 border-b border-aura-rule">AURA Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { reg: 'DPDP Act 2023 + Rules (Nov 2025)', jur: 'India', applies: 'Biometric data, consent, DPO appointment', ob: 'Explicit consent per data type; purge on withdrawal', status: 'COMPLIANT', color: 'text-aura-success' },
                { reg: 'GDPR Article 9', jur: 'European Union', applies: 'Special category biometric data', ob: 'Explicit opt-in; purpose limitation; right to erasure', status: 'COMPLIANT', color: 'text-aura-success' },
                { reg: 'EU AI Act (High-Risk AI)', jur: 'European Union', applies: 'Emotion inference systems', ob: 'Transparency, human oversight, conformity assessment', status: 'IN REVIEW', color: 'text-aura-warning' },
                { reg: 'BIPA', jur: 'Illinois, USA', applies: 'Biometric collection from US guests', ob: 'Written consent; retention policy; no sale', status: 'COMPLIANT', color: 'text-aura-success' },
                { reg: 'CCPA / CPRA', jur: 'California, USA', applies: 'Cross-property data sharing', ob: 'Right to opt-out of data sale; deletion rights', status: 'COMPLIANT', color: 'text-aura-success' },
                { reg: 'PDPA', jur: 'Thailand / Singapore', applies: 'International guest data', ob: 'Consent and transfer restrictions', status: 'COMPLIANT', color: 'text-aura-success' },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-surface'}>
                  <td className="aura-table-body py-3 px-4 border-b border-aura-rule font-medium text-aura-navy">{row.reg}</td>
                  <td className="aura-table-body py-3 px-4 border-b border-aura-rule">{row.jur}</td>
                  <td className="aura-table-body py-3 px-4 border-b border-aura-rule">{row.applies}</td>
                  <td className="aura-table-body py-3 px-4 border-b border-aura-rule">{row.ob}</td>
                  <td className="py-3 px-4 border-b border-aura-rule">
                    <span className={`font-montserrat text-[0.65rem] uppercase tracking-wider font-medium ${row.color}`}>
                      ● {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-source italic text-[0.8rem] text-aura-muted">
          ● IN REVIEW indicates that the EU AI Act conformity assessment documentation is pending third-party audit. Human oversight is active on all emotion inference outputs pending certification.
        </p>
      </section>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* SECTION 4 — CONSENT AUDIT TRAIL */}
      <section>
        <h2>Immutable Consent Audit Trail</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
        <h3 className="font-source italic text-[1.05rem] text-aura-slate mb-8">
          Every consent action is timestamped and cryptographically logged — tamper-evident and available to regulators on request
        </h3>

        <div className="w-full border border-aura-rule rounded-[2px] overflow-hidden mb-6">
          <div className="max-h-[240px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-aura-surface z-10 shadow-sm">
                <tr>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Timestamp</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Guest</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Action</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Hemisphere</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Method</th>
                  <th className="aura-table-header py-3 px-4 border-b border-aura-rule">Jurisdiction</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '15 Apr 2026 23:14 IST', guest: 'Mr. A. Mehta', action: 'Consent Granted', hemi: 'Unified Guest Intelligence (UGI)', method: 'Pre-arrival app', jur: 'India — DPDP' },
                  { time: '15 Apr 2026 23:14 IST', guest: 'Mr. A. Mehta', action: 'Consent Granted', hemi: 'Empathy Engine', method: 'Pre-arrival app', jur: 'India — DPDP' },
                  { time: '15 Apr 2026 23:14 IST', guest: 'Mr. A. Mehta', action: 'Consent Declined', hemi: 'Cross-Property Sync', method: 'Pre-arrival app', jur: 'India — DPDP' },
                  { time: '15 Apr 2026 22:40 IST', guest: 'Ms. Y. Tanaka', action: 'Consent Granted', hemi: 'Cultural Intelligence', method: 'Front desk kiosk', jur: 'Japan — APPI' },
                  { time: '15 Apr 2026 21:55 IST', guest: 'Mr. J. Mueller', action: 'Consent Withdrawn', hemi: 'Spatial Consciousness', method: 'Guest portal', jur: 'EU — GDPR' },
                  { time: '15 Apr 2026 21:55 IST', guest: 'Mr. J. Mueller', action: 'Purge Initiated', hemi: 'Spatial Consciousness', method: 'System — auto', jur: 'EU — GDPR' },
                  { time: '15 Apr 2026 20:10 IST', guest: 'Ms. L. Chen', action: 'Erasure Requested', hemi: 'All Hemispheres', method: 'Guest portal', jur: 'Singapore — PDPA' },
                  { time: '15 Apr 2026 20:12 IST', guest: 'Ms. L. Chen', action: 'Full Erasure Completed', hemi: 'All Hemispheres', method: 'System — auto', jur: 'Singapore — PDPA' },
                  { time: '14 Apr 2026 09:12 IST', guest: 'Mr. A. Mehta', action: 'Consent Granted', hemi: 'Spatial Consciousness', method: 'Pre-arrival app', jur: 'India — DPDP' },
                  { time: '14 Apr 2026 09:12 IST', guest: 'Mr. A. Mehta', action: 'Consent Granted', hemi: 'PAR Intelligence', method: 'System — auto', jur: 'India — DPDP' },
                ].map((row, i) => {
                  let actionColor = 'text-aura-slate';
                  if (row.action.includes('Granted')) actionColor = 'text-aura-success';
                  if (row.action.includes('Withdrawn') || row.action.includes('Erasure') || row.action.includes('Declined')) actionColor = 'text-aura-warning';
                  if (row.action.includes('Purge')) actionColor = 'text-aura-gold';

                  return (
                    <tr key={i} className={i % 2 === 0 ? 'bg-aura-white' : 'bg-aura-surface'}>
                      <td className="font-montserrat text-[0.72rem] text-aura-slate py-3 px-4 border-b border-aura-rule">{row.time}</td>
                      <td className="font-montserrat text-[0.72rem] text-aura-navy py-3 px-4 border-b border-aura-rule">{row.guest}</td>
                      <td className={`font-montserrat text-[0.72rem] font-medium py-3 px-4 border-b border-aura-rule ${actionColor}`}>{row.action}</td>
                      <td className="font-montserrat text-[0.72rem] text-aura-slate py-3 px-4 border-b border-aura-rule">{row.hemi}</td>
                      <td className="font-montserrat text-[0.72rem] text-aura-slate py-3 px-4 border-b border-aura-rule">{row.method}</td>
                      <td className="font-montserrat text-[0.72rem] text-aura-slate py-3 px-4 border-b border-aura-rule">{row.jur}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => handleExportLog('csv')} className="aura-btn-secondary text-[0.72rem] uppercase">Export Audit Log (CSV)</button>
          <button onClick={() => handleExportLog('pdf')} className="aura-btn-secondary text-[0.72rem] uppercase">Export Audit Log (PDF)</button>
          <button onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }} className="aura-btn-secondary text-[0.72rem] uppercase">Submit to Regulator</button>
        </div>
      </section>

      <div className="h-[1px] bg-aura-rule w-full"></div>

      {/* SECTION 5 — EDGE PROCESSING MONITOR */}
      <section>
        <h2>On-Property Edge Node Status</h2>
        <div className="h-[1px] bg-aura-rule w-full mt-3 mb-4"></div>
        <h3 className="font-source italic text-[1.05rem] text-aura-slate mb-8">
          All biometric inference runs locally. The following confirms zero raw data transmission.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="aura-card p-6 border-t-[3px] border-t-aura-gold">
            <div className="font-cormorant font-semibold text-[2.8rem] text-aura-navy leading-none mb-2">0</div>
            <div className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">Raw Biometric Transmissions</div>
            <div className="font-source text-[0.75rem] text-aura-slate mt-1">Total · All Time</div>
          </div>
          <div className="aura-card p-6">
            <div className="font-cormorant font-semibold text-[2.8rem] text-aura-navy leading-none mb-2">14,847</div>
            <div className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">Inferences Processed On-Device</div>
            <div className="font-source text-[0.75rem] text-aura-slate mt-1">Current Stay Cycle</div>
          </div>
          <div className="aura-card p-6">
            <div className="font-cormorant font-semibold text-[2.8rem] text-aura-navy leading-none mb-2">99.99%</div>
            <div className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">Edge Node Uptime</div>
            <div className="font-source text-[0.75rem] text-aura-slate mt-1">Last 30 days</div>
          </div>
          <div className="aura-card p-6">
            <div className="font-cormorant font-semibold text-[2.8rem] text-aura-navy leading-none mb-2">3</div>
            <div className="font-montserrat text-[0.68rem] uppercase tracking-wider text-aura-muted">Scheduled Purges Pending</div>
            <div className="font-source text-[0.75rem] text-aura-slate mt-1">Guest profiles · Checkout +30d</div>
          </div>
        </div>

        <div className="w-full bg-aura-parchment p-8">
          <h3 className="font-playfair italic text-[1.4rem] text-aura-navy mb-4">The Privacy Guarantee</h3>
          <div className="space-y-4 font-source text-[1.05rem] text-aura-slate leading-relaxed">
            <p>
              AURA was designed with a foundational conviction: intelligence and privacy are not in conflict. Every capability that makes AURA extraordinary — emotion recognition, spatial awareness, predictive resource management — operates exclusively on anonymised signals. The moment a biometric reading is taken, it is converted into an abstract inference and the raw data is permanently discarded on-device.
            </p>
            <p>
              A guest's face, voice, and movement are theirs alone. AURA never knows them as data points. It knows them as people.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalState && (
        <div className="fixed inset-0 bg-white/85 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-aura-white border border-aura-rule rounded-[4px] border-l-[3px] border-l-aura-gold max-w-[480px] w-full p-8 shadow-lg">
            <h2 className="text-[1.8rem] mb-4">{getModalContent().title}</h2>
            <p className="font-source text-[1rem] text-aura-slate leading-relaxed mb-8">
              {getModalContent().body}
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setModalState(null)} className="aura-btn-secondary">Cancel</button>
              <button onClick={confirmAction} className="aura-btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-aura-ivory border border-aura-success rounded-[2px] px-4 py-3 shadow-md animate-in slide-in-from-bottom-4 fade-in duration-300 z-50">
          <span className="font-montserrat text-[0.72rem] text-aura-navy">Consent updated · {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} IST</span>
        </div>
      )}
    </div>
  );
}
