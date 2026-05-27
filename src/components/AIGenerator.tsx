import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Sparkles, RefreshCw, FileText, Lightbulb, 
  Mail, MessageSquare, Code, Play, Check, Command 
} from 'lucide-react';

interface GenerationOption {
  id: string;
  label: string;
  icon: any;
  title: string;
  prompt: string;
  output: string;
  lang: string;
}

export default function AIGenerator() {
  const [activeItem, setActiveItem] = useState<string>('startup');
  const [streamedText, setStreamedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const textIndexRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generationOptions: GenerationOption[] = [
    {
      id: 'startup',
      label: 'Startup Idea',
      icon: Lightbulb,
      title: 'NeuroArbitrage Protocol',
      prompt: 'Synthesize an autonomous flash-loan DeFi arbitrage startup powered by agentic intelligence.',
      lang: 'markdown',
      output: `### Core Concept: NeuroArbitrage Engine (NAE)
- **Sector**: Autonomous Agentic DeFi
- **Mechanics**: Scans gas-optimized liquidity vectors across 14 EVM chains in sub-millisecond intervals. Executes zero-collateral flash loans.
- **Agent Orchestrators**:
  - \`DB-Aura\`: Monitors slippage indices on decentralized orderbooks.
  - \`Executor-SecOps\`: Assesses sandwich-attack vectors prior to minting.
- **Projected Yield**: 1.2% daily yield index. Fully automated; self-balancing.`
    },
    {
      id: 'report',
      label: 'Performance Report',
      icon: FileText,
      title: 'Telemetry Post-Mortem CRM-24',
      prompt: 'Draft an incident analysis reports on Redis cache eviction events.',
      lang: 'yaml',
      output: `report_id: incident_telemetry_29a
cluster_latency_mean: 452ms
eviction_event: Redis_MEM_CAP
time_trigger: 14:20:01 UTC
factors:
  - client_bulk_token_refresh: true
  - slack_alert_concurrency: maximum
remediation_strategy:
  - allocate_cache_shards: 4
  - cache_eviction_strategy: volatile-lru`
    },
    {
      id: 'email',
      label: 'Security Notice Email',
      icon: Mail,
      title: 'E2E Encryption Activation Notice',
      prompt: 'Draft a bulletproof security notice informing enterprise clients of TLS level elevations.',
      lang: 'text',
      output: `Subject: Action Required: Mandatory Migration to TLS 1.3 Encryption Standards

Dear Engineering Directorship,

This notice serves to confirm that NEXUS OS is elevating its mandatory transport encryption indices to standard TLS 1.3 starting June 12. 

If your team makes programmatic calls to the Nexus Central telemetry route, please verify that your clients support TLS 1.3 protocols. Feel free to contact our SecOps-Agent desk for assistance.

Best regards,
NEXUS OS Security Sentinel`
    },
    {
      id: 'meeting',
      label: 'Meeting Summary',
      icon: MessageSquare,
      title: 'Operational Sprint Alignments',
      prompt: 'Draft bulletpoint meeting outcomes for the Redis remediation sync.',
      lang: 'markdown',
      output: `### Meeting: API Remediation Sync
- **Attendees**: PM Marcus, Infra-Agent, Support-Sentinel
- **Decisions**:
  - [x] DevOps and DB-Sentinel to increase cache to 4GB.
  - [ ] Support to email Strategic Tier-1 accounts regarding the TLS 1.3 standards transition.
- **Tactical Targets**: Zero timeouts during high concurrency spikes by Friday morning.`
    },
    {
      id: 'workflow',
      label: 'JSON Schema Workflow',
      icon: Code,
      title: 'pipeline_config.json',
      prompt: 'Generate standard orchestrator mapping JSON task configurations.',
      lang: 'json',
      output: `{
  "workflow_id": "redis_purge_reboot",
  "triggers": {
    "latency_threshold_ms": 350,
    "slack_event_matching": "cache_fail"
  },
  "actions": [
    {
      "step": 1,
      "agent": "Infra-Scalinator",
      "command": "scale_shards",
      "allocation_bytes": 4294967 \n    }
  ]
}`
    }
  ];

  const currentSelection = generationOptions.find(opt => opt.id === activeItem) || generationOptions[0];

  const startStreaming = (text: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsGenerating(true);
    setStreamedText('');
    textIndexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (textIndexRef.current < text.length) {
        setStreamedText(prev => prev + text.charAt(textIndexRef.current));
        textIndexRef.current += 1;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsGenerating(false);
      }
    }, 12); // Hyper-speed premium typographic stream
  };

  useEffect(() => {
    startStreaming(currentSelection.output);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeItem]);

  return (
    <section id="ai-generator-section" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background radial overlays */}
      <div className="absolute -top-40 left-10 w-[600px] h-[600px] bg-[#5ed29c]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 dots-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
            >
              <Terminal className="w-3.5 h-3.5 text-[#5ed29c]" />
              <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">
                COGNITIVE SYNAPSE
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Live AI Generation</span><br />
              At Scale.
            </h2>

            <p className="text-white/55 text-sm leading-relaxed">
              Explore how NEXUS OS handles workflow context. Click the selectors below to command the AI orchestrator, and watch real-time output streams with correct structural semantics.
            </p>

            {/* Selector buttons column */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {generationOptions.map((opt) => {
                const OptIcon = opt.icon;
                const isActive = activeItem === opt.id;
                return (
                  <button
                    id={`gen-btn-${opt.id}`}
                    key={opt.id}
                    onClick={() => setActiveItem(opt.id)}
                    className={`flex items-center gap-2.5 px-4.5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider font-jakarta cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-[#5ed29c] text-black shadow-[0_0_15px_rgba(94,210,156,0.25)] font-bold scale-[1.02]' 
                        : 'bg-white/[0.02] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <OptIcon className="w-3.5 h-3.5" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Console Workspace */}
          <div className="lg:col-span-7">
            <div className="liquid-glass rounded-2xl border border-white/10 shadow-3xl overflow-hidden min-h-[420px] flex flex-col justify-between">
              
              {/* Terminal Titlebar header */}
              <div className="px-6 py-4 bg-black/60 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e25c5c]/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e29c5c]/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5ed29c]/30" />
                  </div>
                  <span className="text-[10px] text-white/35 font-mono ml-2">NEXUS_EMULATOR_v4.sh</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono uppercase bg-white/10 text-white/50 px-2 py-0.5 rounded">
                    {currentSelection.lang}
                  </span>
                  
                  {isGenerating ? (
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#5ed29c]">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>STREAMING</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
                      <Check className="w-3.5 h-3.5 text-[#5ed29c]" />
                      <span>IDLE_SYNCED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="flex-1 bg-black/60 p-6 font-mono text-xs text-white/80 overflow-y-auto leading-relaxed relative min-h-[300px]">
                <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none" />

                {/* Simulated Prompt block */}
                <div className="mb-4 text-white/40 border-l border-white/10 pl-3">
                  <span className="text-[#5ed29c] font-black">$ nexus generate --mode=adaptive</span>
                  <p className="mt-1 font-jakarta font-medium text-xs text-white/60">
                    "{currentSelection.prompt}"
                  </p>
                </div>

                {/* Streaming response text with blit dynamic syntax coloring */}
                <pre className="whitespace-pre-wrap select-all font-mono text-white/90">
                  {streamedText}
                  <span className={`inline-block w-1.5 h-4 bg-[#5ed29c] ml-1 ${isGenerating ? 'animate-pulse' : 'hidden'}`} />
                </pre>
              </div>

              {/* Terminal Status bar */}
              <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex items-center justify-between font-mono text-[9px] text-white/30">
                <div className="flex items-center gap-4">
                  <span>TIME: {isGenerating ? 'Calculated' : '0.12s'}</span>
                  <span>TOKENS: {isGenerating ? '...' : '124 / 124'}</span>
                </div>
                <span>EMULATOR ENGINE BY NEXUS OS</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
