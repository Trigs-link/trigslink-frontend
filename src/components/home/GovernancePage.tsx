import { useState, useEffect } from 'react';
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle, PlayCircle, Loader2, ListChecks, ArrowRight, User } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 

const GOVERNANCE_ADDRESS = "0xcacF8A1be612231414941023Db6D09Dc43d98291";

// 🛡️ THE FIXED ABI
const GOVERNANCE_ABI = [
  "function proposalCount() view returns (uint256)",
  "function proposals(uint256) view returns (uint256 id, string marketId, string question, string dataSource, uint256 marketEndTime, address creator, uint256 votingEndTime, uint256 yesVotes, uint256 noVotes, bool executed, bool isSpam, bool spamChecked)",
  "function hasVoted(uint256, address) view returns (bool)",
  "function vote(uint256 _proposalId, bool _support) external",
  "function executeProposal(uint256 _proposalId) external"
];

interface Proposal {
  id: number;
  marketId: string;
  question: string;
  rules: string;
  creator: string;
  votingEndTime: number; 
  yesVotes: number;
  noVotes: number;
  executed: boolean;
  spam: boolean;
  hasUserVoted: boolean;
}

function CountdownTimer({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, endTime - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, endTime - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft === 0) return <span className="text-[#ff3b5c] font-bold tracking-wide">CLOSED</span>;

  const minutes = Math.floor((timeLeft / 1000 / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((timeLeft / 1000) % 60).toString().padStart(2, '0');

  return (
    <span className="text-amber-400 font-mono font-bold tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
      {minutes}:{seconds}
    </span>
  );
}

const formatAddress = (address: string) => {
  if (!address || address === "0x0000000000000000000000000000000000000000") return "Unknown";
  if (address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default function GovernancePage() {
  const { walletProvider } = useAppKitProvider('eip155');
  const { address, isConnected } = useAppKitAccount();
  
  const location = useLocation();
  const navigate = useNavigate();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState<number | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab') === 'my-proposals' ? 'my-proposals' : 'active';

  const handleTabSwitch = (tab: 'active' | 'my-proposals') => {
    if (tab === 'active') navigate('/governance');
    else navigate('/governance?tab=my-proposals');
  };

  const fetchProposals = async () => {
    if (!walletProvider) return setLoading(false);

    try {
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, ethersProvider);
      const count = await governanceContract.proposalCount();
      const fetchedProposals: Proposal[] = [];

      for (let i = Number(count); i >= 1; i--) {
        const prop = await governanceContract.proposals(i);
        let userVoted = false;
        if (address) {
          userVoted = await governanceContract.hasVoted(i, address);
        }

        const safeCreator = prop.creator ? String(prop.creator) : "";

        fetchedProposals.push({
          id: Number(prop.id),
          marketId: prop.marketId,
          question: prop.question,
          rules: prop.dataSource,
          creator: safeCreator,
          votingEndTime: Number(prop.votingEndTime) * 1000, 
          yesVotes: Number(formatEther(prop.yesVotes)), 
          noVotes: Number(formatEther(prop.noVotes)),
          executed: prop.executed,
          spam: prop.isSpam, // 🛡️ Updated to match new ABI
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
    if (isConnected) fetchProposals();
  }, [isConnected, address, walletProvider]);

  const handleVote = async (proposalId: number, support: boolean) => {
    if (!walletProvider) return;
    try {
      setIsVoting(proposalId);
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
      const tx = await governanceContract.vote(proposalId, support);
      await tx.wait();
      fetchProposals();
    } catch (error: any) {
      console.error("Voting failed:", error);
      alert(error.reason || "Voting failed. Do you have $TRIGS?");
    } finally {
      setIsVoting(null);
    }
  };

  const handleExecute = async (proposalId: number) => {
    if (!walletProvider) return;
    try {
      setIsVoting(proposalId);
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const governanceContract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
      const tx = await governanceContract.executeProposal(proposalId);
      await tx.wait();
      fetchProposals();
    } catch (error: any) {
      console.error("Execution failed:", error);
      alert(error.reason || "Execution failed.");
    } finally {
      setIsVoting(null);
    }
  };

  const displayProposals = proposals.filter(p => {
    if (currentTab === 'my-proposals') {
      if (!address || !p.creator) return false;
      return String(p.creator).toLowerCase() === String(address).toLowerCase();
    }
    return true; 
  });

  return (
    <div className="min-h-screen bg-[#050a15] pb-20 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00c2ff]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="border-b border-white/5 bg-[#0b1426]/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 tracking-tight">Governance Hub</h1>
          <p className="text-[#8ba0c2] text-[15px] font-medium">Stake, curate, and verify the autonomous truth engine. <span className="text-white font-bold">1 $TRIGS = 1 Vote.</span></p>
          
          <div className="flex items-center gap-8 mt-10">
            <button onClick={() => handleTabSwitch('active')} className={`pb-4 text-[13px] font-extrabold tracking-wide uppercase transition-all border-b-2 ${currentTab === 'active' ? 'border-[#00c2ff] text-[#00c2ff]' : 'border-transparent text-slate-500 hover:text-white'}`}>All Proposals</button>
            <button onClick={() => handleTabSwitch('my-proposals')} className={`pb-4 text-[13px] font-extrabold tracking-wide uppercase transition-all border-b-2 ${currentTab === 'my-proposals' ? 'border-[#00c2ff] text-[#00c2ff]' : 'border-transparent text-slate-500 hover:text-white'}`}>My Proposals</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-12 relative z-10">
        {!isConnected ? (
          <div className="bg-gradient-to-b from-[#111b33]/80 to-[#0b1222]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Connect your wallet</h3>
            <p className="text-[#8ba0c2] mb-6">You need to connect to Sepolia to view and participate in governance.</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-[#00c2ff]" size={40} /></div>
        ) : displayProposals.length === 0 ? (
          <div className="bg-gradient-to-b from-[#111b33]/50 to-[#0b1222]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto">
            <p className="text-[#8ba0c2] text-lg font-medium">No proposals found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayProposals.map(proposal => {
              const isEnded = Date.now() > proposal.votingEndTime;
              const totalVotes = proposal.yesVotes + proposal.noVotes;
              const yesPercent = totalVotes > 0 ? (proposal.yesVotes / totalVotes) * 100 : 0;
              const noPercent = totalVotes > 0 ? (proposal.noVotes / totalVotes) * 100 : 0;

              return (
                <div key={proposal.id} className="relative flex flex-col h-full overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0a1329]/90 via-[#101d3f]/90 to-[#1d2f5a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.4)] p-6 transition-all hover:border-white/20 group">
                  
                  <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] z-20"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#050a15]/50 border border-white/5 text-[#8ba0c2] text-[10px] font-bold tracking-widest uppercase shadow-inner">
                          ID: #{proposal.id}
                        </span>
                        
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1424] border border-[#2a3650] shadow-[0_4px_10px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:brightness-110 cursor-help" 
                          title="Market Proposer"
                        >
                          <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full bg-gradient-to-br from-amber-300 to-amber-600 shadow-inner">
                            <User size={9} className="text-[#0d1424]" strokeWidth={3} />
                          </div>
                          <span className="text-white text-[10px] font-extrabold tracking-widest font-mono mt-[1px]">
                            {formatAddress(proposal.creator)}
                          </span>
                        </div>
                      </div>
                      
                      {proposal.executed ? (
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-inner backdrop-blur-md border ${proposal.spam ? 'bg-[#ff3b5c]/10 text-[#ff3b5c] border-[#ff3b5c]/20' : 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20'}`}>
                          {proposal.spam ? 'Rejected' : 'Passed & Live'}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                          <Clock size={12} className={isEnded ? "text-[#ff3b5c]" : "text-amber-400"} /> 
                          <CountdownTimer endTime={proposal.votingEndTime} />
                        </div>
                      )}
                    </div>

                    <h3 className="text-[18px] font-bold text-white mb-4 leading-snug tracking-tight drop-shadow-md line-clamp-3">
                      {proposal.question}
                    </h3>
                    
                    <div className="relative bg-[#050a15]/40 rounded-xl p-4 mb-6 border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-md grow">
                      <p className="text-[9px] text-[#8ba0c2] font-extrabold uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5">
                        <ListChecks size={12} className="text-[#00c2ff]" /> Rules
                      </p>
                      <p className="text-[13px] text-slate-300 leading-relaxed font-medium line-clamp-4">{proposal.rules}</p>
                    </div>

                    <div className="mb-6 mt-auto">
                      <div className="flex justify-between text-[11px] font-bold mb-2 tracking-wide">
                        <span className="text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">YES ({proposal.yesVotes})</span>
                        <span className="text-[#ff3b5c] drop-shadow-[0_0_8px_rgba(255,59,92,0.3)]">NO ({proposal.noVotes})</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#050a15]/80 rounded-full overflow-hidden flex border border-[#1e2a45] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]">
                        <div className="bg-gradient-to-r from-[#166534] to-[#4ade80] h-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(74,222,128,0.6)] relative" style={{ width: `${yesPercent}%` }}></div>
                        <div className="bg-gradient-to-l from-[#991B1B] to-[#ff3b5c] h-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,59,92,0.6)] relative" style={{ width: `${noPercent}%` }}></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      {proposal.executed ? (
                        <div className="text-[12px] text-[#8ba0c2] font-bold flex items-center gap-2 bg-[#050a15]/40 px-3 py-3 rounded-lg border border-white/5 w-full justify-center shadow-inner">
                          {proposal.spam ? <XCircle size={14} className="text-[#ff3b5c]"/> : <CheckCircle size={14} className="text-[#4ade80]"/>}
                          Market Closed
                        </div>
                      ) : isEnded ? (
                        <button onClick={() => handleExecute(proposal.id)} disabled={isVoting === proposal.id} className="flex-1 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:brightness-110 text-white font-extrabold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,194,255,0.3)] border border-[#00c2ff]/50 text-[13px]">
                          {isVoting === proposal.id ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />}
                          EXECUTE <ArrowRight size={14} />
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleVote(proposal.id, true)} disabled={proposal.hasUserVoted || isVoting === proposal.id} className={`flex-1 font-bold py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 text-[12px] ${proposal.hasUserVoted ? 'bg-[#050a15]/60 text-[#8ba0c2] border border-white/5 cursor-not-allowed shadow-inner' : 'bg-[#166534]/80 backdrop-blur-md hover:bg-[#166534] text-white border border-[#4ade80]/30 hover:border-[#4ade80]/60 shadow-[0_0_15px_rgba(74,222,128,0.15)]'}`}>
                            <ThumbsUp size={14} /> VOTE YES
                          </button>
                          <button onClick={() => handleVote(proposal.id, false)} disabled={proposal.hasUserVoted || isVoting === proposal.id} className={`flex-1 font-bold py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 text-[12px] ${proposal.hasUserVoted ? 'bg-[#050a15]/60 text-[#8ba0c2] border border-white/5 cursor-not-allowed shadow-inner' : 'bg-[#991B1B]/80 backdrop-blur-md hover:bg-[#991B1B] text-white border border-[#ff3b5c]/30 hover:border-[#ff3b5c]/60 shadow-[0_0_15px_rgba(255,59,92,0.15)]'}`}>
                            <ThumbsDown size={14} /> VOTE NO
                          </button>
                        </>
                      )}
                    </div>
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