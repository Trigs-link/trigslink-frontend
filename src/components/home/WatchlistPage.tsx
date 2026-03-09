import { useState, useEffect } from 'react';
import { Bookmark, Loader2, BotMessageSquare } from 'lucide-react';
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import MarketCard from '../markets/MarketCard'; 

// 🔄 VAULT CONFIGURATION
const VAULT_ADDRESS = "0xb989aaB780ae15E3820f8d97aE84D1bBB91914D2";
const VAULT_ABI = [
  "function markets(string) view returns (string marketId, bool resolved, uint8 finalOutcome, uint256 totalPool, uint256 outcome1Pool, uint256 outcome2Pool, string question, string dataSource, uint256 endTime)"
];

// --- HELPER: WHITE 3D GEM LOGO (Strictly No Blue) ---
const WhiteGem = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>
    <path d="M15.925 23.969L15.812 24.032V31.786L15.925 32.115L23.951 20.803L15.925 23.969Z" fill="url(#gemGradient)"/>
    <path d="M15.925 23.969L7.894 20.803L15.925 32.115V23.969Z" fill="#CBD5E1"/>
    <path d="M15.925 21.325L15.877 21.38V23.705L15.925 23.755L23.957 19.387L15.925 21.325Z" fill="#94A3B8"/>
    <path d="M15.925 21.325L7.894 19.387L15.925 23.755V21.325Z" fill="#E2E8F0"/>
    <path d="M15.925 0L15.753 0.584V18.665L15.925 18.837L23.957 15.22L15.925 0Z" fill="url(#gemGradient)"/>
    <path d="M15.925 0L7.894 15.22L15.925 18.837V0Z" fill="#CBD5E1"/>
  </svg>
);

interface FetchedMarket {
  marketId: string;
  category: string;
  question: string;
  volume: string;
  yesProb: number;
  endTime: number;
  resolved: boolean;
}

export default function WatchlistPage() {
  const { walletProvider } = useAppKitProvider('eip155');
  const { isConnected } = useAppKitAccount();
  const [watchlistMarkets, setWatchlistMarkets] = useState<FetchedMarket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlaggedMarkets = async () => {
      // 1. Get the flagged IDs from local storage
      const savedFlags = JSON.parse(localStorage.getItem('trigslink_flags') || '[]');
      
      if (savedFlags.length === 0) {
        setWatchlistMarkets([]);
        setIsLoading(false);
        return;
      }

      if (!walletProvider) {
        setIsLoading(false);
        return; 
      }

      try {
        setIsLoading(true);
        const ethersProvider = new BrowserProvider(walletProvider as any);
        const vault = new Contract(VAULT_ADDRESS, VAULT_ABI, ethersProvider);

        // 2. Fetch live data for each flagged market directly from the smart contract
        const fetchedData = await Promise.all(
          savedFlags.map(async (id: string) => {
            try {
              const m = await vault.markets(id);
              
              // Validate that the market actually exists on-chain
              if (!m[0] || m[0] === "") {
                console.warn(`Market ID ${id} returned empty from contract.`);
                return null;
              }

              const total = Number(formatEther(m[3]));
              const outcome1 = Number(formatEther(m[4]));
              const yesProb = total > 0 ? Math.round((outcome1 / total) * 100) : 50;

              return {
                marketId: m[0],
                category: "Watchlist", 
                question: m[6],
                volume: total > 0 ? total.toFixed(3) : "0.000",
                yesProb: yesProb,
                endTime: Number(m[8]),
                resolved: m[1]
              };
            } catch (err) {
              console.error(`Failed to fetch market ${id} from RPC:`, err);
              return null;
            }
          })
        );

        setWatchlistMarkets(fetchedData.filter(m => m !== null) as FetchedMarket[]);
      } catch (error) {
        console.error("Error connecting to contract:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlaggedMarkets();
  }, [walletProvider]); 

  return (
    <div className="min-h-screen bg-[#050a15] pb-24">
      {/* 🏆 CLEAN HEADER WITH 3D WHITE LOGO & DIVIDER */}
      <div className="px-6 pt-12 pb-8 border-b border-white/10 bg-gradient-to-b from-[#0b1426]/50 to-transparent relative z-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-[#0b1426]/80 border border-white/10 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 active:scale-100 group">
                <WhiteGem size={28} />
             </div>
             <div>
                <h1 className="text-[32px] font-black text-white tracking-tight leading-none mb-1.5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                  Your Watchlist
                </h1>
                <p className="text-[12px] text-slate-400 font-extrabold uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                  <Bookmark size={13} className="opacity-70 fill-slate-500" />
                  Markets you are actively tracking
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-12">
        {/* State Containers */}
        {!isConnected ? (
           <div className="bg-[#0b1426] border border-white/5 rounded-3xl p-16 text-center shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] max-w-2xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-300">
             <BotMessageSquare size={64} className="text-slate-600 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] stroke-[1.5]" />
             <div>
                <h3 className="text-[22px] font-black text-white mb-2 leading-tight">Wallet Connection Required</h3>
                <p className="text-[14px] text-slate-400 font-medium leading-relaxed max-w-sm">
                  Please connect your Web3 wallet to read live market data from the Sepolia chain.
                </p>
             </div>
           </div>
        ) : isLoading ? (
          // 🧹 CLEANED UP LOADING STATE: Minimalist white/slate spinner, no blue
          <div className="flex justify-center items-center py-32 animate-in fade-in duration-500">
             <Loader2 size={40} className="animate-spin text-slate-300 opacity-80" strokeWidth={2} />
          </div>
        ) : watchlistMarkets.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center group transition-all animate-in fade-in duration-300 border border-white/5 rounded-3xl bg-[#0b1426]/50">
            <Bookmark size={56} className="mx-auto text-slate-700 mb-6 fill-transparent group-hover:fill-slate-700 transition-colors duration-300 stroke-[1.5]" />
            <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Your Watchlist is empty</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium text-[14px] leading-relaxed">
                  Click the flag icon on any market card to save it here for quick access.
                </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {watchlistMarkets.map(market => (
              <MarketCard 
                key={market.marketId}
                {...market}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}