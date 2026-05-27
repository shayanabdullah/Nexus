import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Lock, User, Eye, EyeOff, Shield, ShieldCheck, 
  Github, Chrome, Zap, Terminal, CheckCircle2, ArrowRight, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signUp, googleSignIn, userProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // High fidelity states
  const [loadingThirdParty, setLoadingThirdParty] = useState<string | null>(null);
  const [authStage, setAuthStage] = useState<'form' | 'provisioning' | 'success'>('form');
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const [operatorId, setOperatorId] = useState('');

  // Finishes the provisioning log flow and displays the success template
  const finishFlow = (completedOperatorId?: string) => {
    setProvisioningLogs(prev => [...prev, '✔ Exporting authorization token OP_TOKEN_PROV...']);
    
    setTimeout(() => {
      if (completedOperatorId) {
        setOperatorId(completedOperatorId);
      }
      setAuthStage('success');
      
      // Auto close and reset after some time
      setTimeout(() => {
        onClose();
        // Reset states
        setAuthStage('form');
        setEmail('');
        setPassword('');
        setFullName('');
        setAcceptTerms(false);
        setProvisioningLogs([]);
      }, 2500);
    }, 1200);
  };

  // Handle email/pass credentials submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Required operational parameters are missing.');
      return;
    }
    
    // Quick validation patterns
    if (activeTab === 'signup' && !fullName) {
      setErrorMessage('Full Operator identity Name is required.');
      return;
    }

    if (activeTab === 'signup' && !acceptTerms) {
      setErrorMessage('Cryptographic security terms must be explicitly accepted.');
      return;
    }

    setAuthStage('provisioning');
    setProvisioningLogs(['🧠 Securing TLS 1.3 socket allocation...']);

    try {
      if (activeTab === 'login') {
        setProvisioningLogs(prev => [...prev, '⚡ Initiating cryptographic validation handshake...']);
        const res = await login(email, password);
        
        // Fetch or create fallback operatorId
        setProvisioningLogs(prev => [...prev, '✔ Credentials verified securely.']);
        
        // Stagger visual terminal logs
        setTimeout(() => {
          setProvisioningLogs(prev => [...prev, '✔ Mapping secure user sandbox workspace enclave.']);
        }, 300);
        
        // Try to read profile info or fallback to user id
        const userUid = res.user.uid;
        finishFlow(`OP-${userUid.slice(0, 6).toUpperCase()}-NODE20`);
      } else {
        setProvisioningLogs(prev => [...prev, '⚡ Provisioning developer coordinate with Auth server...']);
        await signUp(email, password, fullName);
        
        setProvisioningLogs(prev => [
          ...prev, 
          '✔ Identity credential written to secure cloud database.',
          '✔ Operator profile successfully locked in sovereign registry.'
        ]);
        
        // Generate a visual seed from the display name / timestamp
        const randHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
        finishFlow(`OP-${randHex}-NODE20`);
      }
    } catch (error: any) {
      setAuthStage('form');
      console.error(error);
      
      let clientMsg = error.message || 'Operation aborted by authentication engine.';
      if (clientMsg.includes('auth/invalid-credential')) {
        clientMsg = 'Invalid core credentials or cryptographic passphrase.';
      } else if (clientMsg.includes('auth/email-already-in-use')) {
        clientMsg = 'The provided core routing email is already in use.';
      } else if (clientMsg.includes('auth/weak-password')) {
        clientMsg = 'Passphrase strength threshold not met. Minimum 6 characters required.';
      }
      setErrorMessage(clientMsg);
    }
  };

  // Simulated third party OAuth button trigger
  const handleSocialAuth = async (provider: string) => {
    if (provider !== 'Google') {
      setErrorMessage('Only Google Auth is configured for this secure environment in spark tier.');
      return;
    }
    setLoadingThirdParty('Google');
    setErrorMessage('');
    
    try {
      setAuthStage('provisioning');
      setProvisioningLogs([
        '🧠 Establishing secure social proxy...',
        '⚡ Performing Google OAuth pop-up handshake...'
      ]);
      
      await googleSignIn();
      
      setProvisioningLogs(prev => [
        ...prev, 
        '✔ OAuth token verified.', 
        '✔ Identity registry mapped.',
        '✔ Operational profile synchronized successfully.'
      ]);
      
      setLoadingThirdParty(null);
      // Fallback operator id based on current info
      const randHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
      finishFlow(`OP-${randHex}-NODE20`);
    } catch (error: any) {
      setLoadingThirdParty(null);
      setAuthStage('form');
      console.error(error);
      setErrorMessage(error.message || 'OAuth sequence aborted by agent.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="auth-modal-wrapper"
        className="fixed inset-0 z-55 flex items-center justify-center p-4 selection:bg-[#5ed29c]/30"
      >
        {/* Transparent dark background layer with smooth entry */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (authStage === 'form') onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer z-0"
        />

        {/* Modal Window Panel positioned on top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="liquid-glass relative w-full max-w-[460px] rounded-3xl border border-white/10 bg-[#07090d]/95 shadow-[0_0_60px_rgba(94,210,156,0.18)] z-10 overflow-hidden"
        >
          {/* Subtle accent spotlights */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5ed29c]/40 to-transparent" />
          <div className="absolute top-0 right-1/4 w-36 h-36 bg-[#5ed29c]/5 rounded-full blur-2xl z-0 pointer-events-none" />

          {/* Header Row */}
          <div className="relative z-10 px-6 sm:px-8 pt-6 pb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Shield className="w-5 h-5 text-[#5ed29c]" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-white/40">
                Operator Gate Sync
              </span>
            </div>
            {authStage === 'form' && (
              <button 
                id="btn-close-auth"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center text-white/50 hover:text-white cursor-pointer select-none outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="px-6 sm:px-8 pb-8 relative z-10">
            {authStage === 'form' && (
              <div className="space-y-6">
                
                {/* Visual Intro Block */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-black font-jakarta text-white tracking-tight leading-none text-left">
                    {activeTab === 'login' ? 'Operational Access' : 'Register Operator'}
                  </h3>
                  <span className="text-xs text-white/45 block text-left">
                    {activeTab === 'login' 
                      ? 'Secure your active console workspace enclave.' 
                      : 'Provision a custom developer runtime coordinate.'
                    }
                  </span>
                </div>

                {/* Tab Selector Capsule Container */}
                <div className="relative grid grid-cols-2 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
                  {/* Sliding capsule background indicator */}
                  <div 
                    className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg bg-white/5 border border-white/5 transition-transform duration-300"
                    style={{ transform: activeTab === 'signup' ? 'translateX(100%)' : 'translateX(0)' }}
                  />

                  <button
                    id="auth-tab-login"
                    onClick={() => {
                      setActiveTab('login');
                      setErrorMessage('');
                    }}
                    className={`relative z-10 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg outline-none cursor-pointer transition-colors ${
                      activeTab === 'login' ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    id="auth-tab-signup"
                    onClick={() => {
                      setActiveTab('signup');
                      setErrorMessage('');
                    }}
                    className={`relative z-10 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg outline-none cursor-pointer transition-colors ${
                      activeTab === 'signup' ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {activeTab === 'signup' && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">Operational Identity Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input 
                          id="auth-field-name"
                          type="text"
                          placeholder="Commander Shepard"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white/[0.01] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs leading-none text-white placeholder-white/20 focus:border-[#5ed29c]/40 focus:bg-white/[0.03] outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">Secure Core Routing Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        id="auth-field-email"
                        type="email"
                        placeholder="operator@nexus.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.01] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs leading-none text-white placeholder-white/20 focus:border-[#5ed29c]/40 focus:bg-white/[0.03] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-white/40 block">Cryptographic Key Passphrase</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        id="auth-field-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/[0.01] border border-white/5 rounded-xl pl-10 pr-10 py-3 text-xs leading-none text-white placeholder-white/20 focus:border-[#5ed29c]/40 focus:bg-white/[0.03] outline-none transition-all"
                      />
                      <button
                        id="btn-toggle-password"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 cursor-pointer outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {activeTab === 'signup' && (
                    <div 
                      className="flex items-start gap-2.5 p-3.5 bg-white/[0.005] border border-white/5 rounded-xl cursor-pointer select-none"
                      onClick={() => setAcceptTerms(!acceptTerms)}
                    >
                      <button 
                        id="checkbox-accept-terms"
                        type="button"
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          acceptTerms ? 'bg-[#5ed29c] border-[#5ed29c] text-black' : 'border-white/20 bg-transparent'
                        }`}
                      >
                        {acceptTerms && <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 stroke-[3]" />}
                      </button>
                      <span className="font-sans text-[10.5px] leading-snug text-white/45">
                        I commit to standard cryptographic SLAs. I agree my node mitigation cycles operate under sovereign isolation guidelines.
                      </span>
                    </div>
                  )}

                  {/* Error Prompt area */}
                  {errorMessage && (
                    <div className="text-red-400 font-mono text-[11px] leading-relaxed p-3 bg-red-950/15 border border-red-500/15 rounded-xl">
                      ⚠ {errorMessage}
                    </div>
                  )}

                  {/* Submit operational authentication parameters */}
                  <button
                    id="btn-auth-submit"
                    type="submit"
                    className="w-full relative group overflow-hidden inline-flex items-center justify-center gap-1.5 bg-[#5ed29c] py-3.5 rounded-xl uppercase text-black font-extrabold tracking-widest text-[11px] hover:bg-[#4bc089] transition-all cursor-pointer shadow-[0_0_15px_rgba(94,210,156,0.18)]"
                  >
                    <span>{activeTab === 'login' ? 'Synchronize Session' : 'Provision Coordinate'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Third Party OAuth options */}
                <div className="space-y-4">
                  <div className="relative flex items-center justify-center py-1">
                    <div className="absolute inset-x-0 h-px bg-white/5" />
                    <span className="relative font-mono text-[8px] tracking-widest uppercase text-white/30 bg-[#07090d] px-3">
                      Secure Social Gateway
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="btn-oauth-google"
                      onClick={() => handleSocialAuth('Google')}
                      disabled={loadingThirdParty !== null}
                      className="inline-flex items-center justify-center gap-2 border border-white/5 hover:border-white/12 bg-white/[0.015] hover:bg-white/[0.04] text-xs font-bold font-sans text-white/95 rounded-xl py-2.5 transition-colors cursor-pointer outline-none disabled:opacity-40"
                    >
                      {loadingThirdParty === 'Google' ? (
                        <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                      ) : (
                        <Chrome className="w-3.5 h-3.5 text-white/55" />
                      )}
                      Google
                    </button>

                    <button
                      id="btn-oauth-github"
                      onClick={() => handleSocialAuth('GitHub')}
                      disabled={loadingThirdParty !== null}
                      className="inline-flex items-center justify-center gap-2 border border-white/5 hover:border-white/12 bg-white/[0.015] hover:bg-white/[0.04] text-xs font-bold font-sans text-white/95 rounded-xl py-2.5 transition-colors cursor-pointer outline-none disabled:opacity-40"
                    >
                      {loadingThirdParty === 'GitHub' ? (
                        <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                      ) : (
                        <Github className="w-3.5 h-3.5 text-white/55" />
                      )}
                      GitHub
                    </button>
                  </div>
                </div>

                {/* Footnote helper */}
                <span className="font-sans text-[10px] text-white/30 leading-normal block">
                  All synchronization utilizes standard HTTPS secure tokens. Zero cookies are stored on unauthorized endpoints.
                </span>
              </div>
            )}

            {/* Stage 2: Provisioning terminal readout emulator */}
            {authStage === 'provisioning' && (
              <div className="py-8 space-y-6 text-left">
                <div className="flex flex-col items-center justify-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-spin">
                    <RefreshCw className="w-6 h-6 text-[#5ed29c]" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#5ed29c] font-black animate-pulse">Running Handshake Exchange</span>
                </div>

                <div className="bg-[#020305]/95 border border-white/10 rounded-2xl p-5 font-mono text-[10.5px] leading-relaxed space-y-2 text-white/70 h-[160px] overflow-hidden shadow-inner">
                  {provisioningLogs.map((logLine, idx) => (
                    <div key={idx} className="flex gap-2 items-start animate-[fadeIn_0.2s_ease-out]">
                      <span className="text-[#5ed29c] font-black shrink-0">&gt;&gt;</span>
                      <span className={logLine.startsWith('✔') ? 'text-[#5ed29c]' : 'text-white/85'}>
                        {logLine}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 3: Success onboard block */}
            {authStage === 'success' && (
              <div className="py-8 space-y-6 text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-[#5ed29c]/10 border border-[#5ed29c]/30 items-center justify-center animate-[pulse_2s_infinite]">
                  <ShieldCheck className="w-8 h-8 text-[#5ed29c] animate-[scale_0.4s_cubic-bezier(0.16,1,0.3,1)]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-jakarta tracking-tight text-white leading-none">
                    Security Bond Established
                  </h3>
                  <span className="text-xs text-white/45 block max-w-sm mx-auto">
                    Welcome back Operator! Credentials synchronized smoothly and workspace terminal session is fully hot-wired with safe SLA indicators.
                  </span>
                </div>

                <div className="inline-flex flex-col items-center bg-white/[0.01] border border-white/10 rounded-2xl p-4 gap-1 w-full max-w-xs">
                  <span className="font-mono text-[8px] uppercase tracking-widest font-bold text-white/40 block">SECURE OPERATOR CALLSIGN</span>
                  <span className="font-mono text-sm uppercase font-bold text-[#5ed29c] tracking-widest leading-none mt-1">
                    {operatorId}
                  </span>
                  <span className="font-mono text-[9px] text-emerald-400 font-black block mt-2 animate-pulse uppercase">
                    SYS ACCESS CONTROL: OPERATIONAL
                  </span>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
