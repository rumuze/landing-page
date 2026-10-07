import React, { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'button, a, input, .interactive';

// A soft ring that trails the mouse. Plain requestAnimationFrame easing and CSS transitions,
// so the animation library stays out of the first page load.
const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with fine pointers (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const target = { x: -100, y: -100 };
    const position = { x: -100, y: -100 };
    let frame = 0;

    const draw = () => {
      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      }
      const settled = Math.abs(target.x - position.x) < 0.1 && Math.abs(target.y - position.y) < 0.1;
      frame = settled ? 0 : window.requestAnimationFrame(draw);
    };

    const moveCursor = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handleMouseOver = (event) => {
      const element = event.target;
      setIsHovered(
        element instanceof Element &&
          (Boolean(element.closest(INTERACTIVE_SELECTOR)) || window.getComputedStyle(element).cursor === 'pointer'),
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // If not fine pointer, don't render
  if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 rounded-full mix-blend-screen pointer-events-none ${
          isHovered ? 'is-hovered' : ''
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full border border-cyan/20 box-border" />
      </div>
    </div>
  );
};

export default CustomCursor;
