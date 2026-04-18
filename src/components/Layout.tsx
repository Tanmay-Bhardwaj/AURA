import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dna, 
  Building2, 
  HeartHandshake, 
  Package, 
  TrendingUp, 
  Globe, 
  Network,
  ShieldCheck,
  Menu,
  X,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeAura } from '../lib/gemini';

const NAV_ITEMS = [
  { path: '/', label: 'Command Bridge', icon: LayoutDashboard },
  { path: '/guest-dna', label: 'Unified Guest Intelligence (UGI)', icon: Dna },
  { path: '/spatial', label: 'Spatial Engine', icon: Building2 },
  { path: '/empathy', label: 'Empathy Engine', icon: HeartHandshake },
  { path: '/par', label: 'PAR Intelligence', icon: Package },
  { path: '/revenue', label: 'Revenue Intel', icon: TrendingUp },
  { path: '/cultural', label: 'Cultural Intel', icon: Globe },
  { path: '/privacy', label: 'Privacy Sovereignty', icon: ShieldCheck },
  { path: '/integration', label: 'Integration Layer', icon: Network },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'aura' | 'user', text: string}[]>([
    { role: 'aura', text: 'Good evening. I am AURA. How may I assist with hotel operations today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();

  const currentNav = NAV_ITEMS.find(item => item.path === location.pathname);
  const pageName = currentNav ? currentNav.label : 'Project AURA';

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await analyzeAura('chat', { text: userMsg });
      setChatMessages(prev => [...prev, { role: 'aura', text: response.result }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'aura', text: 'I apologize, but I am unable to process that request at the moment. Please ensure the intelligence core is online.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="pt-8 pb-8 px-6">
        <div className="font-cormorant font-light text-[2.2rem] tracking-[0.2em] text-aura-navy">AURA</div>
        <div className="h-[1px] bg-aura-gold w-full my-4"></div>
        <div className="font-montserrat text-[0.6rem] tracking-[0.1em] uppercase text-aura-muted">
          Adaptive Universal Recognition Architecture
        </div>
      </div>

      <div className="pt-8 flex-1">
        <div className="font-montserrat text-[0.6rem] tracking-[0.16em] uppercase text-aura-muted px-6 mb-2">
          Intelligence Modules
        </div>
        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => clsx(
                  "flex items-center px-6 py-[10px] transition-colors duration-200 border-l-2",
                  isActive 
                    ? "border-aura-gold bg-aura-surface text-aura-navy" 
                    : "border-transparent text-aura-slate hover:bg-aura-surface/50"
                )}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={clsx("w-4 h-4 mr-3", isActive ? "text-aura-gold" : "text-aura-slate")} />
                    <span className="aura-nav-label" style={{ color: isActive ? 'var(--color-aura-navy)' : 'inherit' }}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto">
        <div className="h-[1px] bg-aura-rule w-full"></div>
        <div className="px-6 py-4">
          <div className="font-montserrat text-[0.7rem] text-aura-slate mb-1">
            {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="font-montserrat text-[0.6rem] uppercase text-aura-muted">
            AURA v2050
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-aura-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-[240px] bg-aura-ivory border-r border-aura-rule z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-aura-navy/20 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-[240px] bg-aura-ivory border-r border-aura-rule z-40 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col lg:pl-[240px] min-h-screen">
        {/* Top Header Bar */}
        <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-[56px] bg-aura-white border-b border-aura-rule z-10 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-aura-navy"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-baseline space-x-2">
              <span className="font-playfair italic text-[1.1rem] text-aura-navy">{pageName}</span>
              <span className="font-montserrat text-[0.68rem] text-aura-muted hidden sm:inline-block">/ AURA Intelligence</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="font-montserrat text-[0.62rem] text-aura-muted">Powered by Gemini</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-aura-surface px-2 py-1 rounded-full border border-aura-rule">
              <div className="w-1.5 h-1.5 rounded-full bg-aura-success animate-pulse"></div>
              <span className="font-montserrat text-[0.68rem] text-aura-success uppercase tracking-wider">AURA Intelligence Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 mt-[56px] p-6 md:p-10 lg:p-12">
          <div className="max-w-[1280px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Floating AURA Assistant Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-aura-navy text-aura-white flex items-center justify-center shadow-lg hover:bg-aura-navy-mid transition-colors duration-200 z-20"
      >
        <MessageSquare className="w-[18px] h-[18px]" />
      </button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-aura-navy/10 z-40"
              onClick={() => setIsChatOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[360px] bg-aura-ivory border-l border-aura-rule z-50 flex flex-col shadow-2xl"
            >
              <div className="h-[56px] flex items-center justify-between px-6 border-b border-aura-rule bg-aura-white">
                <div className="flex items-baseline space-x-2">
                  <span className="font-playfair italic text-[1rem] text-aura-navy">AURA Assistant</span>
                  <span className="font-montserrat text-[0.6rem] text-aura-muted">Powered by Gemini</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-aura-slate hover:text-aura-navy">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`max-w-[85%] p-3 rounded-sm ${msg.role === 'aura' ? 'self-start bg-aura-ivory border border-aura-rule' : 'self-end bg-aura-navy text-aura-white'}`}>
                    <p className={`font-source text-[0.9rem] ${msg.role === 'aura' ? 'text-aura-slate' : 'text-aura-white'}`}>
                      {msg.text}
                    </p>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="self-start max-w-[85%] bg-aura-ivory border border-aura-rule p-3 rounded-sm flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-aura-gold animate-spin" />
                    <span className="font-source text-[0.8rem] text-aura-slate">AURA is thinking...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t border-aura-rule bg-aura-white">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask AURA..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                    className="flex-1 border border-aura-rule bg-aura-white px-3 py-2 font-source text-[0.9rem] focus:outline-none focus:border-aura-navy transition-colors"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-aura-navy text-aura-white px-4 py-2 font-montserrat text-[0.7rem] uppercase tracking-wider hover:bg-aura-navy-mid transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
