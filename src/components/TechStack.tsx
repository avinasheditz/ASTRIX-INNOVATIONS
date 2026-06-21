import { useState } from 'react';
import { Layers, Database, ArrowRight, Server, Cloud, Cpu, Layout } from 'lucide-react';

interface TechNode {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'ai';
  description: string;
}

export default function TechStack() {
  const [selectedCat, setSelectedCat] = useState<'all' | 'frontend' | 'backend' | 'database' | 'cloud' | 'ai'>('all');

  const categories = [
    { id: 'all', label: 'All Layers', icon: Layers, desc: 'Every stack component integrated across our product lines.' },
    { id: 'frontend', label: 'Frontend', icon: Layout, desc: 'Constructing immersive, ultra-responsive web & native user flows.' },
    { id: 'backend', label: 'Backend', icon: Server, desc: 'Real-time high-throughput APIs, sockets, and controller services.' },
    { id: 'database', label: 'Database', icon: Database, desc: 'ACID-safe, highly concurrent structured query databases.' },
    { id: 'cloud', label: 'Cloud Systems', icon: Cloud, desc: 'Globally scaled, self-healing software deployments.' },
    { id: 'ai', label: 'AI & Cognition', icon: Cpu, desc: 'Decisions modelling, machine classifiers and language pipelines.' }
  ];

  const techNodes: TechNode[] = [
    // Frontend
    { name: 'React', category: 'frontend', description: 'Powering highly dense real-time dashboard telemetry screens.' },
    { name: 'Next.js', category: 'frontend', description: 'Handles server-side rendering for optimal public platform visibility.' },
    { name: 'Flutter', category: 'frontend', description: 'Bridges unified multi-screen tablet interfaces and robotics controls.' },
    
    // Backend
    { name: 'Node.js', category: 'backend', description: 'Executes highly concurrent, multi-socket stream pipelines.' },
    { name: 'Laravel', category: 'backend', description: 'Deploying robust, relational data controller and api frameworks.' },
    
    // Database
    { name: 'PostgreSQL', category: 'database', description: 'Handling high-density telemetry sequences and robust geographic metrics.' },
    { name: 'MySQL', category: 'database', description: 'Structured, highly optimized data tables mapping user access logs.' },
    
    // Cloud
    { name: 'AWS', category: 'cloud', description: 'Hosting micro-services with secure, auto-scaling global ingress routes.' },
    { name: 'Firebase', category: 'cloud', description: 'Managing immediate, durable synchronization for medical telemetry.' },
    
    // AI
    { name: 'OpenAI', category: 'ai', description: 'Generates real-time patient case logs and text telemetry structures.' },
    { name: 'TensorFlow Lite', category: 'ai', description: 'Quantized 4-bit local model runtimes executing safety posture checks.' }
  ];

  return (
    <section id="stack" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FBFCFD]">
      {/* Background cyber filament glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-[15%] w-96 h-96 bg-indigo-50/30 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-10 left-[20%] w-[400px] h-[400px] bg-cyan-50/40 rounded-full filter blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <Layers className="w-4 h-4 animate-pulse-slow" />
            <span>OUR SYSTEM CORE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Under the Hood: Technology Stack
          </h2>
          <div className="w-16 h-1 bg-[#4F46E5] mt-4 rounded-full" />
        </div>

        {/* Layout Grid: Selectors + Details block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Layer selectors */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-sans text-xs text-indigo-600 tracking-widest uppercase font-bold mb-1">
              SYSTEM ARCHITECTURE LAYERS
            </h3>
            
            <div className="space-y-2">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isSelected = selectedCat === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id as any)}
                    className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 cursor-pointer hover:border-[#4F46E5]/30 ${
                      isSelected
                        ? 'bg-white border-[#4F46E5]/40 shadow-sm shadow-indigo-500/5 ring-1 ring-[#4F46E5]/35 text-gray-900'
                        : 'bg-white border-gray-100/90 text-gray-650'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      isSelected ? 'bg-indigo-50 text-[#4F46E5] border border-indigo-100' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-sans text-xs font-bold tracking-wider ${
                        isSelected ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {cat.label}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-normal font-light">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active stack grid nodes */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)]">
            <h3 className="font-sans text-xs text-indigo-600 tracking-widest uppercase font-bold mb-6">
              DEPLOYED COMPILER NODES
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techNodes.map((node) => {
                const isMatch = selectedCat === 'all' || node.category === selectedCat;

                return (
                  <div
                    key={node.name}
                    className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] text-left ${
                      isMatch
                        ? 'bg-indigo-50/30 border-indigo-100 shadow-sm scale-100 opacity-100'
                        : 'bg-white border-gray-100/70 opacity-35 hover:opacity-60 scale-98 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-sans font-extrabold text-base text-gray-900 tracking-wide">
                          {node.name}
                        </span>
                        <span className="font-sans text-[9px] text-[#4F46E5] bg-indigo-50 border border-indigo-100/55 px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                          {node.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed mt-1">
                        {node.description}
                      </p>
                    </div>

                    {isMatch && (
                      <div className="flex items-center gap-1 text-[9px] font-sans font-bold text-[#4F46E5] mt-4 self-end">
                        <span>SYS READY</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
