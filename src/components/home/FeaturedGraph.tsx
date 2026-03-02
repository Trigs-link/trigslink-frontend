import { TrendingDown, Flame, ExternalLink, Bookmark, ChevronRight } from 'lucide-react';

export default function FeaturedGraph() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Main Graph Card (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-[#111b33]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col shadow-lg">
         
         {/* Card Header */}
         <div className="flex justify-between items-start mb-6">
            <div className="flex gap-3 items-center">
               {/* Iran Flag Placeholder */}
               <div className="w-10 h-8 rounded bg-gradient-to-br from-green-500 via-white to-red-500 border border-white/10 flex items-center justify-center text-[10px] font-bold text-black shadow-inner">🇮🇷</div>
               <div>
                 <div className="text-xs text-slate-400 font-medium mb-1">World • Iran</div>
                 <h2 className="text-xl font-bold text-white tracking-tight">Next Supreme Leader of Iran?</h2>
               </div>
            </div>
            <div className="flex gap-3 text-slate-400">
               <ExternalLink size={18} className="cursor-pointer hover:text-white transition-colors" />
               <Bookmark size={18} className="cursor-pointer hover:text-white transition-colors" />
            </div>
         </div>

         {/* Content: Left List & Right Graph */}
         <div className="flex flex-col md:flex-row gap-8 flex-1">
            {/* The Choices List */}
            <div className="w-full md:w-[35%] flex flex-col gap-5 justify-center">
               <div className="flex justify-between items-center"><span className="text-sm text-slate-300 font-medium">Hassan Khomeini</span> <span className="text-white font-bold text-lg">18%</span></div>
               <div className="flex justify-between items-center"><span className="text-sm text-slate-300 font-medium">Alireza Arafi</span> <span className="text-white font-bold text-lg">17%</span></div>
               <div className="flex justify-between items-center"><span className="text-sm text-slate-300 font-medium">Position abolished</span> <span className="text-white font-bold text-lg">16%</span></div>
               <div className="flex justify-between items-center"><span className="text-sm text-slate-300 font-medium">Gholam-Hossein Mohseni-Eje'i</span> <span className="text-white font-bold text-lg">8%</span></div>
            </div>
            
            {/* Chart Area */}
            <div className="flex-1 min-h-[220px] relative">
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-sm font-medium border border-dashed border-white/10 rounded-xl bg-black/20">
                 [ Interactive Line Chart UI ]
               </div>
            </div>
         </div>

         {/* Card Footer */}
         <div className="flex justify-between items-center mt-6 text-xs text-slate-500 font-medium pt-4 border-t border-white/5">
            <span>$3M Vol</span>
            <div className="flex gap-2 items-center">
              <span>Ends Dec 31, 2026</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold"><span className="text-white">TL</span> Trigslink</span>
            </div>
         </div>
      </div>

      {/* 2. Right Sidebars (Spans 1 column) */}
      <div className="lg:col-span-1 flex flex-col gap-6">
         
         {/* Breaking News Box */}
         <div className="bg-[#111b33]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
            <h3 className="text-white font-bold mb-5 flex items-center justify-between group cursor-pointer">
              Breaking news <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors"/>
            </h3>
            <div className="flex flex-col gap-5">
               {[
                 { id: 1, text: "Will Jasmine Crockett and Ken Paxton be the candidates for the Texas Senate...", prob: "29%", drop: "2%" },
                 { id: 2, text: "ICE shooter charged by March 31?", prob: "6%", drop: "1%" },
                 { id: 3, text: "Will Paramount close Warner Bros acquisition?", prob: "81%", drop: "3%" }
               ].map(item => (
                 <div key={item.id} className="flex gap-4 cursor-pointer group items-start">
                    <span className="text-slate-600 font-bold text-sm mt-0.5">{item.id}</span>
                    <p className="text-[13px] text-slate-300 group-hover:text-white font-medium leading-snug flex-1 transition-colors">{item.text}</p>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[14px] text-emerald-400 font-bold">{item.prob}</span>
                      <span className="text-[11px] text-red-500 font-bold flex items-center leading-none mt-1"><TrendingDown size={12} className="mr-0.5" /> {item.drop}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Hot Topics Box */}
         <div className="bg-[#111b33]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-lg flex-1">
            <h3 className="text-white font-bold mb-5 flex items-center justify-between group cursor-pointer">
              Hot topics <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors"/>
            </h3>
            <div className="flex flex-col gap-4">
               {[
                 { id: 1, text: "Oil", vol: "$3M today" },
                 { id: 2, text: "Khamenei", vol: "$196M today" },
                 { id: 3, text: "India", vol: "$5M today" },
                 { id: 4, text: "Ufc", vol: "$50.8K today" },
                 { id: 5, text: "Jesus", vol: "$2M today" }
               ].map(item => (
                 <div key={item.id} className="flex gap-3 cursor-pointer group items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <span className="text-slate-600 font-bold text-sm">{item.id}</span>
                      <span className="text-[14px] text-slate-200 group-hover:text-white font-bold transition-colors">{item.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-slate-400 font-medium">{item.vol}</span>
                      <Flame size={14} className="text-red-500 drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]" />
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}