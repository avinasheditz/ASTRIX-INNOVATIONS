import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, ShieldCheck, Users, Trophy, Radio, 
  ArrowUpRight, Layers
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [projects, setProjects] = useState(0);
  const [industries, setIndustries] = useState(0);
  const [experts, setExperts] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  // Simulated metrics stream for the real-time throughput chart card
  const [chartData, setChartData] = useState<number[]>([40, 55, 48, 70, 62, 85, 80, 95, 90, 110]);
  const [simulatedTime, setSimulatedTime] = useState('12:00:00');

  // Trigger metrics count-up simulation on mount
  useEffect(() => {
    const duration = 1200; // ms
    const increments = 30;
    const intervalTime = duration / increments;

    let currentIncr = 0;
    const countTimer = setInterval(() => {
      currentIncr++;
      setProjects(Math.min(50, Math.floor((currentIncr / increments) * 50)));
      setIndustries(Math.min(10, Math.floor((currentIncr / increments) * 10)));
      setExperts(Math.min(30, Math.floor((currentIncr / increments) * 30)));
      setSatisfaction(Math.min(100, Math.floor((currentIncr / increments) * 100)));

      if (currentIncr >= increments) {
        clearInterval(countTimer);
      }
    }, intervalTime);

    // Continuous real-time throughput simulator
    const streamTimer = setInterval(() => {
      setChartData((prev) => {
        const nextVal = Math.max(30, Math.min(120, prev[prev.length - 1] + (Math.random() * 30 - 15)));
        const newArr = [...prev.slice(1), Math.floor(nextVal)];
        return newArr;
      });
      const now = new Date();
      setSimulatedTime(now.toTimeString().split(' ')[0]);
    }, 2000);

    return () => {
      clearInterval(countTimer);
      clearInterval(streamTimer);
    };
  }, []);

  return (
    <section id="metrics" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FBFCFD]">
      
      {/* Mesh Background Accent Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-50/30 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-50/40 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>INTELLIGENT PERFORMANCE NET</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Performance Dashboard
          </h2>
          <p className="font-sans text-gray-500 text-sm mt-2 font-light max-w-xl">
            Real-time metric counters and systems calibrations tracing active Astrix engagements globally.
          </p>
          <div className="w-16 h-1 bg-[#4F46E5] mt-4 rounded-full" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main big block: Real-Time Throughput Live Chart (8 columns on medium up) */}
          <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[380px] text-left">
            <div className="absolute top-0 right-0 p-4 font-sans text-[9px] font-bold text-[#4F46E5]">
              SYSTEM &middot; METRIC_ACTIVE_0{projects}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-ping" />
                <span className="font-sans text-[10px] font-bold text-[#4F46E5] tracking-wide uppercase">LIVE PERFORMANCE THROUGHPUT</span>
              </div>
              <h3 className="font-sans font-extrabold text-[#111827] text-xl">Service Inferences Compute Loads</h3>
              <p className="font-sans font-light text-gray-505 text-xs sm:text-sm max-w-md">
                Continuous hardware computation cycles processing remote telemetry and physical systems diagnostics in real-time.
              </p>
            </div>

            {/* SVG Live Area Chart */}
            <div className="h-40 relative mt-6 border-b border-l border-gray-100 px-2 flex items-end">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="metric-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Simulated horizontal lines */}
                <g stroke="rgba(0,0,0,0.02)" strokeWidth="0.5">
                  <line x1="0" y1="25%" x2="100%" y2="25%" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" />
                </g>

                {/* Filled gradient area path */}
                <path
                  d={`M 0,160 ${chartData.map((val, idx) => `L ${(idx / (chartData.length - 1)) * 740},${160 - (val / 130) * 120}`).join(' ')} L 740,160 Z`}
                  fill="url(#metric-chart-grad)"
                />

                {/* Stroke line path */}
                <path
                  d={chartData.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (chartData.length - 1)) * 740},${160 - (val / 130) * 120}`).join(' ')}
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />

                {/* Pulsing circles on endpoints */}
                <circle
                  cx="740"
                  cy={160 - (chartData[chartData.length - 1] / 130) * 120}
                  r="4"
                  fill="#4F46E5"
                />
              </svg>
            </div>

            {/* Live stats footer inside chart card */}
            <div className="pt-4 border-t border-gray-100 mt-6 flex justify-between items-center text-[10px] font-sans text-gray-400 font-semibold">
              <span>SCAN CODE TIME: {simulatedTime}</span>
              <span className="text-[#4F46E5] font-bold">AVERAGE COMPUTED VALUE / {Math.floor(chartData.reduce((p, c) => p + c, 0) / chartData.length)} GigaFlops</span>
            </div>
          </div>

          {/* Right Column: 2x2 grid representing counts (4 columns on medium up) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-left">
            
            {/* Stat 1: Projects Completed */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#4F46E5] to-blue-500 opacity-60" />
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 max-w-max mb-4 transition-colors">
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 leading-none">
                {projects}+
              </h4>
              <span className="font-sans text-[9px] text-[#4F46E5] block tracking-wide uppercase mt-1.5 font-bold">Projects</span>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">Live solutions deployed.</p>
            </div>

            {/* Stat 2: Sectors Engaged */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-pink-150 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 opacity-60" />
              <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-100 max-w-max mb-4 transition-colors">
                <Layers className="w-4 h-4 text-pink-600" />
              </div>
              <h4 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 leading-none">
                {industries}+
              </h4>
              <span className="font-sans text-[9px] text-pink-600 block tracking-wide uppercase mt-1.5 font-bold">Sectors</span>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">Complex sectors served.</p>
            </div>

            {/* Stat 3: Staff/Experts */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-indigo-150 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" />
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 max-w-max mb-4 transition-colors">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 leading-none">
                {experts}+
              </h4>
              <span className="font-sans text-[9px] text-indigo-600 block tracking-wide uppercase mt-1.5 font-bold">Engineers</span>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">PhD experts on project.</p>
            </div>

            {/* Stat 4: Accuracy Factor */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-150 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#4F46E5] to-emerald-500 opacity-60" />
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 max-w-max mb-4 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 leading-none">
                {satisfaction}%
              </h4>
              <span className="font-sans text-[9px] text-emerald-600 block tracking-wide uppercase mt-1.5 font-bold">Accuracy</span>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">Precision validation standards.</p>
            </div>

          </div>

          {/* Sub Row 3: 24/7 Monitoring Continuous Node (Takes fullwidth below grid on small, elegant) */}
          <div className="col-span-12 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center relative shrink-0">
                <Radio className="w-4 h-4 text-[#4F46E5]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="space-y-0.5 text-left">
                <p className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wide">
                  Active Security Monitoring Shield
                </p>
                <p className="font-sans font-light text-gray-500 text-[11px] leading-relaxed">
                  We process continuous server audits, remote systems checkups, and automated failover watchdogs across all environments.
                </p>
              </div>
            </div>

            <div>
              <span className="inline-block px-3.5 py-1.5 font-sans text-[9.5px] bg-[#4F46E5]/10 text-[#4F46E5] rounded-lg border border-indigo-100 uppercase tracking-widest font-extrabold">
                [SYSTEM STATUS: ONLINE]
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
