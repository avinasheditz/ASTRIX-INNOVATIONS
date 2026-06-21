import { motion } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Laptop, Activity, Cog, Cpu, Sparkles 
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  // Stats row details configured based on user's mockup
  const stats = [
    { value: '50+', label: 'Projects Delivered', desc: 'Global Enterprise Solutions' },
    { value: '10+', label: 'Industries Served', desc: 'Integrated Custom Verticals' },
    { value: '30+', label: 'Expert Engineers', desc: 'Specialist Domain Advisors' },
    { value: '5+', label: 'Years of Innovation', desc: 'Purity in execution' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent">
      
      {/* Decorative ambient gradients for light theme background */}
      <div className="absolute inset-x-0 top-0 h-[90vh] pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-200/20 filter blur-[100px]" />
        <div className="absolute top-[25%] right-[5%] w-[550px] h-[550px] rounded-full bg-cyan-100/30 filter blur-[120px]" />
        <div className="absolute bottom-[5%] left-[25%] w-[350px] h-[350px] rounded-full bg-pink-100/20 filter blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Copy Title, buttons, and stats */}
          <div className="lg:col-span-6 text-left space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold tracking-wide text-indigo-600 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Astrix Innovations Core</span>
            </span>

            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-gray-900 tracking-tight leading-[1.1]">
              Engineering the Future <br className="hidden sm:inline" />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-[#4F46E5] to-purple-600">Technology</span>, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-[#4F46E5] to-indigo-600">Healthcare</span> & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-cyan-500">Innovation</span>
            </h1>

            <p className="font-sans text-gray-500 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl">
              Astrix Innovations builds intelligent solutions that connect cutting-edge technology, advanced healthcare systems, and smart engineering to solve real-world challenges.
            </p>

            {/* Direct primary actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('innovations')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Explore Innovations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-sans text-sm font-semibold tracking-wide transition-all cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Stats list shown under actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100/90 text-left">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#4F46E5] block">
                    {stat.value}
                  </span>
                  <span className="font-sans font-semibold text-xs text-gray-800 block">
                    {stat.label}
                  </span>
                  <span className="font-sans text-[10px] text-gray-400 block leading-tight">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: High-fidelity glowing 3D-like isometric representation matching mockups */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] lg:min-h-[500px]">
            
            {/* Pulsing visual halo backgrounds in center */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/5 to-cyan-500/10 blur-xl animate-pulse" />
            <div className="absolute w-96 h-96 rounded-full border border-gray-200/45 border-dashed animate-spin" style={{ animationDuration: '40s' }} />

            {/* Outer isometric structural layer */}
            <div className="relative w-full max-w-sm sm:max-w-md h-full aspect-square flex items-center justify-center">

              {/* Cyber Grid & Circular Orbits background */}
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                {/* Inner dashed circle */}
                <div className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full border border-indigo-100/40 border-dashed animate-[spin_60s_linear_infinite]" />
                {/* Outer dotted circle */}
                <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-cyan-150/40 border-dotted" />
                {/* Concentric ambient light pulses */}
                <div className="absolute w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-full bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 filter blur-xl animate-pulse" />
              </div>

              {/* Animated Circuit Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Track 1: Top-Left (Technology - Indigo) */}
                <path d="M 100,100 L 100,150 L 145,150 L 155,160" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 100,100 L 100,150 L 145,150 L 155,160" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 45" className="animate-circuit-dash" />
                
                {/* Track 2: Top-Right (Healthcare - Pink) */}
                <path d="M 300,100 L 300,150 L 255,150 L 245,160" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 300,100 L 300,150 L 255,150 L 245,160" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 45" className="animate-circuit-dash" />

                {/* Track 3: Bottom-Left (Engineering - Blue) */}
                <path d="M 100,300 L 100,250 L 145,250 L 155,240" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 100,300 L 100,250 L 145,250 L 155,240" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 45" className="animate-circuit-dash" />

                {/* Track 4: Bottom-Right (AI & Innovation - Cyan) */}
                <path d="M 300,300 L 300,250 L 255,250 L 245,240" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 300,300 L 300,250 L 255,250 L 245,240" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 45" className="animate-circuit-dash" />

                {/* Joining Nodes & Sockets */}
                <circle cx="100" cy="100" r="3.5" fill="#4F46E5" stroke="white" strokeWidth="1" className="animate-pulse" />
                <circle cx="300" cy="100" r="3.5" fill="#EC4899" stroke="white" strokeWidth="1" className="animate-pulse" />
                <circle cx="100" cy="300" r="3.5" fill="#3B82F6" stroke="white" strokeWidth="1" className="animate-pulse" />
                <circle cx="300" cy="300" r="3.5" fill="#06B6D4" stroke="white" strokeWidth="1" className="animate-pulse" />

                <circle cx="155" cy="160" r="2" fill="#4F46E5" />
                <circle cx="245" cy="160" r="2" fill="#EC4899" />
                <circle cx="155" cy="240" r="2" fill="#3B82F6" />
                <circle cx="245" cy="240" r="2" fill="#06B6D4" />
              </svg>

              {/* Central Premium Glowing Glass Casing */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-44 sm:h-44 rounded-[40px] bg-white/40 border border-white/60 shadow-[0_25px_60px_rgba(79,70,229,0.12),0_0_40px_rgba(6,182,212,0.08)] backdrop-blur-md flex items-center justify-center z-20">
                {/* Glowing gradient back-ring */}
                <div className="absolute inset-1.5 rounded-[34px] bg-gradient-to-tr from-indigo-50/80 to-cyan-50/80 p-0.5">
                  <div className="w-full h-full rounded-[32px] bg-white flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Circuit board subtle visual line pattern mockup inside */}
                    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:12px_12px]" />
                    
                    {/* Shimmering reflection flare */}
                    <div className="absolute -inset-y-12 -left-16 w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shimmer_4s_infinite]" />

                    {/* Actual Blue-Cyan high-contrast rounded block */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#06B6D4] flex flex-col items-center justify-center shadow-lg shadow-indigo-600/35 border border-white/30 relative">
                      {/* Sleek top specular gloss overlay */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
                      
                      {/* Premium white Vector 'A' Logo */}
                      <svg viewBox="0 0 120 100" className="w-14 h-11 sm:w-16 sm:h-13 drop-shadow-md relative z-10" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 15 L18 82 H36 L46.5 64 H73.5 L84 82 H102 Z M60 38 L69.5 54 H50.5 Z" />
                      </svg>

                      {/* Brand Text */}
                      <span className="font-sans text-[8px] sm:text-[10px] text-white tracking-[0.35em] font-extrabold uppercase mt-2 select-none relative z-10 drop-shadow-sm">
                        ASTRIX
                      </span>
                    </div>
                  </div>
                </div>
                {/* External fine spinning dash-ring outer circle */}
                <div className="absolute -inset-2 border border-dashed border-indigo-400/25 rounded-[46px] animate-[spin_50s_linear_infinite]" />
              </div>

              {/* FLOATING CARD 1: Technology */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0 }}
                className="absolute top-[2%] left-[2%] p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(79,70,229,0.05)] flex items-center gap-3 z-30 transition-all hover:scale-[1.02] w-[170px] sm:w-[185px]"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm">
                  <Laptop className="w-4.5 h-4.5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-bold text-xs text-gray-900 leading-none">Technology</h4>
                  <span className="text-[10px] text-gray-400 mt-1 block font-medium">Digital Systems</span>
                  {/* 3 Blinking Indicators */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-[pulse_1.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/30 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Healthcare */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-[2%] right-[2%] p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(79,70,229,0.05)] flex items-center gap-3 z-30 transition-all hover:scale-[1.02] w-[170px] sm:w-[185px]"
              >
                <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600 border border-pink-100/50 shadow-sm">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-bold text-xs text-gray-900 leading-none">Healthcare</h4>
                  <span className="text-[10px] text-gray-400 mt-1 block font-medium">HealthTech Systems</span>
                  {/* 3 Blinking Indicators */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-[pulse_1.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400/30 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: Engineering */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-[2%] left-[2%] p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(79,70,229,0.05)] flex items-center gap-3 z-30 transition-all hover:scale-[1.02] w-[170px] sm:w-[185px]"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm">
                  <Cog className="w-4.5 h-4.5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-bold text-xs text-gray-900 leading-none">Engineering</h4>
                  <span className="text-[10px] text-gray-400 mt-1 block font-medium">Smart Engineering</span>
                  {/* 3 Blinking Indicators */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-[pulse_1.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 4: AI & Innovation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 2.2 }}
                className="absolute bottom-[2%] right-[2%] p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(79,70,229,0.05)] flex items-center gap-3 z-30 transition-all hover:scale-[1.02] w-[170px] sm:w-[185px]"
              >
                <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100/50 shadow-sm">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-bold text-xs text-gray-900 leading-none">AI & Innovation</h4>
                  <span className="text-[10px] text-gray-400 mt-1 block font-medium">Intelligent Systems</span>
                  {/* 3 Blinking Indicators */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-[pulse_1.2s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/30 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
