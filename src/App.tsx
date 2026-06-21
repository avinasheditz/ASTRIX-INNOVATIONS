/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import AboutSec from './components/AboutSec';
import ServicesSec from './components/ServicesSec';
import ProcessPipeline from './components/ProcessPipeline';
import CoreIndustries from './components/CoreIndustries';
import Innovations from './components/Innovations';
import ResearchDevelopment from './components/ResearchDevelopment';
import PerformanceDashboard from './components/PerformanceDashboard';
import TechStack from './components/TechStack';
import BlogInsights from './components/BlogInsights';
import Careers from './components/Careers';
import FutureCityCTA from './components/FutureCityCTA';
import ContactSec from './components/ContactSec';
import AdminDashboard from './components/AdminDashboard';
import { ChevronUp, Cpu, ShieldAlert, Key } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [adminOpen, setAdminOpen] = useState(false);

  // Unified scroll monitoring logic to highlight navbar targets
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'services', 'industries', 'process', 'innovations', 'metrics', 'rd', 'stack', 'insights', 'careers', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-[#FBFCFD] min-h-screen text-gray-750 font-sans selection:bg-[#4F46E5]/10 selection:text-[#4F46E5] relative">
      {/* Dynamic Canvas Background */}
      <ParticleBackground />

      {/* Modern floating header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} onAdminClick={() => setAdminOpen(true)} />

      {/* Main Structural Modules mapping the Corporate Sitemap */}
      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. About Us */}
        <AboutSec />

        {/* Services Bento Grid */}
        <ServicesSec />

        {/* 3. Core Industries */}
        <CoreIndustries />

        {/* 4. Innovation process pipeline */}
        <ProcessPipeline />

        {/* 5. Innovations (cards with details deep-dive popup modal) */}
        <Innovations />

        {/* 5.5 Interactive Performance Dashboard */}
        <PerformanceDashboard />

        {/* 5. Research & Development Laboratory Simulator Console */}
        <ResearchDevelopment />

        {/* 6. Dynamic Tech Stack Category Layers */}
        <TechStack />

        {/* 7. Blog & Insights Reader */}
        <BlogInsights />

        {/* 8. Position Careers application flow */}
        <Careers />

        {/* 8.5 Future City CTA */}
        <FutureCityCTA onNavigate={handleNavigate} />

        {/* 9. Contact coordinates and Sweep Radar */}
        <ContactSec />

      </main>

      {/* Corporate footer */}
      <footer className="relative z-10 border-t border-gray-100 bg-[#FAFBFD] py-16 text-left font-display text-gray-650">
        {/* Soft background halo */}
        <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-[#4F46E5]/3 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Info brand & Social Icons (4 cols) */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#4F46E5]/15">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-[#111827] text-lg tracking-wider block">ASTRIX</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-light max-w-sm">
              Engineering the Future through advanced technology, healthcare integrations, and smart systems diagnostics.
            </p>

            {/* Micro Social icons stack */}
            <div className="flex gap-2">
              {['Twitter', 'LinkedIn', 'YouTube', 'Facebook', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-[#4F46E5]/5 text-gray-500 hover:text-[#4F46E5] border border-gray-200/60 text-[10px] font-sans font-medium tracking-wide transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Directory links (2 cols) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display text-xs text-gray-900 uppercase tracking-widest font-bold">Company</h4>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              {[
                { label: 'About Us', id: 'about' },
                { label: 'Our Team', id: 'about' },
                { label: 'Careers', id: 'careers' },
                { label: 'Blog', id: 'insights' },
                { label: 'Contact Us', id: 'contact' }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className="hover:text-[#4F46E5] hover:underline transition-all cursor-pointer block text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries & Labs links (2 cols) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display text-xs text-gray-900 uppercase tracking-widest font-bold">Industries</h4>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              {[
                { label: 'Technology', id: 'services' },
                { label: 'Healthcare', id: 'services' },
                { label: 'Engineering', id: 'services' },
                { label: 'AI & Innovation', id: 'services' }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className="hover:text-[#4F46E5] hover:underline transition-all cursor-pointer block text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3.5: Resources links (2 cols) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display text-xs text-gray-900 uppercase tracking-widest font-bold">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              {[
                { label: 'Case Studies', id: 'insights' },
                { label: 'Research Lab', id: 'rd' },
                { label: 'News & Insights', id: 'insights' },
                { label: 'FAQs', id: 'contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className="hover:text-[#4F46E5] hover:underline transition-all cursor-pointer block text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (2 cols) */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="font-display text-xs text-gray-900 uppercase tracking-widest font-bold">Get In Touch</h4>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              <li>
                <a href="mailto:hello@astrixinnovations.com" className="hover:text-[#4F46E5] transition-all block text-left break-all">
                  hello@astrixinnovations.com
                </a>
              </li>
              <li>
                <a href="tel:+12025550147" className="hover:text-[#4F46E5] transition-all block text-left">
                  +1 (202) 555-0147
                </a>
              </li>
              <li className="text-gray-400 mt-2 block pt-1 border-t border-gray-100">
                Global Presence
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-12 border-t border-gray-200/65 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Astrix Innovations. All Rights Reserved.</p>
          
          <div className="flex gap-4.5 text-xs text-gray-400">
            <a href="#" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#4F46E5] transition-colors">Terms & Conditions</a>
          </div>

          <button
            onClick={() => handleNavigate('home')}
            className="group px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 hover:text-[#4F46E5] border border-gray-200/80 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium text-gray-500"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-[#4F46E5]" />
          </button>
        </div>
      </footer>

      {adminOpen && (
        <AdminDashboard onClose={() => setAdminOpen(false)} />
      )}
    </div>
  );
}

