/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Storyteller from './components/Storyteller';
import CommandCenter from './components/CommandCenter';
import Features from './components/Features';
import Integrations from './components/Integrations';
import AIGenerator from './components/AIGenerator';
import Metrics from './components/Metrics';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Soften movement velocity for elegant delayed tracking feel
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    let elementId = sectionId;
    if (sectionId === 'docs') {
      elementId = 'ai-generator-section';
    } else if (sectionId === 'solutions') {
      elementId = 'ai-generator-section';
    }
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-[#5ed29c]/30 selection:text-white">
      
      {/* Precision system cursor layout */}
      <CustomCursor />

      {/* Premium System preloader on initial cold mount */}
      <Preloader />

      {/* GLOBAL BACKGROUND ELEMENTS & RADIALS */}
      {/* Ambient Grid overlay layer */}
      <div className="fixed inset-0 grid-overlay opacity-[0.15] z-0 pointer-events-none" />
      <div className="fixed inset-0 dots-overlay opacity-[0.2] z-0 pointer-events-none" />

      {/* LUXURY INTERACTIVE AI CURSOR GLOW ACCENT BACKGROUND */}
      <div 
        className="fixed w-[450px] h-[450px] bg-[#5ed29c]/[0.025] rounded-full blur-[100px] pointer-events-none z-10 transition-transform duration-300 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePos.x - 225}px, ${mousePos.y - 225}px)`
        }}
      />

      {/* NO INTERACTIVE TELEMETRY NOISE OR STRUCTURAL OVERRUN - PURITY BY DIRECTIVE */}

      {/* CORE EXPERIENCE COMPONENTS */}
      <div className="relative z-20">
        
        {/* Navigation Layer */}
        <Navbar 
          onScrollToSection={handleScrollToSection} 
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Section 1 & 2: Hero and Platforms Grid */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Section 4: Cinematic Scroll Storytelling */}
        <Storyteller />

        {/* Section 3: AI Command Center Dashboard */}
        <CommandCenter />

        {/* Section 5: Bento Features Grid */}
        <Features />

        {/* Section 5.5: Ecosystem Connections Hub */}
        <Integrations />

        {/* Section 6: Live Streaming Generation Console */}
        <AIGenerator />

        {/* Section 7: Animated telemetry metrics */}
        <Metrics />

        {/* Section 8: Premium pricing modules */}
        <Pricing />

        {/* Section 9 / Footer: Final cinematic call to action */}
        <Footer />
        
      </div>

      {/* Secure Cryptographic Authentication Onboarding Gate */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
