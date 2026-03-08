import { ChevronRight } from "lucide-react";

export default function HeroBanners() {
  const banners = [
    {
      title: "Will US stop war against Iran?",
      subtitle: "Track the latest geopolitical developments and market odds.",
      buttonText: "GEOPOLITICS",
      bgGradient: "bg-gradient-to-br from-[#2b6aff] to-[#00a3ff]", // Standard Blue 1
      // Iran Flag
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Iran_%28official%29.svg/640px-Flag_of_Iran_%28official%29.svg.png" 
    },
    // REMOVED: "Will Iran retaliate against US?"
    {
      title: "Will the Strait of Hormuz be blocked?",
      subtitle: "Oil supply chains brace for impact amid rising tensions.",
      buttonText: "MARKETS",
      bgGradient: "bg-gradient-to-br from-[#3b59ff] to-[#00bfff]", // Standard Blue 3
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Will Bitcoin hit $100k by year-end?",
      subtitle: "The world's largest prediction market for crypto assets.",
      buttonText: "CRYPTO",
      bgGradient: "bg-gradient-to-br from-[#0088ff] to-[#00e5ff]", // Standard Blue 4
      imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Will GTA VI be released in 2026?",
      subtitle: "Bet on the release timeline of the decade's biggest game.",
      buttonText: "GAMING",
      bgGradient: "bg-gradient-to-br from-[#2b6aff] to-[#00a3ff]", // Standard Blue 1
      // Vice City vibes
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Grand_Theft_Auto_VI_logo_%28with_gradient%29.svg/640px-Grand_Theft_Auto_VI_logo_%28with_gradient%29.svg.png",
    },
    {
      title: "Will Real Madrid win the Champions League?",
      subtitle: "Predict the ultimate victor of European football.",
      buttonText: "SPORTS",
      bgGradient: "bg-gradient-to-br from-[#1ea2ff] to-[#00d4ff]", // Standard Blue 2
      // User's Real Madrid photo
      imageUrl: "https://images.unsplash.com/photo-1748558688377-d07d27f5c1c6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Will OpenAI release GPT-5 this year?",
      subtitle: "Track the race toward Artificial General Intelligence.",
      buttonText: "TECH & AI",
      bgGradient: "bg-gradient-to-br from-[#3b59ff] to-[#00bfff]", // Standard Blue 3
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Will SpaceX land Starship on Mars by 2028?",
      subtitle: "Wager on the timeline of humanity's multiplanetary leap.",
      buttonText: "SPACE",
      bgGradient: "bg-gradient-to-br from-[#0088ff] to-[#00e5ff]", // Standard Blue 4
      imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="relative w-full mb-6 mt-4">
      
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          /* Adjusted to 45s since we have 7 items instead of 8 */
          animation: infinite-scroll 45s linear infinite;
          width: max-content;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div 
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex animate-infinite-scroll py-2">
          
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-4 pr-4">
              
              {banners.map((banner, i) => (
                <div 
                  key={`${set}-${i}`} 
                  className={`${banner.bgGradient} rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden h-[160px] w-[320px] xl:w-[380px] shrink-0 cursor-pointer shadow-lg hover:shadow-blue-500/30 transition-all group`}
                >
                  
                  <div 
                    className="absolute top-0 right-0 w-[60%] h-full opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
                      maskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
                    }}
                  >
                    <img 
                      src={banner.imageUrl} 
                      alt={banner.title} 
                      // Standardized back to cover/top since we are using full photos again
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="relative z-10 w-[75%]">
                    <h2 className="text-[17px] font-bold text-white mb-1 leading-tight tracking-tight pr-2">
                      {banner.title}
                    </h2>
                    <p className="text-[12px] font-medium text-white/90 leading-snug line-clamp-2 pr-2">
                      {banner.subtitle}
                    </p>
                  </div>

                  <button className="relative z-10 mt-auto flex items-center justify-between w-[120px] bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white px-3 py-1.5 rounded-full transition-colors active:scale-95">
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