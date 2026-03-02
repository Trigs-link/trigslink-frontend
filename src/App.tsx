import { Search, TrendingUp, ChevronDown } from 'lucide-react';
import MarketCard from './components/markets/MarketCard';
import Navbar from './components/layout/Navbar';
import CategoryNav from './components/layout/CategoryNav';
import HeroBanners from './components/home/HeroBanners';
import FeaturedGraph from './components/home/FeaturedGraph';
import Footer from './components/layout/Footer'; // <-- Import the new footer

export default function App() {
  const subNavTags = [
    "New", "Breaking News", "Trump Week 1", "Cabinet", "TikTok", "Trump 100 Days", 
    "Israel", "Bitcoin", "Inauguration", "$TRUMP", "Middle East", "Canada", "Syria"
  ];

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
    // Note: Removed the pb-20 since the new footer will handle bottom spacing
    <div className="min-h-screen font-sans text-slate-200"> 
      
      {/* 1. Global Navigation */}
      <Navbar />
      <CategoryNav />

      {/* 2. Main Layout Area */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col gap-8">
        
        <HeroBanners />
        <FeaturedGraph />

        {/* Secondary Market Sub-Nav */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-[#2b6aff] to-[#00a3ff] hover:brightness-110 text-white text-sm px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 shrink-0">
              <TrendingUp size={16} /> TOP
            </button>
            <div className="max-w-[320px] w-full bg-[#111b33] rounded-lg flex items-center px-4 py-2 border border-white/5 focus-within:border-[#00c2ff]/50 focus-within:bg-[#15203c] transition-all shadow-inner">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by markets" 
                className="bg-transparent border-none outline-none text-[13px] ml-3 w-full text-white placeholder-slate-500 font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-3 border-b border-white/5">
            {subNavTags.map((tag) => (
              <span 
                key={tag} 
                className={`text-[13px] font-bold whitespace-nowrap cursor-pointer transition-colors 
                  ${tag === "$TRUMP" ? "text-white" : "text-slate-400 hover:text-white"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ROW 4: Market Cards Grid */}
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

        {/* THE NEW "SHOW MORE" UI SECTION */}
        <div className="flex flex-col items-center mt-10 mb-8 gap-4">
          <button className="flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/10 bg-[#111827] hover:bg-[#1f2937] text-[#94a3b8] hover:text-white transition-all text-[13px] font-bold shadow-lg mt-1">
            Show more markets           
            </button>
        </div>

      </main>

      {/* 3. The Mega Footer */}
      <Footer />
      
    </div>
  );
}