
import React, { useState, useEffect, useCallback } from 'react';
import * as web3 from '@solana/web3.js';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Portfolio from './components/Portfolio';
import YieldPage from './components/YieldPage';
import Education from './components/Education';
import Footer from './components/Footer';
import MintSuccessModal from './components/MintSuccessModal';

// --- Types & Constants ---
export interface Bond {
  id: string;
  name: string;
  apy: number;
  maturityDate: string;
  pricePerUnit: number; // ₹
  risk: string;
  duration: string;
  totalSupply: number;
  remainingSupply: number;
}

export interface Holding {
  id: string; 
  bondId: string;
  bondName: string;
  units: number;
  investedAmount: number; // ₹
  purchaseDate: string;
  apy: number;
  maturityDate: string;
  txHash: string;
}

export type View = 'dashboard' | 'market' | 'portfolio' | 'yield' | 'education' | 'landing';

const INDIAN_BONDS: Bond[] = [
  { id: 'in-gs-2030', name: 'India G-Sec 2030 (7.18%)', apy: 7.18, maturityDate: '2030-01-15', pricePerUnit: 100, risk: 'Sovereign', duration: '6 Years', totalSupply: 10000000, remainingSupply: 8400000 },
  { id: 'sdl-mh-2029', name: 'Maharashtra SDL 2029', apy: 7.45, maturityDate: '2029-06-20', pricePerUnit: 100, risk: 'State Sovereign', duration: '5 Years', totalSupply: 5000000, remainingSupply: 2100000 },
  { id: 'nhai-2034', name: 'NHAI Tax-Free 2034', apy: 6.80, maturityDate: '2034-03-10', pricePerUnit: 1000, risk: 'AAA (Govt Backed)', duration: '10 Years', totalSupply: 2000000, remainingSupply: 1500000 },
  { id: 'rbi-float', name: 'RBI Floating Rate Bond', apy: 8.05, maturityDate: '2031-12-01', pricePerUnit: 1000, risk: 'Sovereign', duration: '7 Years', totalSupply: 5000000, remainingSupply: 4800000 },
];

const SOL_TO_INR_DEMO_RATE = 12500;
const TREASURY_PUBKEY = new web3.PublicKey('G787rV6z3V1XN9N7Yy1X6Zz3V1XN9N7Yy1X6Zz3V1XN');

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [portfolio, setPortfolio] = useState<Holding[]>([]);
  const [marketBonds] = useState<Bond[]>(INDIAN_BONDS);
  const [tick, setTick] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mintSuccessData, setMintSuccessData] = useState<{
    isOpen: boolean;
    bondName: string;
    txSignature: string;
    investedAmount: number;
    units: number;
    certificateId: string;
  } | null>(null);

  // Initialize connection to Devnet
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchBalance = useCallback(async (publicKey: web3.PublicKey) => {
    try {
      console.log('[Phantom] Fetching SOL balance for:', publicKey.toString());
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / web3.LAMPORTS_PER_SOL);
      console.log('[Phantom] Balance updated:', (balance / web3.LAMPORTS_PER_SOL).toFixed(4), 'SOL');
    } catch (e) {
      console.error("[Phantom] Failed to fetch balance:", e);
    }
  }, []);

  /**
   * CORRECT PHANTOM CONNECTION IMPLEMENTATION
   * Directly uses window.solana (Phantom Provider).
   * Prevents any redirection by handling the browser extension natively.
   */
  const connectWallet = async () => {
    const { solana } = window as any;
    
    // 1. Detection Phase
    console.log('[Phantom] Checking for window.solana provider...');
    if (!solana || !solana.isPhantom) {
      console.warn('[Phantom] Extension not detected.');
      alert("Phantom Wallet extension not detected. Please install it from https://phantom.app/ (Direct links/redirects are disabled for security).");
      return;
    }

    if (isConnecting) return;
    setIsConnecting(true);

    console.log('[Phantom] Extension detected. Triggering connect() popup...');

    try {
      // 2. Request Connection (Extension Popup)
      // This will open the Phantom browser extension popup window.
      const response = await solana.connect();
      const publicKey = response.publicKey.toString();
      
      console.log('[Phantom] Connection approved. Public Key:', publicKey);
      
      setPubkey(publicKey);
      setWalletConnected(true);
      fetchBalance(response.publicKey);
      
      // Auto-transition to dashboard if user is on landing page
      if (currentView === 'landing') {
        setCurrentView('dashboard');
      }
    } catch (err: any) {
      // Handle user cancellation (Error code 4001) or other errors
      if (err.code === 4001) {
        console.warn('[Phantom] Connection request was cancelled by the user.');
        alert("Connection request cancelled.");
      } else {
        console.error("[Phantom] Unexpected error during connection:", err);
        alert("An error occurred while connecting to Phantom. Check the console for details.");
      }
      setWalletConnected(false);
      setPubkey(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const buyBondWithNFT = async (bondId: string, inrAmount: number) => {
    const bond = marketBonds.find(b => b.id === bondId);
    const { solana } = window as any;
    
    if (!bond || !pubkey || !solana?.isPhantom) {
      alert("Please ensure your Phantom extension is connected.");
      return;
    }

    setIsMinting(true);
    console.log('[Phantom] Initiating transaction for bond:', bondId);

    try {
      const solToPay = inrAmount / SOL_TO_INR_DEMO_RATE;
      const lamports = Math.floor(solToPay * web3.LAMPORTS_PER_SOL);

      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: new web3.PublicKey(pubkey),
          toPubkey: TREASURY_PUBKEY,
          lamports,
        })
      );

      transaction.feePayer = new web3.PublicKey(pubkey);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      console.log('[Phantom] Requesting transaction signature from extension...');
      
      // 3. Extension Sign-and-Send (Popup Confirmation)
      const { signature } = await solana.signAndSendTransaction(transaction);
      
      console.log('[Phantom] Transaction signed. Signature:', signature);
      console.log('[Phantom] Waiting for Devnet confirmation...');

      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed on-chain.");
      }

      console.log('[Phantom] Transaction confirmed successfully.');

      const newHolding: Holding = {
        id: `BOND-${signature.slice(0, 8)}`.toUpperCase(),
        bondId: bond.id,
        bondName: bond.name,
        units: inrAmount / bond.pricePerUnit,
        investedAmount: inrAmount,
        purchaseDate: new Date().toISOString(),
        apy: bond.apy,
        maturityDate: bond.maturityDate,
        txHash: signature
      };

      setPortfolio(prev => [...prev, newHolding]);
      fetchBalance(new web3.PublicKey(pubkey));
      
      setMintSuccessData({
        isOpen: true,
        bondName: bond.name,
        txSignature: signature,
        investedAmount: inrAmount,
        units: inrAmount / bond.pricePerUnit,
        certificateId: newHolding.id
      });
    } catch (err: any) {
      console.error("[Phantom] Transaction Error:", err);
      if (err.code === 4001) {
        alert("Transaction request was cancelled by the user.");
      } else {
        alert(err.message || "An error occurred during the transaction.");
      }
    } finally {
      setIsMinting(false);
    }
  };

  const renderContent = () => {
    if (!walletConnected && !['education', 'landing', 'market'].includes(currentView)) {
      return <LandingPage onConnect={connectWallet} isConnected={false} />;
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard address={pubkey!} portfolio={portfolio} solBalance={solBalance} />;
      case 'market': return <Marketplace bonds={marketBonds} balance={solBalance * SOL_TO_INR_DEMO_RATE} solBalance={solBalance} onBuy={buyBondWithNFT} isMinting={isMinting} />;
      case 'portfolio': return <Portfolio portfolio={portfolio} tick={tick} />;
      case 'yield': return <YieldPage portfolio={portfolio} balance={solBalance * SOL_TO_INR_DEMO_RATE} tick={tick} />;
      case 'education': return <Education marketBonds={marketBonds} />;
      case 'landing': return <LandingPage onConnect={connectWallet} isConnected={walletConnected} />;
      default: return <LandingPage onConnect={connectWallet} isConnected={walletConnected} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500 selection:text-black">
      <Navbar 
        onConnect={connectWallet} 
        isConnected={walletConnected} 
        address={pubkey} 
        onNavigate={setCurrentView} 
        currentView={currentView} 
      />
      
      <main className="flex-grow">
        {/* Loading Overlay to signal browser extension is waiting for user action */}
        {isConnecting && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-white/10 p-12 rounded-[3rem] text-center shadow-2xl max-w-sm mx-auto">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-8"></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Awaiting Phantom</h3>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Please approve the connection in the extension popup</p>
            </div>
          </div>
        )}
        {renderContent()}
      </main>

      <Footer />

      {mintSuccessData && (
        <MintSuccessModal
          isOpen={mintSuccessData.isOpen}
          onClose={() => setMintSuccessData(null)}
          bondName={mintSuccessData.bondName}
          publicKey={pubkey || ''}
          txSignature={mintSuccessData.txSignature}
          investedAmount={mintSuccessData.investedAmount}
          units={mintSuccessData.units}
          certificateId={mintSuccessData.certificateId}
        />
      )}
    </div>
  );
};

export default App;
