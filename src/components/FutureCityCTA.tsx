import { Sparkles, CalendarDays, Rocket, ShieldCheck, Layers, HeartPulse, Code, Cog, Cpu } from 'lucide-react';

interface FutureCityCTAProps {
  onNavigate: (sectionId: string) => void;
}

export default function FutureCityCTA({ onNavigate }: FutureCityCTAProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-gray-100 text-left">
      {/* Dynamic Keyframe Animations & Style Declarations */}
      <style>{`
        @keyframes circuitPulse {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes subtleFloating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes orbitalRotateCounter {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes orbitalRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes radarPing {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @keyframes dynamicGlow {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.65;
          }
        }
        .animate-circuit-pulse-indigo {
          stroke-dasharray: 8 20;
          animation: circuitPulse 2s linear infinite;
        }
        .animate-circuit-pulse-cyan {
          stroke-dasharray: 8 20;
          animation: circuitPulse 2.5s linear infinite;
        }
        .animate-circuit-pulse-purple {
          stroke-dasharray: 8 20;
          animation: circuitPulse 1.8s linear infinite;
        }
        .animate-spin-slow-ccw {
          transform-origin: center;
          animation: orbitalRotateCounter 45s linear infinite;
        }
        .animate-spin-slow-cw {
          transform-origin: center;
          animation: orbitalRotate 60s linear infinite;
        }
        .animate-float-subtle {
          animation: subtleFloating 6s ease-in-out infinite;
        }
        .animate-ping-radar {
          animation: radarPing 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-glow-pulse {
          animation: dynamicGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background mesh of glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[550px] h-[550px] bg-indigo-50/40 rounded-full filter blur-[130px] animate-glow-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[550px] h-[550px] bg-cyan-50/40 rounded-full filter blur-[130px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left column: Let's Build Slogan content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-sans tracking-wide font-bold text-[#4F46E5] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] animate-pulse" />
            <span>ASTRIX ENTERPRISE INGRESS PROTOCOL</span>
          </div>

          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-none animate-float-subtle">
            Let's Build The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-blue-500 to-[#06B6D4]">Future Together</span>
          </h2>

          <p className="font-sans font-light text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg">
            Connect your operations with the Astrix Innovations team. We engineer secure technology custom-tailored to solve your specific corporate constraints safely.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 pt-4 max-w-md w-full">
            <button
              onClick={() => onNavigate('contact')}
              className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-xs font-semibold tracking-wide shadow-md shadow-indigo-500/10 cursor-pointer transition-all duration-200"
            >
              <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>START A SECTOR PROJECT</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <CalendarDays className="w-4 h-4 text-[#4F46E5]" />
              <span>SCHEDULE CONSULTATION</span>
            </button>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-4 text-left font-sans text-[10px] text-gray-400 font-bold tracking-wider">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              <span>SECURE END-TO-END TLS PROTOCOL</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>CUSTOM INTEGRATED SERVICES</span>
            </div>
          </div>
        </div>

        {/* Right column: 100% Pure Aesthetic Astrix Domain Network Map Panel */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[520px] bg-white border border-gray-150/60 rounded-3xl p-4 sm:p-8 shadow-[0_12px_50px_-15px_rgba(79,70,229,0.05)] overflow-hidden">
          
          {/* Subtle light background grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.22] z-0" style={{
            backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(to right, #F1F5F9 1px, transparent 1px), linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)',
            backgroundSize: '24px 24px, 24px 24px, 24px 24px'
          }} />

          {/* Clean gradient light overlay matching the original image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF2FF]/40 via-white/80 to-[#ECFDF5]/15 pointer-events-none z-0" />

          {/* TOP-LEFT CAPSULE OVERLAY (Astrix Domain Network Indicator) */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-30 p-1.5 sm:p-2 bg-white/95 backdrop-blur-md border border-gray-150/75 shadow-[0_6px_20px_rgba(79,70,229,0.04)] rounded-2xl flex items-center gap-2 max-w-[210px] sm:max-w-[245px] hover:scale-[1.01] transition-transform duration-200">
            {/* Circular web icon container inside a micro capsule */}
            <div className="w-8 h-8 rounded-xl bg-[#F0F5FF]/90 border border-indigo-100 flex items-center justify-center text-[#4F46E5] shadow-inner shrink-0 relative overflow-hidden">
              <div className="absolute -inset-0.5 rounded-full border border-dotted border-indigo-300 animate-spin" style={{ animationDuration: '60s' }} />
              <svg className="w-4 h-4 text-[#4F46E5] fill-none relative z-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L88 85 L72 85 L50 45 L28 85 L12 85 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="text-left pr-2">
              <div className="flex items-center gap-1.5 font-sans">
                <span className="font-extrabold text-[8px] sm:text-[9.5px] text-gray-800 tracking-tight leading-none uppercase">ASTRIX DOMAIN</span>
                <span className="font-bold text-[7.5px] sm:text-[8.5px] text-[#4F46E5] shrink-0 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100/40 font-mono">4 ACTIVE</span>
              </div>
              <span className="font-sans text-[7px] sm:text-[8px] text-gray-400 font-medium block leading-none mt-1">Real-time Innovation Ecosystem</span>
            </div>
            {/* Ambient purple status glow dot on right */}
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full shrink-0 mr-1 animate-pulse" />
          </div>

          {/* BOTTOM-RIGHT INTEGRATION CAPSULE OVERLAY */}
          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-35 p-1.5 sm:p-2.5 bg-white/95 backdrop-blur-md border border-gray-150/75 shadow-[0_6px_20px_rgba(79,70,229,0.04)] rounded-2xl flex items-center gap-2 max-w-[195px] sm:max-w-[225px] hover:scale-[1.01] transition-transform duration-200">
            <div className="w-8 h-8 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
            </div>
            <div className="text-left relative pr-3">
              <span className="font-sans font-black text-[12px] sm:text-[14px] text-gray-950 block leading-none">99.9%</span>
              <span className="font-sans font-extrabold text-[7.5px] sm:text-[8px] text-gray-800 tracking-normal block mt-1">INTEGRATION RATING</span>
              <span className="font-sans text-[6.5px] sm:text-[7.5px] text-gray-400 font-medium block leading-none mt-0.5">Connected Multi-Domain Intelligence</span>
            </div>
            {/* Emerald connection heartbeat lamp */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" />
          </div>

          {/* Core Network Layout Canvas */}
          <div className="relative w-full max-w-[420px] sm:max-w-[450px] aspect-square flex items-center justify-center scale-[0.98] sm:scale-100 z-10 select-none">
            
            {/* SVG Background Circuits, Orbitals, Radar Grid Tracks & Dots */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="centralBlueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#2563EB" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E0D7FF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Orbital Background Tracks (Perfect concentric alignment centered at 200, 200) */}
              {/* Outer circular dotted boundary */}
              <circle cx="200" cy="200" r="195" stroke="#E2E8F0" strokeWidth="0.75" strokeOpacity="0.45" />

              {/* Slow counter-rotating concentric tracker 3 */}
              <g className="animate-spin-slow-ccw" style={{ transformOrigin: '200px 200px' }}>
                <circle cx="200" cy="200" r="162" stroke="#CBD5E1" strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="3 8" />
                <circle cx="340.5" cy="116" r="3" fill="#3B82F6" fillOpacity="0.6" />
                <circle cx="59.5" cy="284" r="3" fill="#8B5CF6" fillOpacity="0.6" />
              </g>

              {/* Slow rotating concentric tracker 2 */}
              <g className="animate-spin-slow-cw" style={{ transformOrigin: '200px 200px' }}>
                <circle cx="200" cy="200" r="126" stroke="#94A3B8" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="12 6" />
                <circle cx="89" cy="138" r="2.5" fill="#0D9488" fillOpacity="0.7" />
                <circle cx="311" cy="262" r="2.5" fill="#4F46E5" fillOpacity="0.7" />
              </g>

              {/* Inner concentric background track 1 */}
              <circle cx="200" cy="200" r="88" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.35" />
              
              {/* Core connection circuit lines (perfect coordinate terminals from center 200,200) */}
              
              {/* Path 1: Top (HEALTHCARE at center 200, 52) */}
              <line x1="200" y1="200" x2="200" y2="98" stroke="#F1F5F9" strokeWidth="2.5" />
              <line x1="200" y1="200" x2="200" y2="98" stroke="#E2E8F0" strokeWidth="1.25" />
              <line x1="200" y1="200" x2="200" y2="98" stroke="#8B5CF6" strokeWidth="1.5" strokeDashoffset="0" className="animate-circuit-pulse-purple" />
              <circle cx="200" cy="98" r="2" fill="#8B5CF6" />

              {/* Path 2: Bottom (AI & INNOVATION at center 200, 348) */}
              <line x1="200" y1="200" x2="200" y2="302" stroke="#F1F5F9" strokeWidth="2.5" />
              <line x1="200" y1="200" x2="200" y2="302" stroke="#E2E8F0" strokeWidth="1.25" />
              <line x1="200" y1="200" x2="200" y2="302" stroke="#06B6D4" strokeWidth="1.5" strokeDashoffset="0" className="animate-circuit-pulse-cyan" />
              <circle cx="200" cy="302" r="2" fill="#06B6D4" />

              {/* Path 3: Left (TECHNOLOGY at center 52, 200) */}
              <line x1="200" y1="200" x2="98" y2="200" stroke="#F1F5F9" strokeWidth="2.5" />
              <line x1="200" y1="200" x2="98" y2="200" stroke="#E2E8F0" strokeWidth="1.25" />
              <line x1="200" y1="200" x2="98" y2="200" stroke="#3B82F6" strokeWidth="1.5" strokeDashoffset="0" className="animate-circuit-pulse-indigo" />
              <circle cx="98" cy="200" r="2" fill="#3B82F6" />

              {/* Path 4: Right (ENGINEERING at center 348, 200) */}
              <line x1="200" y1="200" x2="302" y2="200" stroke="#F1F5F9" strokeWidth="2.5" />
              <line x1="200" y1="200" x2="302" y2="200" stroke="#E2E8F0" strokeWidth="1.25" />
              <line x1="200" y1="200" x2="302" y2="200" stroke="#4F46E5" strokeWidth="1.5" strokeDashoffset="0" className="animate-circuit-pulse-indigo" />
              <circle cx="302" cy="200" r="2" fill="#4F46E5" />

              {/* Micro-dot sensors on the connection lines */}
              <circle cx="200" cy="116" r="3" fill="#8B5CF6" className="animate-pulse" />
              <circle cx="200" cy="284" r="3" fill="#06B6D4" className="animate-pulse" />
              <circle cx="116" cy="200" r="3" fill="#3B82F6" className="animate-pulse" />
              <circle cx="284" cy="200" r="3" fill="#4F46E5" className="animate-pulse" />

              {/* Corner Coordinate Tick marks */}
              <line x1="25" y1="25" x2="35" y2="25" stroke="#CBD5E1" strokeWidth="0.75" />
              <line x1="25" y1="25" x2="25" y2="35" stroke="#CBD5E1" strokeWidth="0.75" />
              
              <line x1="375" y1="25" x2="365" y2="25" stroke="#CBD5E1" strokeWidth="0.75" />
              <line x1="375" y1="25" x2="375" y2="35" stroke="#CBD5E1" strokeWidth="0.75" />

              <line x1="25" y1="375" x2="35" y2="375" stroke="#CBD5E1" strokeWidth="0.75" />
              <line x1="25" y1="375" x2="25" y2="365" stroke="#CBD5E1" strokeWidth="0.75" />

              <line x1="375" y1="375" x2="365" y2="375" stroke="#CBD5E1" strokeWidth="0.75" />
              <line x1="375" y1="375" x2="375" y2="365" stroke="#CBD5E1" strokeWidth="0.75" />
            </svg>

            {/* CENTRAL HIGH-CONTRAST GLOSSY BRAND NODE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group">
              {/* Soft radial pulse glow behind center button */}
              <div className="absolute -inset-4 bg-blue-400/10 rounded-full blur-md animate-ping-radar" />
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#3B82F6]/20 to-[#06B6D4]/20 rounded-full blur-sm animate-pulse" />
              
              {/* Outer micro orbital with dots */}
              <div className="absolute -inset-1 border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '20s' }} />

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-white to-gray-50/90 p-0.5 border border-gray-150 shadow-[0_8px_30px_rgba(79,70,229,0.18)] hover:scale-105 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#0A0F2B] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] font-sans">
                  {/* Glass highlight overlay */}
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/18 to-transparent" />
                  
                  {/* White Brand Web Applet Icon */}
                  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] animate-[pulse_3s_infinite] fill-none relative z-10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 L88 85 L72 85 L50 45 L28 85 L12 85 Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              
              {/* Secondary outer concentric track circle badge */}
              <div className="absolute -inset-5 border border-[#3B82F6]/15 rounded-full pointer-events-none" />
            </div>

            {/* CARD 1: HEALTHCARE (Top Card Diamond) */}
            <div className="absolute top-[4%] left-1/2 -translate-x-1/2 z-20 group font-sans">
              {/* Glowing shadow effect matched to card color scheme */}
              <div className="absolute top-2 inset-x-2 bottom-0 rounded-2xl bg-purple-100/40 filter blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* 45-degree angle visual shape */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] absolute inset-0 bg-white border border-purple-100/80 rounded-[20px] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.02),_0_4px_6px_-2px_rgba(0,0,0,0.01)] group-hover:border-purple-300 group-hover:ring-4 group-hover:ring-purple-50/50 group-hover:scale-[1.03] transition-all duration-300 transform rotate-45 z-0" />
              
              {/* Flat Content Layer (not rotated) to display pristine text/icons */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] flex flex-col items-center justify-center text-center p-1.5 z-10 relative">
                <div className="p-1 sm:p-1.5 rounded-xl bg-purple-50 text-purple-600 mb-1.5 shrink-0 shadow-sm border border-purple-100/50">
                  <HeartPulse className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="font-extrabold text-[8.5px] sm:text-[9.5px] tracking-wide text-gray-800 leading-tight uppercase font-sans">HEALTHCARE</span>
                <span className="text-[7.5px] sm:text-[8px] text-gray-400 font-medium block leading-none select-none mt-0.5 font-sans">HealthTech Systems</span>
              </div>
            </div>

            {/* CARD 2: TECHNOLOGY (Left Card Diamond) */}
            <div className="absolute left-[4%] top-1/2 -translate-y-1/2 z-20 group font-sans">
              {/* Glowing shadow effect */}
              <div className="absolute top-2 inset-x-2 bottom-0 rounded-2xl bg-blue-100/40 filter blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* 45-degree angle visual shape */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] absolute inset-0 bg-white border border-blue-100/80 rounded-[20px] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.02),_0_4px_6px_-2px_rgba(0,0,0,0.01)] group-hover:border-blue-300 group-hover:ring-4 group-hover:ring-blue-50/50 group-hover:scale-[1.03] transition-all duration-300 transform rotate-45 z-0" />
              
              {/* Flat Content Layer (not rotated) */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] flex flex-col items-center justify-center text-center p-1.5 z-10 relative">
                <div className="p-1 sm:p-1.5 rounded-xl bg-blue-50 text-blue-600 mb-1.5 shrink-0 shadow-sm border border-blue-100/50">
                  <Code className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="font-extrabold text-[8.5px] sm:text-[9.5px] tracking-wide text-gray-800 leading-tight uppercase font-sans">TECHNOLOGY</span>
                <span className="text-[7.5px] sm:text-[8px] text-gray-400 font-medium block leading-none select-none mt-0.5 font-sans">Digital Systems</span>
              </div>
            </div>

            {/* CARD 3: ENGINEERING (Right Card Diamond) */}
            <div className="absolute right-[4%] top-1/2 -translate-y-1/2 z-20 group font-sans">
              {/* Glowing shadow effect */}
              <div className="absolute top-2 inset-x-2 bottom-0 rounded-2xl bg-indigo-100/40 filter blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* 45-degree angle visual shape */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] absolute inset-0 bg-white border border-indigo-100/80 rounded-[20px] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.02),_0_4px_6px_-2px_rgba(0,0,0,0.01)] group-hover:border-indigo-300 group-hover:ring-4 group-hover:ring-indigo-50/50 group-hover:scale-[1.03] transition-all duration-300 transform rotate-45 z-0" />
              
              {/* Flat Content Layer (not rotated) */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] flex flex-col items-center justify-center text-center p-1.5 z-10 relative">
                <div className="p-1 sm:p-1.5 rounded-xl bg-indigo-50 text-indigo-650 mb-1.5 shrink-0 shadow-sm border border-indigo-100/50">
                  <Cog className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="font-extrabold text-[8.5px] sm:text-[9.5px] tracking-wide text-gray-800 leading-tight uppercase font-sans">ENGINEERING</span>
                <span className="text-[7.5px] sm:text-[8px] text-gray-400 font-medium block leading-none select-none mt-0.5 font-sans">Smart Engineering</span>
              </div>
            </div>

            {/* CARD 4: AI & INNOVATION (Bottom Card Diamond) */}
            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20 group font-sans">
              {/* Glowing shadow effect */}
              <div className="absolute top-2 inset-x-2 bottom-0 rounded-2xl bg-cyan-100/40 filter blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* 45-degree angle visual shape */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] absolute inset-0 bg-white border border-cyan-100/80 rounded-[20px] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.02),_0_4px_6px_-2px_rgba(0,0,0,0.01)] group-hover:border-cyan-300 group-hover:ring-4 group-hover:ring-cyan-50/50 group-hover:scale-[1.03] transition-all duration-300 transform rotate-45 z-0" />
              
              {/* Flat Content Layer (not rotated) */}
              <div className="w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] flex flex-col items-center justify-center text-center p-1.5 z-10 relative">
                <div className="p-1 sm:p-1.5 rounded-xl bg-cyan-50 text-cyan-600 mb-1.5 shrink-0 shadow-sm border border-cyan-100/50">
                  <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="font-extrabold text-[8.5px] sm:text-[9.5px] tracking-wide text-gray-800 leading-tight uppercase font-sans">AI & INNOVATION</span>
                <span className="text-[7.5px] sm:text-[8px] text-gray-400 font-medium block leading-none select-none mt-0.5 font-sans">Intelligent Systems</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
