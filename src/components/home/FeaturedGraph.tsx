import { TrendingDown, Flame, Link2, Bookmark, ChevronRight, ChevronLeft } from 'lucide-react';

export default function FeaturedGraph() {
  // Premium, flat dark mode style matching the screenshot
  const cardStyle = "flex flex-col rounded-[16px] bg-[#0b1221] border border-white/5 shadow-xl p-6 transition-all duration-300 hover:border-white/10";

  const newsItems = [
    { source: "WSJ", time: "2d ago", headline: "Opinion | Iran's Regime Is Down, but It Isn't Out" },
    { source: "AP News", time: "19h ago", headline: "Trump says 'someone from within' Iranian regime might be best choice to lead once war ends" },
    { source: "BBC", time: "3d ago", headline: "Iran's regime is still intact - the coming days will show if it can hold out" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Vertical Scroll CSS for the News Ticker */}
      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 25s linear infinite;
        }
        .animate-vertical-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =========================================
          1. MAIN GRAPH CARD (Spans 2 columns)
      ========================================= */}
      <div className={`${cardStyle} lg:col-span-2`}>
         
         {/* HEADER */}
         <div className="flex justify-between items-start mb-8">
            <div className="flex gap-4 items-start">
               <img 
                 src="https://flagcdn.com/w80/ir.png" 
                 alt="Iran Flag" 
                 className="w-[42px] h-[42px] rounded-[10px] border border-white/10 object-cover shadow-sm bg-[#1e293b]"
               />
               <div>
                 <div className="text-[12px] text-[#8ba0c2] font-semibold mb-1 tracking-wide">Geopolitics • Iran</div>
                 <h2 className="text-[22px] sm:text-[24px] font-bold text-white tracking-tight leading-tight">
                   Will the Iranian regime fall by June 30?
                 </h2>
               </div>
            </div>
            
            <div className="flex gap-4 text-[#7487a6] shrink-0 pt-1">
               <Link2 size={18} className="cursor-pointer hover:text-white transition-colors" />
               <Bookmark size={18} className="cursor-pointer hover:text-white transition-colors" />
            </div>
         </div>

         {/* BODY: Left Data & Right Chart */}
         <div className="flex flex-col lg:flex-row gap-8 flex-1">
            
            {/* LEFT COLUMN: Data, Buttons & News */}
            <div className="w-full lg:w-[40%] flex flex-col">
               
               {/* Probability */}
               <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[34px] font-bold text-[#4F95FF] leading-none tracking-tight">40% chance</span>
                  <span className="text-[14px] font-bold text-[#ff3b5c] flex items-center leading-none">
                    <TrendingDown size={14} strokeWidth={3} className="mr-1" /> 9%
                  </span>
               </div>

               {/* Action Buttons */}
               <div className="flex gap-3 mb-6">
                 <button className="flex-1 h-11 rounded-[8px] bg-[#166534] hover:bg-[#14532D] border border-white/5 text-white font-bold text-[15px] transition-colors">
                   Yes
                 </button>
                 <button className="flex-1 h-11 rounded-[8px] bg-[#3f2026] hover:bg-[#4a262d] border border-white/5 text-[#ff6b84] font-bold text-[15px] transition-colors">
                   No
                 </button>
               </div>
               
               {/* Scrolling News Ticker */}
               <div 
                 className="relative h-[160px] overflow-hidden w-full"
                 style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
               >
                 <div className="absolute top-0 w-full animate-vertical-scroll flex flex-col">
                   {[1, 2].map((set) => (
                     <div key={set} className="flex flex-col gap-5 pb-5">
                       {newsItems.map((news, i) => (
                         <div key={`${set}-${i}`} className="flex flex-col gap-1.5 cursor-pointer group">
                           <div className="flex items-center gap-2">
                             <div className="bg-white/10 text-white text-[9px] font-bold px-1.5 py-[2px] rounded-[4px] uppercase tracking-wider">{news.source.substring(0,3)}</div>
                             <span className="text-[12px] font-medium text-[#7487a6]">{news.source} • {news.time}</span>
                           </div>
                           <p className="text-[13.5px] text-[#cbd5e1] font-medium leading-snug group-hover:text-white transition-colors pr-4">
                             {news.headline}
                           </p>
                         </div>
                       ))}
                     </div>
                   ))}
                 </div>
               </div>
            </div>
            
            {/* RIGHT COLUMN: Chart Area */}
            <div className="flex-1 min-h-[260px] relative rounded-[12px] bg-[#0f172a]/40 border border-white/5 flex items-center justify-center group cursor-pointer overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               <span className="text-[#475569] text-[13px] font-bold tracking-widest uppercase relative z-10 group-hover:text-slate-400 transition-colors">
                 [ LINE CHART UI ]
               </span>
            </div>
         </div>

         {/* FOOTER */}
         <div className="mt-8 flex flex-col gap-5">
            
            {/* Volume & Meta */}
            <div className="flex justify-between items-center text-[12px] text-[#7487a6] font-medium">
               <span className="font-bold text-white">$7M Vol</span>
               <div className="flex gap-2 items-center">
                 <span>↻ Monthly</span>
                 <span className="flex items-center gap-1.5 font-bold text-white bg-white/5 px-2 py-1 rounded-md ml-2">
                   <span className="text-black bg-white px-1 rounded-[3px] text-[9px]">TL</span> Trigslink
                 </span>
               </div>
            </div>

            {/* Pagination & Buttons */}
            <div className="flex justify-between items-center">
               <div className="flex gap-1.5 items-center">
                  <div className="w-6 h-[4px] bg-[#4F95FF] rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-white/20 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-white/20 rounded-full"></div>
                  <div className="w-[4px] h-[4px] bg-white/20 rounded-full"></div>
               </div>

               <div className="flex gap-3 hidden sm:flex">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full text-[13px] font-semibold text-[#cbd5e1] hover:text-white transition-colors border border-white/5">
                     <ChevronLeft size={16} className="text-[#7487a6]" />
                     US x Iran Ceasefire
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full text-[13px] font-semibold text-[#cbd5e1] hover:text-white transition-colors border border-white/5">
                     Next Supreme Leader
                     <ChevronRight size={16} className="text-[#7487a6]" />
                  </button>
               </div>
            </div>

         </div>
      </div>

      {/* =========================================
          2. RIGHT SIDEBARS (Spans 1 column)
      ========================================= */}
      <div className="lg:col-span-1 flex flex-col gap-6">
         
         {/* Breaking News Box */}
         <div className={`${cardStyle} flex-1`}>
            <h3 className="text-[15px] text-white font-bold mb-6 flex items-center justify-between group cursor-pointer">
              Breaking news <ChevronRight size={16} className="text-[#7487a6] group-hover:text-white transition-colors"/>
            </h3>
            <div className="flex flex-col gap-5">
               {[
                 { id: "01", text: "Will Jasmine Crockett and Ken Paxton be the candidates for the Texas Senate...", prob: "29%", drop: "2%" },
                 { id: "02", text: "ICE shooter charged by March 31?", prob: "6%", drop: "1%" },
                 { id: "03", text: "Will Paramount close Warner Bros acquisition?", prob: "81%", drop: "3%" }
               ].map(item => (
                 <div key={item.id} className="flex gap-4 cursor-pointer group items-start">
                    <span className="text-[#475569] font-bold text-[13px] mt-[1px]">{item.id}</span>
                    <p className="text-[13px] text-[#94a3b8] group-hover:text-white font-medium leading-snug flex-1 transition-colors">{item.text}</p>
                    <div className="text-right flex flex-col items-end shrink-0">
                      <span className="text-[14px] text-[#22c55e] font-bold leading-none mb-1.5">{item.prob}</span>
                      <span className="text-[11px] text-[#ef4444] font-bold flex items-center leading-none">
                        <TrendingDown size={12} strokeWidth={3} className="mr-0.5" /> {item.drop}
                      </span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Hot Topics Box */}
         <div className={`${cardStyle} flex-1`}>
            <h3 className="text-[15px] text-white font-bold mb-6 flex items-center justify-between group cursor-pointer">
              Hot topics <ChevronRight size={16} className="text-[#7487a6] group-hover:text-white transition-colors"/>
            </h3>
            <div className="flex flex-col gap-5">
               {[
                 { id: "01", text: "Oil", vol: "$3M today" },
                 { id: "02", text: "Khamenei", vol: "$196M today" },
                 { id: "03", text: "India", vol: "$5M today" },
                 { id: "04", text: "Ufc", vol: "$50.8K today" },
                 { id: "05", text: "Jesus", vol: "$2M today" }
               ].map(item => (
                 <div key={item.id} className="flex gap-4 cursor-pointer group items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <span className="text-[#475569] font-bold text-[13px]">{item.id}</span>
                      <span className="text-[14px] text-[#cbd5e1] group-hover:text-white font-medium transition-colors">{item.text}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-[#7487a6] font-medium">{item.vol}</span>
                      <Flame size={14} className="text-[#ef4444]" />
                      <ChevronRight size={14} className="text-[#475569] group-hover:text-[#7487a6] transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}