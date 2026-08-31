import React from 'react';
import { Ship, Plane, Box, FileCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function Services({ onOpenQuote }) {
  const services = [
    {
      id: 'lcl',
      title: 'Consolidado Marítimo (LCL)',
      description: 'Paga solo por el espacio que ocupa tu mercancía (CBM). Ideal para cargas de volumen medio y pesado sin necesidad de contenedor completo.',
      target: 'Importadores, Pymes, Maquinaria y Cargas Pesadas.',
      icon: Ship,
      tag: 'Máximo Ahorro por CBM',
      features: [
        'Tarifas altamente competitivas por metro cúbico (CBM)',
        'Salidas semanales garantizadas desde China (Yiwu) y Miami',
        'Consolidación segura y estibado protector'
      ]
    },
    {
      id: 'aereo',
      title: 'Consolidado Aéreo Express',
      description: 'Envíos de máxima urgencia para paquetería, muestras comerciales e inventario de alta rotación con entrega en 3 a 5 días hábiles.',
      target: 'E-commerce, Muestras Médicas, Repuestos, Tecnología.',
      icon: Plane,
      tag: 'Tránsito Ultra Rápido (3-5 Días)',
      features: [
        'Entrega garantizada de 3 a 5 días hábiles',
        'Seguimiento paso a paso por número de guía',
        'Despacho prioritario en bodega'
      ]
    },
    {
      id: 'casillero',
      title: 'Casillero & Reempaque Gratis',
      description: 'Asignación de casillero en Miami y Yiwu. Recibimos tus compras de múltiples proveedores, consolidamos y reempacamos.',
      target: 'Compras Personales, Shoppers, Pequeños Emprendedores.',
      icon: Box,
      tag: 'Reducción de Volumen hasta 22%',
      features: [
        'Dirección física de almacén sin costo mensual',
        'Consolidación de paquetes múltiples en una sola caja',
        'Reempaque profesional que reduce el costo volumétrico'
      ]
    },
    {
      id: 'aduanas',
      title: 'Nacionalización & Aduana Door-to-Door',
      description: 'Gestión documental completa, desaduanamiento legal, pago de aranceles e impuestos 100% incluidos en una tarifa transparente.',
      target: 'Empresas, Corporaciones e Importadores Frecuentes.',
      icon: FileCheck,
      tag: 'Todo Incluido en Una Tarifa',
      features: [
        'Desaduanamiento legal sin retrasos ni costos ocultos',
        'Gestión documental arancelaria completa',
        'Entrega final en domicilio u oficina en Venezuela'
      ]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white border-t border-stone-200">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
            Soluciones Adaptadas a Tu Negocio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] font-heading">
            Nuestros Servicios Especializados
          </h2>
          <p className="text-stone-600 text-base mt-3">
            Flexibilidad total en cargas consolidadas aéreas y marítimas con la garantía operativa de Lucero Express.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.id} 
                className="bg-[#FAFAFA] border border-stone-200 rounded-3xl p-7 sm:p-9 hover:border-[#F2A900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Amber Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full -z-0 group-hover:bg-[#F2A900]/20 transition-colors" />

                <div className="relative z-10">
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C1917] text-[#F2A900] flex items-center justify-center shadow-md group-hover:bg-[#F2A900] group-hover:text-[#1C1917] transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full border border-amber-200">
                      {s.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#1C1917] font-heading mb-3 group-hover:text-[#F2A900] transition-colors">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>

                  {/* Ideal for box */}
                  <div className="bg-white border border-stone-200 p-3.5 rounded-2xl mb-6 shadow-sm">
                    <span className="text-[11px] font-bold text-amber-700 block uppercase tracking-wider mb-0.5">
                      Ideal para:
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      {s.target}
                    </span>
                  </div>

                  {/* Bullet checklist */}
                  <ul className="space-y-2.5 mb-8">
                    {s.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-stone-200 relative z-10">
                  <button
                    onClick={() => onOpenQuote({ serviceName: s.title })}
                    className="w-full py-3.5 px-4 rounded-xl border border-[#1C1917] text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Cotizar {s.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
