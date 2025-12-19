
import React, { useState, useEffect, useRef } from 'react';
import { wilayas, Wilaya } from '../data/wilayas';
import { submitOrder } from '../services/orderService';
import { trackEvent } from '../utils/pixel';

export interface OrderData {
    fullName: string;
    phone: string;
    wilaya: string;
    city: string;
    deliveryMethod: string;
    quantity: number;
    totalPrice: number;
    variant: string;
    color: string; // إضافة هذا الحقل لـ Google Sheets
}

// لإعادة تفعيل الألوان، قم بتغيير قيمة isAvailable إلى true أو احذف الخاصية تماماً
const variants = [
    { color: 'Black', scent: 'Gu Long', label: 'الأسود', bg: 'bg-black', price: 3900, isAvailable: true },
    { color: 'Red', scent: 'Gardenia', label: 'الأحمر', bg: 'bg-red-600', price: 3900, isAvailable: false },
    { color: 'Grey', scent: 'Healton', label: 'الرمادي', bg: 'bg-slate-500', price: 3600, isAvailable: false },
    { color: 'Green', scent: 'Osmanthus', label: 'الأخضر', bg: 'bg-emerald-600', price: 3400, isAvailable: true },
    { color: 'Blue', scent: 'Ocean', label: 'الأزرق', bg: 'bg-blue-600', price: 3400, isAvailable: false }
];

const OrderForm: React.FC<{ onOrderSuccess: any, source?: string }> = ({ onOrderSuccess, source = "Unknown" }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const phoneInputRef = useRef<HTMLInputElement>(null); // مرجع لحقل الهاتف
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        wilayaId: '',
        city: '',
        deliveryMethod: 'home',
        quantity: 1,
        variant: 'Black'
    });

    const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Get current variant price
    const currentVariant = variants.find(v => v.color === formData.variant) || variants[0];

    useEffect(() => {
        if (formData.wilayaId) {
            const wilaya = wilayas.find(w => w.id === parseInt(formData.wilayaId)) || null;
            setSelectedWilaya(wilaya);
            // Reset city when wilaya changes
            if (wilaya && !wilaya.cities.some(c => c.name_ar === formData.city)) {
                setFormData(prev => ({ ...prev, city: '' }));
            }
        } else {
            setSelectedWilaya(null);
            setFormData(prev => ({ ...prev, city: '' }));
        }
    }, [formData.wilayaId]);

    useEffect(() => {
        if (selectedWilaya) {
            const price = formData.deliveryMethod === 'home' 
                ? (selectedWilaya.deliveryPriceHome || 0) 
                : (typeof selectedWilaya.deliveryPriceStopDesk === 'number' ? selectedWilaya.deliveryPriceStopDesk : 0);
            setDeliveryPrice(price);
        } else {
            setDeliveryPrice(0);
        }
    }, [selectedWilaya, formData.deliveryMethod]);

    useEffect(() => {
        let subtotal = currentVariant.price * formData.quantity;
        
        // عرض خاص: تخفيض عند شراء أكثر من قطعة
        if (formData.quantity >= 2) {
            subtotal -= 400; // تخفيض تشجيعي بقيمة 400 دج عند شراء قطعتين أو أكثر
        }
        
        setTotalPrice(subtotal + deliveryPrice);
    }, [formData.quantity, deliveryPrice, currentVariant]);

    const handleInputChange = (e: any) => {
        const value = e.target.name === 'phone' ? e.target.value.replace(/\s/g, '') : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const validatePhone = (phone: string) => {
        // Regex for Algerian phone numbers: starts with 05, 06 or 07 and followed by 8 digits
        const dzPhoneRegex = /^0[567][0-9]{8}$/;
        return dzPhoneRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const cleanPhone = formData.phone.trim();
        if (!validatePhone(cleanPhone)) {
            alert('يرجى إدخال رقم هاتف جزائري صحيح (10 أرقام يبدأ بـ 05 أو 06 أو 07)');
            phoneInputRef.current?.focus(); // إرجاع التركيز للحقل
            return;
        }

        if (!formData.city) {
            alert('الرجاء اختيار البلدية');
            return;
        }
        
        setIsSubmitting(true);
        
        // إعداد بيانات الطلب مع إضافة حقل color الصريح لـ Google Sheets
        // إضافة علامة ' قبل الرقم تضمن عدم حذف الصفر في Google Sheets
        const order: OrderData = {
            ...formData,
            phone: `'${cleanPhone}`, 
            color: `${currentVariant.scent} (${currentVariant.label})`, // نرسل الوصف العربي الكامل كـ "color"
            wilaya: selectedWilaya?.name_ar || '',
            totalPrice
        };

        try {
            trackEvent('Lead', { 
                content_name: source,
                variant: formData.variant,
                color_name: currentVariant.scent,
                value: totalPrice
            });
            await submitOrder(order);
            onOrderSuccess({ ...order, phone: cleanPhone }); // نرسل الرقم بدون علامة الاقتباس لصفحة الشكر
        } catch (e) {
            alert('خطأ في الاتصال، حاول مرة أخرى');
        } finally {
            setIsSubmitting(false);
        }
    };

    // حساب سعر المنتجات فقط (بعد الخصم)
    const productSubtotal = (currentVariant.price * formData.quantity) - (formData.quantity >= 2 ? 400 : 0);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-3 mb-6">
                <span className="text-2xl">✨</span>
                <p className="text-sm font-bold text-amber-900">عرض خاص: تخفيض <span className="text-red-600">400 دج</span> عند طلب 2 أو أكثر!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-1">الاسم واللقب</label>
                    <input 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="مثال: محمد جزائري" 
                        required 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-1">رقم الهاتف</label>
                    <input 
                        ref={phoneInputRef} // ربط المرجع
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-right focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="05 / 06 / 07 XX XX XX XX" 
                        maxLength={10}
                        required 
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-1">الولاية</label>
                    <select 
                        name="wilayaId" 
                        value={formData.wilayaId} 
                        onChange={handleInputChange} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold cursor-pointer outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                    >
                        <option value="">-- اختر الولاية --</option>
                        {wilayas.map(w => <option key={w.id} value={w.id}>{w.code} - {w.name_ar}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-1">البلدية</label>
                    <select 
                        name="city" 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        disabled={!selectedWilaya}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" 
                        required
                    >
                        <option value="">-- اختر البلدية --</option>
                        {selectedWilaya?.cities.map(c => <option key={c.id} value={c.name_ar}>{c.name_ar}</option>)}
                    </select>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block mr-1">طريقة التوصيل</label>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        type="button" 
                        onClick={() => setFormData({...formData, deliveryMethod: 'home'})} 
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${formData.deliveryMethod === 'home' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-500'}`}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            <span className="font-bold text-xs">للمنزل</span>
                        </div>
                        {selectedWilaya && (
                            <span className="text-[10px] font-black bg-blue-600/10 px-2 py-0.5 rounded-full">
                                {selectedWilaya.deliveryPriceHome} دج
                            </span>
                        )}
                    </button>
                    <button 
                        type="button" 
                        disabled={selectedWilaya && typeof selectedWilaya.deliveryPriceStopDesk !== 'number'}
                        onClick={() => setFormData({...formData, deliveryMethod: 'stopDesk'})} 
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 ${formData.deliveryMethod === 'stopDesk' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-500'}`}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            <span className="font-bold text-xs">للمكتب</span>
                        </div>
                        {selectedWilaya && typeof selectedWilaya.deliveryPriceStopDesk === 'number' && (
                            <span className="text-[10px] font-black bg-emerald-600/10 text-emerald-700 px-2 py-0.5 rounded-full">
                                {selectedWilaya.deliveryPriceStopDesk} دج
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block mr-1">اختر لون الجهاز</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {variants.map(v => (
                        <button 
                            key={v.color} 
                            type="button" 
                            disabled={v.isAvailable === false}
                            onClick={() => setFormData({...formData, variant: v.color})} 
                            className={`py-2 px-1 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 relative ${formData.variant === v.color ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-slate-50 bg-white hover:border-slate-200'} ${v.isAvailable === false ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
                        >
                            <div className={`w-6 h-6 rounded-full ${v.bg} shadow-inner`}></div>
                            <span className="text-[9px] font-black text-slate-700 text-center leading-none">{v.label}</span>
                            {formData.variant === v.color && (
                                <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-3 mr-1 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500">العطر المرفق:</span>
                    <span className="text-[11px] font-black text-blue-600">{currentVariant.scent}</span>
                </div>
            </div>

            <div className="pt-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block mr-1">الكمية</label>
                <div className="flex items-center gap-3">
                    {[1, 2, 3].map(q => (
                        <button 
                            key={q} 
                            type="button" 
                            onClick={() => setFormData({...formData, quantity: q})} 
                            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${formData.quantity === q ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}
                        >
                            {q} {q === 1 ? 'قطعة' : 'قطع'}
                        </button>
                    ))}
                </div>
            </div>

            {/* تفاصيل السعر النهائي */}
            <div className="bg-slate-950 rounded-[2rem] p-6 text-white mt-10 shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-2">
                        <span className="text-slate-400">سعر المنتج ({formData.quantity} {formData.quantity === 1 ? 'قطعة' : 'قطع'}):</span>
                        <span className="text-white">{productSubtotal} دج</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-2">
                        <span className="text-slate-400">سعر التوصيل:</span>
                        <span className="text-white">{deliveryPrice} دج</span>
                    </div>
                </div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="text-right">
                        <p className="text-slate-500 text-[9px] font-black uppercase mb-1">المجموع الكلي:</p>
                        <div className="text-3xl font-black text-white tracking-tighter">{totalPrice} <span className="text-base">دج</span></div>
                    </div>
                    <div className="text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-[9px] font-black uppercase mb-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            عند الاستلام
                        </div>
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 active:scale-95 text-lg flex items-center justify-center gap-3"
            >
                {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب الآن'}
                {!isSubmitting && <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>}
            </button>
        </form>
    );
};
export default OrderForm;
