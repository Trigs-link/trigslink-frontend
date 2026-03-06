import React, { useState } from 'react';
import { X, AlertCircle, FileText, ListChecks, HelpCircle } from 'lucide-react';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, parseEther } from 'ethers';

// --- GOVERNANCE CONFIGURATION ---
const GOVERNANCE_ADDRESS = "0x7f344B5b55eD8d386462F8Cf9BD739c8c7ac87db";
const REQUIRED_STAKE_ETH = "0.001"; // Update this if your deployment script used a different value

const GOVERNANCE_ABI = [
  "function proposeMarket(string _marketId, string _question, string _dataSource) external payable"
];

interface SuggestMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuggestMarketModal({ isOpen, onClose }: SuggestMarketModalProps) {
  const { walletProvider } = useAppKitProvider('eip155');
  
  const [question, setQuestion] = useState("");
  const [dataSource, setDataSource] = useState(""); // Kept variable name for smart contract compatibility
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletProvider) return alert("Please connect your wallet first.");
    if (!question || !dataSource) return alert("Please fill out all fields.");

    try {
      setIsSubmitting(true);
      
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
      
      // Auto-generate a unique market ID
      const generatedMarketId = `market-${Date.now()}`;
      
      console.log(`Proposing: ${generatedMarketId} | Stake: ${REQUIRED_STAKE_ETH} ETH`);

      // Call proposeMarket and send the required ETH stake
      const tx = await governanceContract.proposeMarket(
        generatedMarketId,
        question,
        dataSource,
        { value: parseEther(REQUIRED_STAKE_ETH) }
      );

      await tx.wait();
      
      console.log("Market Proposed! Hash:", tx.hash);
      alert("Successfully proposed the market! It is now live for community voting.");
      
      // Reset and close
      setQuestion("");
      setDataSource("");
      onClose();
      
    } catch (error: any) {
      console.error("Proposal failed:", error);
      
      if (error.code === "ACTION_REJECTED") {
        alert("Transaction rejected by user.");
      } else {
        alert("Failed to propose market. Make sure you have enough Sepolia ETH for the stake.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div 
        className="w-full max-w-md bg-[#0b1426] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111b33]/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle size={18} className="text-[#00c2ff]" />
            Suggest a Market
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePropose} className="p-6 space-y-5">
          
          {/* Question Input */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-300 flex items-center gap-2">
              <FileText size={14} className="text-slate-500" />
              Market Question
            </label>
            <textarea 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Will Apple announce a new hardware category in 2026?"
              className="w-full bg-[#111b33] border border-white/10 rounded-xl p-3 text-[14px] text-white placeholder-slate-500 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/50 transition-all resize-none h-20 shadow-inner"
              required
            />
          </div>

          {/* Rules/Criteria Input (Replacing Data Source) */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-300 flex items-center gap-2">
              <ListChecks size={14} className="text-slate-500" />
              Resolution Criteria & Rules
            </label>
            <textarea 
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
              placeholder="e.g., To resolve as YES, there must be consensus across at least 3 major global news outlets. Rumors do not count."
              className="w-full bg-[#111b33] border border-white/10 rounded-xl p-3 text-[14px] text-white placeholder-slate-500 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/50 transition-all resize-none h-24 shadow-inner"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Define exactly what counts as a YES. The autonomous AI will search the web to verify the truth based on these rules.
            </p>
          </div>

          {/* Stake Warning */}
          <div className="bg-[#1c2742] border border-[#00c2ff]/20 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-[#00c2ff] shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-bold text-white mb-1">Staking Required</p>
              <p className="text-[12px] text-slate-400 leading-relaxed">
                Proposing a market requires a <strong className="text-slate-200">{REQUIRED_STAKE_ETH} ETH</strong> stake to prevent spam. 
                If the community votes YES, your stake is fully refunded. If rejected, it is slashed.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting || !question || !dataSource}
            className={`w-full py-3.5 rounded-xl font-bold text-[14px] text-white shadow-lg transition-all ${
              isSubmitting || !question || !dataSource 
                ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:brightness-110 hover:shadow-[#00c2ff]/20'
            }`}
          >
            {isSubmitting ? "Confirming in Wallet..." : `Stake ${REQUIRED_STAKE_ETH} ETH & Propose`}
          </button>

        </form>
      </div>
    </div>
  );
}