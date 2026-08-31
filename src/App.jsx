import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Services from './components/Services';
import Process from './components/Process';
import Faq from './components/Faq';
import Footer from './components/Footer';
import TrackingModal from './components/TrackingModal';
import QuoteModal from './components/QuoteModal';

export default function App() {
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const handleOpenTracking = () => {
    setTrackingModalOpen(true);
  };

  const handleOpenQuote = (data = null) => {
    setQuoteData(data);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917] flex flex-col font-sans selection:bg-[#F2A900] selection:text-[#242220]">
      {/* Navigation */}
      <Navbar 
        onOpenTracking={handleOpenTracking} 
        onOpenQuote={handleOpenQuote} 
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section 1: Hero + Freight Calculator */}
        <Hero 
          onOpenTracking={handleOpenTracking} 
          onOpenQuote={handleOpenQuote} 
        />

        {/* Section 2: Social Proof & Metrics */}
        <Metrics />

        {/* Section 3: Specialized Services (LCL & Express Air) */}
        <Services 
          onOpenQuote={handleOpenQuote} 
        />

        {/* Section 4: 4-Step Process */}
        <Process 
          onOpenQuote={handleOpenQuote} 
        />

        {/* Section 5: GEO/AIO FAQ Engine */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTracking={handleOpenTracking} 
        onOpenQuote={handleOpenQuote} 
      />

      {/* Interactive Modals */}
      <TrackingModal 
        isOpen={trackingModalOpen} 
        onClose={() => setTrackingModalOpen(false)} 
      />

      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        quoteData={quoteData} 
      />
    </div>
  );
}
