import React from 'react';
import FreightCalculator from './FreightCalculator';
import { ShieldCheck, ArrowRight, Search, CheckCircle2, Sparkles, Box, Shield, Plane } from 'lucide-react';

export default function Hero({ onOpenTracking, onOpenQuote }) {
  return (
    <section id="hero" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-stone-100/70 via-white to-[#FAFAFA] overflow-hidden text-[#1C1917]">
      
      {/* Background Decorative Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-200/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Logo Watermark in Background */}
      <div className="absolute right-[-80px] top-28 opacity-[0.04] pointer-events-none hidden lg:block select-none">
        <img src="/SVG/ISOTIPO.svg" alt="Watermark" className="w-[580px] h-auto" />
      </div>

      <div className="container relative z-10">
        
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          
          {/* Top Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-[#1C1917] text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F2A900]" />
            <span>Puerta a Puerta China & EE.UU. → Venezuela</span>
          </div>

          {/* Main Title (H1) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-[#1C1917] font-heading tracking-tight">
            Con Confianza, de Origen a tu Puerta <br className="hidden sm:inline" />
            <span className="text-[#F2A900] relative inline-block">
              en Venezuela
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F2A900]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-stone-600 text-base sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
            Servicio integral de logística con recepción, inspección, consolidación, aduana, impuestos y entrega final coordinados por un solo equipo, de principio a fin.
          </p>

          {/* CTAs Dual Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a 
              href="#calculadora" 
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto text-center justify-center shadow-lg hover:shadow-amber-500/20"
            >
              <span>Cotizar Mi Envío</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a 
              href="#servicios" 
              className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto text-center justify-center"
            >
              <span>Ver Nuestros Servicios</span>
            </a>
          </div>

          {/* Trust Value Badges Grid */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-stone-700 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-white/80 px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
              <span>Puerta a puerta todo incluido</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
              <span>Aduana e impuestos pagados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
              <span>Casillero & Reempaque gratis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F2A900]" />
              <span>Pagas al llegar</span>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Freight Calculator */}
        <div className="mt-6">
          <FreightCalculator onOpenQuote={onOpenQuote} />
        </div>

      </div>
    </section>
  );
}
