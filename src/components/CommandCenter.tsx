import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Search, MessageSquare, BookOpen, CheckSquare, Video, BarChart2, Cpu, 
  Send, Sparkles, Plus, AlertCircle, ChevronRight, Zap, RefreshCw, FileText
} from 'lucide-react';

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState<string>('ai-chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'user', text: 'Generate an analysis of our high-latency API issues and cross-reference with slack complaints.' },
    { sender: 'nexus', text: 'I’ve cross-referenced 4 Slack channels (#engineering-alerts, #customer-success, #api-infra, #prod-outages) with Datadog service metrics. Here is the active context:\n\n1. **Root Indicator**: Redis cache eviction spikes occurred at 14:20 UTC.\n2. **Customer Impact**: 3 major accounts reported timeouts. \n3. **Recommended Remediation**: Scale standard cache allocation by 40% and flush expired session tokens immediately.', isAI: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Live streaming task status lists
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Upgrade Redis cache allocation standard to 4GB', status: 'pending', assignee: 'DevOps Agent', priority: 'crucial' },
    { id: 2, title: 'Verify expired session token purges in prod database', status: 'completed', assignee: 'DB-Sentinel Agent', priority: 'high' },
    { id: 3, title: 'Draft notification email for strategic accounts regarding API stability', status: 'pending', assignee: 'Support-Orchestrator', priority: 'medium' },
    { id: 4, title: 'Schedule post-mortem alignment with engineering leads', status: 'pending', assignee: 'Nexus Calendar Agent', priority: 'low' }
  ]);

  const [agents, setAgents] = useState([
    { id: '1', name: 'Memory-Index-Sentinel', task: 'Indexing Google Workspace context', status: 'processing', cpu: '2.4%' },
    { id: '2', name: 'Synthesizer-Core-v4', task: 'Synthesizing Q2 report draft', status: 'idle', cpu: '0.0%' },
    { id: '3', name: 'Event-Dispatcher-Bot', task: 'Synchronizing Slack to Linear queue', status: 'active', cpu: '3.1%' },
    { id: '4', name: 'Cognitive-Refiner-Agent', task: 'Post-processing meeting transcript', status: 'active', cpu: '1.2%' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const userMsg = searchQuery;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSearchQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      if (userMsg.toLowerCase().includes('report') || userMsg.toLowerCase().includes('generate')) {
        aiText = 'Generating requested tactical executive briefing. Context pulled from Slack memory index (7 channels matched). File compiled: "NEXUS-Workspace-Telemetry-Insights.pdf".';
      } else {
        aiText = `Acknowledged instruction: "${userMsg}". Query directed to Nexus Neural Index. Initiated 3 orchestration tasks to fulfill this command. Check 'Tasks' tab for linear state updates.`;
      }
      setChatMessages(prev => [...prev, { sender: 'nexus', text: aiText, isAI: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleToggleTaskStatus = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  const handleAddNewTask = () => {
    const freshTasks = [
      { id: Date.now(), title: 'Audit AWS ECS task definition security compliance patterns', status: 'pending', assignee: 'SecOps-Agent', priority: 'high' },
      { id: Date.now() + 1, title: 'Optimize standard client-side bundle bundle-size parameters', status: 'pending', assignee: 'FrontEnd-OptimAgent', priority: 'medium' }
    ];
    setTasks(prev => [...freshTasks, ...prev]);
  };

  return (
    <section id="command-center" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5ed29c]/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute inset-0 dots-overlay opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full"
          >
            <Bot className="w-3.5 h-3.5 text-[#5ed29c]" />
            <span className="font-jakarta text-[10px] font-bold tracking-widest text-[#5ed29c] uppercase">
              The Command Suite
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mb-6">
            One <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#5ed29c]">Intelligence Layer</span><br />For Modern Work.
          </h2>

          <p className="text-white/60 text-sm max-w-lg mx-auto">
            NEXUS OS connects workflows, people, and AI agents into a single adaptive operating system.
          </p>
        </div>

        {/* CINEMATIC INTERACTIVE DASHBOARD CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COMMAND SIDEBAR */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 bg-white/[0.01] border border-white/5 p-3 rounded-2xl backdrop-blur-md overflow-x-auto lg:overflow-x-visible scrollbar-none">
            {[
              { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, badge: 'Direct' },
              { id: 'research', label: 'Deep Research', icon: BookOpen, badge: 'Live' },
              { id: 'tasks', label: 'Autonomous Tasks', icon: CheckSquare, count: tasks.filter(t => t.status === 'pending').length },
              { id: 'meetings', label: 'Copilot Meetings', icon: Video, badge: 'Stereo' },
              { id: 'analytics', label: 'Telemetry Analytics', icon: BarChart2, trend: '+28%' },
              { id: 'ai-agents', label: 'AI Agent Fleet', icon: Cpu, count: agents.filter(a => a.status === 'active' || a.status === 'processing').length }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`dashboard-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between w-full min-w-[180px] lg:min-w-0 px-4 py-3.5 rounded-xl text-left transition-all duration-300 font-jakarta group relative cursor-pointer ${
                    isActive 
                      ? 'bg-white/[0.05] border border-white/10 text-[#5ed29c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]' 
                      : 'border border-transparent text-white/50 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#5ed29c]' : 'text-white/40 group-hover:text-white/80'}`} />
                    <span className="text-xs font-semibold tracking-wide uppercase">{tab.label}</span>
                  </div>
                  
                  {/* Decorative indicator badges matching clean, humble aesthetic */}
                  {tab.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && (
                    <span className="text-[10px] font-mono font-bold w-5 h-5 rounded-full bg-[#5ed29c]/10 text-[#5ed29c] flex items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                  {tab.trend && (
                    <span className="text-[9px] font-mono font-bold text-[#5ed29c]">
                      {tab.trend}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* MAIN WORKSCREEN */}
          <div className="lg:col-span-9">
            <div className="liquid-glass border border-white/10 rounded-2xl shadow-3xl h-[560px] flex flex-col justify-between relative overflow-hidden">
              
              {/* Inner Dashboard header bar */}
              <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/5 bg-white/[0.01] relative z-10 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-3">
                  <div className="md:flex gap-1.5 hidden ">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
                    <span className="text-[#5ed29c]">SECURE_TUNNEL_ACTIVE:</span>
                    <span className="text-[8px]">NEXUS-CENTRALIZED-v1.0.4</span>
                    <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
                  <span className="font-mono text-[9px] text-white/50">CYCLES ALIGNED</span>
                </div>
                  </div>
                     
                </div>

             
              </div>

              {/* ACTIVE WORKSHEET CONTENT WINDOW */}
              <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: AI CHAT WORKSPACE */}
                  {activeTab === 'ai-chat' && (
                    <motion.div
                      key="ai-chat"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 h-full flex flex-col justify-between"
                    >
                      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                        {chatMessages.map((msg, i) => (
                          <div 
                            key={i} 
                            className={`flex gap-3 max-w-xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                          >
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                              msg.sender === 'user' ? 'bg-white/10 border-white/20' : 'bg-[#5ed29c]/10 border-[#5ed29c]/20'
                            }`}>
                              {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4 text-[#5ed29c]" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === 'user' 
                                ? 'bg-white/5 border border-white/10 text-white' 
                                : 'bg-white/[0.01] border border-white/5 text-white/90 whitespace-pre-line'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex gap-3 max-w-xl">
                            <div className="w-8 h-8 rounded-full border bg-[#5ed29c]/10 border-[#5ed29c]/20 flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4 text-[#5ed29c] animate-spin" />
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl text-xs text-white/40 italic flex items-center gap-2">
                              <span>Nexus Engine is compiling neural pathways...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: DEEP RESEARCH SEMANTIC MAP */}
                  {activeTab === 'research' && (
                    <motion.div
                      key="research"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#5ed29c]" />
                            <span className="font-sans text-xs font-medium text-white">Active Research Deep-Dive Cluster</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/40">14 WORKSPACES INDEXED</span>
                        </div>

                        {/* Interactive Semantic Tech Sphere Mockup */}
                        <div className="relative border border-white/5 rounded-xl h-64 bg-black/60 overflow-hidden flex items-center justify-center">
                          {/* Radial glowing vector graphs */}
                          <div className="absolute inset-0 grid-overlay opacity-15" />
                          <div className="absolute w-[220px] h-[220px] border border-white/5 rounded-full animate-spin [animation-duration:40s]" />
                          <div className="absolute w-[140px] h-[140px] border border-[#5ed29c]/10 rounded-full animate-spin [animation-duration:20s]" />
                          
                          {/* Nodes floating around */}
                          <div className="absolute top-8 left-12 flex items-center gap-2 px-2.5 py-1.5 border border-white/10 rounded-lg bg-black text-[10px] group cursor-pointer hover:border-[#5ed29c]/30">
                            <span className="w-1.5 h-1.5 bg-[#5ed29c] rounded-full" />
                            <span>Redis Cluster latency spikes</span>
                          </div>
                          <div className="absolute bottom-12 left-24 flex items-center gap-2 px-2.5 py-1.5 border border-[#5ed29c]/20 rounded-lg bg-black text-[10px]">
                            <span className="w-1.5 h-1.5 bg-[#5ed29c] rounded-full animate-ping" />
                            <span>Slack complaints channel</span>
                          </div>
                          <div className="absolute top-20 right-16 flex items-center gap-2 px-2.5 py-1.5 border border-white/10 rounded-lg bg-black text-[10px]">
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                            <span>Datadog telemetry cache</span>
                          </div>
                          <div className="absolute bottom-20 right-32 flex items-center gap-2 px-2.5 py-1.5 border border-white/10 rounded-lg bg-black text-[10px]">
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                            <span>Cache Eviction policy</span>
                          </div>

                          <div className="text-center relative z-10 p-4 max-w-sm bg-black/70 border border-white/10 rounded-xl backdrop-blur-md">
                            <div className="text-[#5ed29c] text-xs font-bold leading-normal mb-1">Synthesizer Agent Active</div>
                            <div className="text-white/60 text-[10px] leading-relaxed">
                              "Established relationship matching user eviction incidents with customer support ticket influx. Threat confidence: 97%."
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Brief overview summary on semantic intelligence */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                          <div className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-1 font-jakarta">Co-occurring subjects</div>
                          <div className="text-white">EVIC_STRAT_A, latency-infra, CS-Slack-Alerts</div>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                          <div className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-1 font-jakarta">Contextual Synthesis</div>
                          <div className="text-[#5ed29c] font-semibold">Active alignment resolved (12m ago)</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: AUTONOMOUS TASKS WITH INTERACTIVE CHECKBOXES */}
                  {activeTab === 'tasks' && (
                    <motion.div
                      key="tasks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider font-jakarta">Agent Action Items</span>
                          <button
                            id="add-task-btn"
                            onClick={handleAddNewTask}
                            className="bg-[#5ed29c]/10 text-[#5ed29c] border border-[#5ed29c]/20 hover:bg-[#5ed29c]/20 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3 h-3" /> Insert Sample Agent Task
                          </button>
                        </div>

                        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                          {tasks.map((task) => (
                            <div
                              id={`task-item-${task.id}`}
                              key={task.id}
                              className={`flex items-center justify-between p-3.5 border rounded-xl transition-all ${
                                task.status === 'completed'
                                  ? 'bg-black/20 border-white/5 opacity-50'
                                  : 'bg-white/[0.01] border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  id={`task-check-${task.id}`}
                                  onClick={() => handleToggleTaskStatus(task.id)}
                                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                    task.status === 'completed'
                                      ? 'bg-[#5ed29c] border-[#5ed29c] text-black'
                                      : 'border-white/30 hover:border-[#5ed29c]'
                                  }`}
                                >
                                  {task.status === 'completed' && <span className="text-[10px] font-bold">✓</span>}
                                </button>
                                <span className={`text-xs ${task.status === 'completed' ? 'line-through text-white/45' : 'text-white'}`}>
                                  {task.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-mono text-white/30 truncate max-w-[100px] hidden sm:inline">
                                  {task.assignee}
                                </span>
                                <span className={`text-[8.5px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                                  task.priority === 'crucial' ? 'bg-[#e25c5c]/15 text-[#e25c5c]' :
                                  task.priority === 'high' ? 'bg-[#e29c5c]/15 text-[#e29c5c]' :
                                  'bg-white/10 text-white/60'
                                }`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#5ed29c]/5 border border-[#5ed29c]/10 rounded-xl p-3 flex items-center gap-3 text-xs text-[#5ed29c]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>All completed tasks are automatically synchronized to linked Linear backlogs via Webhooks.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: COPILOT MEETINGS */}
                  {activeTab === 'meetings' && (
                    <motion.div
                      key="meetings"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-[#e25c5c] animate-pulse" />
                          <div className="text-xs">
                            <div className="font-semibold text-white">Daily Operational Sync</div>
                            <div className="text-[10px] text-white/40">Active call time • 18m 42s</div>
                          </div>
                        </div>

                        {/* Interactive Sound Waveform mockup using simple clean CSS styling */}
                        <div className="flex items-end gap-1 h-6">
                          {[20, 45, 30, 60, 40, 85, 35, 70, 50, 40, 65, 30, 15, 45, 60, 20].map((h, i) => (
                            <span 
                              key={i} 
                              className="w-1 bg-[#5ed29c] rounded-full animate-bounce [animation-duration:1.2s]" 
                              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Custom streaming meeting notes transcript */}
                        <div className="border border-white/5 bg-black/40 rounded-xl p-4 space-y-3">
                          <div className="text-[#5ed29c] font-mono text-[9px] uppercase tracking-wider font-bold">Streaming Transcript:</div>
                          <div className="space-y-2 max-h-[180px] overflow-y-auto text-[11px] leading-relaxed">
                            <p className="text-white/40"><strong className="text-white/60 font-jakarta">Marcus (PM):</strong> "We need to address the Redis evictions before launching the marketing blast on Friday."</p>
                            <p className="text-white/40"><strong className="text-white/60 font-jakarta">Agent DB-Sentinel:</strong> "My telemetry stream indicates evictions occur under sudden bulk token refreshes."</p>
                            <p className="text-[#5ed29c] font-medium"><strong className="text-white/80 font-jakarta">NEXUS AI Copilot:</strong> "Identified correlation: Slack traffic surge is driving bulk refreshes. Recommending token caching modifications."</p>
                          </div>
                        </div>

                        {/* Smart summarization output */}
                        <div className="border border-white/5 bg-white/[0.01] rounded-xl p-4 space-y-3">
                          <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider font-jakarta">Real-time Auto-Action Cards:</div>
                          <ul className="space-y-2 text-xs">
                            <li className="flex items-start gap-2 text-white/80">
                              <span className="text-[#5ed29c] font-bold font-mono">▸</span>
                              <span>Configure token caching headers in Next.js config</span>
                            </li>
                            <li className="flex items-start gap-2 text-white/80">
                              <span className="text-[#5ed29c] font-bold font-mono">▸</span>
                              <span>Inform dev leads about API spike pattern indices</span>
                            </li>
                            <li className="flex items-start gap-2 text-white/40 italic">
                              <span>Synthesizing structural post-mortem report doc...</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: TELEMETRY ANALYTICS WITH PRE-RENDERED HIGH FIDELITY SVG GRADIENT CHART */}
                  {activeTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider font-jakarta">Active Agent Executions / Second</span>
                        <div className="flex gap-4 font-mono text-[10px]">
                          <span className="text-[#5ed29c]">● PROCESS: 124Hz</span>
                          <span className="text-white/45">● QUEUE: 0 LST_EVC</span>
                        </div>
                      </div>

                      {/* Exquisite custom pure SVG chart styled with gradient fills */}
                      <div className="relative border border-white/5 bg-black/60 rounded-xl h-60 p-4 overflow-hidden">
                        <div className="absolute inset-0 grid-overlay opacity-10" />
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#5ed29c" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* SVG Plot path lines */}
                          <path
                            d="M 0 160 Q 50 140 100 110 T 200 45 T 300 130 T 400 90 T 500 20 L 500 200 L 0 200 Z"
                            fill="url(#chartGlow)"
                          />
                          <path
                            d="M 0 160 Q 50 140 100 110 T 200 45 T 300 130 T 400 90 T 500 20"
                            fill="none"
                            stroke="#5ed29c"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />

                          {/* Extra comparison telemetry path line */}
                          <path
                            d="M 0 180 Q 50 160 100 150 T 200 110 T 300 140 T 400 120 T 500 80"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />

                          {/* Points of interest */}
                          <circle cx="200" cy="45" r="4.5" fill="#5ed29c" className="animate-ping" />
                          <circle cx="200" cy="45" r="3.5" fill="#5ed29c" />
                        </svg>

                        <div className="absolute bottom-2 left-4 text-[9px] font-mono text-white/30 flex justify-between w-[92%]">
                          <span>00:00 UTC</span>
                          <span>04:00 UTC</span>
                          <span>08:00 UTC</span>
                          <span>12:00 UTC</span>
                          <span>16:00 UTC</span>
                          <span>20:00 UTC</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                          <div className="text-white/50 text-[9px] font-semibold tracking-wider font-jakarta uppercase mb-0.5">CPU Alignment</div>
                          <span className="text-sm font-extrabold text-white">4.2% Peak</span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                          <div className="text-white/50 text-[9px] font-semibold tracking-wider font-jakarta uppercase mb-0.5">Context Size</div>
                          <span className="text-sm font-extrabold text-[#5ed29c]">2.4B Tokens</span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                          <div className="text-white/50 text-[9px] font-semibold tracking-wider font-jakarta uppercase mb-0.5">Response Mean</div>
                          <span className="text-sm font-extrabold text-white">45ms / Cycle</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: AI AGENTS THREAD EXECUTION ORCHESTRATOR */}
                  {activeTab === 'ai-agents' && (
                    <motion.div
                      key="ai-agents"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider font-jakarta">Running Agent Worker Threads</span>
                        <span className="text-[10px] font-mono text-[#5ed29c]">ORCHESTRATOR CORE: ACTIVE</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agents.map((agent) => (
                          <div key={agent.id} className="border border-white/5 bg-white/[0.01] p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  agent.status === 'processing' ? 'bg-[#5ed29c]' :
                                  agent.status === 'active' ? 'bg-[#5ec7d2]' : 'bg-white/30'
                                }`} />
                                <span className="font-semibold text-xs text-white">{agent.name}</span>
                              </div>
                              <span className="text-[10px] text-white/40 block font-mono">{agent.task}</span>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-white/60 font-mono font-semibold block">{agent.cpu} cpu</span>
                              <span className="text-[8px] font-mono uppercase font-bold text-white/30">{agent.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Agent logs stream console at bottom */}
                      <div className="bg-black/80 border border-white/5 p-3.5 rounded-xl">
                        <div className="flex items-center justify-between text-[9px] font-mono text-white/30 mb-2">
                          <span>SYSTEM ORCHESTRATION CONSOLE LOGS</span>
                          <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin [animation-duration:10s]" /> MONITORING DIRECT_STREAM</span>
                        </div>
                        <div className="font-mono text-[9px] text-white/50 space-y-1 select-none pointer-events-none">
                          <div>[17:54:19 INF] Loading systemic vectors into Google Drive pipeline index...</div>
                          <div className="text-[#5ed29c] font-medium">[17:54:21 SUC] Task synchronized! Linear Issue ID [API-192] escalated to priority HIGH.</div>
                          <div>[17:54:32 IDL] Thread Memory-Index-Sentinel awaiting fresh transactional signals.</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* INTEGRATED COMMAND INPUT BAR */}
              <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] relative z-10">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                    <input
                      id="dashboard-search-input"
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-full pl-11 pr-5 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#5ed29c]/50 transition-all font-jakarta"
                      placeholder={
                        activeTab === 'ai-chat' 
                          ? 'Send custom prompt to NEXUS OS Workspace AI...' 
                          : 'Enter commands e.g. "Draft reports on API cache timeouts"...'
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    id="submit-query-btn"
                    type="submit"
                    className="w-12 h-12 rounded-full bg-white hover:bg-[#5ed29c] text-black flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
