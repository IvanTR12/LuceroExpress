import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuoteModal({ isOpen, onClose, quoteData }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const servicesText = quoteData?.additionalServices && quoteData.additionalServices.length > 0
    ? quoteData.additionalServices.join(', ')
    : 'Servicio Estándar';

  const whatsappMessage = encodeURIComponent(
    `Hola Lucero Express! Quisiera confirmar una cotización de envío:\n` +
    `- Cliente: ${formData.name || 'Interesado'}\n` +
    `- Servicio/Carga: ${quoteData?.serviceName || (quoteData?.shippingType === 'sea' ? 'Consolidado Marítimo LCL' : 'Consolidado Aéreo Express')}\n` +
    `- Origen/Destino: ${quoteData?.origin || 'China'} -> ${quoteData?.destination || 'Valencia'}\n` +
    `- Servicios Adicionales: ${servicesText}\n` +
    `- Estimado: $${quoteData?.estimatedCost || 'Tarifa Personalizada'} USD\n` +
    `Por favor contáctenme.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242220]/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1C1917] border border-[#F2A900]/40 lucero-glow text-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white bg-[#242220] p-2 rounded-full border border-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F2A900] text-[#242220] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Cotización de Envío Lucero
                </h3>
                <p className="text-xs text-stone-400">
                  {quoteData?.serviceName ? `Servicio: ${quoteData.serviceName}` : 'Completa tus datos para enviarte la tarifa oficial por WhatsApp/Email.'}
                </p>
              </div>
            </div>

            {quoteData?.estimatedCost && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl mb-5 flex items-center justify-between text-xs">
                <span className="text-stone-300">Estimación preliminar:</span>
                <span className="text-amber-400 font-extrabold text-base">${quoteData.estimatedCost} USD</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Nombre Completo / Empresa
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full bg-[#242220] border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#F2A900] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  WhatsApp / Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+58 412 123 4567"
                  className="w-full bg-[#242220] border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#F2A900] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="carlos@empresa.com"
                  className="w-full bg-[#242220] border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#F2A900] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Detalles Adicionales de la Carga (Opcional)
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ej. 2 cajas con repuestos de automoción desde Miami..."
                  className="w-full bg-[#242220] border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#F2A900] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-3.5 text-sm mt-2"
              >
                <span>Enviar y Recibir Cotización</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-[#242220] mx-auto flex items-center justify-center font-bold">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              ¡Solicitud Recibida con Éxito!
            </h3>
            <p className="text-sm text-stone-300 max-w-sm mx-auto">
              Un asesor de **Lucero Express** se pondrá en contacto contigo en los próximos minutos con tu propuesta personalizada.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/584223002525?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 no-underline text-sm shadow-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contactar Directo por WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="btn-secondary-dark w-full py-2.5 text-xs text-center justify-center"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
