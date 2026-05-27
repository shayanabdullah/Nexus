import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Command, Layers, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenAuth: () => void;
}

export default function Navbar({ onScrollToSection, onOpenAuth }: NavbarProps) {
  const { user, userProfile, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', id: 'product' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Integrations', id: 'integrations' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Docs', id: 'docs' }
  ];

  return (
    <>
      <motion.nav
        id="nexus-navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-4 bg-[#000000]/70 backdrop-blur-md border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-[#5ed29c]/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5ed29c]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Layers className="w-5 h-5 text-white group-hover:text-[#5ed29c] transition-colors" />
            </div>
            <span className="font-jakarta font-extrabold text-sm tracking-widest text-white">
              NEXUS <span className="text-[#5ed29c] font-light">OS</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/[0.02] border border-white/5 px-6 py-2 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="font-sans text-xs font-medium uppercase tracking-wider text-white/70 hover:text-[#5ed29c] transition-all cursor-pointer relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#5ed29c] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 mr-2">
                <span className="font-mono text-[10px] text-[#5ed29c] uppercase font-black tracking-wider">
                  {userProfile?.fullName || user.displayName || 'Operator'}
                </span>
                <span className="text-white/20">|</span>
                <button 
                  id="btn-logout"
                  onClick={logout}
                  className="font-sans text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white hover:underline transition-all cursor-pointer outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                id="btn-login"
                onClick={onOpenAuth}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white hover:underline transition-all cursor-pointer outline-none"
              >
                Login
              </button>
            )}
            <button
              id="btn-launch"
              className="liquid-glass text-xs text-white px-5 py-2.5 rounded-full uppercase font-bold tracking-wider hover:text-[#5ed29c] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              onClick={() => onScrollToSection('command-center')}
            >
              Launch Workspace
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>


          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[73px] z-45 md:hidden bg-[#000000] border-b border-white/10 [backdrop-filter:blur(12px)] px-6 py-8 h-screen"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-${link.id}`}
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection(link.id);
                  }}
                  className="font-sans text-sm font-semibold uppercase tracking-wider text-left text-white/80 hover:text-[#5ed29c]"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-4">
                {user ? (
                  <>
                    <span className="font-mono text-center text-xs text-[#5ed29c] uppercase font-black tracking-widest my-1 block">
                      {userProfile?.fullName || user.displayName || 'Operator'}
                    </span>
                    <button 
                      id="mobile-btn-logout"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-center py-3 border border-white/10 rounded-full font-bold uppercase tracking-wider text-xs text-white/50 cursor-pointer outline-none"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    id="mobile-btn-login"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full text-center py-3 border border-white/10 rounded-full font-bold uppercase tracking-wider text-xs text-white cursor-pointer outline-none"
                  >
                    Login
                  </button>
                )}
                <button
                  id="mobile-btn-launch"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('command-center');
                  }}
                  className="w-full text-center py-3 bg-[#5ed29c] rounded-full font-bold uppercase tracking-wider text-xs text-black"
                >
                  Launch Workspace
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
