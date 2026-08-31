import React from 'react';
import LuceroLogo from './LuceroLogo';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Globe, MessageCircle } from 'lucide-react';

export default function Footer({ onOpenQuote }) {
  return (
    <footer id="contacto" className="bg-[#1C1917] text-white pt-16 pb-12 border-t border-stone-800 relative overflow-hidden">

      {/* Background Decorative SVG Watermark */}
      <div className="absolute right-[-100px] bottom-[-100px] opacity-[0.03] pointer-events-none select-none">
        <img src="/SVG/ISOLOGO.svg" alt="Footer Watermark" className="w-[600px] h-auto" />
      </div>

      <div className="container relative z-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">

          {/* Col 1 & 2: Brand Overview */}
          <div className="lg:col-span-2 space-y-4">
            <LuceroLogo variant="light" size="medium" type="horizontal" />

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm pt-2">
              Puente logístico entre China, EE.UU. y Venezuela. Especialistas en envíos consolidados LCL y paquetería aérea express con gestión aduanal 100% incluida.
            </p>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/584223002525"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors no-underline shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atención WhatsApp: +58 422 3002525</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              {/* Instagram -> @lucero.express */}
              <a
                href="https://www.instagram.com/lucero.express/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram @lucero.express"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 flex items-center justify-center hover:bg-[#F2A900] hover:text-[#1C1917] transition-colors group"
                title="@lucero.express"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <span className="text-xs text-amber-400 font-semibold">@lucero.express</span>
            </div>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-sm font-bold font-heading text-[#F2A900] uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#hero" className="hover:text-[#F2A900] transition-colors no-underline">Inicio & Cotizador</a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-[#F2A900] transition-colors no-underline">Tarifas de Flete</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#F2A900] transition-colors no-underline">Servicios LCL & Aéreo</a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-[#F2A900] transition-colors no-underline">Proceso 4 Etapas</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F2A900] transition-colors no-underline">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Servicios */}
          <div>
            <h4 className="text-sm font-bold font-heading text-[#F2A900] uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>Consolidado Marítimo LCL</li>
              <li>Consolidado Aéreo Express</li>
              <li>Bodega & Casillero Miami</li>
              <li>Reempaque & Foto-validación</li>
              <li>Nacionalización & Aduanas</li>
            </ul>
          </div>

          {/* Col 5: Oficinas & Contacto */}
          <div>
            <h4 className="text-sm font-bold font-heading text-[#F2A900] uppercase tracking-wider mb-4">
              Bodegas & Contacto
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
                <span><strong>Venezuela:</strong> Valencia, Carabobo</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#F2A900] shrink-0" />
                <a href="https://wa.me/584223002525" target="_blank" rel="noreferrer" className="hover:text-[#F2A900] text-stone-300 no-underline font-medium">
                  +58 422 3002525
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F2A900] shrink-0" />
                <a href="mailto:info@lucero.com.ve" className="hover:text-[#F2A900] text-stone-300 no-underline font-medium">
                  info@lucero.com.ve
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Lucero Express. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
          </div>
        </div>

      </div>
    </footer>
  );
}
