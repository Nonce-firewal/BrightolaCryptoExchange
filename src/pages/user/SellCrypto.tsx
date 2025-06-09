import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { usePricing } from '../../contexts/PricingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  ArrowUpRight, 
  Calculator, 
  Banknote, 
  Shield, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Wallet,
  Copy,
  Network,
  Eye,
  EyeOff
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SellCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const { getActiveWalletAddress } = useAdmin();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'naira'>('crypto');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWalletAddress, setShowWalletAddress] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: portfolioRef, isVisible: portfolioVisible } = useScrollAnimation();

  const selectedPrice = prices[selectedCrypto];
  const calculatedAmount = amount && selectedPrice ? 
    (amountType === 'crypto' ? 
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString() :
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8)
    ) : '';

  // Get available networks for selected crypto
  const getAvailableNetworks = (crypto: string) => {
    const networkMap: Record<string, string[]> = {
      'BTC': ['Bitcoin'],
      'ETH': ['Ethereum'],
      'USDT': ['Ethereum (ERC-20)', 'Tron (TRC-20)', 'Binance Smart Chain (BEP-20)'],
      'SOL': ['Solana'],
      'BNB': ['Binance Smart Chain'],
      'ADA': ['Cardano']
    };
    return networkMap[crypto] || [];
  };

  const availableNetworks = getAvailableNetworks(selectedCrypto);
  const currentNetwork = selectedNetwork || availableNetworks[0];
  const walletAddress = getActiveWalletAddress(selectedCrypto, currentNetwork);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSell = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before selling.');
      return;
    }

    if (!walletAddress) {
      alert('Wallet address not available for this cryptocurrency and network.');
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(3);
    setIsProcessing(false);
  };

  // Mock portfolio data
  const portfolio = [
    { symbol: 'BTC', amount: 0.5, value: 37500000 },
    { symbol: 'ETH', amount: 2.0, value: 10560000 },
    { symbol: 'USDT', amount: 1000, value: 1650000 },
    { symbol: 'SOL', amount: 10, value: 1980000 }
  ];

  if (step === 3) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Sell Order Created!</h2>
            <p className="text-gray-400 mb-6">
              Your sell order has been created. Send your {selectedCrypto} to the address below to complete the transaction.
            </p>
            
            {walletAddress && (
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-400 mb-2">Send {selectedCrypto} to:</div>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Network: {currentNetwork}</div>
                  <div className="flex items-center justify-between bg-gray-800 rounded p-3">
                    <span className="text-white font-mono text-sm break-all">
                      {showWalletAddress 
                        ? walletAddress.address 
                        : walletAddress.address.substring(0, 8) + '...' + walletAddress.address.substring(walletAddress.address.length - 8)
                      }
                    </span>
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => setShowWalletAddress(!showWalletAddress)}
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showWalletAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(walletAddress.address)}
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount to send:</span>
                    <span className="text-white font-semibold">{amount} {selectedCrypto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You'll receive:</span>
                    <span className="text-white font-semibold">₦{calculatedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-white font-mono text-sm">ORD{Date.now()}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 mb-6">
              <p className="text-blue-400 text-sm">
                ⚠️ Only send {selectedCrypto} on the {currentNetwork} network. Sending on wrong network will result in loss of funds.
              </p>
            </div>
            
            <AnimatedButton
              variant="primary"
              onClick={() => {
                setStep(1);
                setAmount('');
                setSelectedNetwork('');
              }}
              className="w-full"
            >
              Create Another Order
            </AnimatedButton>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 ${
            
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <ArrowUpRight className="w-8 h-8 text-orange-400 mr-3" />
                Sell Cryptocurrency
              </h1>
              <p className="text-gray-400 mt-1">Convert your crypto to Nigerian Naira</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* KYC Warning */}
        {user?.kycStatus !== 'approved' && (
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 flex items-center animate-pulse">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
            <div>
              <p className="text-yellow-300 font-medium">KYC Verification Required</p>
              <p className="text-yellow-400 text-sm">Complete your KYC verification to sell cryptocurrency.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div 
            ref={formRef}
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-300 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {step === 1 && (
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Calculator className="w-6 h-6 text-orange-500 mr-3" />
                  Sell Details
                </h2>

                {/* Crypto Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.values(prices).filter(coin => coin.sellEnabled).map((coin) => {
                      const portfolioItem = portfolio.find(p => p.symbol === coin.symbol);
                      const hasWallet = getActiveWalletAddress(coin.symbol);
                      return (
                        <button
                          key={coin.symbol}
                          onClick={() => {
                            setSelectedCrypto(coin.symbol);
                            setSelectedNetwork('');
                          }}
                          disabled={!hasWallet}
                          className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                            selectedCrypto === coin.symbol
                              ? 'border-orange-500 bg-orange-500/20'
                              : hasWallet
                              ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                              : 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">{coin.symbol.substring(0, 2)}</span>
                          </div>
                          <div className="text-white font-medium text-sm">{coin.symbol}</div>
                          <div className="text-gray-400 text-xs">₦{coin.priceNGN.toLocaleString()}</div>
                          {portfolioItem && (
                            <div className="text-green-400 text-xs mt-1">
                              {portfolioItem.amount} {coin.symbol}
                            </div>
                          )}
                          {!hasWallet && (
                            <div className="text-red-400 text-xs mt-1">No wallet</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Network Selection */}
                {availableNetworks.length > 1 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Select Network</label>
                    <div className="space-y-2">
                      {availableNetworks.map((network) => {
                        const networkWallet = getActiveWalletAddress(selectedCrypto, network);
                        return (
                          <button
                            key={network}
                            onClick={() => setSelectedNetwork(network)}
                            disabled={!networkWallet}
                            className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                              (selectedNetwork || availableNetworks[0]) === network
                                ? 'border-blue-500 bg-blue-500/20'
                                : networkWallet
                                ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                                : 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Network className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-medium">{network}</span>
                              </div>
                              {!networkWallet && (
                                <span className="text-red-400 text-sm">Unavailable</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Wallet Address Preview */}
                {walletAddress && (
                  <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Deposit Address ({currentNetwork}):</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowWalletAddress(!showWalletAddress)}
                          className="text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {showWalletAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(walletAddress.address)}
                          className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <span className="text-white font-mono text-sm break-all">
                        {showWalletAddress 
                          ? walletAddress.address 
                          : walletAddress.address.substring(0, 12) + '...' + walletAddress.address.substring(walletAddress.address.length - 12)
                        }
                      </span>
                    </div>
                  </div>
                )}

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Amount</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setAmountType('crypto')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        amountType === 'crypto'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {selectedCrypto} Amount
                    </button>
                    <button
                      onClick={() => setAmountType('naira')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        amountType === 'naira'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      NGN Amount
                    </button>
                  </div>
                  <div className="mt-3 relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Enter ${amountType === 'crypto' ? selectedCrypto : 'NGN'} amount`}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {amountType === 'crypto' ? selectedCrypto : '₦'}
                    </div>
                  </div>
                  {amount && (
                    <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                      <div className="text-sm text-gray-400">You will receive:</div>
                      <div className="text-lg font-semibold text-white">
                        {amountType === 'crypto' ? `₦${calculatedAmount}` : `${calculatedAmount} ${selectedCrypto}`}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bank Details */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Bank Details</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Account Name"
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={
                    !amount || 
                    !selectedCrypto || 
                    !bankDetails.accountName || 
                    !bankDetails.accountNumber || 
                    !bankDetails.bankName || 
                    user?.kycStatus !== 'approved' ||
                    !walletAddress
                  }
                  className="w-full"
                  icon={ArrowUpRight}
                >
                  Continue to Review
                </AnimatedButton>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Banknote className="w-6 h-6 text-orange-500 mr-3" />
                  Review Sell Order
                </h2>

                {/* Order Summary */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cryptocurrency:</span>
                      <span className="text-white font-medium">{selectedCrypto}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network:</span>
                      <span className="text-white font-medium">{currentNetwork}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount to sell:</span>
                      <span className="text-white font-medium">
                        {amountType === 'crypto' ? amount : calculatedAmount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price per {selectedCrypto}:</span>
                      <span className="text-white font-medium">₦{selectedPrice?.priceNGN.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank Account:</span>
                      <span className="text-white font-medium">{bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white font-medium">{bankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank:</span>
                      <span className="text-white font-medium">{bankDetails.bankName}</span>
                    </div>
                    {walletAddress && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deposit Address:</span>
                        <span className="text-white font-mono text-sm">
                          {walletAddress.address.substring(0, 8)}...{walletAddress.address.substring(walletAddress.address.length - 8)}
                        </span>
                      </div>
                    )}
                    <hr className="border-gray-700" />
                    <div className="flex justify-between text-lg">
                      <span className="text-white font-semibold">You'll receive:</span>
                      <span className="text-orange-500 font-bold">
                        ₦{amountType === 'crypto' ? calculatedAmount : amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium">Important Notice</span>
                  </div>
                  <div className="text-blue-400 text-sm space-y-1">
                    <p>• Only send {selectedCrypto} on the {currentNetwork} network</p>
                    <p>• Your funds will be transferred within 5-15 minutes after confirmation</p>
                    <p>• Sending on wrong network will result in loss of funds</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    onClick={handleSell}
                    loading={isProcessing}
                    className="flex-1"
                    icon={CheckCircle}
                  >
                    {isProcessing ? 'Creating Order...' : 'Create Sell Order'}
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>

          {/* Portfolio & Market */}
          <div 
            ref={portfolioRef}
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Portfolio */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Wallet className="w-5 h-5 text-green-400 mr-2" />
                Your Portfolio
              </h3>
              <div className="space-y-3">
                {portfolio.map((item, index) => {
                  const hasWallet = getActiveWalletAddress(item.symbol);
                  const coinPrice = prices[item.symbol];
                  const canSell = coinPrice?.sellEnabled && hasWallet;
                  return (
                    <div 
                      key={item.symbol}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        canSell 
                          ? 'hover:bg-gray-700/50 cursor-pointer' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => canSell && setSelectedCrypto(item.symbol)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{item.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{item.symbol}</div>
                          <div className="text-gray-400 text-xs">{item.amount} {item.symbol}</div>
                          {!hasWallet && (
                            <div className="text-red-400 text-xs">No wallet available</div>
                          )}
                          {!coinPrice?.sellEnabled && hasWallet && (
                            <div className="text-yellow-400 text-xs">Selling disabled</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium text-sm">₦{item.value.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Market Prices */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                Sell Prices
              </h3>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full" />
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-700 rounded w-16" />
                          <div className="h-3 bg-gray-700 rounded w-12" />
                        </div>
                      </div>
                      <div className="h-4 bg-gray-700 rounded w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.values(prices).filter(coin => coin.sellEnabled).map((coin, index) => {
                    const hasWallet = getActiveWalletAddress(coin.symbol);
                    return (
                      <div 
                        key={coin.symbol}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                          hasWallet 
                            ? 'hover:bg-gray-700/50 cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => hasWallet && setSelectedCrypto(coin.symbol)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{coin.symbol.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{coin.symbol}</div>
                            <div className={`text-xs ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                            </div>
                            {!hasWallet && (
                              <div className="text-red-400 text-xs">No wallet</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium text-sm">₦{coin.priceNGN.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default SellCrypto;