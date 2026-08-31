import React from 'react';
import { PackageCheck, Clock, Award, Building2, Sparkles } from 'lucide-react';

export default function Metrics() {
  const metrics = [
    {
      value: '+18,500',
      label: 'Envíos Entregados',
      description: 'Paquetes y m³ de carga consolidada entregados con éxito',
      icon: PackageCheck,
    },
    {
      value: '99.4%',
      label: 'Entregas a Tiempo',
      description: 'Puntualidad garantizada en envíos aéreos y marítimos',
      icon: Award,
    },
    {
      value: '3 - 5 Días',
      label: 'Tránsito Aéreo Promedio',
      description: 'Tiempos récords desde bodega origen a puerta en Venezuela',
      icon: Clock,
    },
    {
      value: '+1,200',
      label: 'Clientes B2B & Pymes',
      description: 'Empresas e importadores recurrentes satisfechos',
      icon: Building2,
    },
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] border-y border-stone-200">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
            Trayectoria & Confianza Comprobada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] font-heading">
            Cifras que Demuestran Nuestra Excelencia Logística
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Construyendo confianza cliente a cliente, contenedor a contenedor.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-stone-200 p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent Watermark Icon */}
                <Icon className="absolute -right-3 -bottom-3 w-28 h-28 text-amber-500/10 group-hover:scale-110 transition-transform pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-[#1C1917] text-[#F2A900] flex items-center justify-center mb-5 shadow-sm group-hover:bg-[#F2A900] group-hover:text-[#1C1917] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-3xl sm:text-4xl font-black text-[#1C1917] font-heading tracking-tight mb-1.5">
                  {m.value}
                </div>

                <h3 className="text-base font-bold text-[#1C1917] mb-1">
                  {m.label}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed font-medium">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
