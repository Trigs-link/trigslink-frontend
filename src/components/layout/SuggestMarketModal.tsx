import React, { useState } from 'react';
import { X, FileText, ListChecks, HelpCircle, Calendar } from 'lucide-react';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, parseEther } from 'ethers';

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
  const [endDate, setEndDate] = useState(""); // 🆕 New state for the date picker
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletProvider) return alert("Please connect your wallet first.");
    if (!question || !dataSource || !endDate) return alert("Please fill out all fields.");

    // Convert the selected date into a UNIX timestamp (seconds) for Solidity
    const marketEndTimeUnix = Math.floor(new Date(endDate).getTime() / 1000);

    try {
      setIsSubmitting(true);
      
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
      
      const generatedMarketId = `market-${Date.now()}`;
      
      // 🔄 UPDATED CONTRACT CALL
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0b1426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111b33]/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle size={18} className="text-[#00c2ff]" /> Suggest a Market
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-md">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePropose} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"><FileText size={14} /> Market Question</label>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full bg-[#111b33] border border-white/10 rounded-xl p-3 text-[14px] text-white outline-none h-20" required />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"><ListChecks size={14} /> Resolution Rules</label>
            <textarea value={dataSource} onChange={(e) => setDataSource(e.target.value)} className="w-full bg-[#111b33] border border-white/10 rounded-xl p-3 text-[14px] text-white outline-none h-24" required />
          </div>

          {/* 🆕 THE NEW DATE PICKER */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-300 flex items-center gap-2"><Calendar size={14} /> Market End Date</label>
            <input 
              type="datetime-local" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#111b33] border border-white/10 rounded-xl p-3 text-[14px] text-white outline-none"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl font-bold text-[14px] text-white bg-gradient-to-r from-[#00c2ff] to-[#0066ff] disabled:opacity-50">
            {isSubmitting ? "Confirming..." : `Stake ${REQUIRED_STAKE_ETH} ETH & Propose`}
          </button>
        </form>
      </div>
    </div>
  );
}