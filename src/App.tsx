import { Search, ChevronRight, Menu } from 'lucide-react';
import MarketCard from './components/MarketCard';

export default function App() {
  const categories = ["Trending", "Breaking", "New", "Politics", "Sports", "Crypto", "Finance", "Geopolitics", "AI & Tech"];
  
  const mockMarkets = [
    { id: "ETH_5K", category: "Crypto", question: "Will Ethereum exceed $5,000 on Jan 1st, 2026?", volume: "$2.4M", yesProb: 62 },
    { id: "FED_RATE", category: "Finance", question: "Will the Fed cut interest rates in March?", volume: "$8.1M", yesProb: 24 },
    { id: "GPT_5", category: "AI", question: "Will OpenAI release GPT-5 before July?", volume: "$1.2M", yesProb: 88 },
    { id: "SPACE_X", category: "Space", question: "Will SpaceX land humans on Mars before 2030?", volume: "$500K", yesProb: 15 },
    { id: "US_ELECTION", category: "Politics", question: "Will the incumbent party retain the presidency?", volume: "$12M", yesProb: 48 },
    { id: "BTC_100K", category: "Crypto", question: "Will Bitcoin hit $100k by Friday?", volume: "$15M", yesProb: 75 },
    { id: "CHAMP_LEAGUE", category: "Sports", question: "Will Real Madrid win the Champions League?", volume: "$3.2M", yesProb: 35 },
    { id: "SOL_ETF", category: "Crypto", question: "Will a Solana Spot ETF be approved in 2026?", volume: "$4.1M", yesProb: 55 },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e10] font-sans text-slate-200 pb-20">
      
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-[#0e0e10] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-black tracking-tighter">
              TL
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden md:block">Trigslink</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl bg-[#1c1c1e] rounded-lg flex items-center px-4 py-2 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full text-white placeholder-slate-500"
            />
            <div className="text-slate-600 text-xs bg-slate-800 px-1.5 py-0.5 rounded ml-2 border border-slate-700">/</div>
          </div>

          {/* Auth & Menu */}
          <div className="flex items-center gap-4">
            <span className="text-blue-400 text-sm font-semibold cursor-pointer hidden md:block">How it works</span>
            <button className="text-sm font-semibold text-white hover:text-slate-300">Log In</button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-lg font-bold transition-colors">
              Sign Up
            </button>
            <Menu className="text-slate-400 cursor-pointer" />
          </div>
        </div>

        {/* Categories Navbar */}
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar py-3 border-t border-slate-800/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-white whitespace-nowrap cursor-pointer">
            <span className="text-blue-400">📈</span> Trending
          </div>
          {categories.slice(1).map(cat => (
            <div key={cat} className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap cursor-pointer transition-colors">
              {cat}
            </div>
          ))}
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 py-8">
        
        {/* Featured / Hero Section (Matches your Man Utd vs Crystal Palace screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="col-span-1 lg:col-span-2 bg-[#1c1c1e] rounded-2xl p-6 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium mb-2">Sports • Soccer • EPL</div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-white max-w-lg leading-tight">Manchester United FC vs. Crystal Palace FC</h1>
              <div className="flex gap-4">
                <div className="flex flex-col items-center"><div className="w-10 h-10 bg-red-600 rounded-full mb-1"></div><span className="text-xs text-slate-400">MUN</span></div>
                <div className="flex flex-col items-center justify-center text-sm font-bold text-slate-300">7:30 PM<span className="text-xs font-normal text-slate-500">March 1</span></div>
                <div className="flex flex-col items-center"><div className="w-10 h-10 bg-blue-600 rounded-full mb-1"></div><span className="text-xs text-slate-400">CRY</span></div>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="w-full h-64 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 mb-6">
              [ Interactive Price Chart Component ]
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-red-900/20 text-red-400 border border-red-900/50 rounded-xl py-3 font-bold">Man Utd 65%</button>
              <button className="flex-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl py-3 font-bold">DRAW 22%</button>
              <button className="flex-1 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded-xl py-3 font-bold">Palace 15%</button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-[#1c1c1e] rounded-2xl p-6 border border-slate-800">
              <h3 className="text-white font-bold mb-4 flex items-center justify-between">Breaking news <ChevronRight size={16} className="text-slate-500"/></h3>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 cursor-pointer group">
                    <span className="text-slate-600 font-bold">{i}</span>
                    <p className="text-sm text-slate-300 group-hover:text-white leading-snug">Will Seattle Seahawks visit the White House in 2026?</p>
                    <div className="text-right ml-auto text-sm text-emerald-400 font-bold">67%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Markets Grid */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">All markets</h2>
          <div className="flex gap-4 text-slate-400">
            <Search size={18} className="cursor-pointer hover:text-white" />
            <Bookmark size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
          {["All", "Crypto", "Politics", "Sports", "Middle East", "AI", "Fed Rates"].map((tag, i) => (
            <button key={tag} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {mockMarkets.map((market) => (
            <MarketCard 
              key={market.id}
              marketId={market.id}
              category={market.category}
              question={market.question}
              volume={market.volume}
              yesProb={market.yesProb}
            />
          ))}
        </div>
      </main>
    </div>
  );
}