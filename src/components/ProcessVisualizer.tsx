import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Database, Network, Workflow, Sliders, Sparkles, FolderOpen, AlertCircle, Laptop, Settings, Cpu, Bot, Zap } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  icon: React.ComponentType<any>;
  floatIcon: React.ComponentType<any>;
  description: string;
  points: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '1',
    title: 'Research & Ingestion',
    icon: Database,
    floatIcon: FolderOpen,
    description: 'We connect secure platform hooks and ingest active workspaces, databases, and communication channels into one local architecture.',
    points: [
      'Mapped communication clusters (Slack channels, Google Drive, Notion docs).',
      'Identified critical drag metrics and manual context-overheads.',
      'Built custom knowledge index models tailored to company guidelines.'
    ]
  },
  {
    number: '2',
    title: 'Relational Graphing',
    icon: Network,
    floatIcon: AlertCircle,
    description: 'Synthesized all gathered intelligence threads into a living relational semantic map to trace and index knowledge dependencies.',
    points: [
      'Mapped high-traffic query workflows to human execution paths.',
      'Identified repetitive information retrieval and context silos.',
      'Unified file schemas, chat context, and database layers effortlessly.'
    ]
  },
  {
    number: '3',
    title: 'Cognitive Orchestration',
    icon: Workflow,
    floatIcon: Laptop,
    description: 'Engineered robust, self-routing agent channels and asynchronous multi-step processing workflows tailored to core operations.',
    points: [
      'Integrated prompt redirection grids to direct user inputs dynamically.',
      'Established real-time hooks and event triggers to external platforms.',
      'Engineered sub-millisecond local-first memory cache mechanisms.'
    ]
  },
  {
    number: '4',
    title: 'Command Layer Integration',
    icon: Sliders,
    floatIcon: Settings,
    description: 'Designed customized high-contrast telemetry interfaces, live agent shells, and command centers that put control in your hands.',
    points: [
      'Built ultra-responsive live text input streams and system cards.',
      'Integrated responsive visual widgets for monitoring running subtasks.',
      'Locked system settings with zero-leak local storage encryption.'
    ]
  },
  {
    number: '5',
    title: 'Telemetry & Scaling',
    icon: Sparkles,
    floatIcon: Cpu,
    description: 'Deployed the production-grade decentralized cognitive workspace into local systems with autonomous self-improving loops.',
    points: [
      'Configured secure end-to-end sandbox execution tunnels.',
      'Integrated local performance monitors tracking model latencies.',
      'Unlocked live telemetry loops that refine system flows over time.'
    ]
  },
  {
    number: '6',
    title: 'Autonomous Tuning',
    icon: Bot,
    floatIcon: Zap,
    description: 'Continuous model adaptation and offline feedback pipelines refine response accuracy and agent execution speeds automatically.',
    points: [
      'Self-calibrated cognitive index routing running on safe nodes.',
      'Optimized token pipelines that minimize runtime and resource overhead.',
      'Continuous auto-healing patterns that streamline active workflows.'
    ]
  }
];

export default function ProcessVisualizer() {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25, mass: 0.3 });
  const glowY = useTransform(smoothProgress, [0.03, 0.97], ["0%", "100%"]);

  return (
    <div className="w-full relative z-10 px-4 sm:px-6">
      {/* SECTION HEADER BLOCK */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#5ed29c] animate-pulse" />
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#5ed29c] uppercase">
            DESIGN FRAMEWORK
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mb-6 leading-tight">
          Our Thoughtful Process<br />
          Towards <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c] drop-shadow-[0_0_15px_rgba(94,210,156,0.3)]">Autonomous Systems</span>
        </h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto">
          We combine cutting-edge context systems with meticulous design to build human-in-the-loop cognitive workspaces that scale.
        </p>
      </div>

      {/* STAGGERED 2-COLUMN GRID (AS SEEN IN REFERENCE PHOTOS) */}
      <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative">
        {/* Connection networks and travelers container */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block z-0">
          {/* Base path track line */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5ed29c]/20 via-white/10 to-[#5ed29c]/5 w-full h-full" />
          
          {/* Traveling glow beam */}
          <motion.div 
            style={{ 
              top: glowY,
            }}
            className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[180px] bg-gradient-to-b from-transparent via-[#5ed29c] to-transparent rounded-full flex flex-col items-center select-none"
          >
            {/* Super bright particle bead in the center of the beam */}
            <div className="w-[10px] h-[10px] bg-white rounded-full shadow-[0_0_12px_#5ed29c,0_0_24px_#5ed29c,0_0_4px_#ffffff] absolute top-1/2 -translate-y-1/2 animate-pulse" />
          </motion.div>
        </div>

        {/* HOLOGRAPHIC NEURAL CYBER-NET CORE right in the middle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none hidden md:block z-0 select-none">
          {/* Decorative rotating grid circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] rounded-full border border-[#5ed29c]/10 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[140px] h-[140px] rounded-full border border-white/5 border-dashed"
            />
            <div className="absolute w-[80px] h-[80px] rounded-full bg-[#5ed29c]/5 border border-[#5ed29c]/20 flex items-center justify-center backdrop-blur-md">
              <Network className="w-5 h-5 text-[#5ed29c] animate-pulse" />
            </div>
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            <defs>
              <filter id="glow-filter-nodes" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="gradient-left-node" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgba(94, 210, 156, 0.03)" />
              </linearGradient>
              <linearGradient id="gradient-right-node" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgba(94, 210, 156, 0.03)" />
              </linearGradient>
            </defs>

            {/* Circuit paths branching left & right to connect towards process stages */}
            <path d="M 100 100 L 50 70 L 10 70" fill="none" stroke="url(#gradient-left-node)" strokeWidth="1.2" />
            <circle cx="50" cy="70" r="3" fill="#090a0d" stroke="#5ed29c" strokeWidth="1.5" />
            <circle cx="10" cy="70" r="1.5" fill="#5ed29c" />

            <path d="M 100 100 L 150 130 L 190 130" fill="none" stroke="url(#gradient-right-node)" strokeWidth="1.2" />
            <circle cx="150" cy="130" r="3" fill="#090a0d" stroke="#5ed29c" strokeWidth="1.5" />
            <circle cx="190" cy="130" r="1.5" fill="#5ed29c" />

            {/* Vertical dotted pathways */}
            <path d="M 100 40 L 100 160" fill="none" stroke="#5ed29c" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.3" />

            {/* Active digital pulses swimming down the connectors */}
            <motion.circle
              cx="100"
              cy="100"
              r="2.5"
              fill="#5ed29c"
              filter="url(#glow-filter-nodes)"
              animate={{
                cx: [100, 50, 10],
                cy: [100, 70, 70],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="2.5"
              fill="#5ed29c"
              filter="url(#glow-filter-nodes)"
              animate={{
                cx: [100, 150, 190],
                cy: [100, 130, 130],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: 1.2,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        {PROCESS_STEPS.map((step, idx) => {
          // Check if index is even or odd for responsive staggered offset classes
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex relative ${
                isEven ? 'justify-start md:justify-end md:pr-16' : 'justify-start md:pl-16 md:mt-16'
              }`}
            >
              {/* Circuit Connector Wire bridging the space between the card and the central track */}
              {isEven ? (
                /* Left Column: Line extends from the right of the card to the center line */
                <div className="absolute right-0 w-16 h-[20px] top-[75px] hidden md:block select-none pointer-events-none z-10">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 64 20">
                    <path
                      d="M 0 14 L 28 14 L 38 4 L 64 4"
                      fill="none"
                      stroke="#5ed29c"
                      strokeWidth="2.5"
                      className="blur-[3px] opacity-40"
                    />
                    <motion.path
                      d="M 0 14 L 28 14 L 38 4 L 64 4"
                      fill="none"
                      stroke="#5ed29c"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      whileInView={{ pathLength: 1, opacity: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15 }}
                    />
                    <circle cx="64" cy="4" r="3.5" fill="#090a0d" stroke="#5ed29c" strokeWidth="2" className="shadow-lg" />
                    <circle cx="0" cy="14" r="2.5" fill="#5ed29c" />
                    
                    <motion.circle
                      cx="64"
                      cy="4"
                      r="2"
                      fill="#ffffff"
                      className="shadow-[0_0_8px_#5ed29c]"
                      animate={{
                        cx: [64, 38, 28, 0],
                        cy: [4, 4, 14, 14],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </div>
              ) : (
                /* Right Column: Line extends from the center line to the left of the card */
                <div className="absolute left-0 w-16 h-[20px] top-[75px] hidden md:block select-none pointer-events-none z-10">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 64 20">
                    <path
                      d="M 0 4 L 26 4 L 36 14 L 64 14"
                      fill="none"
                      stroke="#5ed29c"
                      strokeWidth="2.5"
                      className="blur-[3px] opacity-40"
                    />
                    <motion.path
                      d="M 0 4 L 26 4 L 36 14 L 64 14"
                      fill="none"
                      stroke="#5ed29c"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      whileInView={{ pathLength: 1, opacity: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15 }}
                    />
                    <circle cx="0" cy="4" r="3.5" fill="#090a0d" stroke="#5ed29c" strokeWidth="2" className="shadow-lg" />
                    <circle cx="64" cy="14" r="2.5" fill="#5ed29c" />
                    
                    <motion.circle
                      cx="0"
                      cy="4"
                      r="2"
                      fill="#ffffff"
                      className="shadow-[0_0_8px_#5ed29c]"
                      animate={{
                        cx: [0, 26, 36, 64],
                        cy: [4, 4, 14, 14],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </div>
              )}

              <ProcessCard step={step} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// PREMIUM HOVER-GLOW INTERACTIVE FOLDER-TAB CARD COMPONENT
interface ProcessCardProps {
  step: ProcessStep;
}

function ProcessCard({ step }: ProcessCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 440, height: 380 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // 3D tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const FloatIcon = step.floatIcon;

  // Track exact card dimensions for the responsive folder SVG mask and path
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Premium 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -5; // Max 5 degrees tilt up/down
    const rotY = ((x - centerX) / centerX) * 5;  // Max 5 degrees tilt left/right
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Compute the perfect seamless folder-tab path based on responsive dynamic coordinates
  const W = dimensions.width;
  const H = dimensions.height;
  const TH = 42; // Perfect tab height
  const TW = Math.min(230, W * 0.58); // Proportional tab width (58% of card width, max 230px)
  
  const R_BL = 24; // Bottom-left corner radius
  const R_BR = 24; // Bottom-right corner radius
  const R_TR = 24; // Top-right corner radius of body
  const R_TAB = 16; // Top corners of tab
  const R_INVERT = 12; // Concave inverse curve transition radius to the right of tab

  const folderPath = `
    M ${R_BL},${H}
    L ${W - R_BR},${H}
    A ${R_BR},${R_BR} 0 0,0 ${W},${H - R_BR}
    L ${W},${TH + R_TR}
    A ${R_TR},${R_TR} 0 0,0 ${W - R_TR},${TH}
    L ${TW + R_INVERT},${TH}
    A ${R_INVERT},${R_INVERT} 0 0,1 ${TW},${TH - R_INVERT}
    L ${TW},${R_TAB}
    A ${R_TAB},${R_TAB} 0 0,0 ${TW - R_TAB},0
    L ${R_TAB},0
    A ${R_TAB},${R_TAB} 0 0,0 0,${R_TAB}
    L 0,${H - R_BL}
    A ${R_BL},${R_BL} 0 0,0 ${R_BL},${H}
    Z
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.015 : 1,
        y: isHovered ? -4 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 18,
        mass: 0.6
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className="relative w-full max-w-[440px] h-[375px] sm:h-[390px] select-none pointer-events-auto cursor-pointer flex flex-col"
    >
      {/* 1. SEAMLESS SVG BACKGROUND & BORDER CONTAINER WITH BUILT-IN GLOW */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        style={{ transform: "translateZ(0px)" }}
      >
        <defs>
          {/* Custom SVG filter for high-density outer neon glow */}
          <filter id={`folder-glow-${step.number}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Dynamic Radial cursor tracker gradient mapped to hover pointer position */}
          <radialGradient 
            id={`radial-glow-${step.number}`} 
            cx={`${(mousePos.x / W) * 100}%`} 
            cy={`${(mousePos.y / H) * 100}%`} 
            r="45%"
          >
            <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#5ed29c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#5ed29c" stopOpacity="0" />
          </radialGradient>

          {/* Deep Translucent Dark Glass Gradient Fill */}
          <linearGradient id={`glass-fill-${step.number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 10, 20, 0.45)" />
            <stop offset="40%" stopColor="rgba(3, 5, 8, 0.22)" />
            <stop offset="80%" stopColor="rgba(2, 3, 5, 0.28)" />
            <stop offset="100%" stopColor="rgba(4, 8, 12, 0.52)" />
          </linearGradient>

          <linearGradient id={`glass-fill-hover-${step.number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(10, 16, 30, 0.58)" />
            <stop offset="40%" stopColor="rgba(4, 6, 10, 0.3)" />
            <stop offset="80%" stopColor="rgba(3, 4, 6, 0.38)" />
            <stop offset="100%" stopColor="rgba(8, 14, 20, 0.68)" />
          </linearGradient>

          {/* Permanent Specular Glass Sheen Gradient - diagonal glossy reflection */}
          <linearGradient id={`glass-specular-${step.number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
            <stop offset="20%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.0)" />
            <stop offset="75%" stopColor="rgba(255, 255, 255, 0.0)" />
            <stop offset="90%" stopColor="rgba(94, 210, 156, 0.06)" />
            <stop offset="100%" stopColor="rgba(94, 210, 156, 0.22)" />
          </linearGradient>

          {/* Frosted Glass Edge Gradient - crisp border highlights with glowing corners */}
          <linearGradient id={`glass-edge-${step.number}`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="18%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="85%" stopColor="rgba(94, 210, 156, 0.16)" />
            <stop offset="100%" stopColor="rgba(94, 210, 156, 0.5)" />
          </linearGradient>

          {/* Master clipping path to ensure pristine internal component masking exactly inside the folder curve */}
          <clipPath id={`clip-${step.number}`}>
            <path d={folderPath} />
          </clipPath>
        </defs>

        {/* Shadow Drop Underlay */}
        <path
          d={folderPath}
          fill="rgba(0, 0, 0, 0.95)"
          className="transition-all duration-300"
          style={{
            filter: isHovered ? "drop-shadow(0 30px 40px rgba(0, 0, 0, 0.98))" : "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.85))"
          }}
        />

        {/* Static Background Fill (highly sophisticated slate-dark glass with master gradients) */}
        <path
          d={folderPath}
          fill={`url(#glass-fill-${isHovered ? 'hover-' : ''}${step.number})`}
          stroke={`url(#glass-edge-${step.number})`}
          strokeWidth="1.2"
          className="transition-all duration-300"
        />

        {/* Permanent Glass Specular Highlights */}
        <path
          d={folderPath}
          fill={`url(#glass-specular-${step.number})`}
          className="pointer-events-none select-none"
        />

        {/* Dynamic Glow Layer (Tracer highlighted on Hover) */}
        {isHovered && (
          <>
            {/* The soft glowing background fill tracer */}
            <path
              d={folderPath}
              fill={`url(#radial-glow-${step.number})`}
              fillOpacity="0.18"
              className="mix-blend-screen"
            />
            
            {/* The razor-thin illuminated edge border */}
            <path
              d={folderPath}
              fill="none"
              stroke={`url(#radial-glow-${step.number})`}
              strokeWidth="1.5"
              className="mix-blend-screen"
              filter={`url(#folder-glow-${step.number})`}
              style={{ opacity: 0.85 }}
            />
            
            <path
              d={folderPath}
              fill="none"
              stroke={`url(#radial-glow-${step.number})`}
              strokeWidth="1.2"
              className="mix-blend-screen"
            />
          </>
        )}
      </svg>

      {/* 2. THE CARD CONTENT CORE (fully masked so no text leaks outside curved border, with premium glass blur) */}
      <div 
        style={{ 
          clipPath: `url(#clip-${step.number})`,
          transform: "translateZ(20px)" 
        }} 
        className="relative flex-1 p-6 sm:p-7 pt-4 sm:pt-4 flex flex-col justify-between z-10 select-none overflow-hidden backdrop-blur-2xl bg-white/[0.01]"
      >
        {/* Hover accent internal glow spot on top left */}
        <div 
          className={`absolute top-0 left-0 w-28 h-28 bg-[#5ed29c]/[0.015] rounded-full blur-3xl z-0 transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100 bg-[#5ed29c]/[0.05]' : 'opacity-30'
          }`}
        />

        {/* 2a. Floating top bubble header content matching the top folder notch area */}
        <div className="flex justify-between items-center h-[26px] mb-8 select-none">
          {/* Header text on top-left of notch */}
          <div className="flex items-center gap-2 pt-1 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] shadow-[0_0_8px_#5ed29c]" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#5ed29c] font-black uppercase">
              0{step.number} • INDEX
            </span>
          </div>

          {/* Floating glossy icon bubble aligned with folder notch (with smooth bobbing when hovered) */}
          <motion.div 
            animate={isHovered ? {
              y: [-12, -18, -12],
              scale: 1.1,
              borderColor: "rgba(94, 210, 156, 0.4)",
              color: "#5ed29c",
              boxShadow: "0 0 15px rgba(94, 210, 156, 0.2)"
            } : {
              y: -12,
              scale: 1,
              borderColor: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.35)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
            }}
            transition={isHovered ? {
              y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
              scale: { duration: 0.3 }
            } : { duration: 0.3 }}
            className="absolute right-6 w-11 h-11 rounded-full border bg-black/80 backdrop-blur-md flex items-center justify-center text-white/45 shadow-lg z-20"
          >
            <FloatIcon className="w-4 h-4 transition-transform group-hover/card:rotate-6" />
          </motion.div>
        </div>

        {/* 2b. Card descriptive Title and point lists */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-lg sm:text-xl font-sans font-extrabold text-white mb-3 flex items-center gap-2">
            <span className="text-white group-hover/card:text-[#5ed29c] transition-colors">{step.title}</span>
            <span className="w-1 h-1 bg-[#5ed29c] rounded-full opacity-50 group-hover/card:opacity-100 group-hover/card:scale-125 transition-all" />
          </h3>

          <p className="text-white/60 text-[11px] sm:text-[12px] leading-relaxed font-sans mb-5">
            {step.description}
          </p>

          {/* Structured Process points list with premium staggered hover animations */}
          <ul className="space-y-3 relative z-10">
            {step.points.map((point, pIdx) => (
              <motion.li 
                key={pIdx} 
                animate={isHovered ? {
                  x: 3,
                  transition: { delay: pIdx * 0.05, duration: 0.3 }
                } : {
                  x: 0
                }}
                className="flex items-start gap-2.5 group/point cursor-pointer"
              >
                {/* Subtle point arrow icon / dash with color morph */}
                <span className={`flex-shrink-0 select-none text-[11px] sm:text-xs font-mono transition-colors pt-0.5 duration-300 ${
                  isHovered ? 'text-[#5ed29c] font-black' : 'text-white/30'
                }`}>
                  –
                </span>
                <span className={`text-[10.5px] sm:text-[11.5px] leading-relaxed tracking-wide transition-colors duration-300 ${
                  isHovered ? 'text-white/80 group-hover/point:text-[#5ed29c]' : 'text-white/45'
                }`}>
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* 2c. Micro-interaction visual indicator footer detail with live glow */}
        <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-between text-[9px] font-mono select-none">
          <span className="text-white/15 group-hover/card:text-white/30 transition-colors duration-300 uppercase tracking-widest select-none">
            Nexus Process Framework
          </span>
          <span className="text-[#5ed29c]/25 group-hover/card:text-[#5ed29c] transition-all duration-300 flex items-center gap-1.5 font-bold tracking-wider select-none">
            PROMPT READY 
            <span className="relative flex h-1.5 w-1.5">
              {isHovered && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5ed29c]"></span>
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
