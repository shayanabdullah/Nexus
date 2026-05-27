import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GSAPSmoothScroll() {
  const scrollObj = useRef({ y: 0 });
  const targetScroll = useRef(0);
  const isTweening = useRef(false);

  useEffect(() => {
    // Only apply premium kinetic scrolling on desktop desktop devices with fine pointer controls
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    // Synchronize initial state variables
    scrollObj.current.y = window.scrollY;
    targetScroll.current = window.scrollY;

    const docEl = document.documentElement;
    const bodyEl = document.body;

    // Save existing scroll behaviors to restore on unmount if necessary
    const originalScrollBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = 'auto';
    bodyEl.style.scrollBehavior = 'auto';

    // Passive wheel handler to smoothly tween the target scroll offsets
    const handleWheel = (e: WheelEvent) => {
      // Avoid interference in potential scrollable embeds inside modal panels, etc.
      const target = e.target as HTMLElement;
      if (
        target?.closest('.overflow-y-auto') || 
        target?.closest('.overflow-y-scroll') ||
        target?.closest('textarea')
      ) {
        return;
      }

      // Prevent jerky native jumping
      e.preventDefault();

      // Premium linear inertia acceleration calculation
      const maxScroll = docEl.scrollHeight - window.innerHeight;
      const speedFactor = 0.95; // Fluid velocity matching premium custom cursor index
      
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current + e.deltaY * speedFactor, maxScroll)
      );

      isTweening.current = true;

      // GSAP smooth deceleration curves
      gsap.to(scrollObj.current, {
        y: targetScroll.current,
        duration: 1.2, // Generous decelerating glide behavior
        ease: 'power3.out', // Extremely elegant cinematic exponential deceleration profile
        overwrite: 'auto',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.current.y);
          // Directly signal ScrollTrigger to enforce precise synchronous updates
          ScrollTrigger.update();
        },
        onComplete: () => {
          isTweening.current = false;
        },
        onInterrupt: () => {
          isTweening.current = false;
        }
      });
    };

    // Synchronize direct user interactions (clicks on native scrollbar, keyboard arrows, PgUp)
    const handleScroll = () => {
      if (!isTweening.current) {
        targetScroll.current = window.scrollY;
        scrollObj.current.y = window.scrollY;
      }
    };

    const handleResize = () => {
      targetScroll.current = window.scrollY;
      scrollObj.current.y = window.scrollY;
    };

    // Use non-passive listener to allow programmatic overriding of default jump mechanics
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      docEl.style.scrollBehavior = originalScrollBehavior;
      bodyEl.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return null;
}
