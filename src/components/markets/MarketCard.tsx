import { MessageCircle, Star, ChevronDown, Check, X, Gift, Pin } from "lucide-react";

interface MarketCardProps {
  marketId: string;
  category: string;
  question: string;
  volume: string;
  yesProb: number;
}

export default function MarketCard({ marketId, question, volume }: MarketCardProps) {
  const options = [
    { name: "Eric Adams", prob: "26%" },
    { name: "Himself", prob: "4%" },
    { name: "Steve Bannon", prob: "28%" },
  ];

  return (
    // 1. THE 3D GLASS CONTAINER
    // Updated: Silky diagonal gradient, softer border, and physical lift on hover (no text color change)
    <div className="flex flex-col h-full rounded-[16px] bg-gradient-to-br from-[#060c18] via-[#132753] to-[#4160a3] border border-[#1e2a45] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#2e4066] hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:-translate-y-1 cursor-pointer relative overflow-hidden group">
      
      {/* The crucial "Glass Edge" light reflection on the top inner rim */}
      <div className="absolute inset-0 rounded-[16px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] z-20"></div>

      {/* 2. HEADER: Avatar & Question */}
      <div className="flex items-start gap-3.5 px-4 pt-5 mb-4 relative z-10">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${marketId}&backgroundColor=b6e3f4`}
          alt="Market Avatar" 
          className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm bg-[#1e293b]"
        />
        {/* Updated: Removed group-hover:text-[#3B82F6] so it stays solid white */}
        <h3 className="text-[15px] font-bold text-white leading-[1.35] tracking-tight flex-1 mt-[2px]">
          {question}
        </h3>
      </div>

      {/* 3. MULTI-CHOICE ROWS (Physical, raised dark pills) */}
      <div className="flex flex-col gap-[5px] px-4 mb-1 relative z-10">
        {options.map((opt, i) => (
          <div 
            key={i} 
            // 1. The Glass Row Container: No solid color, just 3% white + blur + a faint border
            className="flex items-center justify-between bg-black/[0.1] hover:bg-black/[0.2] backdrop-blur-md border border-white/[0.05] transition-all rounded-[10px] h-[40px] px-3.5 shadow-sm"
          >
            {/* Option Name */}
            <span className="text-[#94a3b8] font-medium text-[13px] tracking-[0.2px] truncate pr-2">
              {opt.name}
            </span>
            
            <div className="flex items-center shrink-0">
              {/* Percentage */}
              <span className="text-[#94a3b8] font-semibold text-[13px] tracking-[0.2px] w-8 text-right mr-3.5">
                {opt.prob}
              </span>
              
              {/* MICRO-UI: Glassy buttons with no solid colored backgrounds */}
              <div className="flex items-center gap-[4px]">
                {/* Frosted Green Check Button */}
                <button className="w-[26px] h-[26px] rounded-[6px] flex items-center justify-center text-[#00c972] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.1] hover:shadow-[0_0_10px_rgba(0,201,114,0.15)] transition-all">
                  <Check size={14} strokeWidth={3} />
                </button>
                
                {/* Vertical separator */}
                <div className="w-[1px] h-[12px] bg-white/[0.08] mx-[1px]"></div>
                
                {/* Frosted Red X Button */}
                <button className="w-[26px] h-[26px] rounded-[6px] flex items-center justify-center text-[#ff3b5c] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.1] hover:shadow-[0_0_10px_rgba(255,59,92,0.15)] transition-all">
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SHOW MORE ACCORDION */}
      <div className="flex justify-center items-center gap-2 mt-2.5 mb-4 relative z-10 group/more">
        <span className="text-[12.5px] font-medium text-[#7487a6] group-hover/more:text-[#94a8c8] transition-colors">
          Show more
        </span>
        <div className="w-5 h-5 rounded-[6px] bg-[#1c2944] group-hover/more:bg-[#233352] flex items-center justify-center transition-colors">
          <ChevronDown size={14} strokeWidth={2.5} className="text-[#7487a6] group-hover/more:text-[#94a8c8]" />
        </div>
      </div>

      {/* 5. FOOTER AREA */}
      <div className="mt-auto pt-[14px] pb-[14px] px-4 bg-[#0b1222] flex justify-between items-center text-[#5e7090] text-[12px] font-medium relative z-10 rounded-b-[15px]">
        <div className="flex items-center gap-1.5 hover:text-[#8ba0c2] cursor-pointer transition-colors">
          <Pin size={14} className="rotate-45" strokeWidth={2}/> {volume} Vol.
        </div>
        
        <div className="flex items-center gap-4">
          <Gift size={15} className="hover:text-[#8ba0c2] cursor-pointer transition-colors" strokeWidth={1.5} />
          <div className="flex items-center gap-1.5 hover:text-[#8ba0c2] cursor-pointer transition-colors">
            <MessageCircle size={15} strokeWidth={1.5} />
            <span className="text-[12px] font-medium mt-[1px]">1,123</span>
          </div>
          <Star size={15} className="hover:text-[#8ba0c2] cursor-pointer transition-colors" strokeWidth={1.5} />
        </div>
      </div>

    </div>
  );
}