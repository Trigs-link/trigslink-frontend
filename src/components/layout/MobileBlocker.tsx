import { useState, useEffect } from 'react';

export default function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check Screen Size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050a15] flex flex-col items-center justify-center p-6 fixed inset-0 z-[99999] overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00c2ff]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Cyberpunk TV Card - Adjusted for 280x400 */}
      <div className="relative group w-[280px] h-[400px] bg-[#0A0A0C] flex-shrink-0 mx-auto transform-gpu will-change-transform shadow-[0_20px_60px_rgba(0,194,255,0.05)]">
        
        {/* Sci-Fi SVG Border (Recalculated for exactly 280x400) */}
        <svg viewBox="0 0 280 400" className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <path 
            d="M20,1 L279,1 L279,399 L259,399 L1,399 L1,21 Z" 
            vectorEffect="non-scaling-stroke" 
            fill="none" 
            stroke="rgba(0, 194, 255, 0.25)" 
            strokeWidth="1" 
            className="transition-colors duration-500 group-hover:stroke-[#00c2ff]/60" 
          />
          <path d="M1,21 L20,1" stroke="rgba(0, 194, 255, 0.8)" strokeWidth="2" fill="none" />
          <path d="M259,399 L279,399" stroke="rgba(0, 194, 255, 0.8)" strokeWidth="2" fill="none" />
        </svg>

        {/* Inner Wrapper */}
        <div 
          className="w-full h-full relative flex flex-col" 
          style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
        >
          
          {/* TOP SECTION: Logo Box (Now smaller: 40% Height) */}
          <div className="relative h-[40%] w-full overflow-hidden bg-gradient-to-b from-[#0b1426] to-[#0A0A0C] flex items-center justify-center border-b border-[#00c2ff]/20">
              
              {/* Subtle Noise Layer */}
              <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              
              {/* Increased Lining Effect (Denser lines, higher opacity) */}
              <div className="absolute inset-0 z-10 opacity-30 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_1px,#000_2px)]"></div>
              
              {/* Center Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.2)_0%,transparent_60%)]"></div>

              {/* Main Logo */}
              <div className="relative z-15 transform transition-transform duration-700 ease-out group-hover:scale-105">
                <img src="/images/full_logo.png" alt="Trigslink" className="h-9 w-auto drop-shadow-[0_0_20px_rgba(0,194,255,0.6)]" />
              </div>
          </div>
          
          {/* BOTTOM SECTION: Text Box (Now bigger: 60% Height) */}
          <div className="relative h-[60%] bg-gradient-to-b from-[#0f0f12] to-[#050a15] px-6 py-8 flex flex-col items-center justify-center text-center transform-gpu">
              
              {/* Huge Headline (Broken into two lines so it fits the width perfectly) */}
              
              
              {/* Descriptive text */}
              <p className="text-slate-400 font-medium text-[13px] leading-relaxed max-w-[220px]">
              For the best user experience and seamless trading, please access the Trigslink application via a desktop or PC screen.
              </p>

              {/* Minimalist divider line */}
              <div className="mt-8 h-[2px] w-12 bg-gradient-to-r from-transparent via-[#00c2ff]/40 to-transparent rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
}