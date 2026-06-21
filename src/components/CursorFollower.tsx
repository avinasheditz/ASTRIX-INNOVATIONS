import { useEffect, useState, useRef } from 'react';

export default function CursorFollower() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core coordinates for tracking and interpolation
  const mouseCoords = useRef({ x: 0, y: 0 });
  const interpCoords = useRef({ x: 0, y: 0 }); // Smooth lag for the halo
  const coreCoords = useRef({ x: 0, y: 0 });   // Faster trail for the inner core

  // DOM elements references
  const haloRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the device actually has a precision pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        setIsVisible(true);
        // Instant position alignment on first movement to avoid jump-in
        interpCoords.current = { x: e.clientX, y: e.clientY };
        coreCoords.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Hover detection over interactive nodes (buttons, anchors, inputs, select etc.)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.group\\/radar') !== null ||
        target.classList.contains('cursor-pointer');

      setIsHoveringClickable(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth animation loop using interpolation (lerper)
    let animationFrameId: number;
    const animate = () => {
      // 1. Interpolate large halo background (slower lag for premium organic feel)
      const haloSpeed = 0.08;
      interpCoords.current.x += (mouseCoords.current.x - interpCoords.current.x) * haloSpeed;
      interpCoords.current.y += (mouseCoords.current.y - interpCoords.current.y) * haloSpeed;

      // 2. Interpolate inner core micro dot (snappier, faster trail)
      const coreSpeed = 0.22;
      coreCoords.current.x += (mouseCoords.current.x - coreCoords.current.x) * coreSpeed;
      coreCoords.current.y += (mouseCoords.current.y - coreCoords.current.y) * coreSpeed;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${interpCoords.current.x}px, ${interpCoords.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreCoords.current.x}px, ${coreCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPointerDevice, isVisible]);

  if (!isPointerDevice) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-500 select-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. ATMOSPHERIC SPOTLIGHT LAYER (Subtle, highly diffused, colorful backdrop) */}
      <div 
        ref={haloRef}
        style={{
          transition: 'width 0.35s ease, height 0.35s ease, opacity 0.35s ease',
        }}
        className={`fixed top-0 left-0 rounded-full filter blur-3xl mix-blend-multiply opacity-45 pointer-events-none bg-gradient-to-tr from-[#8B5CF6]/12 via-[#4F46E5]/8 to-[#06B6D4]/12 ${
          isHoveringClickable 
            ? 'w-[280px] h-[280px] opacity-60' 
            : 'w-[180px] h-[180px]'
        }`}
      />

      {/* 2. INNER GLASS GLOW RING (Lags naturally, emphasizes interaction) */}
      <div 
        ref={coreRef}
        style={{
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
        className={`fixed top-0 left-0 rounded-full border border-[#4F46E5]/20 bg-[#4F46E5]/3 pointer-events-none ${
          isHoveringClickable 
            ? 'w-[48px] h-[48px] border-[#4F46E5]/45 bg-[#4F46E5]/5 scale-110 shadow-[0_0_15px_rgba(79,70,229,0.15)] shadow-indigo-500/20' 
            : 'w-[20px] h-[20px]'
        }`}
      />

      {/* 3. CENTRAL SHARP CORE POINTER (Perfect tracking pinpoint) */}
      <div 
        style={{
          // Maps directly to core coordinates to present instant responsiveness
          transform: `translate3d(${coreCoords.current.x}px, ${coreCoords.current.y}px, 0) translate(-50%, -50%)`,
          transition: 'transform 0.05s linear, width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 ${
          isHoveringClickable 
            ? 'w-[5px] h-[5px] bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]' 
            : 'w-[3.5px] h-[3.5px] bg-[#4F46E5] shadow-[0_0_6px_#4F46E5]'
        }`}
      />

    </div>
  );
}
