import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, ShieldCheck, HelpCircle, Network, Clock } from 'lucide-react';

interface MetricItemProps {
  key?: string;
  label: string;
  targetNumber: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: any;
  index: number;
}

function MetricCard({ label, targetNumber, suffix, prefix = "", description, icon: Icon, index }: MetricItemProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = targetNumber;
      const duration = 1800; // 1.8 seconds counting
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber]);

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
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
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
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="liquid-glass rounded-3xl p-8 border border-white/5 relative group cursor-pointer h-full min-h-[310px] flex flex-col justify-between select-none"
      >
        {/* Spotlight Hover Glow Overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 z-0 pointer-events-none rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(94, 210, 156, 0.12), transparent 100%)`
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
          
          {/* Card Header Row */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#5ed29c]/30 group-hover:bg-[#5ed29c]/5 transition-all duration-300">
              <Icon className="w-5 h-5 text-white/50 group-hover:text-[#5ed29c] transition-colors" />
            </div>
            {/* Pulsing green status coordinate point */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] shadow-[0_0_10px_#5ed29c] animate-[pulse_2s_infinite]" />
          </div>

          {/* Card Body Data */}
          <div className="space-y-4 pt-1">
            {/* Ticker big metric count */}
            <div className="text-5xl sm:text-6xl font-sans font-black tracking-tight  leading-none font-jakarta select-none text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">
              {prefix}
              {count}
              {suffix}
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white leading-snug font-sans select-none tracking-wider">
                {label}
              </h4>

              <p className="text-white/45 text-xs sm:text-[12.5px] leading-relaxed">
                {description}
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Metrics() {
  const metricsData = [
    {
      label: "Faster Execution",
      targetNumber: 4,
      suffix: "x",
      description: "Direct cognitive processing acceleration indices compared to manual workflows.",
      icon: Zap
    },
    {
      label: "Reduced Context Switching",
      targetNumber: 92,
      suffix: "%",
      description: "Collapsing decentralized workspace portals into a unified memory tunnel.",
      icon: HelpCircle
    },
    {
      label: "Hours Saved Weekly",
      targetNumber: 18,
      suffix: "+",
      description: "Average hours reclaimed by agents automating Slack notifications to Linear mappings.",
      icon: Clock
    },
    {
      label: "Integrations Connected",
      targetNumber: 100,
      prefix: "",
      suffix: "+",
      description: "Out-of-the-box system-to-system hooks ready to sync securely with TLS 1.3.",
      icon: Network
    }
  ];

  return (
    <section className="relative py-32 bg-[#020204] overflow-hidden border-t border-white/5">
      {/* Background radial soft light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5ed29c]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Metric Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-[10px] font-bold tracking-widest text-white/40 uppercase block">
            OPERATIONAL BANDWIDTH MEASUREMENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-extrabold text-white mt-4 tracking-tight leading-none">
            Realized <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Architectural Efficiency.</span>
          </h2>
        </div>

        {/* METRICS CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((item, index) => (
            <MetricCard
              key={item.label}
              label={item.label}
              targetNumber={item.targetNumber}
              suffix={item.suffix}
              prefix={item.prefix}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
