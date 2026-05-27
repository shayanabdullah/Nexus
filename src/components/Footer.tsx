import React from 'react';
import { motion } from 'motion/react';
import { Layers, ArrowRight, CornerDownRight, Sparkles, Send, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const links = [
    { name: 'Product', items: ['Feature core', 'Agentic system', 'Telemetry insights', 'Changelogs'] },
    { name: 'Corporate', items: ['About', 'Careers tier', 'Privacy standard', 'Press Desk'] },
    { name: 'Resources', items: ['Documentation', 'API reference', 'Infr_Latency check', 'Status monitoring'] }
  ];

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* SECTION 9 — FINAL CTA SECTION */}
      <section className="relative py-36 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Dynamic floating particles with blurred radial glowing gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5ed29c]/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none z-0" />

        {/* Ambient floating particle items */}
        <div className="absolute inset-x-0 top-12 bottom-12 overflow-hidden pointer-events-none">
          {[10, 42, 74, 18, 92, 55].map((left, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 6 + idx,
                ease: 'easeInOut'
              }}
              style={{ left: `${left}%` }}
              className="absolute w-2 h-2 rounded-full bg-[#5ed29c]/40 blur-[1px]"
            />
          ))}
        </div>

        <div className="max-w-4xl px-6 relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5ed29c]" />
            <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">DEPLOY COGNITION IMMEDIATELY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-none"
          >
            The Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c] font-serif italic font-normal">Doesn't Wait.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/60 text-sm max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Build with intelligence at the center. Consolidate systems to protect your mental energy and engineering latency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="cta-footer-start"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-[#5ed29c] hover:bg-[#4bc089] text-black text-xs font-bold uppercase tracking-widest rounded-full px-9 py-4.5 transition-all duration-300 shadow-[0_0_20px_rgba(94,210,156,0.3)] hover:shadow-[0_0_30px_rgba(94,210,156,0.5)] hover:scale-[1.03] cursor-pointer"
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="cta-footer-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-white/25 hover:border-white/60 bg-white/[0.01] text-white text-xs font-semibold uppercase tracking-widest rounded-full px-9 py-4.5 transition-all duration-300 cursor-pointer"
            >
              Book Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* STANDARD LINKS FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative z-10 gap-12 grid grid-cols-1 md:grid-cols-12 items-start justify-between">
        
        {/* Brand details */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-jakarta font-extrabold text-sm tracking-widest text-white">
              NEXUS <span className="text-[#5ed29c] font-light">OS</span>
            </span>
          </div>

          <p className="text-white/40 text-[11px] max-w-xs leading-relaxed font-sans">
            An elegant artificial operating system unifying modern teams, autonomous agents, and contextual memory pipelines.
          </p>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {links.map((grp) => (
            <div key={grp.name} className="space-y-4">
              <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#5ed29c]">
                {grp.name}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {grp.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-white/30 font-semibold uppercase tracking-wider">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <span>© {new Date().getFullYear()} NEXUS OS TECHNOLOGIES, PBC. ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className="text-[#5ed29c] font-black tracking-widest bg-[#5ed29c]/10 px-2.5 py-0.5 rounded-full border border-[#5ed29c]/20">DEVELOPED BY SHAYAN</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">SECURITY ASSURANCE</a>
          <div className="h-2 w-px bg-white/10" />
          <a href="#" className="hover:text-white transition-colors">COMPLIANCE STATS</a>
        </div>
      </div>

    </footer>
  );
}
