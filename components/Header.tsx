
import React from 'react';

const Header: React.FC<{ onOrderSuccess: any }> = () => {
  const scrollToOffer = () => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="relative bg-white py-16 lg:py-24 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Effect - Brighter & More Luminous */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-50/50 blur-[120px] rounded-full"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs mb-8">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    L'Original: Smart AI Car Fragrance 2025
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-heading font-black text-slate-900 leading-tight mb-6">
                    كرهت من المعطرات لي يخلصو في يومين؟ <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    اكتشف ذكاء الروبوت AI
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    تقنية الـ <span className="text-blue-600 font-bold">Vibration Sensor</span> المتطورة. 
                    يفحفح غير كي تمشي الطوموبيل، ويوفر العطر كي تحبس. ذكاء اصطناعي في خدمة سيارتك.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    <button onClick={scrollToOffer} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-12 rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95 text-lg">
                        اطلب الآن (تخفيض حصري)
                    </button>
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                            <span>توصيل سريع 58 ولاية</span>
                        </div>
                        <span className="text-slate-400 text-xs px-1 font-medium">الدفع عند الاستلام بعد المعاينة</span>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative">
                <div className="absolute inset-0 bg-blue-400/10 blur-[100px] rounded-full"></div>
                <img src="/images/black.png" alt="Smart Robot Diffuser" className="relative z-10 w-full max-w-md float-animation drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]" />
            </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
