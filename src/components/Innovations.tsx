import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Info, CheckSquare, Layers 
} from 'lucide-react';
import { INNOVATIONS } from '../data';
import { Innovation } from '../types';

export default function Innovations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedInno, setSelectedInno] = useState<Innovation | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INNOVATIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INNOVATIONS.length) % INNOVATIONS.length);
  };

  const currentInno = INNOVATIONS[currentIndex];

  return (
    <section id="innovations" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FAFBFD]">
      
      {/* Mesh Background Accent Glows */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-indigo-100/15 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[450px] bg-cyan-50/20 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
              <Layers className="w-4 h-4 animate-pulse-slow" />
              <span>CORELINK RESEARCH PORTFOLIO</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
              Pioneering Innovations
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base mt-2 font-light max-w-xl">
              Preview our high-performance systems, medical telemetry monitors, and custom industrial engines engineered on-site.
            </p>
          </div>

          {/* Stepper Controls on Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white hover:bg-gray-50 active:scale-95 border border-gray-200/80 text-gray-500 hover:text-[#4F46E5] transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-sans text-xs font-bold text-gray-700 bg-white px-4.5 py-3.5 rounded-xl border border-gray-200/80 shadow-sm">
              Project 0{currentIndex + 1} &middot; 0{INNOVATIONS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white hover:bg-gray-50 active:scale-95 border border-gray-200/80 text-gray-500 hover:text-[#4F46E5] transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Project Slider Showcase Card */}
        <div className="relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-gray-100/90 overflow-hidden shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] grid grid-cols-1 lg:grid-cols-12"
            >
              
              {/* Left Column: Device Image Mockup frame */}
              <div className="lg:col-span-5 relative aspect-square lg:aspect-auto min-h-[350px] bg-slate-50 border-r border-gray-100 flex flex-col justify-between overflow-hidden">
                <img
                  src={currentInno.imageUrl}
                  alt={currentInno.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300"
                />
                
                {/* Visual Glass overlays for rich texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10" />

                {/* Top Overlay Data indicators */}
                <div className="p-6 relative z-10 flex justify-between items-start">
                  <span className="bg-white/95 backdrop-blur-md text-[#4F46E5] border border-gray-100 px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase">
                    {currentInno.industry}
                  </span>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-sans text-[10px] text-white font-bold drop-shadow">Active Model</span>
                  </div>
                </div>

                {/* Bottom Title brief inside mockup column */}
                <div className="p-6 relative z-10 text-left bg-gradient-to-t from-gray-900/70 to-transparent">
                  <span className="font-sans text-[8px] text-gray-200 uppercase tracking-widest block font-extrabold">
                    PREVIEW SPECIFICATION MATRIX
                  </span>
                  <h3 className="font-sans font-extrabold text-xl text-white mt-1">
                    {currentInno.title}
                  </h3>
                </div>

              </div>

              {/* Right Column: Key Details, Metrics table & deep-dive button */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-white text-left">
                
                {/* Specs overview content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-sans text-xs text-[#4F46E5] block tracking-wider uppercase font-bold">
                      ASTRIX INNOVATIONS BRIEFING
                    </span>
                    <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      {currentInno.title}
                    </h2>
                    <p className="font-sans text-gray-500 text-sm leading-relaxed font-light">
                      {currentInno.description}
                    </p>
                  </div>

                  {/* Highlights parameter specifications block */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    {currentInno.specs.map((sp, idx) => (
                      <div key={idx} className="bg-gray-55/40 p-3 rounded-xl border border-gray-100/80 text-left">
                        <span className="font-sans text-[9px] text-gray-400 uppercase block tracking-wider mb-1 font-semibold">
                          {sp.label}
                        </span>
                        <span className="font-sans text-xs font-extrabold text-[#4F46E5] block truncate">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology labels deck */}
                  <div className="pt-2">
                    <span className="font-sans text-[9px] text-gray-400 block tracking-widest uppercase mb-2.5 font-bold">
                      ENGINEERING FRAMEWORK STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentInno.technologiesUsed.map((tech) => (
                        <span key={tech} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded text-xs text-gray-600 font-sans font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Deep Dive Trigger */}
                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-sans text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Certified Quality Compliant System</span>
                  </div>

                  <button
                    onClick={() => setSelectedInno(currentInno)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#3F37C9] text-white font-sans font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-500/10"
                  >
                    <Info className="w-4 h-4" />
                    <span>Deep Dive Specifications</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* Deep Dive specifications popup modal inside gorgeous white crystal dialog box */}
      {selectedInno && (
        <div id="innovation-details-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Image Header banner */}
            <div className="relative h-48 md:h-64 overflow-hidden shrink-0 bg-gray-50 border-b border-gray-100">
              <img
                src={selectedInno.imageUrl}
                alt={selectedInno.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Close Button overlay */}
              <button
                onClick={() => setSelectedInno(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/95 text-gray-700 hover:text-black border border-gray-200 transition-colors cursor-pointer shadow-sm"
              >
                <XButton className="w-4 h-4" />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-left">
                <span className="bg-white/95 text-[#4F46E5] text-[9.5px] font-bold tracking-wider px-3 py-1 rounded-lg border border-gray-100 uppercase">
                  {selectedInno.industry}
                </span>
                <h3 className="font-sans font-extrabold text-2xl text-white mt-3.5 tracking-tight drop-shadow">
                  {selectedInno.title}
                </h3>
              </div>
            </div>

            {/* Modal Scroll body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-left">
              <div>
                <h4 className="font-sans font-bold text-xs text-[#4F46E5] tracking-wide uppercase mb-2">Technical Overview</h4>
                <p className="font-sans font-light text-gray-600 text-sm md:text-base leading-relaxed">
                  {selectedInno.longDescription}
                </p>
              </div>

              {/* Specs parameters & performance grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                
                {/* Performance highlights */}
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-xs text-gray-800 tracking-wide uppercase">[System Highlights]</h4>
                  <ul className="space-y-3">
                    {selectedInno.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-500 font-medium">
                        <CheckSquare className="w-4 h-4 mt-0.5 text-[#4F46E5] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech specifications panel table */}
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-xs text-gray-800 tracking-wide uppercase">[Calibrated Specs]</h4>
                  <div className="rounded-2xl border border-gray-100 overflow-hidden text-xs bg-gray-50/50">
                    {selectedInno.specs.map((spec, sidx) => (
                      <div
                        key={sidx}
                        className={`flex justify-between p-3.5 ${
                          sidx % 2 === 0 ? 'bg-white' : 'bg-transparent'
                        } border-b border-gray-100/70 last:border-0`}
                      >
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="text-gray-900 font-bold font-sans">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Controls footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedInno(null)}
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 active:scale-98 font-sans font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Close Specifications
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

// Simple internal icon component for safety
function XButton({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
