import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: '¿Qué es un envío consolidado LCL y por qué le conviene a mi negocio?',
      a: 'LCL (Less than Container Load) es el envío de carga consolidada en el que compartes espacio de contenedor con otros importadores. Con Lucero Express solo pagas por los metros cúbicos (CBM) que ocupa tu mercancía, reduciendo costos de flete hasta en un 60% para volúmenes pequeños y medianos.',
    },
    {
      q: '¿Cómo se calcula la tarifa para envíos aéreos express?',
      a: 'El costo se calcula evaluando el peso real en kilogramos versus el peso volumétrico (Largo x Ancho x Alto / 5000). Además, ofrecemos reempaque gratuito en nuestras bodegas de Yiwu y Miami para optimizar tus cajas y cobrarte la menor tarifa posible.',
    },
    {
      q: '¿Lucero Express incluye los trámites aduanales e impuestos?',
      a: 'Sí, todos nuestros servicios consolidados LCL y aéreos ofrecen la opción "Puerta a Puerta todo pagado", que incluye nacionalización, desaduanamiento legal e impuestos sin cobros sorpresa a la entrega.',
    },
    {
      q: '¿Cuáles son los tiempos de tránsito promedio desde China y Miami?',
      a: 'Para envíos aéreos express, el tránsito promedio es de 3 a 5 días hábiles. Para consolidado marítimo LCL, las salidas semanales completan el trayecto en 14 a 21 días desde Miami y 25 a 35 días desde China (Yiwu/Guangzhou).',
    },
    {
      q: '¿Cómo obtengo mi dirección de casillero sin costo?',
      a: 'Al solicitar tu cotización o registrarte en nuestra plataforma, se te asigna inmediatamente una suite de casillero física en nuestros almacenes de Yiwu (China) y Miami (EE.UU.) para que realices tus compras con total comodidad.',
    }
  ];

  return (
    <section id="faq" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-[#F2A900]" />
            <span>Resolvemos Todas Tus Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] font-heading">
            Preguntas Frecuentes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Respuestas claras e inmediatas sobre consolidado LCL, paquetería aérea, casillero y aduanas.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#F2A900] shadow-md ring-1 ring-[#F2A900]/30'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                      isOpen ? 'bg-[#1C1917] text-[#F2A900]' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1917] font-heading">
                      {faq.q}
                    </h3>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-[#1C1917] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#F2A900]' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-stone-700 text-sm sm:text-base leading-relaxed animate-fadeIn">
                    <div className="flex items-start gap-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
                      <Sparkles className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#1C1917] block mb-1">Respuesta Lucero Express:</span>
                        <p className="text-stone-700">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
