import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, Search, Brain, BarChart3, Users, Video, ArrowUpRight, 
  Sparkles, CheckCircle2, ShieldCheck, Zap 
} from 'lucide-react';

interface FeatureCardProps {
  key?: string;
  title: string;
  description: string;
  badge?: string;
  icon: any;
  span: string;
  index: number;
}

function FeatureCard({ title, description, badge, icon: Icon, span, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    // Elegant maximum tilt angle of 10 degrees for refined dimension
    const maxTilt = 10;
    setRotateY(normalizedX * maxTilt);
    setRotateX(-normalizedY * maxTilt);

    setCoords({
      x: mouseX,
      y: mouseY
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={`h-full ${span}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.025 : 1,
        }}
        style={{
          transformStyle: "preserve-3d"
        }}
        transition={isHovered ? {
          type: "spring",
          stiffness: 250,
          damping: 22,
          mass: 0.4
        } : {
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="liquid-glass rounded-3xl p-8 border border-white/5 relative group cursor-pointer h-full min-h-[300px] flex flex-col justify-between"
      >
      {/* Spotlight Hover Glow Overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(94, 210, 156, 0.12), transparent 100%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#5ed29c]/30 group-hover:bg-[#5ed29c]/5 transition-all duration-300">
              <Icon className="w-5 h-5 text-white/65 group-hover:text-[#5ed29c] transition-colors" />
            </div>

            {badge && (
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#5ed29c] border border-[#5ed29c]/25 bg-[#5ed29c]/5 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>

          {/* Heading */}
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-2 tracking-tight group-hover:text-[#5ed29c] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/45 text-xs sm:text-sm leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Decorative dynamic wireframe indicators */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
          <span className="uppercase tracking-wider">DEPLOYED AGENTS STATUS</span>
          <span className="text-[#5ed29c] flex items-center gap-1 group-hover:underline">
            Telemetry Live <Zap className="w-3 h-3 text-[#5ed29c]" />
          </span>
        </div>
      </div>
    </motion.div>
    </div>
  );
}

export default function Features() {
  const featuresList = [
    {
      title: "Autonomous AI Agents",
      description: "Self-governing worker agents that proactively dispatch calendar schedules, synthesize Jira tickets, write code corrections, and process slack alerts in context.",
      badge: "COGNITIVE EXECUTION",
      icon: Bot,
      span: "md:col-span-2 lg:col-span-8"
    },
    {
      title: "Neural Search",
      description: "Perform sub-second vector semantic queries across Google Workspace, Slack clusters, and localized databases immediately.",
      badge: "KNOWLEDGE INDEX",
      icon: Search,
      span: "md:col-span-1 lg:col-span-4"
    },
    {
      title: "Workflow Memory",
      description: "Maintains absolute real-time conversational states and strategic constraints, eliminating context fragmentation.",
      badge: "PERSISTENT STATES",
      icon: Brain,
      span: "md:col-span-1 lg:col-span-4"
    },
    {
      title: "Predictive Analytics",
      description: "Analyzes system bandwidth, service latency patterns, and team sprint velocity indices to recommend architectural overrides.",
      badge: "PREDICTIVE ENGINE",
      icon: BarChart3,
      span: "md:col-span-2 lg:col-span-8"
    },
    {
      title: "Smart Collaboration",
      description: "Instantly create encrypted collaborative canvas hubs. Dynamic workspace nodes auto-capture action items, updating task priorities across engineering teams.",
      badge: "REAL-TIME SYNAPSE",
      icon: Users,
      span: "md:col-span-2 lg:col-span-8"
    },
    {
      title: "AI Meetings",
      description: "Capture stereophonic meeting transcripts. Autonomously indexes speech cadence, flags crucial decisions, and drafts structural follow-up briefs.",
      badge: "VOICE QUANTUM",
      icon: Video,
      span: "md:col-span-1 lg:col-span-4"
    }
  ];

  return (
    <section id="features" className="relative py-32 bg-black border-t border-white/5 scroll-mt-24">
      {/* Neon glowing backdrop halos */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#5ed29c]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 inline-flex items-center gap-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#5ed29c] tracking-widest uppercase font-jakarta"
          >
            CORE CAPABILITIES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6"
          >
            A Core Engine Built<br />
            For <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Autonomy.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/55 text-sm sm:text-base leading-relaxed"
          >
            Replace fragmented web applications with a unified generative operating workspace designed for extreme technical execution.
          </motion.p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {featuresList.map((feat, index) => (
            <FeatureCard
              key={feat.title}
              title={feat.title}
              description={feat.description}
              badge={feat.badge}
              icon={feat.icon}
              span={feat.span}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
