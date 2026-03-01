import { ChevronRight, Bookmark, Search } from 'lucide-react';
import MarketCard from './components/MarketCard';
import Navbar from './components/layout/Navbar';
import CategoryNav from './components/layout/CategoryNav'; // <-- Import the new nav

export default function App() {
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
    // Removed the solid bg color here!
    <div className="min-h-screen font-sans text-slate-200 pb-20"> 
      
      <Navbar />
      <CategoryNav />

      <main className="max-w-[1600px] mx-auto px-4 py-8">
        
        {/* Featured / Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Made the card slightly transparent: bg-[#1c1c1e]/80 backdrop-blur-sm */}
          <div className="col-span-1 lg:col-span-2 bg-[#1c1c1e]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="text-xs text-slate-400 font-medium mb-2">Sports • Soccer • EPL</div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-white max-w-lg leading-tight">Manchester United FC vs. Crystal Palace FC</h1>
              <div className="flex gap-4">
                <div className="flex flex-col items-center"><div className="w-10 h-10 bg-red-600 rounded-full mb-1"></div><span className="text-xs text-slate-400">MUN</span></div>
                <div className="flex flex-col items-center justify-center text-sm font-bold text-slate-300">7:30 PM<span className="text-xs font-normal text-slate-500">March 1</span></div>
                <div className="flex flex-col items-center"><div className="w-10 h-10 bg-blue-600 rounded-full mb-1"></div><span className="text-xs text-slate-400">CRY</span></div>
              </div>
            </div>
            
            <div className="w-full h-64 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center text-slate-500 mb-6">
              [ Interactive Price Chart Component ]
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-red-900/20 text-red-400 border border-red-900/50 rounded-xl py-3 font-bold hover:bg-red-900/40 transition-colors">Man Utd 65%</button>
              <button className="flex-1 bg-white/5 text-slate-300 border border-white/10 rounded-xl py-3 font-bold hover:bg-white/10 transition-colors">DRAW 22%</button>
              <button className="flex-1 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded-xl py-3 font-bold hover:bg-blue-900/40 transition-colors">Palace 15%</button>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-[#1c1c1e]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5 shadow-xl">
              <h3 className="text-white font-bold mb-4 flex items-center justify-between">Breaking news <ChevronRight size={16} className="text-slate-500"/></h3>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 cursor-pointer group">
                    <span className="text-slate-500 font-bold group-hover:text-blue-400 transition-colors">{i}</span>
                    <p className="text-sm text-slate-300 group-hover:text-white leading-snug transition-colors">Will Seattle Seahawks visit the White House in 2026?</p>
                    <div className="text-right ml-auto text-sm text-emerald-400 font-bold">67%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Markets Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white shadow-sm">All markets</h2>
          <div className="flex gap-4 text-slate-400">
            <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
            <Bookmark size={18} className="cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* The Grid */}
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