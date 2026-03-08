export default function CategoryNav() {
    const categories = [
      "All", 
      "Geopolitics",      // For US/Iran, Israel, and border tensions
      "Global Logistics",  // For Strait of Hormuz, shipping, and supply chains
      "Digital Assets",   // For Bitcoin, Ethereum, and $LINK price action
      "Interactive Media", // For GTA VI, gaming industry, and streaming
      "Artificial Intelligence", // For GPT-5, LLM breakthroughs, and Sora
      "Professional Sports", // For Champions League and Real Madrid
      "Aerospace",        // For Starship, Mars missions, and satellite tech
      "Macro Economy",    // For Inflation, interest rates, and trade wars
      "Regulatory Tech"
    ];
  
    return (
      // Matches the deep background without a harsh bottom border for a seamless look
      <div className="bg-[#09101d]/95 backdrop-blur-md sticky top-16 z-40 border-b border-white/[0.02]">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-3 overflow-x-auto no-scrollbar py-3">
          
          {/* Special 'LIVE' Button - Bigger padding (px-5 py-2) */}
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 bg-[#0b1426] hover:bg-[#1d2d50] text-[13px] font-bold text-slate-300 transition-all shrink-0">
            <span className="text-[#ff4d4d]">LIVE</span>
            {/* Glowing Red Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] shadow-[0_0_6px_rgba(255,77,77,0.8)]"></div>
          </button>
  
          {/* Note: The vertical divider line has been entirely removed! */}
  
          {/* The Category Buttons - Bigger boxes with the Light Blue hover state */}
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all shrink-0 text-[13px] border 
                ${i === 0 
                  ? "bg-[#1d2d50] text-white border-white/10" // The permanent active 'light blue' state for 'All'
                  : "bg-[#111b33] border-transparent text-slate-400 hover:text-white hover:bg-[#1d2d50] hover:border-white/10" // The new light blue hover effect
                }`}
            >
              {cat}
            </button>
          ))}
  
        </div>
      </div>
    );
  }