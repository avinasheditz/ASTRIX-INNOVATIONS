import { Flame, Compass, ShieldCheck, Microscope, Globe, ArrowUpRight } from 'lucide-react';

export default function AboutSec() {
  const values = [
    {
      title: 'Innovation',
      icon: Flame,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Pushing the boundaries of technology, healthcare, and engineering in search of breakthroughs.'
    },
    {
      title: 'Integrity',
      icon: ShieldCheck,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Maintaining robust ethical frameworks, patient data protection, and transparent corporate governance.'
    },
    {
      title: 'Quality',
      icon: Compass,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Strict validation across clinical systems, software platforms, and physical diagnostics.'
    },
    {
      title: 'Research',
      icon: Microscope,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Fueled by quantitative experiments, simulation engines, and continuous peer-reviewed analysis.'
    },
    {
      title: 'Sustainability',
      icon: Globe,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Designing low-energy firmware and bio-safe micro-hydro power generators for a clean world.'
    }
  ];

  const milestones = [
    { year: '2022', title: 'Company Inception', desc: 'Astrix founded by leading biomedical and system engineering specialists to merge software telemetry with hardware.' },
    { year: '2024', title: 'HealLink Wearable Patent', desc: 'Awarded primary design patent for sub-dermal multi-vital PPG analysis technology with built-in ML classifier.' },
    { year: '2026', title: 'Astrix Innovations Today', desc: 'Operating advanced AI model compiles and low-impact turbines connecting physical realities with digital logic.' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent text-left border-t border-gray-100">
      
      {/* Decorative ambient gradients for light path */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-[10%] w-96 h-96 bg-indigo-50/40 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-cyan-50/50 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title Block */}
        <div className="mb-16">
          <div className="flex items-center gap-1.5 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5]">
            <ArrowUpRight className="w-4 h-4" />
            <span>WHO WE ARE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Driven by Innovation, Powered by Integrity
          </h2>
          <div className="w-16 h-1 bg-[#4F46E5] mt-4 rounded-full" />
        </div>

        {/* Company Overview & Main Vision Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-sans text-2xl font-extrabold text-gray-900 tracking-tight">
              Company Overview
            </h3>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light">
              Astrix Innovations is dedicated to developing advanced solutions that improve healthcare systems, industrial operations, and digital experiences.
            </p>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light">
              By combining high-speed cloud technologies, artificial intelligence structures, and bio-inspired physical materials, we support digital transformations globally. Our engineering and healthcare telemetry modules serve both remote clinics and modern manufacturing corridors under a unified secure philosophy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] text-left">
                <span className="font-sans text-xs text-[#4F46E5] font-bold block mb-1.5 uppercase tracking-wider">Our Mission</span>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  To create impactful innovations that improve lives through technology and engineering excellence.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] text-left">
                <span className="font-sans text-xs text-pink-600 font-bold block mb-1.5 uppercase tracking-wider">Our Vision</span>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  To become a globally recognized innovation company driving transformation across industries.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Timeline of Development */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative">
            <h3 className="font-sans text-xs text-indigo-600 tracking-widest uppercase mb-6 font-bold text-left">
              ASTRIX EVOLUTION TIMELINE
            </h3>
            
            <div className="relative border-l border-gray-100 ml-4 pl-6 space-y-8 text-left">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#4F46E5] ring-4 ring-indigo-50 group-hover:scale-125 transition-transform" />
                  <span className="font-sans text-[#4F46E5] text-xs font-semibold block mb-0.5">
                    {m.year} &middot; Milestone
                  </span>
                  <h4 className="text-gray-900 font-sans font-bold text-base leading-tight">
                    {m.title}
                  </h4>
                  <p className="text-sm text-gray-400 font-light mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Our Values section */}
        <div>
          <h3 className="font-sans text-xs text-indigo-600 tracking-widest uppercase mb-8 text-center sm:text-left font-bold">
            OUR CORE VALUES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-[0_12px_45px_-10px_rgba(79,70,229,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`w-10 h-10 ${v.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
                      <IconComp className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <h4 className="font-sans font-extrabold text-base text-gray-800 tracking-wide">
                      {v.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 font-normal leading-relaxed">
                    {v.description}
                  </p>

                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-gray-100 group-hover:text-indigo-100 transition-colors">
                    #0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
