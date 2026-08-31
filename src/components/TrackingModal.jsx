import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, Plane, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TrackingModal({ isOpen, onClose }) {
  const [trackingNumber, setTrackingNumber] = useState('LUC-9842-EX');
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearched(true);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242220]/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Box */}
      <div className="bg-[#1C1917] border border-[#F2A900]/40 lucero-glow text-white w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white bg-[#242220] p-2 rounded-full border border-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F2A900] text-[#242220] flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              Rastreo de Paquete en Tiempo Real
            </h3>
            <p className="text-xs text-stone-400">
              Ingresa tu código de guía o número de consolidado Lucero Express
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ej. LUC-9842-EX"
              className="w-full bg-[#242220] border border-stone-700 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:border-[#F2A900] focus:outline-none uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="btn-primary py-3 px-6 text-sm shrink-0"
          >
            <span>Buscar</span>
          </button>
        </form>

        {/* Tracking Details View */}
        {searched && (
          <div className="bg-[#242220] border border-stone-800 rounded-xl p-5 space-y-6">
            
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                  Número de Guía: {trackingNumber.toUpperCase()}
                </span>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Estado: En Tránsito Aéreo Express</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </h4>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-right">
                <span className="text-[10px] text-stone-400 block">Entrega Estimada</span>
                <span className="text-xs font-bold text-amber-300">Mañana, 10:30 AM</span>
              </div>
            </div>

            {/* Route Summary */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#1C1917] p-3 rounded-lg border border-stone-800">
              <div>
                <span className="text-stone-500 block">Origen:</span>
                <span className="font-semibold text-stone-200">🇺🇸 Miami Warehouse, FL</span>
              </div>
              <div>
                <span className="text-stone-500 block">Destino:</span>
                <span className="font-semibold text-stone-200">📍 Caracas / Delivery Puerta</span>
              </div>
            </div>

            {/* Step-by-Step Timeline */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#242220] flex items-center justify-center font-bold shadow-md">
                    <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="w-0.5 h-10 bg-emerald-500" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">1. Recepción en Almacén Miami</h5>
                  <p className="text-[11px] text-stone-400">Recibido y pesado con foto de comprobación - 24 Jul, 09:15 AM</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#242220] flex items-center justify-center font-bold shadow-md">
                    <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="w-0.5 h-10 bg-emerald-500" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">2. Consolidación y Reempaque Gratis</h5>
                  <p className="text-[11px] text-stone-400">Optimización de volumen completada (Ahorro 2.4 Kg Vol) - 24 Jul, 02:40 PM</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#F2A900] text-[#242220] flex items-center justify-center font-bold shadow-md animate-pulse">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 h-10 bg-stone-700" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-amber-300">3. En Vuelo Internacional (En Curso)</h5>
                  <p className="text-[11px] text-stone-300">Vuelo directo de carga despachado - 25 Jul, 11:20 AM</p>
                </div>
              </div>

              <div className="flex gap-4 relative opacity-60">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 text-stone-400 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-300">4. Desaduanamiento & Entrega Final</h5>
                  <p className="text-[11px] text-stone-500">Programado para entrega directa a domicilio</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
