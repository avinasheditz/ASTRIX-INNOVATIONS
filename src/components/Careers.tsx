import { useState, FormEvent } from 'react';
import { Briefcase, MapPin, CheckCircle, Send, X } from 'lucide-react';
import { CAREER_POSITIONS } from '../data';
import { CareerPosition } from '../types';

export default function Careers() {
  const [activeJob, setActiveJob] = useState<CareerPosition | null>(null);
  
  // Application Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: '',
    cover: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const submitApplication = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitProgress(10);

    // Simulate credential Ingestion progress bar
    const interval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            const receiptId = 'ASTRIX-APP-' + Math.floor(Math.random() * 90000 + 10000);
            setSuccessReceipt(receiptId);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };

  const closePortal = () => {
    setActiveJob(null);
    setSuccessReceipt(null);
    setFormData({ name: '', email: '', profile: '', cover: '' });
    setSubmitProgress(0);
  };

  return (
    <section id="careers" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FBFCFD]">
      {/* Background radial highlight */}
      <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] bg-indigo-50/25 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
            <Briefcase className="w-4 h-4 animate-pulse-slow" />
            <span>JOIN THE TEAM &middot; GLOBAL ECOSYSTEM</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Operate on the Frontier
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-2 font-light max-w-xl">
            We list open positions, postgraduate internships, and collaborative research positions under our joint multidisciplinary mission.
          </p>
        </div>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAREER_POSITIONS.map((pos) => (
            <div
              key={pos.id}
              className="group bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 flex flex-col justify-between hover:border-[#4F46E5]/30 shadow-sm hover:shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between font-sans text-[10px] text-gray-400 font-semibold">
                  <span className="bg-indigo-50 border border-indigo-100/60 px-2.5 py-0.5 rounded-full text-[#4F46E5] font-bold uppercase tracking-wider">
                    {pos.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{pos.location}</span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="font-sans text-[8.5px] text-gray-400 block uppercase tracking-wider font-extrabold">{pos.department}</span>
                  <h3 className="font-sans font-extrabold text-base text-gray-900 group-hover:text-[#4F46E5] transition-colors leading-snug">
                    {pos.title}
                  </h3>
                </div>

                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {pos.description}
                </p>

                {/* Bullets List requirements */}
                <div className="border-t border-gray-100 pt-4 text-left">
                  <span className="font-sans text-[8.5px] text-gray-400 tracking-wider block mb-2 uppercase font-extrabold">CORE EXPECTATIONS</span>
                  <ul className="space-y-1.5">
                    {pos.requirements.slice(0, 3).map((req, ridx) => (
                      <li key={ridx} className="flex items-start gap-1.5 text-[11px] text-gray-600 font-light leading-tight">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4F46E5] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Application trigger */}
              <div className="pt-6">
                <button
                  onClick={() => setActiveJob(pos)}
                  className="w-full py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#4F46E5] hover:text-white hover:border-transparent text-xs font-sans font-bold tracking-wider text-[#4F46E5] cursor-pointer transition-all shadow-sm"
                >
                  APPLY FOR THIS ROLE
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Embedded application portal modal */}
      {activeJob && (
        <div id="career-application-portal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header controls */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50 text-left">
              <div>
                <span className="text-[#4F46E5] font-sans text-[9px] tracking-widest uppercase font-extrabold">
                  ASTRIX APPLICATION SYSTEM INGRESS
                </span>
                <h3 className="font-sans font-extrabold text-base text-gray-900 mt-1">
                  Applying for: {activeJob.title}
                </h3>
              </div>
              <button
                onClick={closePortal}
                className="p-1.5 rounded-full bg-white hover:bg-gray-150 text-gray-500 hover:text-black border border-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 md:p-8 overflow-y-auto">
              
              {!successReceipt ? (
                <form onSubmit={submitApplication} className="space-y-5 text-left">
                  
                  {/* Progress overlay */}
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full border-2 border-indigo-100 border-t-[#4F46E5] animate-spin" />
                      <div className="space-y-1.5 w-full max-w-xs">
                        <span className="font-sans text-[10px] text-[#4F46E5] tracking-wider block font-bold">INGESTING APPLICATION PORTFOLIO &middot; {submitProgress}%</span>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F46E5] transition-all duration-150" style={{ width: `${submitProgress}%` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-sans text-gray-500 mb-1.5 uppercase tracking-wider font-extrabold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-gray-500 mb-1.5 uppercase tracking-wider font-extrabold font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-gray-500 mb-1.5 uppercase tracking-wider font-extrabold font-bold">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        placeholder="linkedin.com/in/username"
                        value={formData.profile}
                        onChange={(e) => handleInputChange('profile', e.target.value)}
                        className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-gray-500 mb-1.5 uppercase tracking-wider font-extrabold font-bold">Brief Abstract *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Explain how your profile aligns with our corporate research pipelines."
                      value={formData.cover}
                      onChange={(e) => handleInputChange('cover', e.target.value)}
                      className="w-full bg-gray-50/50 text-xs text-gray-900 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4F46E5]/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-xs font-bold tracking-wider rounded-xl shadow-lg shadow-indigo-500/10 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT APPLICATION RECORD</span>
                  </button>

                </form>
              ) : (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-sans font-extrabold text-xl text-gray-900">Application Received</h4>
                    <p className="text-gray-500 text-xs sm:text-sm font-light max-w-sm mx-auto">
                      Thank you, {formData.name}. Your scientific application and career details have been submitted safely.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4.5 rounded-xl inline-block text-left font-sans text-xs space-y-1">
                    <p className="text-gray-400 font-bold uppercase">TRANSMISSION ID:</p>
                    <span className="text-[#4F46E5] font-bold tracking-wider font-mono uppercase">{successReceipt}</span>
                    <p className="text-gray-400 font-bold uppercase mt-2">TIMESTAMP:</p>
                    <span className="text-gray-600 font-mono">{new Date().toISOString()}</span>
                  </div>

                  <div>
                    <button
                      onClick={closePortal}
                      className="px-6 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-xs font-bold tracking-wider transition-all cursor-pointer"
                    >
                      Close Portal
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
