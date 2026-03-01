import { Bookmark, Search } from 'lucide-react';
import MarketCard from './components/MarketCard';
import Navbar from './components/layout/Navbar';
import CategoryNav from './components/layout/CategoryNav';
import HeroBanners from './components/home/HeroBanners'; // <-- Import the new banners

export default function App() {
  const mockMarkets = [
    { id: "ETH_5K", category: "Crypto", question: "Will Ethereum exceed $5,000 on Jan 1st, 2026?", volume: "$2.4M", yesProb: 62 },
    { id: "FED_RATE", category: "Finance", question: "Will the Fed cut interest rates in March?", volume: "$8.1M", yesProb: 24 },
    { id: "GPT_5", category: "AI", question: "Will OpenAI release GPT-5 before July?", volume: "$1.2M", yesProb: 88 },
    { id: "SPACE_X", category: "Space", question: "Will SpaceX land humans on Mars before 2030?", volume: "$500K", yesProb: 15 },
    { id: "US_ELECTION", category: "Politics", question: "Will the incumbent party retain the presidency?", volume: "$12M", yesProb: 48 },
    { id: "BTC_100K", category: "Crypto", question: "Will Bitcoin hit $100k by Friday?", volume: "$15M", yesProb: 75 },
    { id: "CHAMP_LEAGUE", category: "Sports", question: "Will Real Madrid win the Champions League?", volume: "$3.2M", yesProb: 35 },
    { id: "SOL_ETF", Crypto: "Crypto", question: "Will a Solana Spot ETF be approved in 2026?", volume: "$4.1M", yesProb: 55 },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-200 pb-20"> 
      
      {/* 1. Global Navigation */}
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content Area */}
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        
        {/* The New Hero Section */}
        <HeroBanners />

        {/* All Markets Header (We will update this to the Secondary Utility Bar next) */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h2 className="text-2xl font-bold text-white shadow-sm">All markets</h2>
          <div className="flex gap-4 text-slate-400">
            <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
            <Bookmark size={18} className="cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* The Legacy Grid (We will update these to the new Blue/Green cards next) */}
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