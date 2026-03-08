import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CategoryNav from './components/layout/CategoryNav';
import HeroBanners from './components/home/HeroBanners';
import Footer from './components/layout/Footer';
import MarketSubNav from './components/markets/MarketSubNav';
import GovernancePage from './components/home/GovernancePage';
import MarketGrid from './components/markets/MarketGrid'; 
// 🆕 IMPORT THE WATCHLIST PAGE
import WatchlistPage from './components/home/WatchlistPage'; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-slate-200 bg-[#0b1426]"> 
        
        {/* 1. Global Navigation */}
        <Navbar />

        {/* 2. Route Handling Area */}
        <Routes>
          
          {/* --- HOME PAGE ROUTE --- */}
          <Route path="/" element={
            <>
              <CategoryNav />
              <main className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col gap-8">
                
                <HeroBanners />
                
                <MarketSubNav />

                {/* 🚀 THE LIVE BLOCKCHAIN GRID */}
                <MarketGrid />

                {/* SHOW MORE BUTTON */}
                <div className="flex flex-col items-center mt-10 mb-8 gap-4">
                  <button className="flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/10 bg-[#111827] hover:bg-[#1f2937] text-[#94a3b8] hover:text-white transition-all text-[13px] font-bold shadow-lg mt-1">
                    Show more markets           
                  </button>
                </div>

              </main>
            </>
          } />

          {/* --- GOVERNANCE PAGE ROUTE --- */}
          <Route path="/governance" element={<GovernancePage />} />

          {/* 🚩 --- WATCHLIST PAGE ROUTE --- */}
          <Route path="/watchlist" element={<WatchlistPage />} />

        </Routes>

        {/* 3. The Mega Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}