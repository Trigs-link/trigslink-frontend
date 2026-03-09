import { useState, useEffect } from "react";
// 🚩 Using Bookmark as it matches the requested flag/star shape perfectly
import { Bookmark, Pin, Loader2, Activity, CheckCircle, Trophy } from "lucide-react";
// 👇 IMPORT useAppKit HERE
import { useAppKitProvider, useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import TradeModal from "./TradeModal";

// 🔄 VAULT CONFIGURATION
const VAULT_ADDRESS = "0xb989aaB780ae15E3820f8d97aE84D1bBB91914D2";
const VAULT_ABI = [
  "function requestSettlement(string _marketId) external",
  "function claimWinnings(string _marketId) external",
  "function markets(string) view returns (string marketId, bool resolved, uint8 finalOutcome, uint256 totalPool, uint256 outcome1Pool, uint256 outcome2Pool, string question, string dataSource, uint256 endTime)",
  "function userBets(string, address, uint8) view returns (uint256)"
];

interface MarketCardProps {
  marketId: string;
  category: string;
  question: string;
  volume: string;
  yesProb: number;
  endTime: number;
  resolved: boolean;
}

const DynamicImage = ({ imageUrl, marketId, keyword }: { imageUrl: string, marketId: string, keyword: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fallbackUrl = `https://api.dicebear.com/8.x/shapes/svg?seed=${marketId}&backgroundColor=0a1329,101d3f`;

  return (
    <div className="relative w-11 h-11 rounded-[10px] shrink-0 border border-white/20 overflow-hidden shadow-sm bg-[#0b1222]">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b1222]">
          <Loader2 size={16} className="text-[#00c2ff] animate-spin opacity-70" />
        </div>
      )}
      <img
        src={hasError ? fallbackUrl : imageUrl}
        alt={keyword}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded || hasError ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default function MarketCard({ marketId, question, volume, yesProb, endTime, resolved }: MarketCardProps) {
  const { walletProvider } = useAppKitProvider('eip155');
  // 👇 PULL isConnected FROM ACCOUNT HOOK
  const { address, isConnected } = useAppKitAccount();
  // 👇 PULL open FUNCTION FROM APPKIT
  const { open } = useAppKit(); 
  const probColor = yesProb >= 50 ? "#4ade80" : "#ff3b5c";

  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<'YES' | 'NO'>('YES');
  const [hasWinningBet, setHasWinningBet] = useState(false);
  
  // 🚩 Flag Logic: Clean lined icon that fills when clicked
  const [isFlagged, setIsFlagged] = useState(false);

  const isExpired = Date.now() > Number(endTime) * 1000;

  // Initialize flag status from localStorage
  useEffect(() => {
    const savedFlags = JSON.parse(localStorage.getItem('trigslink_flags') || '[]');
    if (savedFlags.includes(marketId)) {
      setIsFlagged(true);
    }
  }, [marketId]);

  // Handle winnings check
  useEffect(() => {
    const checkWinnings = async () => {
      if (resolved && address && walletProvider) {
        try {
          const ethersProvider = new BrowserProvider(walletProvider as any);
          const vault = new Contract(VAULT_ADDRESS, VAULT_ABI, ethersProvider);
          const market = await vault.markets(marketId);
          const winOutcome = market.finalOutcome; 
          const betAmount = await vault.userBets(marketId, address, winOutcome);
          if (Number(betAmount) > 0) setHasWinningBet(true);
        } catch (e) { console.error(e); }
      }
    };
    checkWinnings();
  }, [resolved, address, walletProvider, marketId]);

  // 🚩 Toggle Flag: Updates fill state and localStorage instantly
  const handleToggleFlag = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // 🛑 GATE: Intercept click if wallet is not connected
    if (!isConnected) {
      open();
      return;
    }

    const currentFlags = JSON.parse(localStorage.getItem('trigslink_flags') || '[]');
    
    let updatedFlags;
    if (isFlagged) {
      updatedFlags = currentFlags.filter((id: string) => id !== marketId);
    } else {
      updatedFlags = [...currentFlags, marketId];
    }
    
    localStorage.setItem('trigslink_flags', JSON.stringify(updatedFlags));
    setIsFlagged(!isFlagged);
  };

  const openModal = (outcome: 'YES' | 'NO') => {
    // 🛑 GATE: Intercept click if wallet is not connected
    if (!isConnected) {
      open();
      return;
    }

    if (isExpired) return;
    setSelectedOutcome(outcome);
    setIsTradeModalOpen(true);
  };

  const words = question.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
  const keyword = words[1] || words[0] || 'crypto';
  const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(keyword)}%203d%20icon%20minimalist?width=150&height=150&nologo=true`;

  return (
    <>
      <div className="flex flex-col h-full rounded-[16px] bg-gradient-to-br from-[#060c18] via-[#132753] to-[#4160a3] border border-[#1e2a45] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#2e4066] cursor-pointer relative overflow-hidden group">
        <div className="absolute inset-0 rounded-[16px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] z-20"></div>

        <div className="flex items-start justify-between gap-3 px-4 pt-5 mb-5 relative z-10">
          <div className="flex items-start gap-3.5 pr-1">
            <DynamicImage imageUrl={aiImageUrl} marketId={marketId} keyword={keyword} />
            <h3 className="text-[14px] font-bold text-white leading-[1.35] tracking-tight mt-[2px] line-clamp-3">{question}</h3>
          </div>
          
          <div className="relative w-[50px] h-[25px] flex items-end justify-center shrink-0 mt-1">
            <svg className="absolute top-0 left-0 w-[50px] h-[50px] rotate-[180deg]" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#374f80" strokeWidth="3.5" strokeDasharray="50 50" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke={probColor} strokeWidth="3.5" strokeDasharray={`${yesProb * 0.5} 100`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            </svg>
            <span className="relative z-10 text-[10px] font-extrabold text-white translate-y-[2px]">{yesProb}%</span>
          </div>
        </div>

        <div className="flex gap-3 px-4 mb-6 mt-auto relative z-10">
          {resolved ? (
            hasWinningBet ? (
              <button disabled className="w-full h-10 rounded-[10px] bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black text-[13px] uppercase flex items-center justify-center gap-2 shadow-lg">
                <Trophy size={16} /> Claim Winnings
              </button>
            ) : (
              <button disabled className="w-full h-10 rounded-[10px] bg-[#1e293b] border border-white/10 text-slate-400 font-bold text-[14px] flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-[#4ade80]" /> Resolved
              </button>
            )
          ) : isExpired ? (
            <button disabled className="w-full h-10 rounded-[10px] bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-lg">
              <Activity size={16} /> Resolve Market
            </button>
          ) : (
            <>
              <button onClick={(e) => { e.stopPropagation(); openModal('YES'); }} className="flex-1 h-10 rounded-[10px] bg-[#166534] hover:bg-[#14532D] text-white font-bold text-[14px]">Buy Yes</button>
              <button onClick={(e) => { e.stopPropagation(); openModal('NO'); }} className="flex-1 h-10 rounded-[10px] bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-[14px]">Buy No</button>
            </>
          )}
        </div>

        {/* 📦 CLEANED FOOTER: Persistent bold text and lined flag icon */}
        <div className="pt-[14px] pb-[14px] px-4 bg-[#0b1222] flex justify-between items-center text-white text-[12px] font-bold relative z-10 rounded-b-[15px]">
          <div className="flex items-center gap-1.5 opacity-80">
            <Pin size={14} className="rotate-45" /> {volume} Vol.
          </div>
          
          {/* 🚩 THE FLAG BUTTON: Strictly icon-only, toggles fill on click */}
          <button 
            onClick={handleToggleFlag}
            className={`p-2 transition-all active:scale-90 
              ${isFlagged ? 'text-[#ffffff]' : 'text-slate-400 hover:text-white'}`}
            title={isFlagged ? "Unsave" : "Save to Watchlist"}
          >
            <Bookmark 
              size={20} 
              strokeWidth={2.5}
              className={`transition-all duration-200 ${isFlagged ? 'fill-current' : 'fill-transparent'}`} 
            />
          </button>
        </div>
      </div>

      {isTradeModalOpen && (
        <TradeModal 
          isOpen={isTradeModalOpen} onClose={() => setIsTradeModalOpen(false)} 
          marketId={marketId} question={question} yesProb={yesProb} initialOutcome={selectedOutcome} marketImage={aiImageUrl}
        />
      )}
    </>
  );
}