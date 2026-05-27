import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface PricingCardProps {
  key?: string;
  plan: {
    id: string;
    name: string;
    price: string;
    period: string;
    tagline: string;
    features: string[];
    isFeatured: boolean;
    ctaText: string;
  };
  idx: number;
}

function PricingCard({ plan, idx }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      id={`pricing-card-${plan.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden ${
        plan.isFeatured 
          ? 'bg-[#0f0f0f]/60 border border-[#5ed29c]/40 shadow-[0_0_60px_rgba(94,210,156,0.22)] lg:scale-[1.05] z-10 backdrop-blur-xl' 
          : 'bg-[#060606]/65 border border-white/5 hover:border-[#5ed29c]/25 hover:shadow-[0_0_40px_rgba(94,210,156,0.06)] z-10 backdrop-blur-xl'
      }`}
    >
      {/* Spotlight Hover Glow Overlay - premium high-intensity and larger size */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 z-0 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${
            plan.isFeatured 
              ? 'rgba(94, 210, 156, 0.35)' 
              : 'rgba(94, 210, 156, 0.25)'
          }, rgba(94, 210, 156, 0.05) 60%, transparent 100%)`
        }}
      />

      {/* Pulsing Gradient outline background helper for featured Neural card */}
      {plan.isFeatured && (
        <div className="absolute inset-0 border border-[#5ed29c]/40 rounded-[2rem] opacity-35 pointer-events-none animate-pulse" />
      )}

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-6">
          <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block mb-1">
            {plan.name} Plan
          </span>
          <div className="flex items-center justify-between">
            {plan.isFeatured ? (
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider bg-[#5ed29c]/15 text-[#5ed29c] border border-[#5ed29c]/30 px-2 py-0.5 rounded-full">
                [ RECOMMENDED CORE ]
              </span>
            ) : <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
          </div>
        </div>

        {/* Pricing values */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-white/45 text-xs font-mono font-medium lowercase">
                {plan.period === '/ month' ? '/m' : '/y'}
              </span>
            )}
          </div>
          <p className="text-white/35 text-[11px] leading-relaxed mt-3 min-h-[32px]">
            {plan.tagline}
          </p>
        </div>

        <div className="h-px bg-white/10 w-full mb-6" />

        {/* Features list exactly matching circular check reference */}
        <ul className="space-y-4 mb-10 text-left">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3 text-[11px] text-white/70 font-sans tracking-wide">
              <div className="w-5 h-5 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-[#5ed29c]" />
              </div>
              <span className="leading-snug">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call to action button matching Get Started rounded line style */}
      <button
        id={`pricing-cta-${plan.id}`}
        className={`relative z-10 w-full py-4 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
          plan.isFeatured
            ? 'bg-[#5ed29c] hover:bg-[#4bc089] text-black shadow-[0_0_25px_rgba(94,210,156,0.35)] hover:scale-[1.02]'
            : 'border border-white/15 hover:border-[#5ed29c] hover:text-white hover:bg-[#5ed29c]/5 text-white bg-white/[0.01]'
        }`}
      >
        {plan.ctaText}
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingPeriod === 'monthly' ? '$39' : '$29',
      period: '/ month',
      tagline: 'Ideal for early-stage teams looking to structure custom workspaces.',
      features: [
        'Single Workspace pipeline context',
        'Up to 3 Autonomous Agent threads',
        'Neural Search (100 daily queries)',
        'Standard Google Workspace connectors',
        'TLS 1.3 Transport Encryptions'
      ],
      isFeatured: false,
      ctaText: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'monthly' ? '$89' : '$69',
      period: '/ month',
      tagline: 'Enables high-performance teams to coordinate multiple agent states.',
      features: [
        '3 Contextual Workspace pipelines',
        'Up to 10 Autonomous Agent threads',
        'Infinite Neural Search index indexing',
        'Full Slack, Linear, and Jira mapping hooks',
        '40ms Mean Operational Query Telemetry'
      ],
      isFeatured: false,
      ctaText: 'Get Started'
    },
    {
      id: 'neural',
      name: 'Neural',
      price: billingPeriod === 'monthly' ? '$249' : '$199',
      period: '/ month',
      tagline: 'Empowers modernized engineering hierarchies with full agentic autonomy.',
      features: [
        'Infinite Workspace pipeline context',
        'Unbounded Autonomous Agent threads',
        'Self-balancing cluster priority threads',
        'Custom Fine-Tuning Semantic weights',
        'Dedicated SecOps Security Audit Sentinel',
        'Private Slack Support channels'
      ],
      isFeatured: true, // Pulse gradient featured plan
      ctaText: 'Get Started'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      tagline: 'Tailored specifically for critical infrastructure-grade organizations.',
      features: [
        'Isolated private VPC cluster pods',
        'Zero-trust localized memory vector indexing',
        'Custom fine-tuned base LLM weight parameters',
        'SLA guaranteed 99.99% operational uptime',
        'On-site SecOps integration counseling'
      ],
      isFeatured: false,
      ctaText: 'Get Started'
    }
  ];

  return (
    <section id="pricing" className="relative py-32 bg-black overflow-hidden border-t border-white/5 scroll-mt-24">
      {/* GIGANTIC FROSTED BACKGROUND HEADING EXACTLY AS IN REFERENCE IMAGE */}
      <div className="hidden md:block absolute top-[320px] left-1/2 -translate-x-1/2 select-none text-center pointer-events-none z-0 whitespace-nowrap overflow-hidden w-full px-4">
        <span className="text-[15.5vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#5ed29c]/[0.095] to-white/[0.095] uppercase font-sans">
          Pricing
         </span>
      </div>

      {/* Background ambient halo glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#5ed29c]/5 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
          >
            <Zap className="w-3.5 h-3.5 text-[#5ed29c]" />
            <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">DEPLOYMENT PLANS</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mb-6">
            Predictable Pricing.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Autonomous Scale.</span>
          </h2>

          <p className="text-white/45 text-xs sm:text-sm">
            Invest in localized intelligence. Save hours of context switching weekly across slack metrics.
          </p>

          {/* Monthly/Yearly toggle switch */}
          <div className="inline-flex items-center p-1 bg-white/[0.02] border border-white/10 rounded-full mt-8">
            <button
              id="billing-monthly-btn"
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-black font-extrabold shadow-[0_2px_5px_rgba(255,255,255,0.1)]'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              Monthly billing
            </button>
            <button
              id="billing-yearly-btn"
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-black font-extrabold shadow-[0_2px_5px_rgba(255,255,255,0.1)]'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              Yearly Billing
              <span className="bg-[#5ed29c]/10 text-[#5ed29c] px-1.5 py-0.5 rounded text-[8px]">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* PRICING GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <PricingCard key={plan.id} plan={plan} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
