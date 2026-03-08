import { type ReactNode } from 'react'; // 🆕 Changed to 'type' import

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      {/* Placement for Navbar: Shows below the button */}
      <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center animate-in fade-in zoom-in duration-200 z-[100]">
        {/* Triangle Arrow (Pointing Up) */}
        <div className="w-2 h-2 -mb-1 rotate-45 bg-[#1e293b] border-l border-t border-white/10 relative z-[101]"></div>
        <div className="relative z-10 p-2 text-[11px] font-bold leading-none text-white whitespace-nowrap bg-[#1e293b] border border-white/10 rounded-lg shadow-2xl">
          {text}
        </div>
      </div>
    </div>
  );
};