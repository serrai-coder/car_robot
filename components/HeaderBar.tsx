import React, { useState, useEffect } from 'react';

const HeaderBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show the header bar after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleScrollToOffer = () => {
        const offerSection = document.getElementById('offer');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
                
                {/* Product Name & Icon */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">AI</div>
                    <h2 className="text-sm md:text-lg font-heading font-black text-slate-900 truncate">
                        روبوت المعطر الذكي
                    </h2>
                </div>

                {/* Status & CTA */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase">متوفر حالياً</span>
                    </div>

                    <button
                        onClick={handleScrollToOffer}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-heading font-black py-2 px-6 rounded-xl shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all whitespace-nowrap"
                    >
                        اطلب الآن
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;