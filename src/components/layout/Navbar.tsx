import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">   
      <div className="max-w-[1600px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo + Search Bar */}
        <div className="flex items-center gap-6 flex-1">
          {/* Brand */}
          <div className="flex items-center cursor-pointer shrink-0">
                <img 
                    src="/images/full_logo.png" 
                    alt="Trigslink Logo" 
                    className="h-9 w-auto" 
                />
            </div>

          {/* Search Bar (Left-aligned next to logo) */}
          <div className="hidden sm:flex max-w-[400px] w-full bg-slate-900/50 rounded-lg items-center px-4 py-2 border border-slate-700/50 hover:border-slate-500 focus-within:border-blue-500/50 focus-within:bg-slate-900/80 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links + Auth Buttons */}
        <div className="flex items-center gap-6 justify-end">
          
          {/* Polymarket-style Text Links (Hidden on smaller screens) */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Ranks</span>
            <span className="hover:text-white cursor-pointer transition-colors">Activity</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sports</span>
            <span className="hover:text-white cursor-pointer transition-colors">Dashboards</span>
            <span className="hover:text-white cursor-pointer transition-colors">Markets</span>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors hidden sm:block">
              Log In
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20">
              Sign Up
            </button>
            
            {/* Mobile-only Icons */}
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