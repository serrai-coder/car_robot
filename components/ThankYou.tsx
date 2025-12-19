import React, { useEffect } from 'react';
import { OrderData } from './OrderForm';
import { trackEvent } from '../utils/pixel';

interface ThankYouProps {
    order: OrderData;
    onReturnHome: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ order, onReturnHome }) => {
    useEffect(() => {
        trackEvent('Purchase', {
            value: order.totalPrice,
            currency: 'DZD',
            content_name: 'Smart Robot Diffuser',
            num_items: order.quantity,
            variant: order.color // نستخدم الاسم الوصفي في التتبع أيضاً
        });
    }, [order]);
    
    return (
        <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center p-6 text-white">
            <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-[3rem] shadow-2xl p-10 md:p-16 text-center border border-white/5">
                <div className="mx-auto bg-blue-500/20 rounded-full h-24 w-24 flex items-center justify-center mb-8 animate-bounce">
                    <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-6">شكراً على ثقتك!</h1>
                <p className="text-lg text-slate-400 mb-2 font-medium">
                    طلبك لـ <span className="text-white font-bold">Smart Robot Diffuser</span> تم بنجاح.
                </p>
                <p className="text-slate-500 mb-10">سيتصل بك فريقنا في أقل من 24 ساعة لتأكيد التوصيل.</p>

                <div className="bg-white/5 rounded-[2rem] p-8 text-right border border-white/10 mb-10">
                    <h2 className="text-xl font-black text-blue-400 mb-6">تفاصيل الطلب:</h2>
                    <div className="space-y-4 text-sm font-bold">
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-500">الكمية:</span>
                            <span>{order.quantity}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-500">الموديل (العطر):</span>
                            <span>{order.color}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-500">الولاية:</span>
                            <span>{order.wilaya}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-blue-400">المجموع:</span>
                            <span className="text-2xl font-black text-white">{order.totalPrice} دج</span>
                        </div>
                    </div>
                </div>

                <button onClick={onReturnHome} className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105">
                    العودة للمتجر
                </button>
            </div>
        </div>
    );
};
export default ThankYou;