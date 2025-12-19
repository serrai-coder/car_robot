
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FAQItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`border-b border-slate-100 last:border-0 ${isOpen ? 'bg-blue-50/30' : 'bg-transparent'} transition-all`}>
            <button onClick={onClick} className="w-full text-right flex justify-between items-center p-6 focus:outline-none group">
                <h3 className={`text-sm md:text-base font-bold transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>{question}</h3>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-slate-600 text-sm font-medium leading-relaxed">{answer}</div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "واش يصرا كي يخلص العطر لي يجي معاه؟", a: "كي يخلص العطر الأصلي (لي يشدلك أشهر)، تقدر تفتح العلبة وتضيف أي زيت عطري (Essential Oil) تحبو، أو تعاود تشري من عندنا العبوات الأصلية." },
        { q: "هل الروبوت يطرطق في السخانة تاع الجزائر؟", a: "مستحيل. الجهاز مصنوع من Aviation Aluminum Alloy ودرجة تحمل الحرارة توصل لـ 70 درجة مئوية، عكس المعطرات البلاستيكية لي تسيل وتخسر الطوموبيل." },
        { q: "شحال تشد البطارية؟", a: "البطارية تشد حتى لـ 45 يوم في وضع الاستعداد (Standby)، وإذا كنت تمشي بزاف تشدلك حوالي أسبوعين وتتشحن في ساعة برك بالـ Type-C." },
        { q: "هل الريحة قوية بزاف توجع الراس؟", a: "لا، عندك 3 مستويات للرش (Mode). تقدر تخليه خفيف يدير رشة كل دقيقة، هكذا تستمتع بريحة فريش بلا ما تتقلق." },
        { q: "واش هي الضمانات؟", a: "الضمان تاعنا هو 'سلعة دوريجينال'. تفتح العلبة، تجرب الجهاز، وتشوف الخامة، إذا ما عجبكش رجعو في يدك وما تخلصش." }
    ];

    return (
        <section ref={ref} className={`py-24 bg-stone-50 scroll-target ${isVisible ? 'visible' : ''}`}>
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-900">الأسئلة المتكررة</h2>
                </div>
                <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FAQ;
