import { useState, useEffect, useRef } from 'react';
import { Microscope, Play, Power, ChevronRight, Activity } from 'lucide-react';
import { RESEARCH_PROJECTS } from '../data';
import { ResearchProject } from '../types';

export default function ResearchDevelopment() {
  const [selectedProj, setSelectedProj] = useState<ResearchProject>(RESEARCH_PROJECTS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [waveSeed, setWaveSeed] = useState<number[]>(Array.from({ length: 40 }, () => Math.random() * 50 + 20));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Periodic wave update effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setWaveSeed((prev) => {
          const next = [...prev];
          next.shift();
          // Generate realistic scientific wave oscillations
          const t = Date.now() / 150;
          const val = Math.sin(t) * 20 + Math.cos(t * 1.5) * 10 + 45;
          next.push(val + Math.random() * 8);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Cleanup simulation interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Log simulation updates
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimLog([`[SYS] INITIALIZING CONSOLE SECURE LINK FOR: ${selectedProj.title.toUpperCase()}`]);
    
    let step = 0;
    const stages = [
      `[SYS] VERIFYING SYSTEM STAGE PARAMETERS: [${selectedProj.stage.toUpperCase()}]`,
      `[MATH] COMPUTING COMPLEX DIFFERENTIAL TENSORS FOR PHYSICAL MODEL...`,
      `[INFERENCE] SYNCHRONIZING REALTIME TELEMETRY STREAM...`,
      `[SYS] COMPLIANCE METRIC VERIFICATION COMPLETE: OK.`,
      `[DATA] MONITORING SYSTEM FLUX FEEDBACK CHANNELS...`
    ];

    timerRef.current = setInterval(() => {
      if (step < stages.length) {
        const stageLog = stages[step];
        setSimLog((prev) => [...prev, stageLog]);
        step += 1;
      } else {
        // Continuous steady logs
        const sensorNo = Math.floor(Math.random() * 4) + 1;
        const offset = (Math.random() * 2 - 1).toFixed(3);
        setSimLog((prev) => [
          ...prev,
          `[FLOW] SECURE_NODE_0${sensorNo} RE-BALANCED VALUE BY delta: ${offset}`
        ].slice(-6)); // keep last 6 logs
      }
    }, 1200);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSimLog((prev) => [...prev, '[SYS] CORE CONSOLE DISCONNECTED. TERMINAL STANDBY.']);
  };

  const handleProjectSelect = (proj: ResearchProject) => {
    setSelectedProj(proj);
    stopSimulation();
    setSimLog([]);
  };

  return (
    <section id="rd" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FAFBFD]">
      {/* Dynamic light glows */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-indigo-50/40 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title segment */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <Microscope className="w-4 h-4 animate-pulse-slow" />
            <span>ASTRIX LABS &middot; DEEP R&D</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Research & Prototype Development
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-2 font-light max-w-xl">
            Where futuristic blueprints transform into working simulations, physical prototypes, and cloud-scale telemetry systems.
          </p>
        </div>

        {/* Layout Grid: Projects list on left, Simulation Sandbox Console on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Projects Selectors side */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="font-sans text-xs text-indigo-600 tracking-widest uppercase font-bold mb-2">
              ACTIVE RESEARCH CHANNELS
            </h3>

            <div className="space-y-3">
              {RESEARCH_PROJECTS.map((proj) => {
                const isSelected = selectedProj.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleProjectSelect(proj)}
                    className={`w-full p-5 text-left rounded-2xl border transition-all duration-200 flex justify-between items-center cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#4F46E5]/40 shadow-sm shadow-indigo-500/5 ring-1 ring-[#4F46E5]/30'
                        : 'bg-white hover:bg-gray-50/50 border-gray-100/90'
                    }`}
                  >
                    <div className="space-y-1.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[9px] text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <span className="font-sans text-[9px] text-gray-400 font-bold uppercase">
                          Stage: {proj.stage.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-sans font-extrabold text-sm text-gray-800">
                        {proj.title}
                      </h4>
                    </div>
                    
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#4F46E5] translate-x-1' : 'text-gray-400'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] relative overflow-hidden text-left">
            
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'} border border-gray-100`} />
                <div>
                  <span className="font-sans font-extrabold text-xs tracking-wider text-gray-900 block uppercase">
                    ASTRIX LABS COMPLIANCE SIMULATOR
                  </span>
                  <span className="font-sans text-[9px] block text-gray-400 font-medium">
                    DIAGNOSTICS FEED: RE-SECURE_CONTROL_99
                  </span>
                </div>
              </div>
              <Activity className={`w-4 h-4 text-[#4F46E5] ${isSimulating ? 'animate-bounce' : ''}`} />
            </div>

            {/* Core Project Context details */}
            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <span className="font-sans text-[8px] text-[#4F46E5] tracking-widest block uppercase font-extrabold">Active Target Parameters</span>
                <p className="font-sans font-extrabold text-gray-900 text-base">
                  {selectedProj.title}
                </p>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {selectedProj.longDetail}
                </p>
              </div>

              {/* Physical specifications and parameters */}
              <div className="grid grid-cols-3 gap-3 border-t border-b border-gray-100 py-4">
                {selectedProj.metrics.map((met, idx) => (
                  <div key={idx} className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100/60 text-center">
                    <span className="font-sans text-[8px] text-gray-400 uppercase block leading-none mb-1 font-bold">
                      {met.label}
                    </span>
                    <span className="font-sans text-xs font-extrabold text-[#4F46E5] leading-none">
                      {met.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Holographic Quantum Projection Core representation */}
            <div className="mb-6 p-4 rounded-2xl border border-dashed border-[#4F46E5]/20 bg-[#4F46E5]/3 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bg-indigo-50/30">
              <div className="space-y-1 relative z-10 text-left">
                <span className="font-sans text-[8px] text-[#4F46E5] tracking-widest block uppercase font-extrabold">
                  [QUANTUM PROJECTION CORE]
                </span>
                <h4 className="font-sans font-bold text-xs text-gray-950">Dynamic Holographic Particle Emitter</h4>
                <p className="font-sans font-light text-[11px] text-gray-500 max-w-xs">
                  Simulates matrix nodes and maps real-time structural stress tensors using vector models.
                </p>
                <div className="flex gap-2 items-center text-[10px] font-sans font-semibold mt-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-emerald-500 animate-ping' : 'bg-red-400'}`} />
                  <span className={isSimulating ? 'text-emerald-600' : 'text-red-500'}>
                    {isSimulating ? 'TRANSMITTING BEAMS' : 'BEAM EMITTER STANDBY'}
                  </span>
                </div>
              </div>

              <div className="relative w-24 h-24 flex items-center justify-center shrink-0 z-10">
                <div className={`absolute inset-0 rounded-full border border-[#4F46E5]/20 transition-all duration-700 ${isSimulating ? 'scale-110 opacity-100' : 'scale-100'}`} />
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-indigo-400/30 animate-spin" style={{ animationDuration: '6s' }} />
                
                {/* Core emitter node */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] flex items-center justify-center text-white font-sans font-bold text-[9px] shadow-sm transition-all duration-500 ${isSimulating ? 'scale-110 rotate-180' : 'scale-100'}`}>
                  R&D
                </div>
              </div>
            </div>

            {/* Wave Oscillator Visualization */}
            <div className="h-28 bg-[#FBFCFD] rounded-2xl border border-gray-150 relative overflow-hidden p-3 flex flex-col justify-between mb-4 shadow-inner">
              <span className="absolute top-2 left-3 font-sans text-[8px] text-gray-400 tracking-widest z-10 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                FREQUENCY SPECTRUM WAVE MONITORS
              </span>

              {/* Wave SVG */}
              <div className="absolute inset-x-0 bottom-0 top-6">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines inside visualization */}
                  <g stroke="rgba(0,0,0,0.02)" strokeWidth="0.5">
                    <line x1="0" y1="20%" x2="100%" y2="20%" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" />
                    <line x1="0" y1="80%" x2="100%" y2="80%" />
                  </g>
                  
                  {/* Glowing Dynamic Wave Path */}
                  <path
                    d={`M ${waveSeed.map((val, idx) => `${(idx / (waveSeed.length - 1)) * 500},${val}`).join(' L ')}`}
                    fill="none"
                    stroke="url(#rd-wave-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  
                  {/* Ambient filled glow */}
                  <path
                    d={`M 0,100 L ${waveSeed.map((val, idx) => `${(idx / (waveSeed.length - 1)) * 500},${val}`).join(' L ')} L 500,100 Z`}
                    fill="url(#rd-wave-glow-fill)"
                    className="transition-all duration-300 opacity-10"
                  />

                  <defs>
                    <linearGradient id="rd-wave-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                    <linearGradient id="rd-wave-glow-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Simulated Live diagnostics console box (kept dark for Stripe-like developer presentation contrast) */}
            <div className="h-28 bg-gray-900 rounded-2xl border border-gray-100 p-4 font-mono text-[10px] text-gray-300 overflow-y-auto mb-6 flex flex-col gap-1 text-left shadow-inner">
              {simLog.length === 0 ? (
                <div className="text-gray-500 italic flex items-center justify-center h-full">
                  [CONSOLE STANDBY] Click "RUN PHYSICAL MODEL SIMULATION" below
                </div>
              ) : (
                simLog.map((log, idx) => {
                  if (typeof log !== 'string') return null;
                  return (
                    <div key={idx} className="flex gap-2">
                      <span className="text-[#38BDF8] shrink-0 font-bold">{log.substring(0, 6)}</span>
                      <span className="text-gray-300">{log.substring(6)}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Simulator Controls */}
            <div className="flex gap-3">
              {!isSimulating ? (
                <button
                  onClick={startSimulation}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-xs font-semibold tracking-wide rounded-xl shadow-sm cursor-pointer transition-all active:scale-98"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>RUN PHYSICAL MODEL SIMULATION</span>
                </button>
              ) : (
                <button
                  onClick={stopSimulation}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-650 border border-red-100 hover:bg-red-100 font-sans text-xs font-semibold tracking-wide rounded-xl cursor-pointer active:scale-98 transition-all"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>DISCONNECT SIMULATOR PANEL</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
