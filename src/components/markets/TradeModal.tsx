import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ArrowUpDown, Loader2, BarChart3, ListChecks } from 'lucide-react';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';

// 🔄 VAULT CONFIGURATION
const VAULT_ADDRESS = "0xb989aaB780ae15E3820f8d97aE84D1bBB91914D2"; 
const VAULT_ABI = [
  "function placeBet(string _marketId, uint8 _outcome) external payable",
  "function markets(string) view returns (string marketId, bool resolved, uint8 finalOutcome, uint256 totalPool, uint256 outcome1Pool, uint256 outcome2Pool, string question, string dataSource, uint256 endTime)"
];

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: string;
  question: string;
  yesProb: number;
  initialOutcome: 'YES' | 'NO';
  marketImage?: string; 
}

const SepoliaLogo = () => (
  <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#1a233a] to-[#0b1426] border border-white/20 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
    <svg width="10" height="10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.925 23.969L15.812 24.032V31.786L15.925 32.115L23.951 20.803L15.925 23.969Z" fill="#3B4058"/>
      <path d="M15.925 23.969L7.894 20.803L15.925 32.115V23.969Z" fill="#565D7A"/>
      <path d="M15.925 21.325L15.877 21.38V23.705L15.925 23.755L23.957 19.387L15.925 21.325Z" fill="#2A2D4A"/>
      <path d="M15.925 21.325L7.894 19.387L15.925 23.755V21.325Z" fill="#454A75"/>
      <path d="M15.925 0L15.753 0.584V18.665L15.925 18.837L23.957 15.22L15.925 0Z" fill="#747D9E"/>
      <path d="M15.925 0L7.894 15.22L15.925 18.837V0Z" fill="#C0C6E4"/>
    </svg>
  </div>
);

export default function TradeModal({ isOpen, onClose, marketId, question, yesProb, initialOutcome, marketImage }: TradeModalProps) {
  const { walletProvider } = useAppKitProvider('eip155');
  
  const [outcome, setOutcome] = useState<'YES' | 'NO'>(initialOutcome);
  const [amount, setAmount] = useState("");
  const [inputMode, setInputMode] = useState<'USD' | 'ETH'>('USD'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [marketSupply, setMarketSupply] = useState<string>("0.00");
  const [isLoadingSupply, setIsLoadingSupply] = useState(true);

  useEffect(() => {
    const fetchEthPrice = async () => {
      if (!isOpen) return;
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await res.json();
        if (data.ethereum?.usd) setEthPrice(data.ethereum.usd);
      } catch (error) { setEthPrice(3500); } finally { setIsLoadingPrice(false); }
    };
    fetchEthPrice();
  }, [isOpen]);

  useEffect(() => {
    const fetchMarketData = async () => {
      if (!isOpen || !walletProvider) return;
      try {
        setIsLoadingSupply(true);
        const ethersProvider = new BrowserProvider(walletProvider as any);
        const vaultContract = new Contract(VAULT_ADDRESS, VAULT_ABI, ethersProvider);
        const marketData = await vaultContract.markets(marketId);
        setMarketSupply(formatEther(marketData[3]));
      } catch (error) { console.error("Error fetching supply:", error); } finally { setIsLoadingSupply(false); }
    };
    fetchMarketData();
  }, [isOpen, marketId, walletProvider]);

  useEffect(() => { setOutcome(initialOutcome); }, [initialOutcome, isOpen]);

  if (!isOpen) return null;

  const noProb = 100 - yesProb;
  const isYes = outcome === 'YES';
  const numericAmount = parseFloat(amount) || 0;
  
  const calculatedEth = inputMode === 'ETH' ? amount : ethPrice > 0 ? (numericAmount / ethPrice).toFixed(5) : "0.00";
  const calculatedUsd = inputMode === 'USD' ? amount : ethPrice > 0 ? (numericAmount * ethPrice).toFixed(2) : "0.00";
  const equivalentDisplay = inputMode === 'USD' ? `≈ ${calculatedEth} ETH` : `≈ $${calculatedUsd} USD`;

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletProvider) return alert("Please connect your wallet.");
    try {
      setIsSubmitting(true);
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const vaultContract = new Contract(VAULT_ADDRESS, VAULT_ABI, signer);
      const tx = await vaultContract.placeBet(marketId, isYes ? 1 : 2, { value: parseEther(calculatedEth.toString()) });
      await tx.wait();
      alert(`Trade Successful!`);
      onClose();
    } catch (error: any) { alert("Transaction failed."); } finally { setIsSubmitting(false); }
  };

  const toggleInputMode = () => {
    if (numericAmount > 0) setAmount(inputMode === 'USD' ? calculatedEth : calculatedUsd);
    setInputMode(prev => prev === 'USD' ? 'ETH' : 'USD');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050a]/90 backdrop-blur-md p-4 transition-all animate-in fade-in duration-300">
      <div 
        className="w-full max-w-[440px] bg-gradient-to-br from-[#0a1329] via-[#101d3f] to-[#1d2f5a] border border-white/10 rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-[28px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] z-20"></div>

        {/* 🏆 Tactile Header Section */}
        <div className="px-6 pt-7 pb-5 border-b border-white/5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#1e293b] border border-white/10 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                  <ListChecks size={24} className="text-slate-200" />
               </div>
               <div>
                  <h2 className="text-[20px] font-black text-white tracking-tight leading-none mb-1.5">Confirm Prediction</h2>
               </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-all p-1.5 rounded-full hover:bg-white/5">
              <X size={22} />
            </button>
          </div>
        </div>

        <form onSubmit={handleTrade} className="p-6 space-y-5 relative z-10">
          
          <div className="flex items-center gap-4 bg-[#050a15]/50 border border-white/5 rounded-2xl p-4 shadow-inner">
            {marketImage && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-black">
                    <img src={marketImage} alt="Context" className="w-full h-full object-cover opacity-80" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-white leading-snug line-clamp-2">{question}</p>
            </div>
          </div>

          <div className="flex p-1.5 bg-[#050a15]/80 rounded-xl border border-white/5 shadow-inner relative">
            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)] ${isYes ? 'left-1.5 bg-gradient-to-b from-[#166534] to-[#14532D] border border-[#4ade80]/40' : 'left-[calc(50%+4px)] bg-gradient-to-b from-[#991B1B] to-[#7F1D1D] border border-[#ff3b5c]/40'}`}></div>
            <button type="button" onClick={() => setOutcome('YES')} className={`relative z-10 flex-1 py-3 rounded-lg font-bold text-[14px] transition-all duration-300 ${isYes ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              YES <span className={`text-[11px] ml-1 ${isYes ? 'text-green-300' : 'text-slate-600'}`}>({yesProb}%)</span>
            </button>
            <button type="button" onClick={() => setOutcome('NO')} className={`relative z-10 flex-1 py-3 rounded-lg font-bold text-[14px] transition-all duration-300 ${!isYes ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              NO <span className={`text-[11px] ml-1 ${!isYes ? 'text-red-300' : 'text-slate-600'}`}>({noProb}%)</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] px-1">
              <span>Stake Amount</span>
              <span className="flex items-center gap-1">{inputMode} MODE</span>
            </div>
            
            <div className="relative flex items-center bg-[#050a15]/80 border border-white/10 rounded-2xl p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] focus-within:border-[#00c2ff]/40 transition-all group">
              {inputMode === 'USD' && <span className="text-slate-400 font-bold text-[24px] pl-3 pr-1 font-mono">$</span>}
              <input 
                type="number" step="0.001" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                className={`flex-1 w-full bg-transparent text-[28px] font-mono font-bold text-white placeholder-slate-700 outline-none ${inputMode === 'ETH' ? 'pl-3' : 'pl-0'}`}
                required
              />
              <button 
                type="button" onClick={toggleInputMode}
                className="flex items-center gap-2 bg-[#1a233a] hover:bg-[#253454] border border-white/10 rounded-xl px-3 py-2.5 transition-colors shadow-sm active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
              >
                {inputMode === 'ETH' ? <SepoliaLogo /> : <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">$</div>}
                <span className="text-white font-black text-[13px] w-8 text-center uppercase">{inputMode}</span>
                <ArrowUpDown size={14} className="text-[#00c2ff]" />
              </button>
            </div>
            
            {/* 🆕 Aligned Footer: Pool Left, Price Right (Bold White Style) */}
            <div className="flex justify-between items-center px-1 pt-1.5">
              <div className="flex items-center gap-1.5 text-[12px] font-mono text-white font-bold">
                <BarChart3 size={13} className="text-slate-400 opacity-70" />
                <span>{isLoadingSupply ? "---" : `${marketSupply} ETH Pool`}</span>
              </div>

              <span className="text-[12px] font-mono text-white font-bold flex items-center gap-1.5">
                {isLoadingPrice ? (
                    <><Loader2 size={12} className="animate-spin text-[#00c2ff]" /> ...</>
                ) : (
                    numericAmount > 0 ? equivalentDisplay : `1 Sepolia ETH ≈ $${ethPrice.toLocaleString()}`
                )}
              </span>
            </div>
          </div>

          <div className="bg-[#1c2742]/30 border border-white/5 rounded-xl p-4 flex items-start gap-3 shadow-inner">
            <AlertCircle size={16} className="text-[#00c2ff] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
              Stake is added to the <strong className={isYes ? "text-green-500" : "text-red-500"}>{outcome} pool</strong>. 
              Winning sides split the total pooled ETH proportionally upon resolution.
            </p>
          </div>

          <button 
            type="submit" disabled={isSubmitting || numericAmount <= 0}
            className={`w-full py-4 rounded-xl font-black text-[15px] text-white transition-all shadow-lg border uppercase tracking-[0.05em] ${
              isSubmitting || numericAmount <= 0
                ? 'bg-[#050a15]/60 text-slate-600 border-white/5 cursor-not-allowed' 
                : isYes 
                  ? 'bg-[#166534] hover:bg-[#1e8a47] border-[#4ade80]/30 shadow-[0_10px_20px_rgba(22,101,52,0.3)]'
                  : 'bg-[#991B1B] hover:bg-[#b91c1c] border-[#ff3b5c]/30 shadow-[0_10px_20px_rgba(153,27,27,0.3)]'
            }`}
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : `Place ${outcome} Prediction`}
          </button>

        </form>
      </div>
    </div>
  );
}