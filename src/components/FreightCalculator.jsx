import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Plane, 
  Ship, 
  Snowflake, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Package, 
  Sparkles, 
  Truck, 
  Layers, 
  Send,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Tarifas oficiales autorizadas según tarifario Lucero Express
export const TARIFF_ROUTES = [
  {
    id: 'usa-air-ccs',
    origin: 'miami',
    originLabel: 'EE.UU. (Miami)',
    destination: 'ccs',
    destinationLabel: 'Caracas (CCS)',
    mode: 'air',
    modeLabel: 'Aéreo Express',
    rate: 6.20,
    currency: 'USD',
    currencySymbol: '$',
    unit: 'Libras',
    minPrice: 20.00,
    minLabel: 'Mínimo $20 USD',
    transitDays: '3 - 5 Días Hábiles',
  },
  {
    id: 'usa-air-resto',
    origin: 'miami',
    originLabel: 'EE.UU. (Miami)',
    destination: 'resto',
    destinationLabel: 'Resto del País',
    mode: 'air',
    modeLabel: 'Aéreo Express',
    rate: 7.00,
    currency: 'USD',
    currencySymbol: '$',
    unit: 'Libras',
    minPrice: 21.00,
    minLabel: 'Mínimo $21 USD',
    transitDays: '3 - 5 Días Hábiles',
  },
  {
    id: 'usa-sea-central',
    origin: 'miami',
    originLabel: 'EE.UU. (Miami)',
    destination: 'central',
    destinationLabel: 'Caracas - Maracay - Valencia',
    mode: 'sea',
    modeLabel: 'Marítimo LCL',
    rate: 36.50,
    currency: 'USD',
    currencySymbol: '$',
    unit: 'Pie Cúbico',
    minPrice: null,
    minLabel: null,
    transitDays: '14 - 21 Días Hábiles',
  },
  {
    id: 'usa-sea-interior',
    origin: 'miami',
    originLabel: 'EE.UU. (Miami)',
    destination: 'interior',
    destinationLabel: 'Interior del País',
    mode: 'sea',
    modeLabel: 'Marítimo LCL',
    rate: 40.50,
    currency: 'USD',
    currencySymbol: '$',
    unit: 'Pie Cúbico',
    minPrice: null,
    minLabel: null,
    transitDays: '14 - 21 Días Hábiles',
  },
  {
    id: 'esp-air-central',
    origin: 'espana',
    originLabel: 'España',
    destination: 'central',
    destinationLabel: 'Valencia - Caracas - Maracay',
    mode: 'air',
    modeLabel: 'Aéreo Courier',
    rate: 14.00,
    currency: 'EUR',
    currencySymbol: '€',
    unit: 'Kg Volumétrico',
    minPrice: 14.00,
    minLabel: 'Mínimo 1 KG (€14 EUR)',
    transitDays: '5 - 8 Días Hábiles',
  },
  {
    id: 'esp-sea-central',
    origin: 'espana',
    originLabel: 'España',
    destination: 'central',
    destinationLabel: 'Valencia - Caracas - Maracay',
    mode: 'sea',
    modeLabel: 'Marítimo LCL',
    rate: 39.00,
    currency: 'EUR',
    currencySymbol: '€',
    unit: 'Pie Cúbico',
    minPrice: null,
    minLabel: null,
    transitDays: '25 - 35 Días Hábiles',
  },
  {
    id: 'esp-refrig-central',
    origin: 'espana',
    originLabel: 'España',
    destination: 'central',
    destinationLabel: 'Valencia - Caracas - Maracay',
    mode: 'sea',
    isRefrigerated: true,
    modeLabel: 'Marítimo Refrigerado',
    rate: 54.50,
    currency: 'EUR',
    currencySymbol: '€',
    unit: 'Pie Cúbico',
    minPrice: null,
    minLabel: null,
    transitDays: '25 - 35 Días Hábiles',
  }
];

export default function FreightCalculator({ onOpenQuote }) {
  const [shippingType, setShippingType] = useState('air'); // 'air' or 'sea'
  const [isRefrigerated, setIsRefrigerated] = useState(false); // Casilla refrigerada
  const [origin, setOrigin] = useState('miami'); // 'miami' or 'espana'
  const [destination, setDestination] = useState('ccs');
  const [weight, setWeight] = useState(10); // in kg
  const [length, setLength] = useState(40); // in cm
  const [width, setWidth] = useState(30);  // in cm
  const [height, setHeight] = useState(30); // in cm

  // Additional Services (do not alter base tariff)
  const [repackRequested, setRepackRequested] = useState(false);
  const [pickupRequested, setPickupRequested] = useState(false);
  const [consolidationRequested, setConsolidationRequested] = useState(true);
  const [dispatchRequested, setDispatchRequested] = useState(true);

  // Available destinations dynamically filtered based on origin & shippingType
  const availableDestinations = useMemo(() => {
    if (origin === 'espana') {
      return [{ id: 'central', label: 'Valencia - Caracas - Maracay' }];
    }
    if (shippingType === 'air') {
      return [
        { id: 'ccs', label: 'Caracas (CCS)' },
        { id: 'resto', label: 'Resto del País' }
      ];
    }
    return [
      { id: 'central', label: 'Caracas - Maracay - Valencia' },
      { id: 'interior', label: 'Interior del País' }
    ];
  }, [origin, shippingType]);

  // Handle origin change
  const handleOriginChange = (newOrigin) => {
    setOrigin(newOrigin);
    if (newOrigin === 'miami') {
      setDestination(shippingType === 'air' ? 'ccs' : 'central');
    } else {
      setDestination('central');
    }
  };

  // Handle mode change
  const handleModeChange = (newMode) => {
    setShippingType(newMode);
    if (origin === 'miami') {
      setDestination(newMode === 'air' ? 'ccs' : 'central');
    } else {
      setDestination('central');
    }
  };

  // Determine active route and pricing
  const activeRoute = useMemo(() => {
    if (origin === 'espana' && shippingType === 'sea' && isRefrigerated) {
      return TARIFF_ROUTES.find(r => r.id === 'esp-refrig-central');
    }
    return (
      TARIFF_ROUTES.find(
        r => r.origin === origin && r.mode === shippingType && r.destination === destination && !r.isRefrigerated
      ) ||
      TARIFF_ROUTES.find(r => r.origin === origin && r.mode === shippingType && !r.isRefrigerated) ||
      TARIFF_ROUTES[0]
    );
  }, [origin, shippingType, destination, isRefrigerated]);

  // Tariff calculation
  const calculateEstimate = () => {
    const volWeightKg = (length * width * height) / 5000;
    const cuft = (length * width * height) / 28316.8466;
    const cbm = (length * width * height) / 1000000;

    let chargeableUnits = 0;
    let unitName = activeRoute.unit;
    let rawCost = 0;
    let minApplied = false;

    if (activeRoute.unit === 'Libras') {
      // USA Air: 1 kg = 2.20462 lbs
      const weightLbs = weight * 2.20462;
      const volWeightLbs = volWeightKg * 2.20462;
      chargeableUnits = Math.max(weightLbs, volWeightLbs);
      rawCost = chargeableUnits * activeRoute.rate;
      if (activeRoute.minPrice && rawCost < activeRoute.minPrice) {
        minApplied = true;
        rawCost = activeRoute.minPrice;
      }
    } else if (activeRoute.unit === 'Kg Volumétrico') {
      // España Air
      const effectiveKg = Math.max(weight, volWeightKg);
      chargeableUnits = Math.max(1, effectiveKg);
      rawCost = chargeableUnits * activeRoute.rate;
      if (effectiveKg < 1) {
        minApplied = true;
      }
    } else {
      // Pie Cúbico (Marítimo & Refrigerado)
      chargeableUnits = Math.max(0.1, cuft);
      rawCost = chargeableUnits * activeRoute.rate;
    }

    const totalFormatted = Number(rawCost.toFixed(2));

    let displayModeLabel = activeRoute.modeLabel;
    if (isRefrigerated) {
      displayModeLabel = shippingType === 'sea' ? 'Marítimo Refrigerado' : 'Aéreo Refrigerado';
    }

    return {
      route: activeRoute,
      displayModeLabel,
      volWeightKg: volWeightKg.toFixed(1),
      cuft: cuft.toFixed(2),
      cbm: cbm.toFixed(2),
      chargeableUnits: chargeableUnits.toFixed(2),
      unitName,
      total: totalFormatted,
      minApplied,
      days: activeRoute.transitDays,
      currency: activeRoute.currency,
      currencySymbol: activeRoute.currencySymbol,
      rate: activeRoute.rate
    };
  };

  const est = calculateEstimate();

  const getSelectedServicesList = () => {
    const list = [];
    if (isRefrigerated) list.push('Carga Refrigerada');
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
      isRefrigerated,
      origin: activeRoute.originLabel,
      destination: activeRoute.destinationLabel,
      serviceName: est.displayModeLabel,
      weight,
      length,
      width,
      height,
      estimatedCost: est.total,
      currency: est.currency,
      currencySymbol: est.currencySymbol,
      unit: est.unitName,
      additionalServices: getSelectedServicesList()
    });
  };

  return (
    <div id="calculadora" className="w-full max-w-4xl mx-auto font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl relative overflow-hidden">

        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

        {/* Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-200 relative z-10">
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
                Calcula tu tarifa estimada
              </h3>
            </div>
          </div>

          {/* Mode Toggle Tabs (Aéreo / Marítimo) */}
          <div className="bg-stone-100 p-1 rounded-2xl border border-stone-200 flex items-center gap-1 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => handleModeChange('air')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
              onClick={() => handleModeChange('sea')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold text-sm focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="miami">🇺🇸 EE.UU. (Miami)</option>
                  <option value="espana">🇪🇸 España</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Destino Autorizado
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-semibold text-sm focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20 focus:outline-none transition-all cursor-pointer"
                >
                  {availableDestinations.map(d => (
                    <option key={d.id} value={d.id}>
                      📍 {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Casilla de Carga Refrigerada integrada */}
            <div 
              onClick={() => setIsRefrigerated(!isRefrigerated)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                isRefrigerated 
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-950' 
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isRefrigerated ? 'bg-cyan-600 text-white' : 'bg-stone-200 text-stone-500'
                }`}>
                  <Snowflake className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">
                    Carga Refrigerada (Cadena de Frío)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {origin === 'espana' && shippingType === 'sea' 
                      ? 'Tarifa especial refrigerada: €54.50 EUR / Pie Cúbico' 
                      : 'Manejo con control térmico garantizado'}
                  </span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                isRefrigerated ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-stone-300 bg-white'
              }`}>
                {isRefrigerated && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* Weight & Dimensions Box */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Dimensiones y Peso
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {activeRoute.unit === 'Libras' 
                    ? `≈ ${(weight * 2.20462).toFixed(1)} Lbs` 
                    : activeRoute.unit === 'Pie Cúbico'
                    ? `≈ ${est.cuft} Cuft`
                    : `≈ ${est.volWeightKg} Kg Vol`}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-amber-700 uppercase mb-0.5 whitespace-nowrap">
                    Peso (Kg)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    max="3000"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(0.1, Number(e.target.value)))}
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
                    onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
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
                    onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
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
                    onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
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

          {/* Right Column: Live Result Box */}
          <div className="md:col-span-5 bg-[#1C1917] text-white p-5 sm:p-6 rounded-2xl border border-stone-800 flex flex-col justify-between relative shadow-lg">
            
            <div className="space-y-4">
              
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  Estimación Inmediata
                </span>
                <span className="text-[11px] bg-amber-500/20 text-amber-300 font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap shrink-0">
                  {est.displayModeLabel}
                </span>
              </div>

              {/* Price Block */}
              <div className="my-2 text-left">
                <span className="text-stone-400 text-xs font-medium block mb-0.5">
                  Costo Estimado de Envío
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#F2A900] text-2xl sm:text-3xl font-extrabold">
                    {est.currencySymbol}
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                    {est.total}
                  </span>
                  <span className="text-stone-400 text-sm font-bold ml-1">
                    {est.currency}
                  </span>
                </div>

                {est.minApplied && (
                  <p className="text-[11px] text-amber-400 mt-1 font-semibold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Aplica tarifa mínima para esta ruta ({activeRoute.minLabel})
                  </p>
                )}

                <p className="text-[11px] text-emerald-400 mt-1.5 font-semibold flex items-center gap-1">
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
                  <span className="text-stone-400">Tarifa Base:</span>
                  <span className="font-bold text-stone-200">
                    {est.currencySymbol}{est.rate.toFixed(2)} {est.currency} / {est.unitName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Unidad Facturable:</span>
                  <span className="font-bold text-amber-300">
                    {est.chargeableUnits} {est.unitName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Volumen Calculado:</span>
                  <span className="font-bold text-white">
                    {est.cuft} Cuft ({est.cbm} CBM)
                  </span>
                </div>
              </div>

              {/* Selected Services Tags */}
              <div className="text-[11px] text-stone-400 space-y-1">
                <span className="font-semibold block text-stone-300">Servicios incluidos en cotización:</span>
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
                className="btn-primary w-full justify-center py-3 text-sm font-bold shadow-lg cursor-pointer"
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
