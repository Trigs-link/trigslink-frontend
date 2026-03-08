import { Search, TrendingUp, ChevronRight } from 'lucide-react';

export default function MarketSubNav() {
  const subNavTags = [
    "Breaking News", 
    "Hormuz Blockade", // Direct link to your Strait of Hormuz markets
    "Iran-Israel Tensions", // Matches your "Will US stop war?" market
    "GTA VI Delay",     // High-traffic gaming speculation
    "GPT-5 Launch",     // The biggest tech narrative right now
    "Champions League", // Real Madrid & Sports focus
    "Oracle Networks",  // For the $LINK $100 price action
    "Starship Mars",    // SpaceX's current mission focus
    "Sora Video",       // AI generation news
    "TikTok Ban Status",// The ongoing legal battle
    "Sovereign BTC",    // Nations holding Bitcoin
    "Oil Volatility"    // Economic impact of Middle East news
  ];

  return (
    <div className="flex flex-col gap-4 mt-2">
      
      {/* 1. TOP ROW: Button & Search Bar */}
      <div className="flex items-center gap-3">
        
        {/* The Gradient TOP Button */}
        <button className="h-[42px] px-5 bg-gradient-to-r from-[#4F95FF] to-[#33D2FF] hover:brightness-110 text-white text-[14px] font-bold rounded-[10px] flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(51,210,255,0.2)] shrink-0">
          <TrendingUp size={18} strokeWidth={2.5} /> TOP
        </button>

        {/* Faint Vertical Separator */}
        <div className="w-[1px] h-[20px] bg-slate-600/50 mx-1 shrink-0"></div>

        {/* The Long Search Bar */}
        <div className="flex-1 max-w-[800px] h-[42px] bg-[#0a1120] rounded-[10px] flex items-center px-4 border border-[#1e2a45] focus-within:border-[#33D2FF]/50 focus-within:bg-[#0d1629] transition-all shadow-inner">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by markets" 
            className="bg-transparent border-none outline-none text-[14px] ml-3 w-full text-slate-200 placeholder-slate-500 font-medium"
          />
        </div>

      </div>
      
      {/* 2. BOTTOM ROW: Pill Tags & Scroll Arrow */}
      <div className="relative flex items-center w-full">
        
        {/* Scrollable Tags Container */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pr-16 w-full">
          {subNavTags.map((tag) => (
            <span 
              key={tag} 
              className="bg-[#111827] hover:bg-[#1e293b] text-slate-300 hover:text-white text-[13px] font-medium px-4 py-2 rounded-[8px] whitespace-nowrap cursor-pointer transition-colors border border-white/5 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Right Edge: Gradient Fade & Arrow Button */}
        <div className="absolute right-0 top-0 bottom-0 w-24 flex justify-end items-center bg-gradient-to-l from-[#060c18] via-[#060c18]/90 to-transparent pointer-events-none">
          <button className="w-8 h-8 rounded-[8px] bg-[#111827] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer pointer-events-auto transition-colors shadow-lg mr-1 hover:bg-[#1e293b]">
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}