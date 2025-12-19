
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const techData = [
    { 
        title: "AI Vibration Chip", 
        desc: "حساس ذكي يكتشف حركة السيارة؛ يبدا يرش في 0.01 ثانية، ويسكت بعد 4 دقايق من التوقف.", 
        icon: "⚡",
        bg: "bg-blue-500/10",
        image: "/images/vib.jpeg" // مثال لصورة الحساس
    },
    { 
        title: "Ultrasonic Atomization", 
        desc: "تقنية النانو لتحويل الزيوت العطرية إلى ضباب بارد ينتشر في كل زاوية بلا ما يخلي أثر زيتي.", 
        icon: "💨",
        bg: "bg-emerald-500/10",
        image: "/images/nano.jpeg" // مثال لصورة الرش
    },
    { 
        title: "Long Life Battery", 
        desc: "بطارية ليثيوم 500mAh تشحن في ساعة (Type-C) وتشدلك حتى 45 يوم بلا ما تلمسها.", 
        icon: "🔋",
        bg: "bg-amber-500/10",
        image: "/images/bat.webp" // مثال لصورة البطارية/الشحن
    },
    { 
        title: "70°C Heat Proof", 
        desc: "مصنوع من سبائك الألومنيوم المستخدمة في الطيران، ما يطرطق ما يذوب في شمس الجزائر.", 
        icon: "🛡️",
        bg: "bg-red-500/10",
        image: "/images/heat.jpeg" // مثال لصورة المتانة/الحرارة
    },
    { 
        title: "3 Spray Modes", 
        desc: "تحكم كامل في قوة الرائحة: خفيف، متوسط، أو قوي بضغطة زر واحدة.", 
        icon: "🕹️",
        bg: "bg-purple-500/10",
        image: "/images/spray.jpeg" // مثال لصورة الأنماط
    },
    { 
        title: "Alcohol-Free Safe", 
        desc: "عطور طبيعية 100% خالية من الكحول، آمنة على الأطفال والنساء الحوامل.", 
        icon: "🌿",
        bg: "bg-cyan-500/10",
        image: "/images/alc.jpeg" // مثال لصورة الأمان/الطبيعة
    }
];

const HealthBenefits: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    return (
        <section ref={ref} className={`py-24 bg-white scroll-target ${isVisible ? 'visible' : ''}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Technical Overview</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                        أحدث ما توصلت إليه تكنولوجيا <br/><span className="text-blue-600">رفاهية السيارات</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techData.map((tech, index) => (
                        <div key={index} className="flex flex-col rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                            {/* Image Container */}
                            <div className="h-52 w-full overflow-hidden relative">
                                <img 
                                    src={tech.image} 
                                    alt={tech.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
                                <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-2xl ${tech.bg} backdrop-blur-md flex items-center justify-center text-xl shadow-lg border border-white/20 transition-transform group-hover:rotate-12`}>
                                    {tech.icon}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-4">{tech.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {tech.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthBenefits;
