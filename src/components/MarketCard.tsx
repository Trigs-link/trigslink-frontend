import { useState } from "react";
import { useTrigslink } from "../hooks/useTrigslink";
import { BarChart2, Gift, Bookmark } from "lucide-react";

// 1. ADD 'category' to the interface
interface MarketCardProps {
  marketId: string;
  category: string; 
  question: string;
  volume: string;
  yesProb: number;
}

// 2. Catch the 'category' prop here
export default function MarketCard({ marketId, category, question, volume, yesProb }: MarketCardProps) {
  const trigslink = useTrigslink();
  const [loading, setLoading] = useState(false);

  const handleBet = async (outcome: number) => {
    if (!trigslink) return alert("Please connect your wallet first!");
    setLoading(true);
    try {
      await trigslink.placeBet(marketId, outcome, "0.01");
      alert("Bet transaction initiated!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    if (!trigslink) return;
    setLoading(true);
    try {
      await trigslink.requestSettlement(marketId);
      alert("AI Settlement Triggered via CRE!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1c1c1e] border border-transparent hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all cursor-pointer">
      {/* Top Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">🌐</div>
          {/* 3. Render the category */}
          <span className="text-slate-400 text-xs font-semibold">{category}</span>
        </div>
        <div className="text-right">
          <div className="text-slate-300 text-xs">{yesProb}%</div>
          <div className="text-slate-500 text-[10px]">chance</div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-100 mb-4 leading-snug line-clamp-2 h-10">
        {question}
      </h3>

      <div className="flex gap-2 mb-4 mt-auto">
        <button 
          onClick={() => handleBet(1)}
          disabled={loading}
          className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg py-2 flex justify-between px-3 text-sm font-bold transition-all"
        >
          <span>Yes</span>
          <span>{yesProb}¢</span>
        </button>
        <button 
          onClick={() => handleBet(2)}
          disabled={loading}
          className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg py-2 flex justify-between px-3 text-sm font-bold transition-all"
        >
          <span>No</span>
          <span>{100 - yesProb}¢</span>
        </button>
      </div>

      <div className="flex justify-between items-center text-slate-400 mb-3">
        <div className="text-xs font-medium">{volume} Vol.</div>
        <div className="flex gap-2 text-slate-500">
          <Gift size={14} className="hover:text-slate-300" />
          <Bookmark size={14} className="hover:text-slate-300" />
        </div>
      </div>

      <button 
        onClick={handleResolve}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 py-1.5 rounded-md transition-colors"
      >
        <BarChart2 size={12} />
        {loading ? "Verifying..." : "Trigger AI Settlement"}
      </button>
    </div>
  );
}