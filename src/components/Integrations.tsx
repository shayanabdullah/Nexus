import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Slack, BookOpen, Kanban, Github, Calendar, CheckCircle2, 
  RefreshCw, Settings, Sparkles, SwitchCamera, Info, ArrowUpRight, 
  ToggleLeft, ToggleRight, Wifi, Shield, Zap, Cable
} from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  tag: string;
  icon: any;
  color: string;
  glowColor: string;
  status: 'Connected' | 'Authentication Required' | 'Syncing';
  description: string;
  syncInterval: string;
  permissions: string[];
  options: { key: string; label: string; enabled: boolean }[];
  logs: string[];
}

export default function Integrations() {
  const [activeId, setActiveId] = useState<string>('slack');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  
  // High fidelity default mock dataset
  const [integrationsList, setIntegrationsList] = useState<IntegrationItem[]>([
    {
      id: 'slack',
      name: 'Slack Connect',
      tag: 'COMMUNICATION INDEX',
      icon: Slack,
      color: '#3eb991',
      glowColor: 'rgba(62, 185, 145, 0.15)',
      status: 'Connected',
      description: 'Stream live message logs, capture high-latency prod alerts, and dispatch direct agent mitigation workflows inside team workspaces.',
      syncInterval: 'Sub-second real-time streaming',
      permissions: ['Read public channels', 'Post interactive bulletins', 'Index custom coordinate tags'],
      options: [
        { key: 'alerts', label: 'Sniff #prod-alerts channel history', enabled: true },
        { key: 'dm', label: 'Enable direct agent private triggers', enabled: true },
        { key: 'hotfix', label: 'Relay container hotfixes via webhooks', enabled: false }
      ],
      logs: [
        '⚡ Core connection secured on socket #9411',
        '✔ Monitored #prod-alerts cache evictions (auth pool)',
        '✔ Successfully matched 12 user coordinates in #engineering-warroom',
        '💡 Resolved mitigation prompt dispatch for Node20 cluster'
      ]
    },
    {
      id: 'notion',
      name: 'Notion Sync',
      tag: 'COLLABORATIVE KNOWLEDGE',
      icon: BookOpen,
      color: '#ea580c',
      glowColor: 'rgba(234, 88, 12, 0.15)',
      status: 'Connected',
      description: 'Ingest static developer briefs, maintain global software design specifications, and automatically write back post-mortem mitigation documentation.',
      syncInterval: 'Incremental pull (every 5m)',
      permissions: ['Read selected directory pages', 'Write markdown files', 'Update databases tags'],
      options: [
        { key: 'autoDoc', label: 'Auto-document resolved incidents', enabled: true },
        { key: 'briefExtract', label: 'Extract terms from Stale Latency Guide', enabled: true },
        { key: 'blockWrite', label: 'Enable database tag updates', enabled: false }
      ],
      logs: [
        '✔ Ingested page "Stale API latency guide.md" (3.2kb)',
        '✔ Created section "Mitigation Steps applied (2026-05-27)"',
        '✔ Extracted 8 key entities for conversational memory vector storage',
        '☕ Synchronization idle. Next automated poll in 4 minutes'
      ]
    },
    {
      id: 'linear',
      name: 'Linear Tracker',
      tag: 'TASK BACKLOG',
      icon: Kanban,
      color: '#5e6ad2',
      glowColor: 'rgba(94, 106, 210, 0.15)',
      status: 'Connected',
      description: 'Create and assign bug tickets autonomously, correlate alerts with existing team handoffs, and transition statuses on positive health metrics.',
      syncInterval: 'Event webhook triggers',
      permissions: ['Read all team cycles', 'Create/assign open issues', 'Modify roadmap boards'],
      options: [
        { key: 'syncPrio', label: 'Prioritize automated agent bugs', enabled: true },
        { key: 'autoClose', label: 'Auto-close tickets on telemetry restore', enabled: false },
        { key: 'assignee', label: 'Assign unresolved coordinates to main dev', enabled: true }
      ],
      logs: [
        '✔ Hooked webhook event for workflow CRM-248',
        '✔ Synced ticket title "Issue CRM-248 assigned to team-alpha"',
        '✔ Changed status of task #4029 to "In Progress" on cache alert',
        '✔ Appended SLA diagnostic parameters to ticket details metadata'
      ]
    },
    {
      id: 'github',
      name: 'GitHub Deployment',
      tag: 'REPOSITORY PIPELINE',
      icon: Github,
      color: '#f8fafc',
      glowColor: 'rgba(255, 255, 255, 0.1)',
      status: 'Authentication Required',
      description: 'Initiate telemetry pull requests, run structural linter checks, and commit code corrections directly to production branches.',
      syncInterval: 'Webhook triggered',
      permissions: ['Read repository structure', 'Create pull requests', 'Commit code changes'],
      options: [
        { key: 'prCre', label: 'Generate PRs for telemetry code hotfixes', enabled: false },
        { key: 'lintVerify', label: 'Run remote linter before branch merge', enabled: true },
        { key: 'forceDeploy', label: 'Expose code generation output directly', enabled: false }
      ],
      logs: [
        '⚠ GitHub repository not associated. Please authenticate.',
        'ℹ Action required: Authorize NEXUS OS to view public/private repos.',
        'ℹ Safe Mode: Write access currently blocked until OAuth sign-off.'
      ]
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      tag: 'SCHEDULE SCHEDULER',
      icon: Calendar,
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      status: 'Connected',
      description: 'Map scheduled downtime intervals, retrieve technical team rotation shifts, and schedule high-fidelity sync briefs autonomously.',
      syncInterval: 'Dynamic poll (every 10m)',
      permissions: ['View main rotation schedules', 'Insert calendar event items', 'Read location coordinates'],
      options: [
        { key: 'downtime', label: 'Mute automated alerts during scheduled maintenance', enabled: true },
        { key: 'brief', label: 'Insert team alignment meeting invites', enabled: false },
        { key: 'tzSync', label: 'Auto-correlate active developer timezones', enabled: true }
      ],
      logs: [
        '✔ Retrieved schedule spreadsheet on tech alignment roster',
        '✔ Flagged maintenance window: Friday 02:00 - 04:00 UTC',
        '✔ Verified timezone coordination for 3 primary administrators',
        '✔ Event logged: Next sync cycle scheduled'
      ]
    }
  ]);

  const activeIntegration = integrationsList.find(int => int.id === activeId) || integrationsList[0];

  // Helper to toggle options
  const handleToggleOption = (intId: string, optKey: string) => {
    setIntegrationsList(prev => prev.map(item => {
      if (item.id === intId) {
        const updatedOptions = item.options.map(opt => {
          if (opt.key === optKey) {
            const nextVal = !opt.enabled;
            // Append log on toggle
            const logTime = new Date().toLocaleTimeString();
            const actionLabel = nextVal ? 'Enabled' : 'Disabled';
            const newLog = `[${logTime}] ✔ ${actionLabel} config: "${opt.label}"`;
            return { ...opt, enabled: nextVal };
          }
          return opt;
        });
        
        // Find if we just updated this
        const changedOpt = item.options.find(o => o.key === optKey);
        const nextVal = changedOpt ? !changedOpt.enabled : false;
        const logTime = new Date().toLocaleTimeString();
        const actionLabel = nextVal ? 'ENABLED' : 'DISABLED';
        const newLog = `[${logTime}] Command Relay: Updated "${changedOpt?.label}" to ${actionLabel}`;

        return {
          ...item,
          options: updatedOptions,
          logs: [newLog, ...item.logs.slice(0, 5)]
        };
      }
      return item;
    }));
  };

  // Helper to trigger dummy manual sync
  const handleManualSync = (id: string) => {
    if (syncingId === id) return;
    setSyncingId(id);
    
    // Simulate telemetry sync duration
    setTimeout(() => {
      setSyncingId(null);
      setIntegrationsList(prev => prev.map(item => {
        if (item.id === id) {
          const logTime = new Date().toLocaleTimeString();
          const targetLogs = [...item.logs];
          
          let successLog = `[${logTime}] ✔ Force synchronization completed successfully.`;
          let syncDetail = `[${logTime}] ✔ Scanned payload streams: Status OK (200)`;
          
          if (id === 'slack') {
            syncDetail = `[${logTime}] ✔ Found 4 active alerts on #engineering-warroom`;
          } else if (id === 'notion') {
            syncDetail = `[${logTime}] ✔ Ingested newer versions of Stale Latency documentation`;
          } else if (id === 'linear') {
            syncDetail = `[${logTime}] ✔ Verified SLA status sync with backlog CRM-248`;
          } else if (id === 'github') {
            successLog = `[${logTime}] ⚠ Sync failed: OAuth Handshake is required first.`;
            syncDetail = `[${logTime}] ⚠ Unauthorized stream rejected by server`;
          }

          return {
            ...item,
            status: item.status === 'Authentication Required' ? 'Authentication Required' : 'Connected',
            logs: [successLog, syncDetail, ...targetLogs.slice(0, 4)]
          };
        }
        return item;
      }));
    }, 1500);
  };

  // Helper to simulate OAuth trigger
  const handleAuthenticate = (id: string, isConnect: boolean) => {
    setIntegrationsList(prev => prev.map(item => {
      if (item.id === id) {
        const logTime = new Date().toLocaleTimeString();
        if (isConnect) {
          return {
            ...item,
            status: 'Connected',
            logs: [
              `[${logTime}] ✔ OAuth authorization completed successfully!`,
              `[${logTime}] ✔ Token saved securely in standard secrets container`,
              ...item.logs.slice(0, 4)
            ]
          };
        } else {
          return {
            ...item,
            status: 'Authentication Required',
            logs: [
              `[${logTime}] ⚠ Session revoked by client request.`,
              `[${logTime}] ⚠ Disconnected secure web socket and revoked tokens`,
              ...item.logs.slice(0, 4)
            ]
          };
        }
      }
      return item;
    }));
  };

  return (
    <section id="integrations" className="relative py-32 bg-[#000000] border-t border-white/5 scroll-mt-24">
      {/* Dynamic background lights */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#5ed29c]/[0.02] rounded-full blur-[180px] pointer-events-none select-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/[0.015] rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 inline-flex items-center gap-1.5 bg-[#5ed29c]/10 border border-[#5ed29c]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#5ed29c] tracking-widest uppercase font-jakarta"
          >
            <Cable className="w-3.5 h-3.5" />
            OPERATING SYSTEMS CONNECTIONS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white mb-6"
          >
            Streamlined <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Ecosystem Integration</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/55 text-sm sm:text-base leading-relaxed"
          >
            Connect NEXUS OS to your existing workspace toolset. Watch autonomous agent nodes exchange critical payload metrics, mitigate outages, and coordinate tickets natively without secondary dashboards.
          </motion.p>
        </div>

        {/* Dynamic Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs Trigger Area */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest pl-2">
              Available Ecosystem Connectors
            </span>
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-scroll pb-4 lg:pb-0 scrollbar snap-x">
              {integrationsList.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeId;
                return (
                  <button
                    id={`integration-tab-${item.id}`}
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`snap-start text-left shrink-0 lg:shrink-1 p-5 rounded-2xl border transition-all duration-300 relative group flex items-center justify-between w-[280px] lg:w-full select-none cursor-pointer outline-none ${
                      isActive 
                        ? 'bg-neutral-900/[0.38] border-white/15 shadow-[0_0_20px_rgba(94,210,156,0.06)]' 
                        : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                    }`}
                  >
                    {/* Selected Active border marker */}
                    {isActive && (
                      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-md bg-[#5ed29c]" />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Styled Integration Icon with background gradients */}
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? `${item.color}08` : 'rgba(255, 255, 255, 0.02)',
                          borderColor: isActive ? `${item.color}35` : 'rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <Icon 
                          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                          style={{ color: isActive ? item.color : 'rgba(255,255,255,0.5)' }} 
                        />
                      </div>

                      <div className="text-left">
                        <span className="font-mono text-[9px] uppercase tracking-wider block" style={{ color: isActive ? item.color : 'rgba(255,255,255,0.3)' }}>
                          {item.tag}
                        </span>
                        <span className="font-sans text-xs font-bold text-white block mt-0.5">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {/* Status badge Indicator inside chip */}
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Connected' 
                          ? 'bg-[#5ed29c] animate-pulse' 
                          : item.status === 'Syncing' 
                            ? 'bg-amber-400 animate-spin' 
                            : 'bg-white/30'
                      }`} />
                      <span className="hidden sm:inline font-mono text-[9px] font-bold text-white/40">
                        {item.status === 'Connected' ? 'Synced' : item.status === 'Authentication Required' ? 'Required' : 'Polling'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Quick security trust banner */}
            <div className="liquid-glass rounded-xl p-4 border border-white/5 flex gap-3.5 items-start mt-2">
              <Shield className="w-5 h-5 text-[#5ed29c] shrink-0 mt-0.5" />
              <div>
                <span className="font-sans text-xs font-bold text-white block">Enterprise Cryptographic Shield</span>
                <span className="font-sans text-[11px] text-white/40 leading-snug block mt-0.5">
                  Nexus OS guarantees complete socket-level isolated enclaves. All tokens are encrypted using AES-256 standard containers.
                </span>
              </div>
            </div>
          </div>

          {/* Right Configuration / Sync Detail Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIntegration.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden bg-neutral-950/[0.2] flex flex-col justify-between"
              >
                {/* Glow splash backdrop to focus item */}
                <div 
                  className="absolute -top-1/4 -right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-all duration-700" 
                  style={{ background: activeIntegration.glowColor }} 
                />

                <div className="relative z-10 space-y-6">
                  {/* Title & Connection Status Panel */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-white/[0.01]"
                        style={{ borderColor: `${activeIntegration.color}40` }}
                      >
                        <activeIntegration.icon className="w-6 h-6 animate-[pulse_3s_infinite]" style={{ color: activeIntegration.color }} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{activeIntegration.name}</h4>
                        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mt-0.5">
                          Stream protocol: {activeIntegration.syncInterval}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-full w-fit">
                      <span className={`w-2 h-2 rounded-full ${
                        activeIntegration.status === 'Connected' 
                          ? 'bg-[#5ed29c]' 
                          : activeIntegration.status === 'Syncing' 
                            ? 'bg-amber-400 animate-spin' 
                            : 'bg-red-400 animate-pulse'
                      }`} />
                      <span className="font-mono text-[10px] uppercase font-bold text-white/70">
                        {activeIntegration.status}
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="space-y-4">
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                      {activeIntegration.description}
                    </p>
                    
                    {/* Authorized Permissions Tags List */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">Approved Scope Permission Chains:</span>
                      <div className="flex flex-wrap gap-2">
                        {activeIntegration.permissions.map((p, idx) => (
                          <span key={idx} className="font-mono text-[9.5px] font-bold text-[#5ed29c]/80 bg-[#5ed29c]/5 border border-[#5ed29c]/15 px-2.5 py-1 rounded-md">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Toggle configuration checkboxes */}
                  <div className="border-t border-b border-white/5 py-6 space-y-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">Integration Configuration Node Flags</span>
                    <div className="space-y-3.5">
                      {activeIntegration.options.map((opt) => (
                        <div 
                          key={opt.key}
                          onClick={() => handleToggleOption(activeIntegration.id, opt.key)}
                          className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl cursor-pointer select-none transition-colors group"
                        >
                          <div className="flex gap-2.5 items-start">
                            <span className="font-sans text-xs text-white/80 group-hover:text-white transition-colors">
                              {opt.label}
                            </span>
                          </div>
                          <button 
                            id={`option-toggle-${activeIntegration.id}-${opt.key}`}
                            className="text-white hover:text-[#5ed29c] transition-colors outline-none cursor-pointer"
                          >
                            {opt.enabled ? (
                              <ToggleRight className="w-8 h-8 text-[#5ed29c]" />
                            ) : (
                              <ToggleLeft className="w-8 h-8 text-white/30" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Streaming Terminal Log output (Live synchronized parameters) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/45 flex items-center gap-1.5 pt-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Synchronized Telemetry Logs
                      </span>
                      {activeIntegration.status === 'Connected' && (
                        <button
                          id={`btn-sync-now-${activeIntegration.id}`}
                          onClick={() => handleManualSync(activeIntegration.id)}
                          disabled={syncingId === activeIntegration.id}
                          className="font-sans text-[9px] uppercase tracking-wider font-bold text-[#5ed29c] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-40 outline-none"
                        >
                          <RefreshCw className={`w-3 h-3 ${syncingId === activeIntegration.id ? 'animate-spin' : ''}`} />
                          {syncingId === activeIntegration.id ? 'Polling...' : 'Sync Now'}
                        </button>
                      )}
                    </div>
                    <div className="bg-[#020305]/95 border border-white/10 rounded-xl p-4 font-mono text-[10px] space-y-1.5 text-white/70 h-[115px] overflow-y-auto">
                      {activeIntegration.logs.map((logLine, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs leading-normal">
                          <span className="text-[#5ed29c] font-black shrink-0">&gt;</span>
                          <span className="text-white/80">{logLine}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action buttons */}
                <div className="border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
                  <div className="flex items-center gap-2.5 text-white/40">
                    <Info className="w-4 h-4 text-white/40 shrink-0" />
                    <span className="font-sans text-[11px] leading-snug">
                      Authorized protocols operate via secure oauth handlers.
                    </span>
                  </div>

                  <div className="w-full sm:w-auto">
                    {activeIntegration.status === 'Authentication Required' ? (
                      <button
                        id={`btn-authenticate-${activeIntegration.integrationId || activeIntegration.id}`}
                        onClick={() => handleAuthenticate(activeIntegration.id, true)}
                        className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-1.5 bg-[#5ed29c] px-6 py-2.5 rounded-xl uppercase text-black font-extrabold tracking-widest text-[10px] hover:bg-[#4bc089] transition-all cursor-pointer shadow-[0_0_15px_rgba(94,210,156,0.2)] hover:shadow-[0_0_25px_rgba(94,210,156,0.35)]"
                      >
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        Authorize Session
                      </button>
                    ) : (
                      <button
                        id={`btn-disconnect-${activeIntegration.id}`}
                        onClick={() => handleAuthenticate(activeIntegration.id, false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center border border-dashed border-red-500/30 hover:border-red-500/80 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-xl px-6 py-2.5 transition-all duration-300 cursor-pointer"
                      >
                        Disconnect Sync
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
