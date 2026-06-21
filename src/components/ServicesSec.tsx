import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, Activity, Wrench, BrainCircuit, ArrowUpRight, CheckCircle
} from 'lucide-react';

export default function ServicesSec() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      name: 'Technology Solutions',
      tagline: 'Enterprise-grade digital ecosystems.',
      icon: Laptop,
      size: 'lg:col-span-8 md:col-span-12',
      color: 'bg-white',
      borderColor: 'border-blue-105',
      iconBg: 'bg-blue-50/50',
      iconColor: 'text-blue-600',
      desc: 'We construct secure, highly responsive, distributed multi-platform software applications. Tailored especially for businesses requesting unified cloud architecture, absolute security compliance, and premium UX/UI interfaces.',
      highlights: ['Custom Cloud-Native Architectures', 'Cross-Platform App Development', 'Unified API Integration & Security'],
      stats: { label: 'Active Deployments', val: '24M+' }
    },
    {
      id: 2,
      name: 'AI & Machine Learning',
      tagline: 'Cognitive systems integration.',
      icon: BrainCircuit,
      size: 'lg:col-span-4 md:col-span-6',
      color: 'bg-white',
      borderColor: 'border-indigo-105',
      iconBg: 'bg-indigo-50/50',
      iconColor: 'text-indigo-600',
      desc: 'Integrating deep predictive networks, local machine learning models, and automated logic blocks that run on hybrid clouds or directly on edge devices.',
      highlights: ['Edge AI Analytics Modules', 'Custom NLP & Search Processing', 'Intelligent Predictive Diagnostics'],
      stats: { label: 'Inference Velocity', val: '< 15ms' }
    },
    {
      id: 3,
      name: 'Healthcare Systems',
      tagline: 'Encrypted telemetry interfaces.',
      icon: Activity,
      size: 'lg:col-span-4 md:col-span-6',
      color: 'bg-white',
      borderColor: 'border-pink-105',
      iconBg: 'bg-pink-50/50',
      iconColor: 'text-pink-600',
      desc: 'Designing end-to-end medical systems, certified software integrations, and real-time clinical dashboards that secure sensitive client data cleanly and efficiently.',
      highlights: ['Secure Clinical Pipelines', 'Encrypted Biosensor Gateways', 'Modular Hospital Dashboard Integrations'],
      stats: { label: 'Compliance Index', val: '99.9%' }
    },
    {
      id: 4,
      name: 'Smart Systems Engineering',
      tagline: 'Precision kinetic controllers.',
      icon: Wrench,
      size: 'lg:col-span-8 md:col-span-12',
      color: 'bg-white',
      borderColor: 'border-purple-105',
      iconBg: 'bg-purple-50/50',
      iconColor: 'text-purple-600',
      desc: 'Developing innovative IoT automation gateways, smart machine controllers, and energy-efficient thermodynamic power cycles for advanced commercial operations.',
      highlights: ['Low-Impact Wave Turbines', 'Continuous Predictive Maintenance IoT', 'Edge Programmable Controllers'],
      stats: { label: 'Operational Accuracy', val: '99.98%' }
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FBFCFD]">
      
      {/* Background Mesh Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-50/40 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-50/40 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <span>CORE SERVICES</span>
          </div>
          
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Our Service Systems
          </h2>
          
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-light">
            Explore our advanced services organized in a custom bento matrix, designed to solve enterprise problems cleanly.
          </p>
          <div className="w-16 h-1 bg-[#4F46E5] mt-4 rounded-full" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((srv, idx) => {
            const IconComponent = srv.icon;
            const isActive = activeCard === idx;

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`${srv.size} relative rounded-3xl p-6 sm:p-8 overflow-hidden border border-gray-100 flex flex-col justify-between transition-all duration-350 select-none group bg-white hover:border-[#4F46E5]/30 ${isActive ? 'shadow-[0_15px_45px_-12px_rgba(79,70,229,0.08)] scale-[1.005]' : 'shadow-sm'}`}
              >
                <div className="space-y-6 relative z-10">
                  {/* Top Bar inside Card */}
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-2xl ${srv.iconBg} ${srv.iconColor} transition-transform duration-350 group-hover:scale-105 shadow-sm border border-gray-50`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[10px] text-[#4F46E5] bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full uppercase tracking-wider font-extrabold">
                      SERVICE &middot; 0{srv.id}
                    </span>
                  </div>

                  {/* Header Title / Tagline */}
                  <div className="text-left">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-gray-900 group-hover:text-[#4F46E5] transition-colors duration-200">
                      {srv.name}
                    </h3>
                    <p className="font-sans font-semibold text-xs text-indigo-500 mt-1 tracking-wide">
                      {srv.tagline}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed font-light mt-3 max-w-2xl">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Detailed features bullet list */}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest font-bold">Key Capabilities</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 font-medium">
                      {srv.highlights.map((item, id) => (
                        <div key={id} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${srv.iconColor} shrink-0 opacity-75`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Stats / visual indicator */}
                <div className="flex justify-between items-baseline mt-8 pt-4 border-t border-gray-100 relative z-10 text-left">
                  <div>
                    <span className="font-sans text-[8px] text-gray-400 uppercase block tracking-wider font-semibold">{srv.stats.label}</span>
                    <span className="font-sans text-lg font-extrabold text-[#4F46E5] tracking-wide">{srv.stats.val}</span>
                  </div>

                  <div className="flex items-center gap-1 font-sans text-xs font-bold text-gray-400 group-hover:text-[#4F46E5] transition-colors duration-200">
                    <span>EXPLORE DATA</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
