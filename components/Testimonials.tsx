
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const Rating: React.FC<{ stars: number }> = ({ stars }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < stars} />)}
    </div>
);

const testimonials = [
    { name: "محمد أمين", quote: "رائحة سيارتي مثل فندق فاخر، والأفضل أنه يتشغل تلقائياً عندما أبدأ السيارة!", rating: 5, date: "منذ أسبوع" },
    { name: "سامي ب.", quote: "غيّر حياتي! تحولت سيارتي من غرفة خلع الملابس إلى واحة جزيرة برائحة رائعة!", rating: 5, date: "منذ 3 أيام" },
    { name: "عبد القادر", quote: "منتج رائع! يتشغل عندما أبدأ السيارة والخراطيش تستمر لفترة طويلة جداً. أنصح به لأي شخص.", rating: 5, date: "منذ أسبوعين" }
];

const stats = [
    { value: "+1,200", label: "عميل سعيد" },
    { value: "4.9/5", label: "تقييم عام" },
    { value: "100%", label: "ضمان الجودة" },
    { value: "58", label: "ولاية توصيل" }
];


const Testimonials: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    return (
        <section ref={ref} className={`py-24 bg-white scroll-target ${isVisible ? 'visible' : ''}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block font-heading">قصص نجاح</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900">آراء العملاء</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-50 p-8 rounded-3xl relative border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            {/* Quote Icon */}
                            <div className="absolute top-8 left-8 text-blue-200">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                                </svg>
                            </div>
                            
                            <div className="flex items-center gap-1 mb-4">
                                <Rating stars={testimonial.rating} />
                            </div>
                            
                            <p className="text-slate-700 font-medium text-lg leading-relaxed mb-6 relative z-10">
                                "{testimonial.quote}"
                            </p>
                            
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg font-heading">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-slate-900">{testimonial.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                                        <span>{testimonial.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600 rounded-3xl shadow-2xl p-10 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-4">
                                <p className="text-4xl md:text-5xl font-heading font-black mb-2 text-amber-400">{stat.value}</p>
                                <p className="text-blue-100 font-bold text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
