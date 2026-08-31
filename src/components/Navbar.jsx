import React, { useState, useEffect } from 'react';
import LuceroLogo from './LuceroLogo';
import { Menu, X, ArrowRight, MapPin, Sparkles, MessageCircle } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#1C1917] text-stone-300 text-xs py-2 px-4 border-b border-stone-800 hidden sm:block">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conexión directa China & Miami → Venezuela</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Bodega propia en Yiwu & Miami</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href="https://wa.me/584223002525" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium no-underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +58 422 3002525</span>
            </a>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">Pagas al llegar a Venezuela</span>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-stone-200' 
            : 'bg-white py-4 border-b border-stone-100'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          
          {/* Brand Logo */}
          <a href="#" className="no-underline flex-shrink-0">
            <LuceroLogo variant="dark" size="medium" type="horizontal" />
          </a>

          {/* Desktop Navigation Links - Single line, equidistant, clean spacing */}
          <nav className="hidden lg:flex items-center justify-evenly flex-1 px-4 xl:px-8 whitespace-nowrap">
            <a 
              href="#hero" 
              className="text-stone-700 hover:text-[#F2A900] font-semibold text-sm transition-colors no-underline py-1 relative group whitespace-nowrap"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2A900] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#calculadora" 
              className="text-stone-700 hover:text-[#F2A900] font-semibold text-sm transition-colors no-underline py-1 relative group whitespace-nowrap"
            >
              Tarifas & Cotizador
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2A900] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#servicios" 
              className="text-stone-700 hover:text-[#F2A900] font-semibold text-sm transition-colors no-underline py-1 relative group whitespace-nowrap"
            >
              Servicios LCL & Aéreo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2A900] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#proceso" 
              className="text-stone-700 hover:text-[#F2A900] font-semibold text-sm transition-colors no-underline py-1 relative group whitespace-nowrap"
            >
              Cómo Trabajamos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2A900] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#faq" 
              className="text-stone-700 hover:text-[#F2A900] font-semibold text-sm transition-colors no-underline py-1 relative group whitespace-nowrap"
            >
              Preguntas Frecuentes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2A900] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <a 
              href="#calculadora"
              className="btn-primary text-xs xl:text-sm py-2.5 px-5 whitespace-nowrap"
            >
              <span>Cotizar Envío</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile / Tablet Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <a 
            href="#hero" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-semibold text-base no-underline hover:text-[#F2A900]"
          >
            Inicio
          </a>
          <a 
            href="#calculadora" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-semibold text-base no-underline hover:text-[#F2A900]"
          >
            Tarifas & Cotizador
          </a>
          <a 
            href="#servicios" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-semibold text-base no-underline hover:text-[#F2A900]"
          >
            Servicios LCL & Aéreo
          </a>
          <a 
            href="#proceso" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-semibold text-base no-underline hover:text-[#F2A900]"
          >
            Cómo Trabajamos
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-semibold text-base no-underline hover:text-[#F2A900]"
          >
            Preguntas Frecuentes
          </a>

          <div className="pt-4 border-t border-stone-200">
            <a 
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center justify-center py-3"
            >
              <span>Cotizar Envío Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
