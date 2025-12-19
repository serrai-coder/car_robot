
import React from 'react';

interface VSLPageProps {
    onProceed: () => void;
}

const VSLPage: React.FC<VSLPageProps> = ({ onProceed }) => {
  // Using a generic potty training / parenting advice video ID. 
  // For production, you should use your own product video.
  const videoId = "Z6h9_HqG3d8"; 
  const embedUrl = `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&controls=1&playsinline=1`;

  return (
    <div className="relative min-h-screen bg-blue-900 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1920&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight animate-fade-in-down" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
            شاهدي كيف تخلصي طفلك من الحفاضات نهائياً في أسبوع واحد!
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
            اكتشفي الطريقة الآمنة والذكية لجعل طفلك يعتمد على نفسه في الحمام بدون خوف أو بكاء.
          </p>

          <div className="w-full bg-black/50 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border-2 border-amber-400/50 mb-8">
            <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                title="Potty Training Seat Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <button 
            onClick={onProceed}
            className="bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold text-xl md:text-2xl py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse"
          >
              نعم، أريد طلب المنتج الآن!
          </button>
        </div>
      </div>
    </div>
  );
};

export default VSLPage;
