import React, { useEffect, useState } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for the "Ring" (Follower)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate on devices with fine pointers (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If not fine pointer, don't render (or handle via CSS media query, but checking here saves render)
  if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Ghost Follower - Smooth Glow */}
      <Motion.div
        className="fixed top-0 left-0 rounded-full mix-blend-screen pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          opacity: isHovered ? 0.6 : 0.3,
          backgroundColor: isHovered ? 'rgba(34, 211, 238, 0.15)' : 'rgba(34, 211, 238, 0.05)',
          boxShadow: isHovered 
            ? '0 0 30px 5px rgba(34, 211, 238, 0.2)' 
            : '0 0 20px 0px rgba(34, 211, 238, 0.1)',
        }}
        transition={{ 
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.5
        }}
      >
        {/* Subtle border ring */}
        <div className="w-full h-full rounded-full border border-cyan/20 box-border" />
      </Motion.div>
    </div>
  );
};

export default CustomCursor;
