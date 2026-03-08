import React, { useState } from 'react';
import { X, FileText, ListChecks, HelpCircle, Calendar, AlertTriangle, Loader2 } from 'lucide-react';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, parseEther } from 'ethers';

// --- HELPER: 3D FACETED ETHEREUM GEM (For Sepolia) ---
const Eth3DIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.925 23.969L15.812 24.032V31.786L15.925 32.115L23.951 20.803L15.925 23.969Z" fill="#3B4058"/>
    <path d="M15.925 23.969L7.894 20.803L15.925 32.115V23.969Z" fill="#565D7A"/>
    <path d="M15.925 21.325L15.877 21.38V23.705L15.925 23.755L23.957 19.387L15.925 21.325Z" fill="#2A2D4A"/>
    <path d="M15.925 21.325L7.894 19.387L15.925 23.755V21.325Z" fill="#454A75"/>
    <path d="M15.925 0L15.753 0.584V18.665L15.925 18.837L23.957 15.22L15.925 0Z" fill="#747D9E"/>
    <path d="M15.925 0L7.894 15.22L15.925 18.837V0Z" fill="#C0C6E4"/>
  </svg>
);

// 🔄 UPDATED TO V2
const GOVERNANCE_ADDRESS = "0xcacF8A1be612231414941023Db6D09Dc43d98291";
const REQUIRED_STAKE_ETH = "0.05"; 

// 🔄 UPDATED ABI with _marketEndTime
const GOVERNANCE_ABI = [
  "function proposeMarket(string _marketId, string _question, string _dataSource, uint256 _marketEndTime) external payable"
];

interface SuggestMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuggestMarketModal({ isOpen, onClose }: SuggestMarketModalProps) {
  const { walletProvider } = useAppKitProvider('eip155');
  
  const [question, setQuestion] = useState("");
  const [dataSource, setDataSource] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletProvider) return alert("Please connect your wallet first.");
    if (!question || !dataSource || !endDate) return alert("Please fill out all fields.");

    const marketEndTimeUnix = Math.floor(new Date(endDate).getTime() / 1000);

    try {
      setIsSubmitting(true);
      
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
      
      const generatedMarketId = `market-${Date.now()}`;
      
      const tx = await governanceContract.proposeMarket(
        generatedMarketId,
        question,
        dataSource,
        marketEndTimeUnix,
        { value: parseEther(REQUIRED_STAKE_ETH) }
      );

      await tx.wait();
      
      alert("Successfully proposed the market! It is now live for community voting.");
      
      setQuestion("");
      setDataSource("");
      setEndDate("");
      onClose();
      
    } catch (error: any) {
      console.error("Proposal failed:", error);
      alert("Failed to propose market. Make sure you have enough Sepolia ETH for the 0.05 stake.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0b1426] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative transform transition-all">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111b33]/80">
          <h2 className="text-[16px] font-black text-white flex items-center gap-2 tracking-wide">
            <HelpCircle size={18} className="text-[#00c2ff]" /> SUGGEST MARKET
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePropose} className="p-6 space-y-6">
          
          {/* QUESTION FIELD - SPORTS EXAMPLE */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-300 flex items-center gap-2">
              <FileText size={15} className="text-slate-400" /> Market Question
            </label>
            <textarea 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="e.g., Will Real Madrid win the UEFA Champions League Final in 2026?"
              className="w-full bg-[#050a15] border border-white/10 focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/50 rounded-xl p-4 text-[14px] text-white placeholder-slate-600 outline-none h-20 transition-all resize-none shadow-inner" 
              required 
            />
          </div>

          {/* RESOLUTION RULES FIELD - SPORTS EXAMPLE */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-300 flex items-center gap-2">
              <ListChecks size={15} className="text-slate-400" /> Resolution Rules & Source
            </label>
            <textarea 
              value={dataSource} 
              onChange={(e) => setDataSource(e.target.value)} 
              placeholder="e.g., Resolves YES if Real Madrid wins the final match. Resolves NO if they lose or fail to reach the final. Source: https://www.uefa.com/uefachampionsleague/"
              className="w-full bg-[#050a15] border border-white/10 focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/50 rounded-xl p-4 text-[14px] text-white placeholder-slate-600 outline-none h-28 transition-all resize-none shadow-inner" 
              required 
            />
          </div>

          {/* DATE PICKER */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-300 flex items-center gap-2">
              <Calendar size={15} className="text-slate-400" /> Market End Date
            </label>
            <input 
              type="datetime-local" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#050a15] border border-white/10 focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/50 rounded-xl p-3.5 text-[14px] text-white outline-none transition-all shadow-inner [color-scheme:dark]"
              required
            />
          </div>

          {/* 🚨 UPDATED ANTI-SPAM WARNING BOX */}
          <div className="bg-gradient-to-r from-[#ff3b5c]/10 to-transparent border border-[#ff3b5c]/20 rounded-xl p-4 flex gap-3 items-start shadow-[inset_0_1px_4px_rgba(255,59,92,0.1)]">
            <AlertTriangle size={18} className="text-[#ff3b5c] shrink-0 mt-0.5" />
            <p className="text-[12px] text-slate-300 leading-relaxed font-medium">
              <strong className="text-[#ff3b5c] font-bold tracking-wide">ANTI-SPAM WARNING:</strong> Ensure your question is objective and the data source is verifiable. If the decentralized oracle nodes or community votes flag this market as spam, <span className="text-white font-bold">your {REQUIRED_STAKE_ETH} ETH stake will be slashed</span> and lost.
            </p>
          </div>

          {/* 🚀 3D TACTILE SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`
              w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300
              bg-gradient-to-b from-[#1a233a] to-[#0b1426]
              border-t border-t-white/20 border-b border-b-black/80 border-l border-l-white/5 border-r border-r-white/5
              shadow-[0_6px_15px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.05)]
              hover:brightness-110 active:translate-y-1 active:shadow-inner
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:brightness-100
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin text-slate-400" />
                <span className="text-white font-bold text-[15px] tracking-wide">Confirming...</span>
              </>
            ) : (
              <>
                {/* Embedded the 3D Sepolia Gem icon */}
                <Eth3DIcon size={20} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                <span className="text-white font-extrabold text-[15px] tracking-wide drop-shadow-md">
                  Stake {REQUIRED_STAKE_ETH} ETH & Propose
                </span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}