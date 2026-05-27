import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth coordinates using motion values and springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only mount customs on device support
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track hovered interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.cursor-pointer') || 
        target.closest('input') || 
        target.closest('textarea') ||
        target.closest('.liquid-glass') ||
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 border border-[#5ed29c]/60 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.5 : isClicked ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(94, 210, 156, 0.1)' : 'rgba(94, 210, 156, 0)',
          borderColor: isHovered ? '#5ed29c' : 'rgba(94, 210, 156, 0.6)',
          boxShadow: isHovered ? '0 0 15px rgba(94, 210, 156, 0.4)' : 'none',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />

      {/* Inner Pin-Point Dot */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 bg-[#5ed29c] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#5ed29c] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicked ? 0.6 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  );
}
