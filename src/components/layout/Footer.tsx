import { Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  const categories = [
    { title: "Global Elections" }, { title: "Crypto Prices" }, { title: "Iran" }, { title: "Reza Pahlavi" }, { title: "Oscars" },
    { title: "Parlays" }, { title: "Commodities" }, { title: "Oil" }, { title: "Texas Senate" }, { title: "Tweet Markets" },
    { title: "Israel" }, { title: "Trump" }, { title: "Lebanon" }, { title: "Nepal Election" }
  ];

  return (
    <footer className="bg-[#13171e] pt-16 pb-12 mt-12 border-t border-white/[0.02]">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Top Section: Brand */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3 cursor-pointer">
            <img src="/images/full_logo.png" alt="Trigslink Logo" className="h-7 w-auto" />
          </div>
          <p className="text-[#94a3b8] text-[15px] font-medium tracking-wide">
            The World's Largest Prediction Market™
          </p>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 mb-16">
          
          {/* Categories (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#64748b] text-[13px] font-semibold mb-6">Markets by category and topics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
              {categories.map((cat, i) => (
                <div key={i} className="cursor-pointer group">
                  <div className="text-[#f1f5f9] text-[14px] font-semibold group-hover:text-white transition-colors">
                    {cat.title}
                  </div>
                  <div className="text-[#475569] text-[12px] font-medium mt-0.5 group-hover:text-[#64748b] transition-colors">
                    Predictions
                  </div>
                </div>
              ))}
              <div className="text-[#94a3b8] text-[13px] font-semibold cursor-pointer hover:text-white transition-colors flex items-center gap-1 mt-1">
                View more <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Support & Social */}
          <div className="lg:col-span-1">
            <h4 className="text-[#64748b] text-[13px] font-semibold mb-6">Support & Social</h4>
            <div className="flex flex-col gap-4">
              {["Learn", "X (Twitter)", "Instagram", "Discord", "TikTok", "News", "Contact us"].map(link => (
                <a key={link} href="#" className="text-[#f1f5f9] text-[14px] font-semibold hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Brand Links */}
          <div className="lg:col-span-1">
            <h4 className="text-[#64748b] text-[13px] font-semibold mb-6">Trigslink</h4>
            <div className="flex flex-col gap-4">
              {["Rewards", "APIs", "Leaderboard", "Accuracy", "Brand", "Activity", "Careers", "Press"].map(link => (
                <a key={link} href="#" className="text-[#f1f5f9] text-[14px] font-semibold hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Socials, Legal, Language */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          
          {/* Social Icons Placeholder */}
          <div className="flex items-center gap-5 text-[#94a3b8]">
            {/* Using simple placeholder circles for standard social icons */}
            <div className="w-5 h-5 rounded-sm border border-current hover:text-white cursor-pointer transition-colors flex items-center justify-center text-[10px] font-bold">M</div>
            <div className="w-5 h-5 rounded-sm border border-current hover:text-white cursor-pointer transition-colors flex items-center justify-center text-[10px] font-bold">X</div>
            <div className="w-5 h-5 rounded-sm border border-current hover:text-white cursor-pointer transition-colors flex items-center justify-center text-[10px] font-bold">ig</div>
            <div className="w-5 h-5 rounded-sm border border-current hover:text-white cursor-pointer transition-colors flex items-center justify-center text-[10px] font-bold">Di</div>
            <div className="w-5 h-5 rounded-sm border border-current hover:text-white cursor-pointer transition-colors flex items-center justify-center text-[10px] font-bold">tt</div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-[#94a3b8]">
            <span className="text-white">Adventure One QSS Inc. © 2026</span>
            <span className="text-[#475569]">·</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="text-[#475569]">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span className="text-[#475569]">·</span>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <span className="text-[#475569]">·</span>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#94a3b8] hover:text-white cursor-pointer transition-colors">
            <Globe size={16} /> English <ChevronDown size={14} />
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-8 text-[11px] font-medium text-[#475569] leading-relaxed max-w-[1400px]">
          Trigslink operates globally through separate legal entities. Trigslink US is operated by QCX LLC d/b/a Trigslink US, a CFTC-regulated Designated Contract Market. This international platform is not regulated by the CFTC and operates independently. Trading involves substantial risk of loss. See our <a href="#" className="underline hover:text-[#64748b]">Terms of Service</a> & <a href="#" className="underline hover:text-[#64748b]">Privacy Policy</a>.
        </div>

      </div>
    </footer>
  );
}