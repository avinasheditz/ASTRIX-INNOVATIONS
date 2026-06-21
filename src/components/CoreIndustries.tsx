import { useState } from 'react';
import { Laptop, Activity, Cog, Cpu, ArrowRight } from 'lucide-react';

export default function CoreIndustries() {
  const industries = [
    {
      id: 'technology',
      title: 'Technology',
      icon: Laptop,
      bullets: [
        'Web & Mobile Development',
        'Cloud & DevOps',
        'SaaS Platforms',
        'Enterprise Solutions'
      ],
      colorClass: 'text-blue-600',
      bgColor: 'bg-blue-50/60',
      shadowColor: 'hover:shadow-blue-500/5'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      icon: Activity,
      bullets: [
        'Digital Health Platforms',
        'Hospital Management',
        'Telemedicine Solutions',
        'Health Analytics'
      ],
      colorClass: 'text-pink-600',
      bgColor: 'bg-pink-50/50',
      shadowColor: 'hover:shadow-pink-500/5'
    },
    {
      id: 'engineering',
      title: 'Engineering',
      icon: Cog,
      bullets: [
        'Mechanical Design',
        'Product Development',
        'Industrial Automation',
        'IoT & Smart Systems'
      ],
      colorClass: 'text-indigo-600',
      bgColor: 'bg-indigo-50/50',
      shadowColor: 'hover:shadow-indigo-500/5'
    },
    {
      id: 'ai',
      title: 'AI & Innovation',
      icon: Cpu,
      bullets: [
        'AI Agents & Automation',
        'Predictive Analytics',
        'Computer Vision',
        'Smart Algorithms'
      ],
      colorClass: 'text-cyan-600',
      bgColor: 'bg-cyan-50/50',
      shadowColor: 'hover:shadow-cyan-500/5'
    }
  ];

  return (
    <section id="industries" className="py-20 relative bg-transparent text-left overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-100/30 to-indigo-100/20 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header based on user mockup */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-xs text-[#4F46E5] font-bold tracking-widest uppercase block">
            INDUSTRIES WE EMPOWER
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Solutions Across Industries
          </h2>
          <div className="w-12 h-1 bg-[#4F46E5] mx-auto rounded-full mt-2" />
        </div>

        {/* 4 Column Cards Grid exactly like the uploaded design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className={`group bg-white p-8 rounded-3xl border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.015)] ${ind.shadowColor} hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[360px] text-left relative overflow-hidden`}
              >
                <div>
                  {/* Isometric-style subtle color background icon representation */}
                  <div className={`w-14 h-14 rounded-2xl ${ind.bgColor} ${ind.colorClass} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon className="w-6 h-6 animate-pulse-slow" />
                  </div>

                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-gray-900 mb-4 tracking-tight">
                    {ind.title}
                  </h3>

                  {/* Bullets with tiny elegant geometric dot as in image */}
                  <ul className="space-y-2.5 mb-8">
                    {ind.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500 font-medium font-sans">
                        <span className={`w-1.5 h-1.5 rounded-full ${ind.colorClass} opacity-60 shrink-0`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer pt-3 border-t border-gray-50 w-full group">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
