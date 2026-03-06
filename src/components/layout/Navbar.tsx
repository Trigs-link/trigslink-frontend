import { useState, useRef, useEffect } from 'react';
import { Search, Menu, ChevronDown, PlusCircle, ClipboardList, Settings, AlertTriangle } from 'lucide-react';
import { useAppKit, useAppKitAccount, useAppKitProvider, useAppKitNetwork } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import SuggestMarketModal from './SuggestMarketModal';

// --- CONTRACT CONFIGURATION ---
const TRIGS_TOKEN_ADDRESS = "0xc463bB636C67642870e2e82ebAdbd29e2C10eAFa";

const TRIGS_TOKEN_ABI = [
  "function mintTestTokens() external"
];

// --- HELPER: CUSTOM ETHEREUM ICON ---
const EthIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M15.925 23.969L15.812 24.032V31.786L15.925 32.115L23.951 20.803L15.925 23.969Z" fill="currentColor" fillOpacity="0.8"/>
    <path d="M15.925 23.969L7.894 20.803L15.925 32.115V23.969Z" fill="currentColor" fillOpacity="0.5"/>
    <path d="M15.925 21.325L15.877 21.38V23.705L15.925 23.755L23.957 19.387L15.925 21.325Z" fill="currentColor" fillOpacity="0.8"/>
    <path d="M15.925 21.325L7.894 19.387L15.925 23.755V21.325Z" fill="currentColor" fillOpacity="0.5"/>
    <path d="M15.925 0L15.753 0.584V18.665L15.925 18.837L23.957 15.22L15.925 0Z" fill="currentColor" fillOpacity="0.8"/>
    <path d="M15.925 0L7.894 15.22L15.925 18.837V0Z" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);

// --- HELPER: POLYMARKET-STYLE AVATAR GENERATOR ---
const generateAvatar = (address: string) => {
  if (!address) return { background: '#111b33' };
  const h1 = parseInt(address.slice(2, 6), 16) % 360;
  const h2 = (h1 + 50) % 360;
  const h3 = (h2 + 70) % 360;
  return { 
    background: `linear-gradient(135deg, hsl(${h1}, 90%, 65%), hsl(${h2}, 90%, 60%), hsl(${h3}, 90%, 55%))` 
  };
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

  // Check if user is on Sepolia (Chain ID: 11155111)
  const isWrongNetwork = chainId !== 11155111 && chainId !== undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- MINT FUNCTION ---
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
      
      console.log("Requesting tokens from Sepolia...");
      const tx = await trigsContract.mintTestTokens();
      
      await tx.wait();
      alert("Successfully minted 1,000 $TRIGS! Check your wallet.");
      
    } catch (error: any) {
      console.error("Minting failed:", error);
      
      if (error.code === "ACTION_REJECTED") {
        alert("Transaction cancelled.");
      } else {
        alert("Minting failed. Make sure you have enough Sepolia ETH for the gas fee.");
      }
    } finally {
      setIsMinting(false); 
    }
  };

  return (
    <>
      <nav className="border-b border-white/5 bg-[#0b1426]/80 backdrop-blur-md sticky top-0 z-50">   
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Left Side: Brand Logo + Search Bar */}
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center cursor-pointer shrink-0">
              <a href="/">
                <img 
                  src="/images/full_logo.png" 
                  alt="Trigslink Logo" 
                  className="h-8 w-auto" 
                />
              </a>
            </div>

            <div className="hidden sm:flex max-w-[600px] w-full bg-[#111b33] rounded-lg items-center px-4 py-2 border border-white/5 hover:border-white/10 focus-within:border-[#00c2ff]/50 focus-within:bg-[#15203c] focus-within:ring-1 focus-within:ring-[#00c2ff]/50 transition-all shadow-inner">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search markets" 
                className="bg-transparent border-none outline-none text-[13px] ml-3 w-full text-white placeholder-slate-500 font-medium"
              />
            </div>
          </div>

          {/* Right Side: Navigation Links + Auth Buttons */}
          <div className="flex items-center gap-6 justify-end">
            
            <div className="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">Ranks</span>
              <span className="hover:text-white cursor-pointer transition-colors">Activity</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sports</span>
              <a href="/governance" className="hover:text-white cursor-pointer transition-colors">Governance</a>
              <span className="hover:text-white cursor-pointer transition-colors">Markets</span>
            </div>

            <div className="flex items-center gap-4">
              
              {isConnected && address ? (
                
                <div className="flex items-center gap-4">
                  
                  {/* 1. SLEEK, MINIMALIST NETWORK TAG WITH ETH ICON */}
                  <button 
                    onClick={() => open({ view: 'Networks' })}
                    className={`
                      hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors duration-200
                      ${isWrongNetwork 
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }
                    `}
                  >
                    {isWrongNetwork ? <AlertTriangle size={14} /> : <EthIcon size={14} />}
                    <span className="text-[12px] font-medium tracking-wide">
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
                    <img 
                      src="/images/coin.png" 
                      alt="$TRIGS" 
                      className={`w-6 h-6 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${isMinting ? 'animate-pulse' : ''}`} 
                    />
                    
                    <span className="tracking-wide">
                      {isMinting ? "Minting..." : "Mint $TRIGS"}
                    </span>

                    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </div>
                  </button>

                  {/* 3. POLYMARKET-STYLE PROFILE BUTTON */}
                  <div className="relative pl-2" ref={dropdownRef}>
                    
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                      className="flex items-center gap-1.5 hover:opacity-80 transition-opacity outline-none"
                    >
                      <div 
                        className="w-[34px] h-[34px] rounded-full shadow-md"
                        style={generateAvatar(address)}
                      />
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-[#1a233a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 flex flex-col overflow-hidden">
                        
                        <div className="px-4 py-3 border-b border-white/5 mb-1 bg-[#111b33]/50">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Connected Wallet</p>
                          <p className="text-[13px] font-mono text-white truncate">{address}</p>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                        >
                          <PlusCircle size={16} className="text-[#00c2ff]" />
                          Suggest Market
                        </button>

                        <a 
                          href="/governance?tab=my-proposals"
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                        >
                          <ClipboardList size={16} className="text-emerald-400" />
                          My Proposals
                        </a>

                        <button 
                          onClick={() => {
                            open();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                        >
                          <Settings size={16} className="text-slate-400" />
                          Wallet Settings
                        </button>

                      </div>
                    )}
                  </div>
                </div>

              ) : (
                
                <button 
                  onClick={() => open()} 
                  className="bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white text-[14px] px-6 py-2.5 rounded-lg font-bold transition-all hover:brightness-110 shadow-lg"
                >
                  Sign Up
                </button>

              )}
              
              <button className="text-slate-400 hover:text-white p-1 rounded-md transition-colors sm:hidden">
                <Search size={20} />
              </button>
              <button className="text-slate-400 hover:text-white p-1 rounded-md transition-colors xl:hidden">
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      <SuggestMarketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}