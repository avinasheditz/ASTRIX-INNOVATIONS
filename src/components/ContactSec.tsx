import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Send, MapPin, Mail, MessageSquare, Linkedin, Twitter, Github, CheckCircle, Smartphone, Compass, Activity, ShieldAlert, Target } from 'lucide-react';

const themeStyles = {
  indigo: {
    bg: 'bg-indigo-950/95',
    border: 'border-indigo-500/20',
    accent: '#4F46E5',
    glowColor: 'rgba(79, 70, 229, 0.85)',
    textColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300',
    lightGlow: 'bg-[#4F46E5]/10',
    scopeBorder: 'border-indigo-500/30',
    scopeBg: 'bg-[#030712]',
    ringBorder: 'border-indigo-500/10',
    sweepGradient: 'conic-gradient(from 0deg, transparent 50%, rgba(79, 70, 229, 0.08) 80%, rgba(79, 70, 229, 0.4) 100%)',
    beamColor: 'bg-indigo-500',
    targetBeacon: 'border-indigo-400/40',
    targetCore: 'bg-indigo-400',
  },
  emerald: {
    bg: 'bg-slate-950',
    border: 'border-emerald-500/20',
    accent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.85)',
    textColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
    lightGlow: 'bg-[#10B981]/15',
    scopeBorder: 'border-emerald-500/35',
    scopeBg: 'bg-[#022C22]/10',
    ringBorder: 'border-emerald-500/15',
    sweepGradient: 'conic-gradient(from 0deg, transparent 50%, rgba(16, 185, 129, 0.08) 80%, rgba(16, 185, 129, 0.45) 100%)',
    beamColor: 'bg-emerald-400',
    targetBeacon: 'border-emerald-400/40',
    targetCore: 'bg-emerald-400',
  },
  rose: {
    bg: 'bg-zinc-950',
    border: 'border-rose-500/20',
    accent: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.85)',
    textColor: 'text-rose-400',
    badgeBg: 'bg-rose-950/80 border-rose-500/40 text-rose-300',
    lightGlow: 'bg-[#F43F5E]/10',
    scopeBorder: 'border-rose-500/30',
    scopeBg: 'bg-[#090506]',
    ringBorder: 'border-rose-500/10',
    sweepGradient: 'conic-gradient(from 0deg, transparent 50%, rgba(244, 63, 94, 0.08) 80%, rgba(244, 63, 94, 0.45) 100%)',
    beamColor: 'bg-rose-500',
    targetBeacon: 'border-rose-400/40',
    targetCore: 'bg-rose-400',
  },
};

export default function ContactSec() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Stateful interactive real radar parameters
  const [radarTheme, setRadarTheme] = useState<'indigo' | 'emerald' | 'rose'>('indigo');
  const [sweepSpeed, setSweepSpeed] = useState<2 | 4 | 8>(4);
  const [azimuth, setAzimuth] = useState(245.8);
  const [jitterLat, setJitterLat] = useState('37.77492');
  const [jitterLng, setJitterLng] = useState('-122.41941');

  useEffect(() => {
    let lastTime = performance.now();
    let frameId: number;
    const update = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      setAzimuth((prev) => {
        const increment = (360 / (sweepSpeed * 1000)) * delta;
        return parseFloat(((prev + increment) % 360).toFixed(1));
      });
      frameId = requestAnimationFrame(update);
    };
    
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [sweepSpeed]);

  useEffect(() => {
    const jitterInterval = setInterval(() => {
      const latOffset = (Math.random() - 0.5) * 0.00015;
      const lngOffset = (Math.random() - 0.5) * 0.00015;
      setJitterLat((37.77492 + latOffset).toFixed(5));
      setJitterLng((-122.41941 + lngOffset).toFixed(5));
    }, 450);
    return () => clearInterval(jitterInterval);
  }, []);

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        const errData = await response.json();
        console.error('Contact submit error:', errData);
      }
    } catch (err) {
      console.error('Failed to submit contact query:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({ name: '', company: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FAFBFD]">
      {/* Background cyber grid and gradient halos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-50/30 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-50/20 rounded-full filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <MessageSquare className="w-4 h-4 animate-pulse-slow" />
            <span>TRANSMIT PROTOCOLS &middot; CONSOLE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Connect With Our Laboratories
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-2 font-light max-w-xl">
            Whether launching collaborative research, auditing healthcare telemetry sensors, or onboarding platforms – sync with our engineers.
          </p>
        </div>

        {/* Layout Grid: Info Coordinates on Left, Form Glass panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Info coordinates + Interactive radar map mockup */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Coordinates list */}
            <div className="space-y-6">
              <h3 className="font-sans text-xs text-[#4F46E5] tracking-widest uppercase font-extrabold">
                COMMUNICATION LOGS
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[8.5px] text-gray-450 block uppercase font-extrabold">PRIMARY SECURE EMAIL</span>
                    <a href="mailto:partners@astrixinnovations.com" className="text-gray-900 hover:text-[#4F46E5] font-sans text-sm font-semibold transition-colors">
                      partners@astrixinnovations.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[8.5px] text-gray-450 block uppercase font-extrabold">TELECOMS CHANNEL</span>
                    <a href="tel:+14155554820" className="text-gray-900 hover:text-[#4F46E5] font-sans text-sm font-semibold transition-colors">
                      +1 (415) 555-4820
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[8.5px] text-gray-450 block uppercase font-extrabold">PHYSICAL BLUEPRINT HQ</span>
                    <p className="text-gray-600 font-sans text-sm font-light mt-0.5 leading-relaxed">
                      Suite 1200, 100 Pine Street,<br />San Francisco, CA 94111, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>            {/* Real Interactive Tactical Radar System Console */}
            <div 
              style={{ '--theme-glow': themeStyles[radarTheme].glowColor } as React.CSSProperties}
              className={`${themeStyles[radarTheme].bg} border ${themeStyles[radarTheme].border} p-4 sm:p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[410px] shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group/radar`}
            >
              <style>{`
                @keyframes radar-sweep-${sweepSpeed} {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes radar-phosphor-glow {
                  0% { opacity: 0.12; transform: scale(0.9); }
                  2% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 10px var(--theme-glow)); }
                  12% { opacity: 0.75; transform: scale(1.00); filter: drop-shadow(0 0 5px var(--theme-glow)); }
                  50% { opacity: 0.18; }
                  100% { opacity: 0.12; }
                }
                .animate-radar-sweep {
                  animation: radar-sweep-${sweepSpeed} ${sweepSpeed}s linear infinite;
                }
                .animate-radar-glow-target {
                  animation: radar-phosphor-glow ${sweepSpeed}s linear infinite;
                }
              `}</style>

              {/* Cyber Grid Network Cover Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0" style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '12px 12px'
              }} />

              {/* Soft background glow */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${themeStyles[radarTheme].lightGlow} rounded-full filter blur-2xl pointer-events-none z-0`} />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between z-10 border-b border-slate-800/60 pb-2 relative">
                <div className="flex items-center gap-1.5 font-mono text-[7.5px] tracking-wider text-slate-400 font-extrabold select-none">
                  <Activity className={`w-3.5 h-3.5 ${themeStyles[radarTheme].textColor} animate-pulse`} />
                  <span>INSTRUMENT LOGISTICAL PANEL // V4.8.1</span>
                </div>
                <div className={`font-mono text-[7.5px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border border-slate-800 bg-slate-900/50 flex items-center gap-1.5 ${themeStyles[radarTheme].textColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>GPS LINK: CALIBRATED</span>
                </div>
              </div>

              {/* Main Scope Stage */}
              <div className="relative flex-1 flex items-center justify-center my-3">
                {/* Dial compass frame ring */}
                <div className="absolute w-[184px] h-[184px] rounded-full border border-slate-800 bg-black/40 flex items-center justify-center shadow-inner">
                  {/* Compass markers */}
                  <span className="absolute top-1 font-mono text-[8.5px] font-bold text-slate-500 select-none">N</span>
                  <span className="absolute right-1.5 font-mono text-[8.5px] font-bold text-slate-500 select-none">E</span>
                  <span className="absolute bottom-1 font-mono text-[8.5px] font-bold text-slate-500 select-none">S</span>
                  <span className="absolute left-1.5 font-mono text-[8.5px] font-bold text-slate-500 select-none">W</span>

                  {/* High Accuracy Degrees Ticks */}
                  <div className="absolute inset-4 rounded-full border border-slate-800/40 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-slate-800/20 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-slate-800/10 pointer-events-none" />
                  
                  {/* Scope screen area */}
                  <div className={`relative w-[156px] h-[156px] rounded-full ${themeStyles[radarTheme].scopeBorder} ${themeStyles[radarTheme].scopeBg} border flex items-center justify-center overflow-hidden`}>
                    
                    {/* Concentric Scope Division Rings */}
                    <div className={`absolute w-[80%] h-[80%] rounded-full border border-dashed ${themeStyles[radarTheme].ringBorder}`} />
                    <div className={`absolute w-[60%] h-[60%] rounded-full border ${themeStyles[radarTheme].ringBorder}`} />
                    <div className={`absolute w-[40%] h-[40%] rounded-full border border-dashed ${themeStyles[radarTheme].ringBorder}`} />
                    <div className={`absolute w-[20%] h-[20%] rounded-full border ${themeStyles[radarTheme].ringBorder}`} />

                    {/* Scope Crosshairs */}
                    <div className="absolute inset-y-0 left-1/2 w-[0.75px] bg-slate-800/55 pointer-events-none" />
                    <div className="absolute inset-x-0 top-1/2 h-[0.75px] bg-slate-800/55 pointer-events-none" />

                    {/* Sweep rotating sector line */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none animate-radar-sweep origin-center z-15"
                      style={{ 
                        background: themeStyles[radarTheme].sweepGradient,
                      }} 
                    />

                    {/* Sweep front laser line */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none animate-radar-sweep origin-center z-20"
                    >
                      <div className={`absolute right-1/2 bottom-1/2 top-0 w-[0.75px] ${themeStyles[radarTheme].beamColor} opacity-90 origin-bottom`} />
                    </div>

                    {/* TARGETS (SWEPT SYNCHRONIZED PHOSPHOR BLIPS) */}

                    {/* TARGET 1: ASTRIX CO-LOCATION HQ */}
                    <div 
                      className="absolute z-25 group/target cursor-pointer"
                      style={{ 
                        left: '27.4%', 
                        top: '27.4%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div 
                        className="relative flex items-center justify-center animate-radar-glow-target"
                        style={{ animationDelay: `${-(315 / 360) * sweepSpeed}s` }}
                      >
                        {/* Ping signals */}
                        <span className={`absolute w-6 h-6 rounded-full border ${themeStyles[radarTheme].textColor} opacity-20 animate-ping`} />
                        <span className={`absolute w-3.5 h-3.5 rounded-full ${themeStyles[radarTheme].lightGlow} border ${themeStyles[radarTheme].targetBeacon}`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${themeStyles[radarTheme].targetCore}`} />

                        {/* Floating mini target label */}
                        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${themeStyles[radarTheme].badgeBg} backdrop-blur-md rounded border px-1 py-0.5 whitespace-nowrap z-30 font-mono text-[5.5px] font-bold leading-none select-none tracking-normal flex items-center gap-0.5 shadow-md`}>
                          <span className={`w-0.5 h-0.5 ${themeStyles[radarTheme].targetCore} rounded-full`} />
                          <span>P_01:ASTRIX_HQ</span>
                        </div>
                      </div>
                    </div>

                    {/* TARGET 2: SECURE SYSTEM RELAY */}
                    <div 
                      className="absolute z-25"
                      style={{ 
                        left: '72.5%', 
                        top: '58.2%',
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      <div 
                        className="relative flex items-center justify-center animate-radar-glow-target"
                        style={{ animationDelay: `${-(110 / 360) * sweepSpeed}s` }}
                      >
                        <span className="absolute w-3 h-3 rounded-full bg-cyan-400/10 border border-cyan-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-cyan-500/40 text-cyan-300 backdrop-blur-md rounded px-1 py-0.5 whitespace-nowrap z-30 font-mono text-[5.5px] font-bold leading-none select-none">
                          R_02:SEC_RELAY
                        </div>
                      </div>
                    </div>

                    {/* TARGET 3: INGRESS GATEWAY */}
                    <div 
                      className="absolute z-25"
                      style={{ 
                        left: '35.2%', 
                        top: '81.7%',
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      <div 
                        className="relative flex items-center justify-center animate-radar-glow-target"
                        style={{ animationDelay: `${-(205 / 360) * sweepSpeed}s` }}
                      >
                        <span className="absolute w-3 h-3 rounded-full bg-emerald-500/10 border border-emerald-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-emerald-400/40 text-emerald-300 backdrop-blur-md rounded px-1 py-0.5 whitespace-nowrap z-30 font-mono text-[5.5px] font-bold leading-none select-none">
                          D_03:INGRESS_03
                        </div>
                      </div>
                    </div>

                    {/* TARGET 4: SATELLITE COMMUNICATIONS ORBITER */}
                    <div 
                      className="absolute z-25"
                      style={{ 
                        left: '81.1%', 
                        top: '28.2%',
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      <div 
                        className="relative flex items-center justify-center animate-radar-glow-target"
                        style={{ animationDelay: `${-(55 / 360) * sweepSpeed}s` }}
                      >
                        <span className="absolute w-3 h-3 rounded-full bg-amber-500/10 border border-amber-400/30" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-amber-500/30 text-amber-300 backdrop-blur-md rounded px-1 py-0.5 whitespace-nowrap z-30 font-mono text-[5.5px] font-bold leading-none select-none">
                          S_04:SAT_LINK
                        </div>
                      </div>
                    </div>

                    {/* Core central command node */}
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-750 shadow-md z-30 flex items-center justify-center relative">
                      <div className={`w-1.5 h-1.5 rounded-full ${themeStyles[radarTheme].targetCore} animate-pulse`} />
                    </div>

                  </div>
                </div>
              </div>

              {/* Live telemetry console metrics & toggle bar */}
              <div className="z-10 relative space-y-3 pt-2 border-t border-slate-800/60 font-mono">
                {/* Dynamic Telemetry row */}
                <div className="grid grid-cols-3 gap-2 text-left justify-between select-none">
                  <div>
                    <span className="text-[6.5px] text-slate-500 block leading-none">AZIMUTH CONTEXT</span>
                    <span className={`text-[9.5px] font-extrabold block leading-normal mt-0.5 ${themeStyles[radarTheme].textColor}`}>
                      {azimuth.toFixed(1)}°
                    </span>
                  </div>
                  <div>
                    <span className="text-[6.5px] text-slate-500 block leading-none">TARGET LAT</span>
                    <span className="text-[9.5px] font-extrabold text-slate-300 block leading-normal mt-0.5">
                      {jitterLat}° N
                    </span>
                  </div>
                  <div>
                    <span className="text-[6.5px] text-slate-500 block leading-none">TARGET LNG</span>
                    <span className="text-[9.5px] font-extrabold text-slate-300 block leading-normal mt-0.5">
                      {Math.abs(parseFloat(jitterLng)).toFixed(5)}° W
                    </span>
                  </div>
                </div>

                {/* Instrument Panel Controllers */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-between text-[7px] font-bold">
                  {/* sweep speed frequency selectors */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 uppercase tracking-tight">SCAN FREQ:</span>
                    <div className="flex bg-slate-900/80 p-0.5 rounded border border-slate-800/80">
                      {([2, 4, 8] as const).map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setSweepSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded transition-all leading-none uppercase ${
                            sweepSpeed === spd
                              ? `${themeStyles[radarTheme].targetCore} text-slate-900 font-black`
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          {spd === 2 ? '2S' : spd === 4 ? '4S' : '8S'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* tactile palette selectors */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 uppercase tracking-tight font-extrabold">DECODER BAND:</span>
                    <div className="flex bg-slate-900/80 p-0.5 rounded border border-slate-800/80 gap-0.5">
                      {(['indigo', 'emerald', 'rose'] as const).map((thm) => (
                        <button
                          key={thm}
                          type="button"
                          onClick={() => setRadarTheme(thm)}
                          className={`w-3.5 h-3.5 rounded-sm transition-all focus:outline-none border ${
                            radarTheme === thm ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor: thm === 'indigo' ? '#4F46E5' : thm === 'emerald' ? '#10B981' : '#F43F5E'
                          }}
                          title={`Switch to ${thm} telemetry UI`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="space-y-3 text-left">
              <span className="font-sans text-[8.5px] text-gray-400 tracking-wider block uppercase font-extrabold">SOCIAL ENGAGEMENTS</span>
              <div className="flex gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-indigo-50 hover:text-[#4F46E5] rounded-xl border border-gray-150 text-gray-400 transition-all shadow-sm">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-indigo-50 hover:text-[#4F46E5] rounded-xl border border-gray-150 text-gray-400 transition-all shadow-sm">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-indigo-50 hover:text-[#4F46E5] rounded-xl border border-gray-150 text-gray-400 transition-all shadow-sm">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] relative overflow-hidden flex flex-col justify-center text-left">
            
            {success ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle className="w-8 h-8 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-sans font-extrabold text-xl text-gray-900">Transmission Secured</h4>
                  <p className="text-gray-500 text-xs sm:text-sm font-light max-w-sm mx-auto">
                    We received your secure message payload. An engineering partner will review and synchronize coordinates within one business cycle.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-xs font-bold tracking-wider transition-all cursor-pointer"
                  >
                    RESET COM CONSOLE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left relative">
                
                {/* Loader screen */}
                {loading && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 space-y-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-100 border-t-[#4F46E5] animate-spin" />
                    <span className="font-sans text-[10px] text-[#4F46E5] tracking-widest block font-bold">ESTABLISHING ENCRYPTED SOCKET INGRESS...</span>
                  </div>
                )}

                <h3 className="font-sans text-xs text-[#4F46E5] tracking-widest uppercase font-extrabold mb-2">
                  TRANSMIT PAYLOAD PAYLOAD
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10.5px] font-sans text-gray-500 mb-1.5 uppercase tracking-wide font-extrabold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Elena Rostova"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-450 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-sans text-gray-500 mb-1.5 uppercase tracking-wide font-extrabold font-bold">Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. BioDyne Industries"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-450 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10.5px] font-sans text-gray-500 mb-1.5 uppercase tracking-wide font-extrabold font-bold">Primary Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="elena@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-450 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-sans text-gray-500 mb-1.5 uppercase tracking-wide font-extrabold font-bold font-bold">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-450 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-sans text-gray-500 mb-1.5 uppercase tracking-wide font-extrabold font-bold">Message Payload *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project goals, technical queries, or requested parameters..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-xs font-semibold tracking-wide rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer active:scale-98 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT CONSOLE PAYLOAD</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
