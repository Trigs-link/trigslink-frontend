import { type ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  title?: string; // 🆕 Added optional Title
  text: string;
  icon?: ReactNode; // 🆕 Added optional Icon
  width?: string;
}

export const Tooltip = ({ children, title, text, icon, width = "w-[260px]" }: TooltipProps) => {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      
      {/* Tooltip Card Container */}
      <div className="absolute top-full mt-3 hidden group-hover:flex flex-col items-center animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out z-[100] pointer-events-none">
        
        {/* Triangle Arrow - matches the card background */}
        <div className="w-3 h-3 -mb-[6px] rotate-45 bg-[#111827] border-l border-t border-white/10 relative z-[101]"></div>
        
        {/* Main Card Body */}
        <div 
          className={`
            relative z-10 p-3.5 text-left
            bg-gradient-to-b from-[#111827]/95 to-[#0b1426]/95 backdrop-blur-2xl 
            border border-white/10 rounded-[14px] 
            shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]
            ${width}
          `}
        >
          <div className="flex items-start gap-3.5">
            
            {/* 🌟 The Glowing Icon Box */}
            {icon && (
              <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#00c2ff]/10 to-blue-500/5 border border-[#00c2ff]/20 text-[#00c2ff] shadow-[inset_0_1px_4px_rgba(0,194,255,0.15)]">
                {icon}
              </div>
            )}

            {/* 📝 The Text Content */}
            <div className="flex flex-col">
              {title && (
                <span className="text-[13px] font-bold text-white mb-0.5 tracking-tight drop-shadow-sm">
                  {title}
                </span>
              )}
              <span className="text-[12px] font-medium leading-[1.4] text-slate-400">
                {text}
              </span>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};