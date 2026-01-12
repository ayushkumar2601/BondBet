
import React from 'react';

interface HeroProps {
  onConnect: () => void;
  isConnected: boolean;
}

const Hero: React.FC<HeroProps> = ({ onConnect, isConnected }) => {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-left z-10 animate-slide-up">
          <h1 className="text-huge font-black uppercase mb-8">
            <span className="accent-glow text-orange-500">OWN INDIAN</span> <br />
            <span className="text-white italic">GOVT BONDS.</span> <br />
            <span className="text-green-500">START WITH ₹100</span><span className="text-orange-500">.</span>
          </h1>
          
          <p className="max-w-xl text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed mb-10">
            Invest in fractional G-Secs and SDLs using Solana Devnet SOL. <br />
            Built for the <span className="text-white">next generation</span> of Indian retail investors.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                onConnect();
              }}
              className="bg-orange-500 text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-orange-400 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
            >
              {isConnected ? 'Market Ready' : 'Connect Extension'}
            </button>
            <button className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all active:scale-95">
              Browse G-Secs
            </button>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="flex-1 relative w-full h-[400px] lg:h-[600px] mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl overflow-hidden border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1621416848446-9f6efdec4fc4?auto=format&fit=crop&q=80&w=1200" 
              alt="Indian Finance" 
              className="w-full h-full object-cover mix-blend-overlay opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-orange-500/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 text-xs font-bold uppercase tracking-[0.5em] text-white/40 vertical-text" style={{ writingMode: 'vertical-rl' }}>
              RBI COMPLIANT • SOLANA • RUPEE
            </div>
          </div>
          
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hidden md:block animate-bounce shadow-2xl">
            <div className="text-orange-500 font-black text-4xl">7.4%</div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">SDL Yield Avg</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
