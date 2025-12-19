
import React from 'react';
import OrderForm from './OrderForm';

const SpecialOffer: React.FC<{ onOrderSuccess: any }> = ({ onOrderSuccess }) => {
    return (
        <section id="offer" className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">
                    <div className="lg:w-2/5 p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center text-center relative overflow-hidden">
                        {/* Light Decoration */}
                        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-6 border border-white/20 uppercase tracking-widest">
                                ⏳ عرض محدود جداً
                            </span>
                            <div className="text-3xl line-through text-white/50 mb-2 font-black">6,900 دج</div>
                            <div className="text-sm text-white/70 font-bold mb-1 uppercase tracking-tighter">ابتداءً من</div>
                            <div className="text-6xl font-black mb-6 text-white drop-shadow-lg">3,400 <span className="text-xl">دج</span></div>
                            
                            <div className="space-y-4 mb-8">
                                <p className="text-white font-bold">التوصيل لـ 58 ولاية</p>
                                <div className="h-px bg-white/20 w-24 mx-auto"></div>
                                <p className="text-emerald-300 font-bold">الدفع عند الاستلام</p>
                            </div>

                            <div className="p-4 bg-black/10 rounded-2xl backdrop-blur-sm border border-white/10">
                                <p className="text-xs text-white/80 leading-relaxed italic font-medium">
                                    "أفضل استثمار لسيارتك لضمان رائحة ذكية تدوم طويلاً بفضل تقنية استشعار الحركة AI"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/5 p-10">
                        <h3 className="text-2xl font-black mb-6 text-slate-800 border-b border-slate-100 pb-4">أدخل معلوماتك للطلب:</h3>
                        <OrderForm onOrderSuccess={onOrderSuccess} source="Special Offer Diffuser" />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SpecialOffer;
