import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Layers, Slack, Kanban, FileText, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Storyteller() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  // Floating app icons nodes in scene references
  const app1Ref = useRef<HTMLDivElement>(null);
  const app2Ref = useRef<HTMLDivElement>(null);
  const app3Ref = useRef<HTMLDivElement>(null);
  const app4Ref = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger Sequence
    // Pin the container for luxury smooth transition feel
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    });

    // Create main master timeline tied to the pinned scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1,
      }
    });

    // --- Scene 1 to Scene 2 (Modern work is fragmented -> Floating apps appear) ---
    tl.to(scene1Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
      .fromTo(scene2Ref.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
      // Animate floating windows sliding out in disjointed directions
      .fromTo(app1Ref.current, { x: -80, y: -40, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.2 }, "-=0.8")
      .fromTo(app2Ref.current, { x: 80, y: -60, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.2 }, "-=1")
      .fromTo(app3Ref.current, { x: -100, y: 60, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.2 }, "-=1")
      .fromTo(app4Ref.current, { x: 100, y: 80, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.2 }, "-=1");

    // --- Scene 2 to Scene 3 (Apps merge into one glowing AI core) ---
    // Fade out the fragmented tools text so it doesn't overlap
    tl.to(scene2TextRef.current, { opacity: 0, y: -30, duration: 1 })
      .to(scene2Ref.current, { scale: 0.95, duration: 1 }, "-=1")
      .fromTo(scene3Ref.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5")
      // Animate apps pulling closer, scaling down, merging into core
      .to(app1Ref.current, { x: 120, y: 100, scale: 0.2, opacity: 0, duration: 1.5 }, "-=0.8")
      .to(app2Ref.current, { x: -120, y: 120, scale: 0.2, opacity: 0, duration: 1.5 }, "-=1.5")
      .to(app3Ref.current, { x: 140, y: -100, scale: 0.2, opacity: 0, duration: 1.5 }, "-=1.5")
      .to(app4Ref.current, { x: -140, y: -120, scale: 0.2, opacity: 0, duration: 1.5 }, "-=1.5")
      // Core glowing intensifying
      .fromTo(coreRef.current, { scale: 0.5, filter: "blur(20px)", opacity: 0 }, { scale: 1.2, filter: "blur(0px)", opacity: 1, duration: 1.5 }, "-=1")
      // Fully hide scene 2 container so it doesn't block interactions or render anything
      .to(scene2Ref.current, { opacity: 0, duration: 0.5 }, "-=0.5");

    // --- Scene 3 to Scene 4 (Massive reveal: One Operating System. Infinite Intelligence.) ---
    tl.to(scene3Ref.current, { opacity: 0, y: -50, duration: 1 })
      .fromTo(scene4Ref.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.5");

    return () => {
      pin.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative bg-black select-none">
      {/* 40vh scroll-indicator margin background helper */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* FIXED IMMERSIVE VIEWPORT CONTAINER */}
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Scene 1: Introduction text on pure black with high contrast display typography */}
        <div ref={scene1Ref} className="absolute inset-x-6 flex flex-col items-center text-center max-w-4xl mx-auto z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5ed29c] mb-4">SEQUENCE 01 // ARCHITECTURE</span>
          <h2 className="text-5xl sm:text-7xl font-sans font-extrabold tracking-tight text-white leading-none">
            Modern work is <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c] font-serif italic font-normal">fragmented.</span>
          </h2>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <p className="font-jakarta text-xs text-white/40 tracking-wider uppercase font-semibold">SCROLL TO ANALYZE SYMMETRY</p>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Scene 2: Floating Productivity Apps break apart */}
        <div ref={scene2Ref} className="absolute inset-0 w-full h-full flex flex-col justify-center items-center opacity-0 z-10">
          <div ref={scene2TextRef} className="text-center max-w-2xl px-6 mb-12">
            <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-3">
              Tools Pull Attention Apart.
            </h3>
            <p className="text-white/40 text-xs sm:text-sm">
              Siloed data streams, redundant notifications, lost context threads.
            </p>
          </div>

          {/* Absolute floating product app panels */}
          <div className="relative w-full max-w-3xl h-[260px] sm:h-[320px]">
            {/* Mock Slack bubble card */}
            <div ref={app1Ref} className="absolute top-2 sm:top-4 left-2 sm:left-12 liquid-glass p-3 sm:p-4 rounded-xl border border-white/5 w-44 sm:w-60">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Slack className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3eb991]" />
                <span className="text-[9px] sm:text-[10px] font-bold font-mono text-white/50">SLACK CONTEXT</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/70">"Did we commit the Redis allocation code?"</p>
            </div>

            {/* Mock Task Kanban card */}
            <div ref={app2Ref} className="absolute top-10 sm:top-8 right-2 sm:right-12 liquid-glass p-3 sm:p-4 rounded-xl border border-white/5 w-44 sm:w-60">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Kanban className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5e6ad2]" />
                <span className="text-[9px] sm:text-[10px] font-bold font-mono text-white/50">LINEAR TASK</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/70">Issue CRM-248 assigned to nobody.</p>
            </div>

            {/* Mock Doc Card */}
            <div ref={app3Ref} className="absolute bottom-4 sm:bottom-6 left-2 sm:left-24 liquid-glass p-3 sm:p-4 rounded-xl border border-white/5 w-40 sm:w-56">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffffff]" />
                <span className="text-[9px] sm:text-[10px] font-bold font-mono text-white/50">NOTION BRIEF</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/70 font-medium">Stale API latency guide.md</p>
            </div>

            {/* Mock Sync Card */}
            <div ref={app4Ref} className="absolute bottom-8 sm:bottom-10 right-2 sm:right-24 liquid-glass p-3 sm:p-4 rounded-xl border border-white/5 w-40 sm:w-56">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5ed29c]" />
                <span className="text-[9px] sm:text-[10px] font-bold font-mono text-white/50">SYSTEM STATE</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/70">Awaiting prompt coordinates...</p>
            </div>
          </div>
        </div>

        {/* Scene 3: The Apps Merge to one Glowing AI Core */}
        <div ref={scene3Ref} className="absolute inset-0 w-full h-full flex flex-col justify-center items-center opacity-0 z-10 p-6">
          <div className="text-center max-w-2xl mb-8">
            <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white mb-3">
              One Center, Perfect Convergence.
            </h3>
            <p className="text-white/45 text-xs sm:text-sm">
              Collapsing decentralized application silos into a single real-time intelligence layer.
            </p>
          </div>

          {/* Central glowing emerald sphere */}
          <div className="relative flex items-center justify-center">
            {/* Giant blur halo */}
            <div className="absolute w-80 h-80 bg-[#5ed29c]/20 rounded-full blur-[90px] animate-pulse" />
            
            <div 
              ref={coreRef} 
              className="relative w-32 h-32 rounded-full border border-[#5ed29c]/40 bg-gradient-to-tr from-[#5ed29c]/20 to-[#5ed29c]/40 flex items-center justify-center shadow-[0_0_50px_rgba(94,210,156,0.2)]"
            >
              <div className="absolute inset-2 rounded-full border border-white/10 animate-spin [animation-duration:12s]" />
              <Layers className="w-10 h-10 text-[#5ed29c]" />
            </div>

            {/* Faint dotted connection rays */}
            <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-full" />
            <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full border-dashed" />
          </div>
        </div>

        {/* Scene 4: Massive Reveal of the System */}
        <div ref={scene4Ref} className="absolute inset-x-6 flex flex-col items-center text-center max-w-5xl mx-auto opacity-0 z-20">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5ed29c]" />
            <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">THE NEW DAWN</span>
          </motion.div>

          <h2 className="text-6xl sm:text-8xl font-sans font-black tracking-tight text-white leading-none mb-6">
            One Operating System.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c] font-serif italic font-normal drop-shadow-[0_0_15px_rgba(94,210,156,0.3)]">Infinite Intelligence.</span>
          </h2>
          
          <p className="text-white/60 text-sm max-w-xl mb-8 leading-relaxed">
            By aggregating contextual threads across channels, NEXUS OS empowers teams with real-time foresight and proactive automated workflows.
          </p>

          <button
            onClick={() => {
              const element = document.getElementById('command-center');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#5ed29c] transition-colors cursor-pointer"
          >
            Enter Adaptive System
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
