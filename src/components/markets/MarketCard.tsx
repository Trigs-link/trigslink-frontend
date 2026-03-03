import { MessageCircle, Bookmark, Pin, Gift } from "lucide-react";

interface MarketCardProps {
  marketId: string;
  category: string;
  question: string;
  volume: string;
  yesProb: number;
}

export default function MarketCard({ marketId, question, volume, yesProb }: MarketCardProps) {
  // Determine stroke color dynamically based on probability
  const probColor = yesProb >= 50 ? "#4ade80" : "#ff3b5c";

  return (
    // 1. THE 3D GLASS CONTAINER
    <div className="flex flex-col h-full rounded-[16px] bg-gradient-to-br from-[#060c18] via-[#132753] to-[#4160a3] border border-[#1e2a45] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#2e4066] hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:-translate-y-1 cursor-pointer relative overflow-hidden group">
      
      {/* The crucial "Glass Edge" light reflection on the top inner rim */}
      <div className="absolute inset-0 rounded-[16px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] z-20"></div>

      {/* 2. HEADER: Avatar, Question & True Semi-Circle Dial */}
      <div className="flex items-start justify-between gap-3 px-4 pt-5 mb-5 relative z-10">
        
        <div className="flex items-start gap-3.5 pr-1">
          {/* Curved Square Avatar with a very thin, clean white border */}
          <img 
            src={`https://picsum.photos/seed/${marketId}/150/150`}
            alt="Market Avatar" 
            className="w-11 h-11 rounded-[10px] border border-white/20 object-cover shrink-0 shadow-sm bg-[#1e293b]"
          />
          <h3 className="text-[14px] font-bold text-white leading-[1.35] tracking-tight mt-[2px] line-clamp-3">
            {question}
          </h3>
        </div>
        
        {/* THE PERFECTED TRUE SEMI-CIRCLE GAUGE */}
        {/* Container is explicitly half the height (25px) of the width (50px) to clip empty space */}
        <div className="relative w-[50px] h-[25px] flex items-end justify-center shrink-0 mt-1">
          {/* 50x50 SVG pushed to the top, rotating exactly 180 degrees */}
          <svg className="absolute top-0 left-0 w-[50px] h-[50px] rotate-[180deg]" viewBox="0 0 36 36">
            {/* Background Track - Exactly 180 degrees (50 out of 100) */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#374f80"
              strokeWidth="3.5"
              strokeDasharray="50 50"
              strokeLinecap="round"
            />
            {/* Value Track - Scaled to a max of 50 */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke={probColor}
              strokeWidth="3.5"
              strokeDasharray={`${yesProb * 0.5} 100`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Centered Text resting snugly on the baseline (Removed "chance" text) */}
          <span className="relative z-10 text-[10px] font-extrabold text-white leading-none tracking-tight translate-y-[2px]">
            {yesProb}%
          </span>
        </div>
      </div>

      {/* 3. SIMPLIFIED YES / NO BUTTONS */}
      <div className="flex gap-3 px-4 mb-6 mt-auto relative z-10">
        <button 
          className="flex-1 h-10 rounded-[10px] bg-[#166534] hover:bg-[#14532D] border border-[#166534] text-white font-bold text-[14px] transition-all flex items-center justify-center shadow-[0_0_10px_rgba(22,101,52,0.15)] hover:shadow-[0_0_15px_rgba(22,101,52,0.25)]"
          onClick={(e) => { e.stopPropagation(); console.log('Bet Yes'); }}
        >
          Buy Yes
        </button>

        <button 
          className="flex-1 h-10 rounded-[10px] bg-[#991B1B] hover:bg-[#7F1D1D] border border-[#991B1B] text-white font-bold text-[14px] transition-all flex items-center justify-center shadow-[0_0_10px_rgba(153,27,27,0.15)] hover:shadow-[0_0_15px_rgba(153,27,27,0.25)]"
          onClick={(e) => { e.stopPropagation(); console.log('Bet No'); }}
        >
          Buy No
        </button>
      </div>

      {/* 4. FOOTER AREA */}
      <div className="pt-[14px] pb-[14px] px-4 bg-[#0b1222] flex justify-between items-center text-[#5e7090] text-[12px] font-medium relative z-10 rounded-b-[15px]">
        <div className="flex items-center gap-1.5 hover:text-[#8ba0c2] cursor-pointer transition-colors">
          <Pin size={14} className="rotate-45" strokeWidth={2}/> {volume} Vol.
        </div>
        
        <div className="flex items-center gap-4">
          <Gift size={15} className="hover:text-[#8ba0c2] cursor-pointer transition-colors" strokeWidth={1.5} />
          <div className="flex items-center gap-1.5 hover:text-[#8ba0c2] cursor-pointer transition-colors">
            <MessageCircle size={15} strokeWidth={1.5} />
            <span className="text-[12px] font-medium mt-[1px]">1,123</span>
          </div>
          <Bookmark size={15} className="hover:text-[#8ba0c2] cursor-pointer transition-colors" strokeWidth={1.5} />
        </div>
      </div>

    </div>
  );
}