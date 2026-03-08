import { useState, useEffect } from 'react';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers, formatEther } from 'ethers';
import MarketCard from './MarketCard';
import { Loader2 } from 'lucide-react';

const GOVERNANCE_ADDRESS = "0xcacF8A1be612231414941023Db6D09Dc43d98291";
const VAULT_ADDRESS = "0xb0A1Aa0bfE5aAd4dC1AE84008Ecb89d4Ecc3bD7F";

const GOVERNANCE_ABI = [
  "function proposalCount() view returns (uint256)",
  "function proposals(uint256) view returns (uint256 id, string marketId, string question, string dataSource, address creator, uint256 marketEndTime, uint256 votingEndTime, uint256 yesVotes, uint256 noVotes, bool executed, bool spam)"
];

// Simplified ABI to prevent struct mismatch crashes
const VAULT_ABI = [
  "function markets(string) view returns (string marketId, bool resolved, uint8 finalOutcome, uint256 outcome1Pool, uint256 outcome2Pool)"
];

export default function MarketGrid() {
  const { walletProvider } = useAppKitProvider('eip155');
  const [liveMarkets, setLiveMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLiveMarkets() {
      const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/demo"; 
      const ethersProvider = walletProvider 
        ? new BrowserProvider(walletProvider as any) 
        : new ethers.JsonRpcProvider(rpcUrl);

      const governance = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, ethersProvider);
      const vault = new Contract(VAULT_ADDRESS, VAULT_ABI, ethersProvider);

      try {
        const count = await governance.proposalCount();
        const activeMarketData = [];

        for (let i = Number(count); i >= 1; i--) {
          const prop = await governance.proposals(i);
          
          if (prop.executed && !prop.spam) {
            
            let totalVol = 0;
            let yesPercentage = 50;

            // 🛡️ BULLETPROOF VAULT FETCH
            try {
              const vaultData = await vault.markets(prop.marketId);
              const yesPool = Number(formatEther(vaultData.outcome1Pool || 0n));
              const noPool = Number(formatEther(vaultData.outcome2Pool || 0n));
              totalVol = yesPool + noPool;
              
              if (totalVol > 0) {
                yesPercentage = Math.round((yesPool / totalVol) * 100);
              }
            } catch (vaultError) {
              console.warn(`Vault data pending for ${prop.marketId}. Rendering safely.`);
            }

            activeMarketData.push({
              marketId: prop.marketId,
              // 🧠 Pulling directly from Governance instead of Vault!
              question: prop.question, 
              volume: `${totalVol.toFixed(3)} ETH`,
              yesProb: yesPercentage
            });
          }
        }

        setLiveMarkets(activeMarketData);
      } catch (error) {
        console.error("Critical error fetching markets:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLiveMarkets();
  }, [walletProvider]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#00c2ff]" size={40} />
      </div>
    );
  }

  if (liveMarkets.length === 0) {
    return (
      <div className="bg-[#111b33] border border-white/5 rounded-2xl p-12 text-center max-w-[1000px] mx-auto mt-8 shadow-xl">
        <p className="text-slate-400">No live markets currently active. Go propose one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {liveMarkets.map((market) => (
        <MarketCard 
          key={market.marketId}
          marketId={market.marketId}
          category="Crypto"
          question={market.question}
          volume={market.volume}
          yesProb={market.yesProb}
          endTime={market.endTime || 1798675200} // Added a fallback just in case
          resolved={market.resolved || false}
        />
      ))}
    </div>
  );
}