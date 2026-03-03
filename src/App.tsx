import MarketCard from './components/markets/MarketCard';
import Navbar from './components/layout/Navbar';
import CategoryNav from './components/layout/CategoryNav';
import HeroBanners from './components/home/HeroBanners';
import FeaturedGraph from './components/home/FeaturedGraph';
import Footer from './components/layout/Footer';
import MarketSubNav from './components/markets/MarketSubNav'; // <-- Import the new component

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
    <div className="min-h-screen font-sans text-slate-200"> 
      
      {/* 1. Global Navigation */}
      <Navbar />
      <CategoryNav />

      {/* 2. Main Layout Area */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col gap-8">
        
        <HeroBanners />
        <FeaturedGraph />

        {/* Secondary Market Sub-Nav Component */}
        <MarketSubNav />

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