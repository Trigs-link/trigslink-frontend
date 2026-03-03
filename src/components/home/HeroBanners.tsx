import { ChevronRight } from "lucide-react";

export default function HeroBanners() {
  const banners = [
    {
      title: "The 47th President",
      subtitle: "Track promises, policies, appointments, & more!",
      buttonText: "DASHBOARD",
      bgGradient: "bg-gradient-to-br from-[#2b6aff] to-[#00a3ff]",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/600px-Donald_Trump_official_portrait.jpg" 
    },
    {
      title: "TikTok's future",
      subtitle: "What's next for TikTok in the United States?",
      buttonText: "MARKETS",
      bgGradient: "bg-gradient-to-br from-[#1ea2ff] to-[#00d4ff]",
      imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "First 100 days",
      subtitle: "What will Trump accomplish in his most pivotal days?",
      buttonText: "MARKETS",
      bgGradient: "bg-gradient-to-br from-[#3b59ff] to-[#00bfff]",
      imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Free to join",
      subtitle: "The world's largest prediction market.",
      buttonText: "GET STARTED",
      bgGradient: "bg-gradient-to-br from-[#0088ff] to-[#00e5ff]",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="relative w-full mb-6 mt-4">
      
      {/* 1. Custom CSS for the Infinite Loop */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
          width: max-content;
        }
        /* Pauses the scroll when the user hovers over a card */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 2. The Vignette Mask Wrapper */}
      {/* This creates the transparent -> solid -> transparent fade on the edges */}
      <div 
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        
        {/* 3. The Scrolling Track */}
        {/* We map the banners TWICE ([1, 2]) so that when the first set scrolls left, the second set seamlessly follows behind it */}
        <div className="flex animate-infinite-scroll py-2">
          
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-4 pr-4">
              
              {banners.map((banner, i) => (
                <div 
                  key={`${set}-${i}`} 
                  // Fixed width (w-[320px] xl:w-[380px]) ensures they don't squish together in the flex row
                  className={`${banner.bgGradient} rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden h-[160px] w-[320px] xl:w-[380px] shrink-0 cursor-pointer shadow-lg hover:shadow-blue-500/30 transition-all group`}
                >
                  
                  {/* Faded Background Image Container */}
                  <div 
                    className="absolute top-0 right-0 w-[60%] h-full opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
                      maskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
                    }}
                  >
                    <img 
                      src={banner.imageUrl} 
                      alt={banner.title} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 w-[70%]">
                    <h2 className="text-xl font-bold text-white mb-1 leading-tight tracking-tight">
                      {banner.title}
                    </h2>
                    <p className="text-[12px] font-medium text-white/90 leading-snug line-clamp-2">
                      {banner.subtitle}
                    </p>
                  </div>

                  {/* Transparent Glass Button */}
                  <button className="relative z-10 mt-auto flex items-center justify-between w-[120px] bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white px-3 py-1.5 rounded-full transition-colors">
                    {banner.buttonText}
                    <ChevronRight size={14} className="text-white/80" />
                  </button>

                </div>
              ))}
              
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}