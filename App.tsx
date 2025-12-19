
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProblemSolution from './components/ProblemSolution';
import HealthBenefits from './components/HealthBenefits';
import ProductDetails from './components/ProductDetails';
import Testimonials from './components/Testimonials';
import SpecialOffer from './components/SpecialOffer';
import { OrderData } from './components/OrderForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';
import HeaderBar from './components/HeaderBar';
import { trackEvent } from './utils/pixel';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'thankyou'>('landing');
  const [submittedOrder, setSubmittedOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (view === 'landing') {
      // Track ViewContent when the landing page loads
      trackEvent('ViewContent');
    }
  }, [view]);

  const handleOrderSuccess = (orderData: OrderData) => {
    setSubmittedOrder(orderData);
    setView('thankyou');
    window.scrollTo(0, 0); 
  };

  const handleReturnHome = () => {
    setView('landing'); 
    setSubmittedOrder(null);
  };

  if (view === 'thankyou' && submittedOrder) {
    return <ThankYou order={submittedOrder} onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="bg-white text-slate-800 font-sans antialiased selection:bg-amber-200 selection:text-amber-900">
      <HeaderBar />
      <Header onOrderSuccess={handleOrderSuccess} />
      <main>
        <ProblemSolution />
        <HealthBenefits />
        <ProductDetails />
        <Testimonials />
        <SpecialOffer onOrderSuccess={handleOrderSuccess} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;
