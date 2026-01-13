
import React from 'react';
import { Bond } from '../App';

interface EducationProps {
  marketBonds: Bond[];
  onNavigate?: (view: string) => void;
}

const Education: React.FC<EducationProps> = ({ marketBonds, onNavigate }) => {
  const exampleBond = marketBonds[0];

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <header className="mb-24 text-center">
        <h1 className="text-huge font-black uppercase mb-4 tracking-tighter">
          INDIA <span className="text-orange-500 italic">SECURE.</span>
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
          Navigating the <span className="text-white">G-Sec</span> and <span className="text-white">SDL</span> market on-chain.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-24 items-start mb-32">
        <section className="space-y-8">
          <div className="text-orange-500 font-black text-6xl opacity-20">01</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">What are G-Secs?</h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Government Securities (G-Secs) are tradable instruments issued by the Central Government or State Governments. They acknowledge the Government's debt obligation. At <span className="text-white">bondbuy</span>, we use Solana to make these institution-only assets available for just <span className="text-orange-500 font-black">₹100</span>.
          </p>
        </section>

        <section className="space-y-8">
          <div className="text-orange-500 font-black text-6xl opacity-20">02</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Yield Accrual</h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            For <span className="text-white">{exampleBond.name}</span>, the yield is calculated at a fixed APY of <span className="text-white font-bold">{exampleBond.apy}%</span>. Unlike traditional banks that credit interest quarterly, our system updates your accrued ₹ balance <span className="text-white">every second</span>.
          </p>
        </section>
      </div>

      <section className="mb-32">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center italic">Institutional Comparison</h2>
        <div className="grid grid-cols-4 border border-white/10 rounded-3xl overflow-hidden bg-zinc-900/20">
          {['Metric', 'Bank FD', 'Retail G-Sec', 'bondbuy'].map((h, i) => (
            <div key={i} className="bg-zinc-900/50 p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-r border-white/10 last:border-0">{h}</div>
          ))}
          
          <div className="p-8 border-t border-r border-white/10 font-bold">Minimum</div>
          <div className="p-8 border-t border-r border-white/10 text-zinc-500">₹10,000</div>
          <div className="p-8 border-t border-r border-white/10 text-zinc-500">₹10,000</div>
          <div className="p-8 border-t border-white/10 text-orange-500 font-black">₹100.00</div>

          <div className="p-8 border-t border-r border-white/10 font-bold">Liquidity</div>
          <div className="p-8 border-t border-r border-white/10 text-zinc-500">Locked / Penalty</div>
          <div className="p-8 border-t border-r border-white/10 text-zinc-500">T+2 Days</div>
          <div className="p-8 border-t border-white/10 text-white font-black">Instant on SOL</div>
        </div>
      </section>

      <div className="bg-zinc-900 p-20 rounded-[4rem] text-center border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent" />
        <h2 className="text-6xl font-black uppercase mb-8">Secure your ₹ wealth.</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-xl italic">
          Join the protocol bringing India's most stable assets to the global liquidity of Solana Devnet.
        </p>
        <button 
          onClick={() => onNavigate?.('dashboard')}
          className="bg-orange-500 text-black px-16 py-6 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-orange-500/10"
        >
          Launch Dashboard
        </button>
      </div>
    </div>
  );
};

export default Education;
