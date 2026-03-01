import { Search, Menu, ChevronDown, Wallet } from 'lucide-react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export default function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <nav className="border-b border-white/5 bg-[#0b1426]/80 backdrop-blur-md sticky top-0 z-50">   
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo + Search Bar */}
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center cursor-pointer shrink-0">
            <img 
              src="/images/full_logo.png" 
              alt="Trigslink Logo" 
              className="h-8 w-auto" 
            />
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
            <span className="hover:text-white cursor-pointer transition-colors">Dashboards</span>
            <span className="hover:text-white cursor-pointer transition-colors">Markets</span>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Conditional Rendering: Show Premium Badge if Connected, else show Glowing Connect Button */}
            {isConnected && address ? (
              
              /* --- PREMIUM CONNECTED PROFILE PILL --- */
              <button 
                onClick={() => open()} 
                className="flex items-center gap-2.5 bg-[#111b33] hover:bg-[#15203c] border border-white/10 px-2.5 py-1.5 rounded-full transition-all group"
              >
                {/* Simulated Avatar using a sleek gradient */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00c2ff] to-indigo-500 shadow-inner flex items-center justify-center">
                  <Wallet size={12} className="text-white/80" />
                </div>
                
                {/* Formatted Address */}
                <span className="text-[13px] font-bold text-white tracking-wide">
                  {`${address.slice(0, 4)}...${address.slice(-4)}`}
                </span>
                
                {/* Dropdown Indicator */}
                <ChevronDown size={14} className="text-slate-500 group-hover:text-white mr-1 transition-colors" />
              </button>

            ) : (
              
              /* --- GLOWING SIGN UP / CONNECT BUTTON --- */
              <button 
                onClick={() => open()} 
                className="bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white text-[13px] px-6 py-2 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,194,255,0.3)] hover:shadow-[0_0_20px_rgba(0,194,255,0.5)]"
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
  );
}