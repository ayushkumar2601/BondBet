import React from 'react';

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bondName: string;
  publicKey: string;
  txSignature: string;
  investedAmount: number;
  units: number;
  certificateId: string;
}

const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
  bondName,
  publicKey,
  txSignature,
  investedAmount,
  units,
  certificateId
}) => {
  if (!isOpen) return null;

  const truncateAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const explorerUrl = `https://explorer.solana.com/tx/${txSignature}?cluster=devnet`;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Certificate Preview</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col lg:flex-row gap-6">
          {/* Certificate Card */}
          <div className="flex-1 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ON-CHAIN
            </div>
            
            <div className="text-zinc-800 font-bold text-sm mb-6">BondBuy</div>
            
            <h3 className="text-3xl font-black text-zinc-900 uppercase mb-2">Certificate of</h3>
            <h3 className="text-3xl font-black text-zinc-900 uppercase mb-6">Bond Ownership</h3>
            
            <p className="text-zinc-600 text-sm mb-2">This certificate is proudly awarded to:</p>
            <p className="text-2xl font-black text-zinc-900 mb-6 break-all">{truncateAddress(publicKey)}</p>
            
            <p className="text-zinc-600 text-sm mb-8 leading-relaxed">
              In recognition of their investment in<br />
              <span className="font-bold text-zinc-800">{bondName}</span>
            </p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-300 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Awarded on:</p>
                <p className="text-sm font-black text-zinc-900">{currentDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Units Purchased:</p>
                <p className="text-sm font-black text-zinc-900">{units.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Amount Invested:</p>
                <p className="text-sm font-black text-zinc-900">₹{investedAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Certificate ID:</p>
                <p className="text-sm font-black text-zinc-900">{certificateId}</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 space-y-6">
            {/* Wallet Connection */}
            <div className="bg-zinc-800/50 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs font-black uppercase tracking-wider text-white">Wallet Connected</span>
              </div>
              <p className="text-zinc-400 text-xs mb-3">Your bond NFT has been minted to your wallet.</p>
              <div className="bg-zinc-900 rounded-xl px-4 py-3 text-center">
                <span className="text-green-500 font-mono text-sm">{truncateAddress(publicKey)}</span>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-zinc-800/50 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full border-2 border-green-500"></div>
                <span className="text-xs font-black uppercase tracking-wider text-white">Blockchain Verification</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Network</p>
                  <p className="text-sm font-bold text-white">Solana Devnet</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Certificate Hash</p>
                  <div className="bg-zinc-900 rounded-xl px-4 py-3">
                    <p className="text-xs font-mono text-zinc-400 break-all">{publicKey}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Transaction Signature</p>
                  <div className="bg-zinc-900 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-mono text-zinc-400 truncate">{txSignature}</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(txSignature)}
                      className="text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bond Details */}
            <div className="bg-zinc-800/50 rounded-2xl p-5 border border-white/5">
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Bond Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Bond</p>
                  <p className="text-sm font-bold text-white">{bondName}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a 
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Explorer
              </a>
              <button 
                onClick={onClose}
                className="w-14 h-14 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-all border border-white/10"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintSuccessModal;
