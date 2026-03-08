import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center animate-in fade-in zoom-in duration-200 z-[100]">
        <div className="relative z-10 p-2 text-[11px] font-bold leading-none text-white whitespace-nowrap bg-[#1e293b] border border-white/10 rounded-lg shadow-xl">
          {text}
        </div>
        {/* Triangle Arrow */}
        <div className="w-2 h-2 -mt-1 rotate-45 bg-[#1e293b] border-r border-b border-white/10"></div>
      </div>
    </div>
  );
};