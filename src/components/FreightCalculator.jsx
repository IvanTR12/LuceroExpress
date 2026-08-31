import React, { useState } from 'react';
import { Calculator, Plane, Ship, ShieldCheck, ArrowRight, Zap, CheckCircle2, Package, Sparkles, Truck, Layers, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreightCalculator({ onOpenQuote }) {
  const [shippingType, setShippingType] = useState('air'); // 'air' or 'sea'
  const [origin, setOrigin] = useState('china');
  const [destination, setDestination] = useState('valencia');
  const [weight, setWeight] = useState(15);
  const [length, setLength] = useState(40);
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(30);

  // Additional Services States (Selectable, passed to quote/WhatsApp without altering base price)
  const [repackRequested, setRepackRequested] = useState(false);
  const [pickupRequested, setPickupRequested] = useState(false);
  const [consolidationRequested, setConsolidationRequested] = useState(true);
  const [dispatchRequested, setDispatchRequested] = useState(true);

  // Base rate estimation (does not change price when repack or extra services are checked)
  const calculateEstimate = () => {
    // Volumetric weight: (L * W * H) / 5000 in kg
    const volWeight = (length * width * height) / 5000;
    const effectiveWeight = Math.max(weight, volWeight);

    let baseRate = 0;
    let days = '';
    
    if (shippingType === 'air') {
      const ratePerKg = origin === 'china' ? 9.50 : origin === 'madrid' ? 8.20 : 6.80;
      baseRate = effectiveWeight * ratePerKg;
      days = '3 - 5 Días Hábiles';
    } else {
      const cuft = (length * width * height) / 28316.8;
      const effectiveCuft = Math.max(cuft, 2);
      const ratePerCuft = origin === 'china' ? 24 : origin === 'miami' ? 18 : 22;
      baseRate = effectiveCuft * ratePerCuft;
      days = '14 - 21 Días Hábiles';
    }

    const customsFee = 12.00;
    const total = Math.max(25, Math.round(baseRate + customsFee));

    return {
      volWeight: volWeight.toFixed(1),
      effectiveWeight: effectiveWeight.toFixed(1),
      cbm: Math.max(0.05, ((length * width * height) / 1000000)).toFixed(2),
      total,
      days,
    };
  };

  const est = calculateEstimate();

  // Helper to compile list of selected extra services
  const getSelectedServicesList = () => {
    const list = [];
    if (consolidationRequested) list.push('Consolidación de Carga');
    if (dispatchRequested) list.push('Despacho de Carga');
    if (repackRequested) list.push('Reempaque de Carga');
    if (pickupRequested) list.push('Recogida en Origen');
    return list;
  };

  const handleAction = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    onOpenQuote({
      shippingType,
      origin,
      destination,
      weight,
      length,
      width,
      height,
      estimatedCost: est.total,
      additionalServices: getSelectedServicesList()
    });
  };

  return (
    <div id="calculadora" className="w-full max-w-4xl mx-auto font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl relative overflow-hidden">

        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

        {/* Title Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-stone-200 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1917] text-[#F2A900] flex items-center justify-center font-bold shadow-md shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="badge-pill mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F2A900]" />
                Cotizador Rápido de Flete
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] font-heading tracking-tight">
                Calcula tu tarifa sin sorpresas
              </h3>
            </div>
          </div>

          {/* Mode Toggle Tabs */}
          <div className="bg-stone-100 p-1 rounded-2xl border border-stone-200 flex items-center gap-1 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setShippingType('air')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                shippingType === 'air'
                  ? 'bg-[#F2A900] text-[#1C1917] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Aéreo Express</span>
            </button>
            <button
              type="button"
              onClick={() => setShippingType('sea')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                shippingType === 'sea'
                  ? 'bg-[#F2A900] text-[#1C1917] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>Marítimo LCL</span>
            </button>
          </div>
        </div>

        {/* Form Inputs & Result Grid */}
        <form onSubmit={handleAction} className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 items-stretch">

          {/* Left Column: Form Controls */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">

            {/* Origin & Destination Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Origen de la Carga
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold text-sm focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20 focus:outline-none transition-all"
                >
                  <option value="china">🇨🇳 China (Yiwu / Guangzhou)</option>
                  <option value="miami">🇺🇸 EE.UU. (Miami Doral)</option>
                  <option value="panama">🇵🇦 Panamá</option>
                  <option value="madrid">🇪🇸 España (Madrid)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Destino en Venezuela
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold text-sm focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20 focus:outline-none transition-all"
                >
                  <option value="valencia">📍 Valencia / Carabobo</option>
                  <option value="caracas">📍 Caracas / La Guaira</option>
                  <option value="door">🚪 Entrega a Domicilio Nacional</option>
                </select>
              </div>
            </div>

            {/* Weight & Dimensions Box */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-amber-700 uppercase mb-0.5 whitespace-nowrap">
                    Peso (Kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="2000"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-900 font-bold text-sm text-center focus:border-[#F2A900] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-0.5 whitespace-nowrap">
                    Largo (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-stone-900 font-semibold text-sm text-center focus:border-[#F2A900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-0.5 whitespace-nowrap">
                    Ancho (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-stone-900 font-semibold text-sm text-center focus:border-[#F2A900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase mb-0.5 whitespace-nowrap">
                    Alto (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-stone-900 font-semibold text-sm text-center focus:border-[#F2A900] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Services Selection Grid */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Servicios Adicionales Requeridos
              </label>

              <div className="grid grid-cols-2 gap-2">
                
                {/* 1. Consolidación de Carga */}
                <div
                  onClick={() => setConsolidationRequested(!consolidationRequested)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    consolidationRequested
                      ? 'bg-amber-500/10 border-amber-400 text-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Layers className={`w-4 h-4 shrink-0 ${consolidationRequested ? 'text-[#F2A900]' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold truncate">Consolidación</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    consolidationRequested ? 'bg-[#F2A900] border-[#F2A900] text-[#1C1917]' : 'border-stone-300 bg-white'
                  }`}>
                    {consolidationRequested && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 2. Despacho de Carga */}
                <div
                  onClick={() => setDispatchRequested(!dispatchRequested)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    dispatchRequested
                      ? 'bg-amber-500/10 border-amber-400 text-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Send className={`w-4 h-4 shrink-0 ${dispatchRequested ? 'text-[#F2A900]' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold truncate">Despacho de Carga</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    dispatchRequested ? 'bg-[#F2A900] border-[#F2A900] text-[#1C1917]' : 'border-stone-300 bg-white'
                  }`}>
                    {dispatchRequested && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 3. Reempaque de Carga */}
                <div
                  onClick={() => setRepackRequested(!repackRequested)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    repackRequested
                      ? 'bg-amber-500/10 border-amber-400 text-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Package className={`w-4 h-4 shrink-0 ${repackRequested ? 'text-[#F2A900]' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold truncate">Reempaque</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    repackRequested ? 'bg-[#F2A900] border-[#F2A900] text-[#1C1917]' : 'border-stone-300 bg-white'
                  }`}>
                    {repackRequested && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* 4. Recogida en Origen */}
                <div
                  onClick={() => setPickupRequested(!pickupRequested)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    pickupRequested
                      ? 'bg-amber-500/10 border-amber-400 text-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Truck className={`w-4 h-4 shrink-0 ${pickupRequested ? 'text-[#F2A900]' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold truncate">Recogida en Origen</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    pickupRequested ? 'bg-[#F2A900] border-[#F2A900] text-[#1C1917]' : 'border-stone-300 bg-white'
                  }`}>
                    {pickupRequested && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Live Result Box (Compact & Well-Packed) */}
          <div className="md:col-span-5 bg-[#1C1917] text-white p-5 sm:p-6 rounded-2xl border border-stone-800 flex flex-col justify-between relative shadow-lg">
            
            <div className="space-y-4">
              
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  Estimación Inmediata
                </span>
                {/* Single line "Aduanas Incluidas" pill badge */}
                <span className="text-[11px] bg-amber-500/20 text-amber-300 font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap shrink-0">
                  Aduanas Incluidas
                </span>
              </div>

              {/* Price Block */}
              <div className="my-2 text-left">
                <span className="text-stone-400 text-xs font-medium block mb-0.5">Costo Estimado Aproximado</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#F2A900] text-2xl font-extrabold">$</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                    {est.total}
                  </span>
                  <span className="text-stone-400 text-xs font-semibold ml-1">USD</span>
                </div>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Garantía de Tarifa Transparente
                </p>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs text-stone-300 bg-stone-900/90 p-3 rounded-xl border border-stone-800">
                <div className="flex justify-between">
                  <span className="text-stone-400">Tiempo de Tránsito:</span>
                  <span className="font-bold text-white">{est.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Volumen Estimado:</span>
                  <span className="font-bold text-white">{est.cbm} CBM ({est.volWeight} Kg Vol)</span>
                </div>
              </div>

              {/* Selected Services Tags */}
              <div className="text-[11px] text-stone-400 space-y-1">
                <span className="font-semibold block text-stone-300">Servicios a incluir en cotización:</span>
                <div className="flex flex-wrap gap-1">
                  {getSelectedServicesList().map((serv, i) => (
                    <span key={i} className="bg-stone-800 text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-medium border border-stone-700">
                      ✓ {serv}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="mt-5 pt-2">
              <button
                type="submit"
                className="btn-primary w-full justify-center py-3 text-sm font-bold shadow-lg"
              >
                <span>Reservar Cotización Oficial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
