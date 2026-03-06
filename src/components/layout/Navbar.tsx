import { useState, useRef, useEffect } from 'react';
import { Search, Menu, ChevronDown, Plus, LayoutList, Settings, AlertTriangle } from 'lucide-react';
import { useAppKit, useAppKitAccount, useAppKitProvider, useAppKitNetwork } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import SuggestMarketModal from './SuggestMarketModal';
import { Link } from 'react-router-dom';
// --- CONTRACT CONFIGURATION ---
const TRIGS_TOKEN_ADDRESS = "0xc463bB636C67642870e2e82ebAdbd29e2C10eAFa";
const TRIGS_TOKEN_ABI = ["function mintTestTokens() external"];

// --- HELPER: 3D FACETED ETHEREUM GEM ---
const Eth3DIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.925 23.969L15.812 24.032V31.786L15.925 32.115L23.951 20.803L15.925 23.969Z" fill="#3B4058"/>
    <path d="M15.925 23.969L7.894 20.803L15.925 32.115V23.969Z" fill="#565D7A"/>
    <path d="M15.925 21.325L15.877 21.38V23.705L15.925 23.755L23.957 19.387L15.925 21.325Z" fill="#2A2D4A"/>
    <path d="M15.925 21.325L7.894 19.387L15.925 23.755V21.325Z" fill="#454A75"/>
    <path d="M15.925 0L15.753 0.584V18.665L15.925 18.837L23.957 15.22L15.925 0Z" fill="#747D9E"/>
    <path d="M15.925 0L7.894 15.22L15.925 18.837V0Z" fill="#C0C6E4"/>
  </svg>
);

// --- HELPER: UNIFIED FROSTED WHITE GLASS CONTAINER ---
const JewelBox = ({ children }: { children: React.ReactNode }) => (
  <div className={`
    flex items-center justify-center w-8 h-8 rounded-lg 
    bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md
    border border-white/10 group-hover:border-white/30
    shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]
    transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:from-white/20 group-hover:to-white/10
  `}>
    {children}
  </div>
);

// --- HELPER: POLYMARKET-STYLE AVATAR GENERATOR ---
const generateAvatar = (address: string) => {
  if (!address) return { background: '#111b33' };
  const h1 = parseInt(address.slice(2, 6), 16) % 360;
  const h2 = (h1 + 50) % 360;
  const h3 = (h2 + 70) % 360;
  return { background: `linear-gradient(135deg, hsl(${h1}, 90%, 65%), hsl(${h2}, 90%, 60%), hsl(${h3}, 90%, 55%))` };
};

export default function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const { chainId } = useAppKitNetwork(); 
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isWrongNetwork = chainId !== 11155111 && chainId !== undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMintTrigs = async () => {
    if (!walletProvider) return;
    try {
      setIsMinting(true);
      const ethersProvider = new BrowserProvider(walletProvider as any);
      
      const network = await ethersProvider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        alert("The $TRIGS token is only available rn or operating on Testnet sepolia so select sepolia for miniting tokens to vote");
        return; 
      }

      const signer = await ethersProvider.getSigner();
      const trigsContract = new Contract(TRIGS_TOKEN_ADDRESS, TRIGS_TOKEN_ABI, signer);
      
      const tx = await trigsContract.mintTestTokens();
      await tx.wait();
      alert("Successfully minted 1,000 $TRIGS! Check your wallet.");
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") alert("Transaction cancelled.");
      else alert("Minting failed. Make sure you have enough Sepolia ETH for the gas fee.");
    } finally {
      setIsMinting(false); 
    }
  };

  return (
    <>
      <nav className="border-b border-white/5 bg-[#0b1426]/80 backdrop-blur-md sticky top-0 z-50">   
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center cursor-pointer shrink-0">
              <a href="/"><img src="/images/full_logo.png" alt="Trigslink Logo" className="h-8 w-auto" /></a>
            </div>

            <div className="hidden sm:flex max-w-[600px] w-full bg-[#111b33] rounded-lg items-center px-4 py-2 border border-white/5 hover:border-white/10 focus-within:border-[#00c2ff]/50 focus-within:bg-[#15203c] focus-within:ring-1 focus-within:ring-[#00c2ff]/50 transition-all shadow-inner">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search markets" className="bg-transparent border-none outline-none text-[13px] ml-3 w-full text-white placeholder-slate-500 font-medium"/>
            </div>
          </div>

          <div className="flex items-center gap-6 justify-end">
            
            <div className="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">Ranks</span>
              <span className="hover:text-white cursor-pointer transition-colors">Activity</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sports</span>
              <Link to="/governance" className="hover:text-white cursor-pointer transition-colors">Governance</Link>
              <span className="hover:text-white cursor-pointer transition-colors">Markets</span>
            </div>

            <div className="flex items-center gap-4">
              
              {isConnected && address ? (
                <div className="flex items-center gap-4">
                  
                  {/* 1. TACTILE 3D NETWORK PILL */}
                  <button 
                    onClick={() => open({ view: 'Networks' })}
                    className={`
                      hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300
                      bg-gradient-to-b from-[#1a233a] to-[#0b1426]
                      border-t border-t-white/20 border-b border-b-black/80 border-l border-l-white/5 border-r border-r-white/5
                      shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.05)]
                      hover:brightness-110 active:translate-y-0.5 active:shadow-inner
                    `}
                  >
                    {isWrongNetwork ? <AlertTriangle size={15} className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" /> : <Eth3DIcon size={16} className="drop-shadow-lg" />}
                    <span className={`text-[12px] font-bold tracking-wide ${isWrongNetwork ? 'text-red-400' : 'text-slate-200'}`}>
                      {isWrongNetwork ? 'Wrong Network' : 'Sepolia'}
                    </span>
                  </button>

                  {/* 2. GLASSMORPHIC 3D MINT BUTTON */}
                  <button 
                    onClick={handleMintTrigs}
                    disabled={isMinting || isWrongNetwork}
                    className={`
                      relative group hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[13px] text-white
                      bg-gradient-to-b from-white/10 to-[#111b33]/50 backdrop-blur-md 
                      border border-white/20 hover:border-[#00c2ff]/50
                      shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] 
                      hover:shadow-[0_6px_20px_rgba(0,194,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]
                      transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0
                      ${isMinting || isWrongNetwork ? 'opacity-50 cursor-not-allowed transform-none hover:border-white/20 hover:shadow-none' : ''}
                    `}
                  >
                    <img src="/images/coin.png" alt="$TRIGS" className={`w-6 h-6 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${isMinting ? 'animate-pulse' : ''}`} />
                    <span className="tracking-wide">{isMinting ? "Minting..." : "Mint $TRIGS"}</span>
                    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </div>
                  </button>

                  {/* 3. PROFILE BUTTON & DROPDOWN */}
                  <div className="relative pl-2" ref={dropdownRef}>
                    
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity outline-none">
                      <div className="w-[34px] h-[34px] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.5)] border border-white/10" style={generateAvatar(address)} />
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-4 w-64 bg-[#111827] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 z-50 flex flex-col overflow-hidden">
                        
                        <div className="px-5 py-4 border-b border-white/5 mb-2 bg-[#0b1426]/50">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Connected Wallet</p>
                          <p className="text-[14px] font-mono font-medium text-slate-200">
                            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                          </p>
                        </div>
                        
                        {/* UNIFIED WHITE GLASS ICONS */}
                        <button onClick={() => { setIsModalOpen(true); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 flex items-center gap-4 transition-colors group hover:bg-white/5">
                          <JewelBox>
                            <Plus size={16} className="text-white drop-shadow-md" />
                          </JewelBox>
                          <span className="text-[14px] font-semibold text-slate-300 group-hover:text-white transition-colors">Suggest Market</span>
                        </button>

                        <Link to="/governance?tab=my-proposals" className="w-full text-left px-5 py-3 flex items-center gap-4 transition-colors group hover:bg-white/5">
                          <JewelBox>
                            <LayoutList size={14} className="text-white drop-shadow-md" />
                          </JewelBox>
                          <span className="text-[14px] font-semibold text-slate-300 group-hover:text-white transition-colors">My Proposals</span>
                       </Link>

                        <button onClick={() => { open(); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 flex items-center gap-4 transition-colors group hover:bg-white/5">
                          <JewelBox>
                            <Settings size={15} className="text-white drop-shadow-md" />
                          </JewelBox>
                          <span className="text-[14px] font-semibold text-slate-300 group-hover:text-white transition-colors">Wallet Settings</span>
                        </button>

                      </div>
                    )}
                  </div>
                </div>

              ) : (
                <button onClick={() => open()} className="bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white text-[14px] px-6 py-2.5 rounded-lg font-bold transition-all hover:brightness-110 shadow-lg">
                  Sign Up
                </button>
              )}
              
              <button className="text-slate-400 hover:text-white p-1 rounded-md transition-colors sm:hidden"><Search size={20} /></button>
              <button className="text-slate-400 hover:text-white p-1 rounded-md transition-colors xl:hidden"><Menu size={24} /></button>
            </div>
          </div>
        </div>
      </nav>

      <SuggestMarketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}