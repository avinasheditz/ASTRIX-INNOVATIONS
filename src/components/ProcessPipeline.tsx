import { Lightbulb, Search, PenTool, Code, Rocket, ArrowRight } from 'lucide-react';

export default function ProcessPipeline() {
  const steps = [
    {
      num: '01',
      title: 'Ideation',
      desc: 'Understanding problems and discovering opportunities.',
      icon: Lightbulb,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      num: '02',
      title: 'Research',
      desc: 'Deep research and analysis to craft the right solutions.',
      icon: Search,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Designing user-centric and scalable system architectures.',
      icon: PenTool,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      num: '04',
      title: 'Development',
      desc: 'Building robust and intelligent solutions using best technologies.',
      icon: Code,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      num: '05',
      title: 'Deployment',
      desc: 'Delivering, deploying, and optimizing for real-world impact.',
      icon: Rocket,
      color: 'bg-pink-50 text-pink-600 border-pink-100',
    }
  ];

  return (
    <section id="process" className="py-24 relative bg-transparent text-left overflow-hidden border-t border-gray-100/85">
      {/* Soft background glows */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[300px] bg-indigo-100/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Idea text block and action button */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="font-sans text-xs text-[#4F46E5] font-extrabold tracking-widest uppercase block">
              OUR INNOVATION PROCESS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
              From Idea to Impact
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed font-light">
              We follow a proven process that ensures innovation, quality, and measurable impact in every solution we build.
            </p>
            
            <button className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 text-gray-700 hover:text-[#4F46E5] font-sans text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer">
              <span>View Our Process</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Horizontal flowing steps list matching mockup design */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 lg:gap-4 relative">
              {steps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <div key={idx} className="relative flex flex-col items-center sm:items-start text-center sm:text-left group select-none">
                    
                    {/* Circle Card representing step with number */}
                    <div className="relative flex flex-col items-center sm:items-start space-y-4">
                      
                      <div className="flex items-center gap-2 relative">
                        {/* Number counter badge */}
                        <span className="font-sans font-bold text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded border border-gray-100">
                          {step.num}
                        </span>

                        {/* Thin gray horizontal divider arrow simulator */}
                        {idx < steps.length - 1 && (
                          <div className="hidden sm:block absolute left-24 top-1/2 -translate-y-1/2 w-14 border-t border-dashed border-gray-200/95 pointer-events-none z-0" />
                        )}
                      </div>

                      {/* Icon container */}
                      <div className={`w-14 h-14 rounded-2xl ${step.color} border flex items-center justify-center shadow-sm`}>
                        <IconComp className="w-6 h-6 shrink-0" />
                      </div>

                      {/* Content block */}
                      <div className="space-y-1.5 mt-2">
                        <h4 className="font-sans font-bold text-base text-gray-900 leading-tight">
                          {step.title}
                        </h4>
                        <p className="font-sans text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                    </div>

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
