export default function CategoryNav() {
    // Updated to match the exact categories in your new screenshot
    const categories = [
      "All", "New", "Politics", "Sports", "Crypto", 
      "Global Elections", "Elon Tweets", "Mentions", 
      "Creators", "Pop Culture", "Business"
    ];
  
    return (
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-20 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-2.5 overflow-x-auto no-scrollbar py-3">
          
          {/* Special 'LIVE' Pill */}
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/30 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 whitespace-nowrap transition-all shrink-0">
            <span className="text-red-400">LIVE</span>
            {/* Glowing Red Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
          </button>
  
          {/* Faint Vertical Divider */}
          <div className="w-px h-4 bg-slate-700/60 shrink-0 mx-1"></div>
  
          {/* The Category Pills */}
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-4 py-1.5 rounded-full border border-slate-700/50 text-xs font-semibold whitespace-nowrap transition-all shrink-0 
                ${i === 0 
                  ? "bg-slate-700/60 text-white" // Slight highlight for the first 'All' tab
                  : "bg-slate-800/30 text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
            >
              {cat}
            </button>
          ))}
  
        </div>
      </div>
    );
  }