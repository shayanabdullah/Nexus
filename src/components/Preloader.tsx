import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Zap, Activity } from 'lucide-react';

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Percentage ticker
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
          }, 400);
          return 100;
        }
        // Slightly random progression for natural organic feel
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sequence = [
      { trigger: 0, text: 'INITIATING COLD BOOT: SECURE ENCLAVE 0x902A' },
      { trigger: 15, text: '⚡ HANDSHAKE: Establishing multi-threaded socket core...' },
      { trigger: 35, text: '🔑 AUTH: Negotiating TLS 1.3 cryptographic keychains...' },
      { trigger: 55, text: '🧠 ALLOCATING: Dedicated AI worker cache coordinate pool...' },
      { trigger: 75, text: '✔ VERIFIED: Active SLA telemetry link restored (Mean 12ms)' },
      { trigger: 95, text: '🚀 SYSTEM LAUNCH: Spinning up global dashboard overlays...' }
    ];

    sequence.forEach(step => {
      if (percent >= step.trigger && !logs.includes(step.text)) {
        setLogs(prev => [...prev, step.text]);
      }
    });
  }, [percent, logs]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="global-system-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -40,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle tech grid backdrop */}
          <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none" />
          <div className="absolute inset-0 dots-overlay opacity-[0.3] pointer-events-none" />
          
          {/* Ambient spotlight glowing center */}
          <div className="absolute w-[500px] h-[500px] bg-[#5ed29c]/[0.025] rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-md relative z-10 space-y-8 flex flex-col items-center">
            
            {/* Pulsing Brand Badge Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2.5 bg-neutral-900/80 border border-white/10 px-4 py-2 rounded-2xl"
            >
              <div className="w-6 h-6 rounded-lg bg-[#5ed29c]/10 border border-[#5ed29c]/30 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-[#5ed29c] animate-pulse" />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                NEXUS OS v2.0
              </span>
            </motion.div>

            {/* Glowing Ring Circular Preloader */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer faint background track */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-neutral-900 fill-none stroke-[3]"
                />
                
                {/* Simulated dasharray radial track for the percentage */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-[#5ed29c] fill-none stroke-[3]"
                  strokeDasharray={326}
                  initial={{ strokeDashoffset: 326 }}
                  animate={{ strokeDashoffset: 326 - (326 * percent) / 100 }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </svg>

              {/* Central text displaying direct percentages */}
              <div className="text-center font-jakarta">
                <motion.span 
                  className="text-4xl font-extrabold text-white tracking-tight block leading-none font-sans"
                >
                  {percent}%
                </motion.span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#5ed29c]/80 block mt-1 animate-pulse">
                  OPERATIONAL
                </span>
              </div>
            </div>

            {/* Simulated micro terminal log readout */}
            <div className="w-full bg-[#030406]/95 border border-white/5 rounded-2xl p-5 font-mono text-[10.5px] leading-relaxed space-y-2 text-white/65 min-h-[140px] shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5ed29c]/20 to-transparent" />
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-1.5 opacity-60">
                <Terminal className="w-3.5 h-3.5 text-[#5ed29c]" />
                <span className="text-[9px] uppercase tracking-widest font-bold">CRITICAL SECURE KERNEL PORT</span>
              </div>
              
              <div className="space-y-1.5 max-h-[90px] overflow-y-hidden">
                {logs.slice(-4).map((log, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    key={idx} 
                    className="flex gap-2 items-start"
                  >
                    <span className="text-[#5ed29c] font-bold">&gt;&gt;</span>
                    <span className="text-white/80">{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Human Footnote */}
            <div className="flex items-center gap-2 text-[10px] text-white/30 tracking-wide font-sans">
              <Activity className="w-3.5 h-3.5 text-white/30 animate-pulse" />
              <span>Establishing localized safe SLA sandbox...</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
