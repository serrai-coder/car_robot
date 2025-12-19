
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const [endTime] = useState(() => {
        const date = new Date();
        date.setHours(date.getHours() + 24);
        return date.getTime();
    });

    const calculateTimeLeft = () => {
        const difference = endTime - new Date().getTime();
        let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    const containerClass = size === 'sm' ? 'gap-2' : 'gap-3 md:gap-4';
    const boxClass = size === 'sm' 
        ? 'w-10 h-10 text-lg' 
        : size === 'md' ? 'w-12 h-12 md:w-14 md:h-14 text-xl md:text-2xl' 
        : 'w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl';
    
    const labelClass = size === 'sm' ? 'text-[9px]' : 'text-[10px] md:text-xs';

    return (
        <div className={`flex justify-center ${containerClass} text-center`} dir="ltr">
            {Object.entries(timeLeft).map(([interval, value]) => (
                <div key={interval} className="flex flex-col items-center group">
                    <div className={`${boxClass} flex items-center justify-center bg-slate-900 text-white font-bold rounded-xl shadow-lg border border-slate-700 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative z-10 font-mono">{String(value).padStart(2, '0')}</span>
                    </div>
                    <span className={`${labelClass} text-slate-500 font-bold mt-1.5 uppercase tracking-wider`}>
                        {interval === 'hours' ? 'ساعة' : interval === 'minutes' ? 'دقيقة' : 'ثانية'}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
