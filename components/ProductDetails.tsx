
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const scents = [
    { 
        name: "Gu Long (Cologne)", 
        color: "الأسود الفاخر", 
        desc: "رائحة خشبية كلاسيكية توحي بالثقة والقوة.", 
        bgImage: "/images/1.webp",
        overlay: "bg-slate-900/40",
        accent: "text-white"
    },
    { 
        name: "Ocean (Sea Mist)", 
        color: "الأزرق الملكي", 
        desc: "انتعاش البحر والحمضيات لمحبي الحيوية.", 
        bgImage: "/images/2.webp",
        overlay: "bg-blue-600/40",
        accent: "text-white"
    },
    { 
        name: "Healton (Hilton)", 
        color: "الرمادي التيتانيوم", 
        desc: "رائحة فنادق 5 نجوم (مسك وأخشاب فاخرة).", 
        bgImage: "/images/3.webp",
        overlay: "bg-slate-600/40",
        accent: "text-white"
    },
    { 
        name: "Osmanthus", 
        color: "الأخضر الزمردي", 
        desc: "عبير زهور نادرة مستوحاة من الطبيعة الآسيوية.", 
        bgImage: "/images/4.webp",
        overlay: "bg-emerald-600/40",
        accent: "text-white"
    },
    { 
        name: "Gardenia", 
        color: "الأحمر الرياضي", 
        desc: "لمسة نظافة هادئة وفخامة لا تضاهى.", 
        bgImage: "/images/5.webp",
        overlay: "bg-red-600/40",
        accent: "text-white"
    }
];

const ProductDetails: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    return (
        <section ref={ref} className={`py-24 bg-slate-50 text-slate-900 scroll-target ${isVisible ? 'visible' : ''}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">كل لون.. عنده حكاية</h2>
                    <p className="text-blue-600 font-black uppercase tracking-widest text-sm">التناغم المثالي بين اللون والعطر</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {scents.map((s, i) => (
                        <div 
                            key={i} 
                            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white transition-all duration-700 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
                        >
                            {/* Background Image */}
                            <img 
                                src={s.bgImage} 
                                alt={s.name} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            
                            {/* Brighter Overlay */}
                            <div className={`absolute inset-0 ${s.overlay} backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-60`}></div>
                            
                            {/* Content */}
                            <div className="relative z-10 h-full p-8 flex flex-col items-center justify-center text-center">
                                <h3 className={`font-black text-xl mb-3 ${s.accent} drop-shadow-md`}>
                                    {s.name}
                                </h3>
                                <div className="text-[10px] bg-white/20 backdrop-blur-md border border-white/40 inline-block px-4 py-1.5 rounded-full mb-6 font-black uppercase tracking-widest text-white">
                                    {s.color}
                                </div>
                                <p className="text-sm text-white leading-relaxed font-bold">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-8 rounded-[3rem] bg-white shadow-xl border border-slate-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div>
                            <div className="text-4xl font-black text-blue-600 mb-2">45d</div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">بطارية صامدة</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-emerald-500 mb-2">1h</div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">شحن سريع</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-amber-500 mb-2">3500</div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">دورة رش</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-red-500 mb-2">0%</div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">خالي من الكحول</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ProductDetails;
