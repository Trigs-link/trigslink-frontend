import { ChevronRight } from "lucide-react";

export default function HeroBanners() {
  const banners = [
    {
      title: "The 47th President",
      subtitle: "Track promises, policies, appointments, & more!",
      buttonText: "DASHBOARD",
      bgGradient: "bg-gradient-to-br from-[#2b6aff] to-[#00a3ff]",
      // Placeholder for the image of Trump
      imageContent: "🏛️" 
    },
    {
      title: "TikTok's future",
      subtitle: "What's next for TikTok in the United States?",
      buttonText: "MARKETS",
      bgGradient: "bg-gradient-to-br from-[#1ea2ff] to-[#00d4ff]",
      // Placeholder for TikTok logo
      imageContent: "📱"
    },
    {
      title: "First 100 days",
      subtitle: "What will Trump accomplish in his most pivotal days?",
      buttonText: "MARKETS",
      bgGradient: "bg-gradient-to-br from-[#3b59ff] to-[#00bfff]",
      // Placeholder for map/podium
      imageContent: "🇺🇸"
    },
    {
      title: "Free to join",
      subtitle: "The world's largest prediction market.",
      buttonText: "GET STARTED",
      bgGradient: "bg-gradient-to-br from-[#0088ff] to-[#00e5ff]",
      // Placeholder for Bitcoin
      imageContent: "₿"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 mt-4">
      {banners.map((banner, i) => (
        <div 
          key={i} 
          className={`${banner.bgGradient} rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden h-[160px] cursor-pointer shadow-lg hover:shadow-blue-500/20 transition-all group`}
        >
          {/* Background Image/Icon Placeholder (Right-aligned, clipped) */}
          <div className="absolute -right-4 top-4 text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">
            {banner.imageContent}
          </div>

          {/* Text Content */}
          <div className="relative z-10 w-[70%]">
            <h2 className="text-xl font-bold text-white mb-1 leading-tight tracking-tight">
              {banner.title}
            </h2>
            <p className="text-[12px] font-medium text-white/80 leading-snug line-clamp-2">
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
  );
}