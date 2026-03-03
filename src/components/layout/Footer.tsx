export default function Footer() {
  return (
    <footer className="bg-[#09101d] pt-12 pb-8 border-t border-white/[0.02]">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Top/Middle Section: Streamlined Brand & Support */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-8">
          
          {/* Brand Info */}
          <div className="lg:max-w-md">
            <div className="flex items-center gap-2 mb-3 cursor-pointer">
              <img src="/images/full_logo.png" alt="Trigslink Logo" className="h-10 w-auto" />
            </div>
            <p className="text-[#8ba0c2] text-[14px] font-medium tracking-wide leading-relaxed">
              The World's Fastest 15-Seconds Settlement Prediction Market™
            </p>
          </div>

          {/* Support & Social Links */}
          <div className="lg:min-w-[180px]">
            <h4 className="text-[#4b5e7d] text-[12px] font-bold tracking-wider uppercase mb-5">
              Support & Social
            </h4>
            <div className="flex flex-col gap-3">
              <a href="https://x.com/trigslink" target="_blank" rel="noreferrer" className="text-[#e2e8f0] text-[13px] font-semibold hover:text-[#3b82f6] transition-colors">
                X (Twitter)
              </a>
              <a href="https://youtube.com/@trigslink" target="_blank" rel="noreferrer" className="text-[#e2e8f0] text-[13px] font-semibold hover:text-[#3b82f6] transition-colors">
                YouTube
              </a>
              <a href="https://t.me/trigslink" target="_blank" rel="noreferrer" className="text-[#e2e8f0] text-[13px] font-semibold hover:text-[#3b82f6] transition-colors">
                Telegram
              </a>
              <a href="mailto:trigslink@gmail.com" className="text-[#e2e8f0] text-[13px] font-semibold hover:text-[#3b82f6] transition-colors">
                Email
              </a>
              <a href="/contact" className="text-[#e2e8f0] text-[13px] font-semibold hover:text-[#3b82f6] transition-colors">
                Contact us
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Social Icons & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 mt-4 border-t border-[#1e2a45]/60">
          
          {/* Social Icons (Raw SVGs) */}
          <div className="flex items-center gap-4 text-[#6a7c9c]">
            {/* Mail */}
            <a href="mailto:trigslink@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/trigslink" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/@trigslink" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1c.2-1.5 1.3-2.6 2.8-2.7C8.8 4 12 4 12 4s3.2 0 6.7.4c1.5.1 2.6 1.2 2.8 2.7.3 3.3.3 6.5 0 9.8-.2 1.5-1.3 2.6-2.8 2.7-3.5.4-6.7.4-6.7.4s-3.2 0-6.7-.4c-1.5-.1-2.6-1.2-2.8-2.7-.3-3.3-.3-6.5 0-9.8z"/><path d="m10 15 5-3-5-3v6z"/></svg>
            </a>
            {/* Telegram */}
            <a href="https://t.me/trigslink" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/trigslink" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* Discord */}
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.06 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>

          {/* Legal Links & Copyright */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-2 gap-y-1 text-[12px] font-semibold text-[#5e7090]">
            <span className="text-[#8496b5]">Trigslink © 2026</span>
            <span className="text-[#2b3b5a] hidden sm:inline">·</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="text-[#2b3b5a] hidden sm:inline">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>

        </div>

        {/* Beta / Validation laimer */}
        <div className="mt-6 pt-5 text-[11px] font-medium text-[#4b5e7d] leading-relaxed max-w-[1400px] ">
          Trigslink is currently in a public Beta and active development phase. The platform, predictive models, and 15-second AI settlement protocols are provided for testing, evaluation, and educational purposes only. Trigslink is not currently a regulated financial exchange, and participation involves inherent technical and Web3-related risks. Markets and features are subject to change without notice. See our <a href="#" className="underline hover:text-[#8ba0c2] transition-colors">Terms of Service</a> & <a href="#" className="underline hover:text-[#8ba0c2] transition-colors">Privacy Policy</a>.
        </div>

      </div>
    </footer>
  );
}