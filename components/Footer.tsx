import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 text-center">
            <div className="container mx-auto px-4">
                <div className="text-white font-black text-2xl mb-4">Smart Robot Diffuser</div>
                <p className="text-sm max-w-md mx-auto mb-8">الخيار الأول للسائقين الباحثين عن الفخامة والتميز في الجزائر. تكنولوجيا ذكية لعطر يدوم طويلاً.</p>
                <div className="pt-8 border-t border-slate-800 text-xs">
                    &copy; {new Date().getFullYear()} جميع الحقوق محفوظة. طوموبيلتك تفحفح بالفخامة.
                </div>
            </div>
        </footer>
    );
};
export default Footer;