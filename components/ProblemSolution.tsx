
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProblemSolution: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    return (
        <section ref={ref} className={`py-24 bg-white border-y border-slate-100 scroll-target ${isVisible ? 'visible' : ''}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">علاش المعطرات العادية تضيعلك دراهمك؟</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">في الصيف تاع الجزائر، المعطرات التقليدية تولي عدو لسيارتك وصحتك.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-red-50/50 p-10 rounded-[2.5rem] border border-red-100 shadow-sm">
                        <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center gap-3">
                            <span className="bg-red-100 p-2 rounded-lg text-xl">❌</span>
                            المعطرات التقليدية
                        </h3>
                        <ul className="space-y-6 text-slate-600 font-bold">
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 mt-1">●</span>
                                <span>تتبخر في 4 أيام بسب السخانة (تحرق دراهمك في الفراغ).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 mt-1">●</span>
                                <span>تحتوي على الكحول لي يسبب حساسية ووجع الراس.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 mt-1">●</span>
                                <span>البلاستيك تاعها يذوب ويخسر طابلو دو بور (Tableau de bord).</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100 shadow-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-tighter">AI Tech Inside</div>
                        <h3 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-3">
                            <span className="bg-blue-100 p-2 rounded-lg text-xl">✅</span>
                            روبوت AI الذكي
                        </h3>
                        <ul className="space-y-6 text-slate-800 font-black">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">●</span>
                                <span>توفير حقيقي: يخدم غير كي تمشي (عطر يدوم لـ 6 أشهر).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">●</span>
                                <span>تقنية Ultrasonic: يحول العطر لـ "Nano particles" باردة.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">●</span>
                                <span>خامات Aviation Alloy: يقاوم السخانة حتى 70 درجة.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ProblemSolution;
