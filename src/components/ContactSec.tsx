import { useState, FormEvent } from 'react';
import { Send, MapPin, Mail, MessageSquare, Linkedin, Twitter, Github, CheckCircle, Smartphone } from 'lucide-react';

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
            </div>            {/* Radar Sweep Locator Animation */}
            <div className="bg-white border border-gray-150/70 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-5 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center py-6 h-64 hover:border-indigo-150 transition-all duration-300 group/radar">
              
              {/* Futuristic Cyber Grid Lines background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.25] z-0" style={{
                backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }} />

              {/* Glowing core background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-50/25 rounded-full filter blur-xl pointer-events-none z-0 group-hover/radar:bg-indigo-50/40 transition-colors" />

              {/* Corner Tech Readouts (Micro telemetry data blocks) */}
              <div className="absolute top-3 left-4 flex items-center gap-1.5 font-mono text-[7px] text-gray-400 font-bold select-none z-15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYS LOG &middot; STABLE</span>
              </div>
              <div className="absolute top-3 right-4 font-mono text-[7px] text-gray-400 font-semibold select-none z-15">
                AZIMUTH: 224.85°
              </div>
              <div className="absolute bottom-3 left-4 font-mono text-[7px] text-gray-400 font-semibold select-none z-15">
                LAT: 37.7749° N
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[7px] text-gray-400 font-semibold select-none z-15">
                LNG: 122.4194° W
              </div>

              {/* Main Circular Radar Scanner Screen */}
              <div className="relative w-40 h-40 rounded-full border border-gray-150/80 bg-slate-50/40 flex items-center justify-center p-0.5 z-10">
                
                {/* Simulated Scope Crosshairs */}
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gray-200/50 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gray-200/50 pointer-events-none" />
                
                {/* Concentric Scope Division Rings */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-gray-200/40" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-gray-200/40" />
                <div className="absolute w-[40%] h-[40%] rounded-full border border-dashed border-gray-200/30" />
                <div className="absolute w-[20%] h-[20%] rounded-full border border-gray-200/50" />

                {/* Rotating Conical Sweep Slider */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none animate-radial-spin mix-blend-multiply opacity-70"
                  style={{ 
                    background: 'conic-gradient(from 0deg, transparent 50%, rgba(79, 70, 229, 0.12) 80%, rgba(79, 70, 229, 0.3) 100%)',
                    animationDuration: '8s'
                  }} 
                />

                {/* Sweeping Edge Scanner Beam Flare */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none animate-radial-spin"
                  style={{ animationDuration: '8s' }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-400/40 scale-125 blur-[1px]" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                </div>

                {/* SF HQ Target Node */}
                <div className="absolute top-[32%] left-[62%] z-20 group-hover/radar:scale-105 transition-transform duration-300">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing signal rings */}
                    <span className="absolute w-7 h-7 rounded-full border border-indigo-500/30 animate-ping" />
                    <span className="absolute w-4 h-4 rounded-full bg-indigo-100/30 border border-indigo-500/20" />
                    
                    {/* Blinking central core dot */}
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5] relative shadow-[0_0_8px_rgba(79,70,229,0.9)] animate-pulse" />
                    
                    {/* Floating HUD Node badge */}
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border border-indigo-150 rounded-md px-1.5 py-0.5 shadow-sm whitespace-nowrap z-30 flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#4F46E5] rounded-full" />
                      <span className="font-sans font-bold text-[6.5px] text-[#4F46E5] tracking-wider uppercase">ASTRIX_HQ</span>
                    </div>
                  </div>
                </div>

                {/* Additional micro background nodes */}
                <div className="absolute bottom-[28%] left-[24%] z-20 opacity-60">
                  <div className="relative font-sans">
                    <span className="absolute -inset-1 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '30s' }} />
                    <span className="w-1 h-1 rounded-full bg-cyan-400 block" />
                  </div>
                </div>
                <div className="absolute top-[25%] left-[32%] z-20 opacity-45">
                  <span className="w-1 h-1 rounded-full bg-purple-400 block" />
                </div>
                <div className="absolute bottom-[35%] right-[22%] z-20 opacity-40">
                  <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                </div>

                {/* Core target hub focus reticle */}
                <div className="w-4 h-4 rounded-full bg-white border border-gray-350 shadow-sm z-30 flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                </div>

              </div>

              {/* Title & Coordinate status indicator */}
              <div className="mt-4 text-center z-10 relative">
                <span className="font-sans text-[8.5px] text-gray-500 tracking-wider font-extrabold uppercase flex items-center gap-2 justify-center">
                  <span>GLOBAL INGRESS TRACKER</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="font-mono text-[#4F46E5] animate-pulse">ACTIVE SECURE</span>
                </span>
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
