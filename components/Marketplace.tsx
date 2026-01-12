
import React, { useState } from 'react';
import { Bond } from '../App';

interface MarketplaceProps {
  bonds: Bond[];
  balance: number; // INR
  solBalance: number;
  onBuy: (id: string, amount: number) => void;
  isMinting: boolean;
}

const Marketplace: React.FC<MarketplaceProps> = ({ bonds, balance, solBalance, onBuy, isMinting }) => {
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [buyAmountInr, setBuyAmountInr] = useState('');
  const SOL_TO_INR_RATE = 12500;

  const handleConfirm = () => {
    if (selectedBond && Number(buyAmountInr) > 0) {
      onBuy(selectedBond.id, Number(buyAmountInr));
      setSelectedBond(null);
      setBuyAmountInr('');
    }
  };

  const solRequired = Number(buyAmountInr) / SOL_TO_INR_RATE;
  const insufficientFunds = solRequired > solBalance;

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <header className="mb-16">
        <h1 className="text-huge font-black uppercase mb-4 tracking-tighter">
          PRIMARY <span className="text-orange-500 italic">MINT.</span>
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="text-white">DEVNET MARKET</span> • 1 SOL ≈ ₹12,500
        </p>
      </header>

      <div className="grid grid-cols-6 px-6 py-4 border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        <div className="col-span-2">Instrument</div>
        <div>Maturity</div>
        <div className="text-orange-500">Fixed APY</div>
        <div>Price / Frac</div>
        <div className="text-right">Action</div>
      </div>

      <div className="divide-y divide-white/5">
        {bonds.map((bond) => (
          <div key={bond.id} className="grid grid-cols-6 px-6 py-12 items-center group hover:bg-zinc-900/40 transition-colors">
            <div className="col-span-2">
              <div className="text-2xl font-black uppercase tracking-tight">{bond.name}</div>
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{bond.duration} • {bond.risk}</div>
            </div>
            <div className="text-lg font-bold text-zinc-300">{new Date(bond.maturityDate).toLocaleDateString('en-IN')}</div>
            <div className="text-3xl font-black text-orange-500 italic">{bond.apy}%</div>
            <div className="text-lg font-bold text-zinc-500">₹{bond.pricePerUnit}</div>
            <div className="text-right">
              <button 
                onClick={() => setSelectedBond(bond)}
                className="bg-orange-500 text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all active:scale-95"
              >
                MINT
              </button>
            </div>
          </div>
        ))}
      </div>

      {isMinting && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
           <div className="w-24 h-24 border-8 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-8"></div>
           <h2 className="text-4xl font-black uppercase tracking-tighter">MINTING RWA NFT...</h2>
           <p className="text-zinc-500 font-bold uppercase tracking-widest mt-4">Confirm transaction in Phantom</p>
        </div>
      )}

      {selectedBond && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-12 rounded-[3.5rem] max-w-xl w-full relative">
            <button onClick={() => setSelectedBond(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white text-3xl">×</button>
            
            <h2 className="text-4xl font-black uppercase mb-8 leading-tight">{selectedBond.name}</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Investment (₹)</label>
                  <span className="text-[10px] font-black uppercase text-zinc-400">Min: ₹100</span>
                </div>
                <input 
                  type="number" 
                  value={buyAmountInr}
                  onChange={(e) => setBuyAmountInr(e.target.value)}
                  placeholder="100"
                  className="w-full bg-black border border-white/5 rounded-2xl p-6 text-4xl font-black focus:outline-none focus:border-orange-500 text-white"
                />
              </div>

              <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Network Pay</span>
                  <span className={`text-xl font-black ${insufficientFunds ? 'text-red-500' : 'text-white'}`}>{solRequired.toFixed(4)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Bond Fractions</span>
                  <span className="text-xl font-black text-white">{(Number(buyAmountInr) / selectedBond.pricePerUnit).toFixed(2)} Units</span>
                </div>
              </div>

              <button 
                onClick={handleConfirm}
                disabled={!buyAmountInr || insufficientFunds || Number(buyAmountInr) < 100}
                className="w-full bg-orange-500 text-black py-6 rounded-full font-black uppercase tracking-widest text-lg hover:bg-white transition-all disabled:opacity-20 active:scale-95 shadow-2xl shadow-orange-500/20"
              >
                {insufficientFunds ? 'INSUFFICIENT SOL' : 'CONFIRM & MINT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
