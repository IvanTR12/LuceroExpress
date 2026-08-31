import React from 'react';
import { Package, Warehouse, PlaneTakeoff, Home, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Process({ onOpenQuote }) {
  const stages = [
    {
      num: '01',
      stage: 'Origen China & EE.UU.',
      desc: 'Gestionamos la llegada de tus mercancías desde la fábrica o tienda con inspección inicial.',
      icon: Package,
      highlights: [
        'Inspección de calidad en origen',
        'Verificación de proveedores',
        'Compra y pago asistido'
      ]
    },
    {
      num: '02',
      stage: 'Bodega Yiwu & Miami',
      desc: 'Recepción segura en nuestros almacenes propios para validación, foto-registro y empaque.',
      icon: Warehouse,
      highlights: [
        'Pre-alerta de carga',
        'Foto-validación al recibir',
        'Re-empaque y consolidado LCL'
      ]
    },
    {
      num: '03',
      stage: 'Transporte + Aduana',
      desc: 'Flete internacional aéreo o marítimo con nacionalización e impuestos 100% incluidos.',
      icon: PlaneTakeoff,
      highlights: [
        'Puerta a Puerta (todo pagado)',
        'Salidas semanales garantizadas',
        'Aduana e impuestos incluidos'
      ]
    },
    {
      num: '04',
      stage: 'Tu Puerta en Venezuela',
      desc: 'Entrega final coordinada en tu dirección u oficina con soporte por WhatsApp en tiempo real.',
      icon: Home,
      highlights: [
        'Cobertura nacional',
        'Seguimiento guía a guía',
        'Pagas al recibir la carga'
      ]
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-stone-100/60 border-y border-stone-200 relative overflow-hidden">
      
      {/* Ambient background watermark */}
      <div className="absolute right-10 bottom-10 opacity-[0.03] pointer-events-none hidden lg:block">
        <img src="/SVG/ISOTIPO.svg" alt="Watermark" className="w-96 h-auto" />
      </div>

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
            Transparencia de Principio a Fin
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] font-heading">
            De la fábrica a tu puerta, tu carga pasa por 4 momentos
          </h2>
          <p className="text-stone-600 text-base mt-3">
            Un solo equipo operando en origen y destino para garantizar la máxima seguridad y velocidad en cada etapa.
          </p>
        </div>

        {/* 4-Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {stages.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-stone-200 p-6 sm:p-7 rounded-2xl relative hover:border-[#F2A900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-heading text-[#F2A900] bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      ETAPA {st.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#1C1917] text-[#F2A900] flex items-center justify-center group-hover:bg-[#F2A900] group-hover:text-[#1C1917] transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1C1917] mb-2 font-heading group-hover:text-[#F2A900] transition-colors">
                    {st.stage}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {st.desc}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 pt-3 border-t border-stone-100">
                    {st.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile / Tablet connecting arrow indicator */}
                {idx < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 bg-[#F2A900] text-[#1C1917] rounded-full p-1 shadow-md">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 bg-white text-[#1C1917] p-5 sm:px-8 sm:py-5 rounded-2xl border border-stone-200 shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F2A900] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#F2A900]" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base text-[#1C1917]">¿Tienes dudas sobre cómo enviar tu primera carga?</p>
                <p className="text-xs text-stone-500">Asesoría gratuita personalizada de 24h para importadores y emprendedores.</p>
              </div>
            </div>
            <a 
              href="#calculadora"
              className="btn-primary py-2.5 px-6 text-sm shrink-0 whitespace-nowrap"
            >
              <span>Cotizar Envío Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
