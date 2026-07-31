'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    setIsEnabled(true);

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let rafId = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const interactive = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'
      );
      setIsHovered(!!interactive);
    };

    const animate = () => {
      pos.x = lerp(pos.x, mouse.x, 0.18);
      pos.y = lerp(pos.y, mouse.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <div
        className={`h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111111] transition-transform duration-200 ease-out ${
          isHovered ? 'scale-[1.8]' : 'scale-100'
        }`}
      />
    </div>
  );
}