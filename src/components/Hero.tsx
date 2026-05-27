import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Bot, Command, Shield, MessageSquare, BookOpen, Slack, Kanban, Eye, Zap, Sparkles, Terminal, Activity, Cpu } from 'lucide-react';
import Hls from 'hls.js';
import gsap from 'gsap';
import ProcessVisualizer from './ProcessVisualizer';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<'terminal' | 'agents' | 'tasks'>('terminal');

  // Interactive mouse positional shift for coordinates & nested nebulas parallax in Hero background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMoveSection = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // GSAP staggered entrance animation for hero headline text
  useEffect(() => {
    gsap.fromTo('.hero-stagger', 
      { opacity: 0, y: 35 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.1, 
        stagger: 0.18, 
        ease: 'power4.out',
        delay: 0.2
      }
    );
  }, []);

  // Soft Drift Interactive Particles Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      // Responsive particles density - matches standard monitor ratios
      const count = Math.min(50, Math.floor((w * h) / 32000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.2 + 1.2,
          speedX: (Math.random() - 0.5) * 0.22,
          speedY: (Math.random() - 0.5) * 0.22,
          color: i % 3 === 0 ? '#5ed29c' : i % 3 === 1 ? '#4bc089' : '#ffffff',
          alpha: Math.random() * 0.45 + 0.15,
          pulseSpeed: 0.01 + Math.random() * 0.015,
          pulsePhase: Math.random() * Math.PI
        });
      }
    };

    const container = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        initParticles(newWidth, newHeight);
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    // Smoothly track mouse coordinates relative to container size for parallax drift inside canvas
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    const handleMouse = (e: MouseEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle responsive shift based on mouse position (Parallax)
        const dMouseX = (currentMouseX - width / 2) * (p.size * 0.035);
        const dMouseY = (currentMouseY - height / 2) * (p.size * 0.035);

        const renderX = p.x + dMouseX;
        const renderY = p.y + dMouseY;

        p.pulsePhase += p.pulseSpeed;
        const animatedOpacity = p.alpha * (0.65 + 0.35 * Math.sin(p.pulsePhase));

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = animatedOpacity;
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles for system networking web
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const rx2 = p2.x + (currentMouseX - width / 2) * (p2.size * 0.035);
          const ry2 = p2.y + (currentMouseY - height / 2) * (p2.size * 0.035);
          
          const dx = renderX - rx2;
          const dy = renderY - ry2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = '#5ed29c';
            ctx.globalAlpha = (1 - dist / 110) * 0.08 * animatedOpacity;
            ctx.lineWidth = 0.55;
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(rx2, ry2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouse);
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Auto-typing terminal setup
  const terminalSteps = [
    {
      input: "nexus init-agent --core=alpha-cluster",
      logs: [
        "⚡ NEXUS Bootstrapping secure enclave on Node20...",
        "✔ TLS 1.3 cryptographic secure proxy active",
        "✔ Gateway bound: https://0.0.0.0:3000/api",
        "✔ Found active live hooks: [Slack, Jira, Workspace]"
      ]
    },
    {
      input: "nexus workflow analyze --target=high-latency-api",
      logs: [
        "🔍 Scanning Datadog streams & Slack channel history...",
        "⚠ Redis Cache evictions spiked at 14:20 UTC (92.4%)",
        "• Correlated 12 complaints in #prod-alerts Slack channel",
        "💡 ROOT CAUSE: Memory leak in auth session cache purge"
      ]
    },
    {
      input: "nexus mitigate-leak --apply-remediation",
      logs: [
        "🧠 Executing patch: scale standard token memory pool",
        "▸ purging old stale sessions from active Redis cluster...",
        "▸ rebuilding cached container endpoints safely...",
        "✔ Live health check verified (Mean SLA restored to 12ms)",
        "🚀 NEW WORKSPACE HOTFIX FULLY DEPLOYED SECURELY"
      ]
    }
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [terminalPhase, setTerminalPhase] = useState<'typing' | 'running' | 'cooldown'>('typing');

  useEffect(() => {
    let timer: any;
    const currentStep = terminalSteps[stepIdx];

    if (terminalPhase === 'typing') {
      if (typedCommand.length < currentStep.input.length) {
        timer = setTimeout(() => {
          setTypedCommand(currentStep.input.slice(0, typedCommand.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setTerminalPhase('running');
        }, 400);
      }
    } else if (terminalPhase === 'running') {
      if (logs.length < currentStep.logs.length) {
        timer = setTimeout(() => {
          setLogs(prev => [...prev, currentStep.logs[prev.length]]);
        }, 400);
      } else {
        timer = setTimeout(() => {
          setTerminalPhase('cooldown');
        }, 3200);
      }
    } else if (terminalPhase === 'cooldown') {
      timer = setTimeout(() => {
        setTypedCommand('');
        setLogs([]);
        setStepIdx(prev => (prev + 1) % terminalSteps.length);
        setTerminalPhase('typing');
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [stepIdx, typedCommand, logs, terminalPhase]);

  // High quality streaming HLS fallback and local mp4 fallback lists
  const hlsUrl = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';
  // Fallback high definition premium abstract particles MP4 video
  const mp4Url = 'https://cdn.pixabay.com/video/2021/04/12/70871-536965874_large.mp4'; 

  useEffect(() => {
    let hls: Hls | null = null;
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl;
        video.play().catch(err => {
          console.log("HLS native autoplay play failed, trying fallback source", err);
          video.src = mp4Url;
          video.play().catch(e => console.log(e));
        });
      } else if (Hls.isSupported()) {
        hls = new Hls({
          maxMaxBufferLength: 10,
          enableWorker: true
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            video.src = mp4Url;
            video.play().catch(e => console.log(e));
          });
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            video.src = mp4Url;
            video.play().catch(e => console.log(e));
          }
        });
      } else {
        video.src = mp4Url;
        video.play().catch(e => console.log(e));
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const platformCards = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      tag: "GENERATIVE AI",
      icon: MessageSquare,
      color: "#10a37f",
      glowColor: "rgba(16, 163, 127, 0.15)",
      status: "Orphan Session",
      activity: "Synthesizing text with zero workflow memory...",
      lossLabel: "Lost Context",
      lossPct: "84%"
    },
    {
      id: "notion",
      name: "Notion",
      tag: "COLLABORATION Docs",
      icon: BookOpen,
      color: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.1)",
      status: "Static Knowledge",
      activity: "Prone to stale information, manual tag updates...",
      lossLabel: "Stagnation Index",
      lossPct: "72%"
    },
    {
      id: "slack",
      name: "Slack",
      tag: "TEAM CHAT",
      icon: Slack,
      color: "#3eb991",
      glowColor: "rgba(62, 185, 145, 0.15)",
      status: "Siloed Stream",
      activity: "Noise flooding, endless channels, lost task handoffs...",
      lossLabel: "Noise Ratio",
      lossPct: "95%"
    },
    {
      id: "linear",
      name: "Linear",
      tag: "TASK TRACKING",
      icon: Kanban,
      color: "#5e6ad2",
      glowColor: "rgba(94, 106, 210, 0.15)",
      status: "Manual Backlog",
      activity: "Ticket management isolated from actual conversational execution...",
      lossLabel: "Isolation Index",
      lossPct: "89%"
    }
  ];

  return (
    <div ref={containerRef} onMouseMove={handleMouseMoveSection} className="relative min-h-screen bg-black">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen overflow-hidden flex flex-col justify-center py-24 lg:py-32">
        {/* HERO BACKGROUND VIDEO WITH COVERS & VECTOR COORDINATES */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <motion.video
            ref={videoRef}
            style={{ scale: videoScale }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 transition-opacity duration-1000"
            src={mp4Url}
            onCanPlay={() => setIsVideoLoaded(true)}
            muted
            loop
            playsInline
          />
          
          {/* Elegant Interactive Geometric Canvas Particles Background */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-1 pointer-events-none opacity-80"
          />

          {/* Ambient Grid and Dot overlays with multiple scaling levels */}
          <div className="absolute inset-0 grid-overlay opacity-40 z-1 pointer-events-none" />
          <div className="absolute inset-0 dots-overlay opacity-20 z-1 pointer-events-none" />
          
          {/* Premium Concentric Rotating Coordinate Circles (Radar elements) with Mouse Shift Shift */}
          <div 
            className="absolute top-1/2 left-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] pointer-events-none opacity-20 select-none z-1"
            style={{
              transform: `translate(calc(-50% + ${mousePos.x * 35}px), calc(-50% + ${mousePos.y * 35}px))`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg className="w-full h-full text-[#5ed29c]/15" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" fill="none" className="animate-[spin_180s_linear_infinite]" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.08" strokeDasharray="4 8" fill="none" className="animate-[spin_120s_linear_infinite_reverse]" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.12" fill="none" />
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 2" fill="none" />
              <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 4" />
              <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 4" />
              {/* Corner coordinate readouts strictly vector based */}
              <text x="5" y="8" fill="currentColor" fontSize="1.2" fontFamily="monospace" letterSpacing="0.1">SYS_COORDS:[45.109, -12.441]</text>
              <text x="75" y="8" fill="currentColor" fontSize="1.2" fontFamily="monospace" letterSpacing="0.1">NET_FREQ:3000HZ</text>
              <text x="5" y="94" fill="currentColor" fontSize="1.2" fontFamily="monospace" letterSpacing="0.1">CORE:ACTIVE_CYCLES</text>
              <text x="75" y="94" fill="currentColor" fontSize="1.2" fontFamily="monospace" letterSpacing="0.1">SLA:RESTORED_99.98%</text>
            </svg>
          </div>

          {/* Immersive layered gradients for professional depth */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black via-black/80 to-transparent z-2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black to-transparent z-2 pointer-events-none" />
          
          {/* Multiple Soft Pulsing Ambient Nebulas with Parallax Shifting */}
          <div 
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#5ed29c]/10 rounded-full blur-[160px] glow-ambient z-1 pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div 
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#5ed29c]/5 rounded-full blur-[140px] glow-ambient z-1 pointer-events-none" 
            style={{ 
              transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              animationDelay: '1s' 
            }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#5ed29c]/5 rounded-full blur-[120px] glow-ambient z-1 pointer-events-none" 
            style={{ 
              transform: `translate(calc(-50% + ${mousePos.x * 25}px), calc(-50% + ${mousePos.y * 25}px))`,
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              animationDelay: '4s' 
            }} 
          />
        </div>

        {/* HERO CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 pb-8">
          {/* Left Text & CTA Block */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5ed29c]" />
              <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">
                Autonomous Workflow System
              </span>
            </motion.div>

            {/* GSAP Managed Text Elements (starts visually hidden and animated sequentially) */}
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight leading-[1] text-white flex flex-col mb-4"
            >
              <span className="hero-stagger opacity-0 select-none">
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  Work
                </span>
                <span className="text-[#5ed29c] font-black pointer-events-none">.</span>
              </span>
              <span className="hero-stagger opacity-0 flex items-center gap-2 select-none mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c] drop-shadow-[0_0_15px_rgba(94,210,156,0.3)]">
                  Amplified
                </span>
                <span className="text-[#5ed29c] font-black pointer-events-none">.</span>
              </span>
            </h1>

            <div className="hero-stagger opacity-0 mt-2 mb-8 select-none">
              <span className="text-xl sm:text-2xl font-light tracking-wide text-white/50 leading-normal block">
                Powered by Autonomous Intelligence.
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/70 text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans"
            >
              NEXUS OS transforms fragmented workflows into one intelligent operating system powered by adaptive AI orchestration. 
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                id="hero-cta-workspace"
                onClick={() => onScrollToSection('command-center')}
                className="group relative inline-flex items-center justify-center gap-2 bg-[#5ed29c] hover:bg-[#4bc089] text-black text-xs font-bold uppercase tracking-wider rounded-full px-8 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(94,210,156,0.3)] hover:shadow-[0_0_30px_rgba(94,210,156,0.5)] cursor-pointer"
              >
                Launch Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-cta-features"
                onClick={() => onScrollToSection('features')}
                className="inline-flex items-center justify-center border border-white/25 hover:border-white/60 bg-white/[0.02] text-white text-xs font-semibold uppercase tracking-wider rounded-full px-8 py-4 transition-all duration-300 cursor-pointer"
              >
                Explore Agent Core
              </button>
            </motion.div>
          </div>

          {/* Right: PREMIUM COGNITIVE WORKSPACE TERMINAL WITH COMMAND SECTION TABS */}
          <div className="lg:col-span-6 w-full flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass w-full max-w-[565px] rounded-2xl flex flex-col border border-white/10 shadow-[0_0_50px_rgba(94,210,156,0.12)] relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl"
            >
              {/* Top ambient spotlight glow inside the header */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ed29c]/5 rounded-full blur-2xl z-0 pointer-events-none" />
              
              {/* Window Chrome Header */}
              <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/39 border border-[#ef4444]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/30 border border-[#eab308]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/30 border border-[#10b981]/20" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-white/40" />
                  <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">
                    nexus@workspace:~
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#5ed29c]/80 uppercase tracking-widest font-black">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Interactive Dashboard Tabs matching CommandCenter style */}
              <div className="relative z-10 px-4 flex items-center border-b border-white/5 bg-white/[0.005] overflow-x-auto min-h-[38px] scrollbar-none">
                {[
                  { id: 'terminal', label: 'Terminal', icon: Terminal },
                  { id: 'agents', label: 'Orchestrators', icon: Cpu },
                  { id: 'tasks', label: 'Live Tasks', icon: Activity }
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = activeHeroTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveHeroTab(t.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 text-[9px] font-mono tracking-wider font-bold uppercase transition-all duration-300 relative cursor-pointer outline-none ${
                        isActive
                          ? 'border-[#5ed29c] text-[#5ed29c] bg-[#5ed29c]/4'
                          : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Terminal Code Content Block */}
              <div className="relative z-10 p-5.5 flex-1 font-mono text-[10.5px] text-white/80 space-y-4 min-h-[290px] flex flex-col justify-between">
                
                {activeHeroTab === 'terminal' && (
                  <div className="space-y-4 flex-1">
                    {/* Active Session Info Row */}
                    <div className="flex justify-between items-center text-[9px] text-white/40 border-b border-white/5 pb-2 uppercase tracking-wider">
                      <span>ORCHESTRATION_TARGET: DEFAULT</span>
                      <span className="text-[#5ed29c]">SECURE_TUNNEL: PORT 3000</span>
                    </div>

                    {/* The Typed Instruction */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 min-h-[16px]">
                        <span className="text-[#5ed29c] font-black">nexus &gt;</span>
                        <span className="text-white font-medium select-all">{typedCommand}</span>
                        {terminalPhase === 'typing' && (
                          <span className="inline-block w-1.5 h-3.5 bg-[#5ed29c] animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Logs appearing automatically */}
                    <div className="space-y-2 min-h-[135px] flex flex-col justify-start">
                      {logs.map((logMsg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="leading-relaxed"
                        >
                          {logMsg.startsWith('✔') ? (
                            <span className="text-[#5ed29c]">{logMsg}</span>
                          ) : logMsg.startsWith('⚡') ? (
                            <span className="text-[#5ed29c] font-bold">{logMsg}</span>
                          ) : logMsg.startsWith('⚠') ? (
                            <span className="text-[#f87171]">{logMsg}</span>
                          ) : logMsg.startsWith('🧠') ? (
                            <span className="text-[#c084fc] font-bold">{logMsg}</span>
                          ) : logMsg.startsWith('🚀') ? (
                            <span className="text-[#5ed29c] font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-md inline-block mt-1">{logMsg}</span>
                          ) : (
                            <span className="text-white/60">{logMsg}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeHeroTab === 'agents' && (
                  <div className="space-y-3 flex-1 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center justify-between text-[9px] text-white/40 uppercase tracking-wider border-b border-white/5 pb-2">
                      <span>Active Orchestrator</span>
                      <span>CPU Allocation</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Cognitive-Refiner-v4", status: "Active Indexing", cpu: "14%", color: "text-[#5ed29c]" },
                        { name: "SLA-Sentinel-Agent", status: "Monitoring API Latency", cpu: "28%", color: "text-[#5ed29c]" },
                        { name: "Context-Synthesizer", status: "Assembling Slack Memory", cpu: "42%", color: "text-purple-400" },
                        { name: "DevOps-Gateway-Bot", status: "Idle listening", cpu: "0.2%", color: "text-white/40" }
                      ].map((agent, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-white/[0.01] border border-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${agent.cpu !== '0.2%' ? 'bg-[#5ed29c] animate-pulse' : 'bg-white/20'}`} />
                            <div>
                              <span className="font-bold text-white block">{agent.name}</span>
                              <span className="text-[8px] text-white/40 font-mono">{agent.status}</span>
                            </div>
                          </div>
                          <span className={`font-mono font-bold ${agent.color}`}>{agent.cpu}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeHeroTab === 'tasks' && (
                  <div className="space-y-3 flex-1 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center justify-between text-[9px] text-white/40 uppercase tracking-wider border-b border-white/5 pb-2">
                      <span>Task Definition</span>
                      <span>Priority & Status</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { title: "Mitigate Redis Cache evictions spiking (auth pool)", prio: "Crucial", color: "bg-[#5ed29c]/15 text-[#5ed29c] border-[#5ed29c]/30" },
                        { title: "Sync high-latency anomalies with #engineering-alerts", prio: "High", color: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
                        { title: "Initiate secure hotfix deployment on port 3000", prio: "Crucial", color: "bg-[#5ed29c]/15 text-[#5ed29c] border-[#5ed29c]/30" }
                      ].map((task, i) => (
                        <div key={i} className="text-[10px] p-2 ml-1 bg-white/[0.01] border-l-2 border-[#5ed29c] rounded-r-lg flex flex-col gap-1">
                          <div className="flex justify-between items-start gap-3">
                            <span className="font-sans text-white/95 font-medium leading-snug">{task.title}</span>
                            <span className={`font-mono text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border shrink-0 ${task.color}`}>
                              {task.prio}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulated Diagnostic Telemetry Rail */}
                <div className="border-t border-white/5 pt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[9px] text-white/40 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#5ed29c]" />
                      Agent Cluster Telemetry
                    </span>
                    <span className="font-bold">STEP {stepIdx + 1} / 3</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-0.5">
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="text-white/40 text-[8px] uppercase font-mono tracking-wider">CPU Threads</span>
                      <span className="text-[#5ed29c] font-bold mt-0.5 font-jakarta">
                        {stepIdx === 0 ? '14% Idle' : stepIdx === 1 ? '48% Load' : '92% Peak'}
                      </span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="text-white/40 text-[8px] uppercase font-mono tracking-wider">Response time</span>
                      <span className="text-white font-bold mt-0.5">
                        {stepIdx === 0 ? '4ms' : stepIdx === 1 ? '16ms' : '12ms'}
                      </span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="text-white/40 text-[8px] uppercase font-mono tracking-wider">Status Sync</span>
                      <span className="text-emerald-400 font-bold mt-0.5 uppercase tracking-wider text-[9px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Green
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side matrix grids */}
              <div className="absolute bottom-0 right-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-[#5ed29c]/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROCESS & PLATFORM PARADIGM SHIFT */}
      <section id="product" className="relative pt-32 sm:pt-48 pb-32 max-w-7xl mx-auto px-6 z-20">
        <ProcessVisualizer />

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-white/40 font-jakarta text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
            Disconnected tools create disconnected thinking.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
