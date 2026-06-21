import { useState, useEffect } from 'react';
import { Menu, X, Shield, Settings } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onAdminClick: () => void;
}

export default function Navbar({ activeSection, onNavigate, onAdminClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'process', label: 'Pipeline' },
    { id: 'innovations', label: 'Innovations' },
    { id: 'rd', label: 'R&D' },
    { id: 'insights', label: 'Blog' },
    { id: 'careers', label: 'Careers' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav 
      id="astrix-navbar" 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo element configured strictly based on high-end mockups */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full text-[#4F46E5] group-hover:scale-105 transition-transform" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L88 85 L72 85 L50 45 L28 85 L12 85 Z" fill="url(#logo-nav-grad)" />
                <defs>
                  <linearGradient id="logo-nav-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-left">
              <span className="font-sans font-extrabold text-base lg:text-lg tracking-[0.05em] text-gray-900 block leading-none">
                ASTRIX
              </span>
              <span className="font-sans text-[8px] tracking-[0.25em] text-[#4F46E5] font-semibold block uppercase mt-0.5">
                INNOVATIONS
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#4F46E5]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#4F46E5] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Call for Users */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-400 hover:text-[#4F46E5] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              title="System Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2 font-sans text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 py-4 px-3 space-y-1 mt-2 shadow-lg rounded-b-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-sans text-base transition-colors ${
                  isActive
                    ? 'bg-[#4F46E5]/5 text-[#4F46E5] font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 px-4 space-y-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 text-center font-sans text-sm font-semibold bg-[#4F46E5] text-white rounded-lg shadow hover:bg-[#4338CA] transition-all cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                onAdminClick();
                setIsOpen(false);
              }}
              className="w-full py-3 text-center font-sans text-sm font-medium bg-gray-50 text-gray-700 border border-gray-100 rounded-lg shadow hover:bg-gray-100 transition-all cursor-pointer"
            >
              System Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
