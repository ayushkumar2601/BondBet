
import React, { useMemo } from 'react';
import { Holding } from '../App';

interface YieldProps {
  portfolio: Holding[];
  balance: number;
  tick: number;
}

const YieldPage: React.FC<YieldProps> = ({ portfolio, balance, tick }) => {
  const stats = useMemo(() => {
    const totalYield = portfolio.reduce((sum, h) => {
      const start = new Date(h.purchaseDate).getTime();
      const now = Date.now();
      const yearsElapsed = (now - start) / (1000 * 60 * 60 * 24 * 365);
      return sum + (h.investedAmount * (h.apy / 100) * yearsElapsed);
    }, 0);

    const projectedAnnual = portfolio.reduce((sum, h) => sum + (h.investedAmount * (h.apy / 100)), 0);

    return { totalYield, projectedAnnual };
  }, [portfolio, tick]);

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <header className="mb-16">
        <h1 className="text-huge font-black uppercase mb-4 tracking-tighter">
          ₹ YIELD <span className="text-orange-500 italic">REPORT.</span>
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
          Daily accrual metrics for your <span className="text-white">BondBuy ₹ Wallet</span>.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 font-black text-8xl text-white/5 pointer-events-none italic uppercase">INR</div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-12">Return Projection</h2>
          <div className="flex items-end gap-3 h-[300px] border-b border-l border-white/5 pb-4 px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div 
                  className="w-full bg-zinc-800 group-hover:bg-orange-500 transition-all duration-700" 
                  style={{ height: `${25 + (i * 6)}%` }} 
                />
                <span className="text-[9px] font-black text-zinc-700 text-center mt-4 uppercase">Month {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-orange-500 p-12 rounded-[3rem] text-black shadow-2xl shadow-orange-500/20">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">Est. Yearly Income</h3>
            <div className="text-6xl font-black tracking-tighter mb-6">₹{stats.projectedAnnual.toLocaleString('en-IN')}</div>
            <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Derived from sovereign fixed-rate coupons</p>
          </div>
          
          <div className="bg-zinc-900/60 border border-white/10 p-10 rounded-[3rem]">
             <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-zinc-500">Live Payout Pool</h3>
             <div className="flex justify-between items-center mb-8">
                <span className="text-4xl font-black italic tracking-tighter">₹{stats.totalYield.toFixed(4)}</span>
                <span className="text-[10px] font-bold uppercase bg-white/10 px-3 py-1 rounded-full text-white">ON-CHAIN</span>
             </div>
             <button className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-xl">Sweep to Wallet</button>
          </div>
        </div>
      </div>

      <section className="p-16 bg-zinc-900/40 rounded-[4rem] border border-white/5">
        <h3 className="text-xl font-black uppercase mb-12 italic underline decoration-orange-500 underline-offset-8">Breakdown</h3>
        <div className="grid md:grid-cols-3 gap-20">
          <div>
            <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-3 block">Daily Accrual</span>
            <div className="text-4xl font-black">₹{(stats.projectedAnnual / 365).toFixed(2)}</div>
          </div>
          <div>
            <span className="text-zinc-500 font-black text-xs uppercase tracking-widest mb-3 block">Weekly Accrual</span>
            <div className="text-4xl font-black">₹{(stats.projectedAnnual / 52).toFixed(2)}</div>
          </div>
          <div>
            <span className="text-zinc-500 font-black text-xs uppercase tracking-widest mb-3 block">Monthly Accrual</span>
            <div className="text-4xl font-black">₹{(stats.projectedAnnual / 12).toFixed(2)}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YieldPage;
