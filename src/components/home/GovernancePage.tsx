import { useState, useEffect } from 'react';
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle, PlayCircle, Loader2 } from 'lucide-react';

// --- GOVERNANCE CONFIGURATION ---
const GOVERNANCE_ADDRESS = "0x7f344B5b55eD8d386462F8Cf9BD739c8c7ac87db"; // Your Sepolia Deployment

const GOVERNANCE_ABI = [
  "function proposalCount() view returns (uint256)",
  "function proposals(uint256) view returns (uint256 id, string marketId, string question, string dataSource, address creator, uint256 endTime, uint256 yesVotes, uint256 noVotes, bool executed, bool spam)",
  "function hasVoted(uint256, address) view returns (bool)",
  "function vote(uint256 _proposalId, bool _support) external",
  "function executeProposal(uint256 _proposalId) external"
];

// Types for our Frontend
interface Proposal {
  id: number;
  marketId: string;
  question: string;
  rules: string;
  creator: string;
  endTime: number;
  yesVotes: number;
  noVotes: number;
  executed: boolean;
  spam: boolean;
  hasUserVoted: boolean;
}

export default function GovernancePage() {
  const { walletProvider } = useAppKitProvider('eip155');
  const { address, isConnected } = useAppKitAccount();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState<number | null>(null);

  // Simple tab state: 'active' or 'my-proposals'
  const [activeTab, setActiveTab] = useState<'active' | 'my-proposals'>('active');

  // Check URL params for initial tab (if they clicked "My Proposals" from navbar)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'my-proposals') {
      setActiveTab('my-proposals');
    }
  }, []);

  // Fetch all proposals from the blockchain
  const fetchProposals = async () => {
    if (!walletProvider) {
      setLoading(false);
      return;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, ethersProvider);

      const count = await governanceContract.proposalCount();
      const fetchedProposals: Proposal[] = [];

      // Loop backward to show newest proposals first
      for (let i = Number(count); i >= 1; i--) {
        const prop = await governanceContract.proposals(i);
        
        // Check if the current user already voted on this
        let userVoted = false;
        if (address) {
          userVoted = await governanceContract.hasVoted(i, address);
        }

        fetchedProposals.push({
          id: Number(prop.id),
          marketId: prop.marketId,
          question: prop.question,
          rules: prop.dataSource, // We mapped "dataSource" to "rules" in our UI!
          creator: prop.creator,
          endTime: Number(prop.endTime) * 1000, // Convert solidity seconds to JS milliseconds
          yesVotes: Number(formatEther(prop.yesVotes)), // Format from Wei to normal $TRIGS units
          noVotes: Number(formatEther(prop.noVotes)),
          executed: prop.executed,
          spam: prop.spam,
          hasUserVoted: userVoted
        });
      }

      setProposals(fetchedProposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchProposals();
    }
  }, [isConnected, address, walletProvider]);

  // Handle Voting
  const handleVote = async (proposalId: number, support: boolean) => {
    if (!walletProvider) return;
    try {
      setIsVoting(proposalId);
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);

      const tx = await governanceContract.vote(proposalId, support);
      await tx.wait();
      
      alert(`Successfully voted ${support ? 'YES' : 'NO'}!`);
      fetchProposals(); // Refresh data
    } catch (error: any) {
      console.error("Voting failed:", error);
      alert(error.reason || "Voting failed. Do you have $TRIGS?");
    } finally {
      setIsVoting(null);
    }
  };

  // Handle Execution (If time is up)
  const handleExecute = async (proposalId: number) => {
    if (!walletProvider) return;
    try {
      setIsVoting(proposalId); // Reusing voting state for loading spinner
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);

      const tx = await governanceContract.executeProposal(proposalId);
      await tx.wait();
      
      alert("Proposal executed successfully!");
      fetchProposals();
    } catch (error: any) {
      console.error("Execution failed:", error);
      alert(error.reason || "Execution failed.");
    } finally {
      setIsVoting(null);
    }
  };

  // Filter proposals based on active tab
  const displayProposals = proposals.filter(p => {
    if (activeTab === 'my-proposals') return p.creator.toLowerCase() === address?.toLowerCase();
    return true; // Show all on 'active' tab
  });

  return (
    <div className="min-h-screen bg-[#050a15] pb-20">
      
      {/* Header Area */}
      <div className="border-b border-white/5 bg-[#0b1426]">
        <div className="max-w-[1000px] mx-auto px-4 pt-12 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Governance Hub</h1>
          <p className="text-slate-400 text-[14px]">
            Stake, curate, and verify the autonomous truth engine. 1 $TRIGS = 1 Vote.
          </p>
          
          {/* Tabs */}
          <div className="flex items-center gap-6 mt-8">
            <button 
              onClick={() => setActiveTab('active')}
              className={`pb-3 text-[14px] font-bold transition-colors border-b-2 ${activeTab === 'active' ? 'border-[#00c2ff] text-[#00c2ff]' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              All Proposals
            </button>
            <button 
              onClick={() => setActiveTab('my-proposals')}
              className={`pb-3 text-[14px] font-bold transition-colors border-b-2 ${activeTab === 'my-proposals' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              My Proposals
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1000px] mx-auto px-4 mt-8">
        {!isConnected ? (
          <div className="bg-[#111b33] border border-white/5 rounded-2xl p-12 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Connect your wallet</h3>
            <p className="text-slate-400 mb-6">You need to connect to Sepolia to view and vote on markets.</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#00c2ff]" size={40} />
          </div>
        ) : displayProposals.length === 0 ? (
          <div className="bg-[#111b33] border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-slate-400">No proposals found for this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayProposals.map(proposal => {
              const isEnded = Date.now() > proposal.endTime;
              const totalVotes = proposal.yesVotes + proposal.noVotes;
              const yesPercent = totalVotes > 0 ? (proposal.yesVotes / totalVotes) * 100 : 0;
              const noPercent = totalVotes > 0 ? (proposal.noVotes / totalVotes) * 100 : 0;

              return (
                <div key={proposal.id} className="bg-[#0b1426] border border-white/10 rounded-2xl p-6 shadow-xl transition-all hover:border-white/20">
                  
                  {/* Proposal Header (Status & Time) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded-md">ID: #{proposal.id}</span>
                      {proposal.executed ? (
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${proposal.spam ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {proposal.spam ? 'Rejected' : 'Passed & Live'}
                        </span>
                      ) : isEnded ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wide bg-blue-500/10 text-blue-400">
                          Awaiting Execution
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wide bg-amber-500/10 text-amber-400 flex items-center gap-1">
                          <Clock size={12} /> Voting Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Market Question & Rules */}
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">{proposal.question}</h3>
                  <div className="bg-[#111b33] rounded-xl p-4 mb-6 border border-white/5">
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Resolution Rules</p>
                    <p className="text-[13px] text-slate-300 leading-relaxed">{proposal.rules}</p>
                  </div>

                  {/* Voting Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[13px] font-bold mb-2">
                      <span className="text-emerald-400">YES ({proposal.yesVotes} TRIGS)</span>
                      <span className="text-red-400">NO ({proposal.noVotes} TRIGS)</span>
                    </div>
                    <div className="w-full h-3 bg-[#111b33] rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${yesPercent}%` }}></div>
                      <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${noPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {proposal.executed ? (
                      <div className="text-[13px] text-slate-500 flex items-center gap-2">
                        {proposal.spam ? <XCircle size={16} className="text-red-400"/> : <CheckCircle size={16} className="text-emerald-400"/>}
                        This proposal is closed.
                      </div>
                    ) : isEnded ? (
                      <button 
                        onClick={() => handleExecute(proposal.id)}
                        disabled={isVoting === proposal.id}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        {isVoting === proposal.id ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
                        Execute Decision
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleVote(proposal.id, true)}
                          disabled={proposal.hasUserVoted || isVoting === proposal.id}
                          className={`flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${proposal.hasUserVoted ? 'bg-[#111b33] text-slate-500 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'}`}
                        >
                          <ThumbsUp size={18} /> VOTE YES
                        </button>
                        <button 
                          onClick={() => handleVote(proposal.id, false)}
                          disabled={proposal.hasUserVoted || isVoting === proposal.id}
                          className={`flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${proposal.hasUserVoted ? 'bg-[#111b33] text-slate-500 cursor-not-allowed' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'}`}
                        >
                          <ThumbsDown size={18} /> VOTE NO
                        </button>
                      </>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}