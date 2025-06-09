import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { usePricing } from '../../contexts/PricingContext';
import { useAuth } from '../../contexts/AuthContext';
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
  Copy
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SellCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'naira'>('crypto');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'); // Mock wallet address

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: portfolioRef, isVisible: portfolioVisible } = useScrollAnimation();

  const selectedPrice = prices[selectedCrypto];
  const calculatedAmount = amount ? 
    (amountType === 'crypto' ? 
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString() :
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8)
    ) : '';

  const handleSell = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before selling.');
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(3);
    setIsProcessing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-400 mb-2">Send {selectedCrypto} to:</div>
              <div className="flex items-center justify-between bg-gray-800 rounded p-3">
                <span className="text-white font-mono text-sm break-all">{walletAddress}</span>
                <button
                  onClick={() => copyToClipboard(walletAddress)}
                  className="ml-2 text-orange-500 hover:text-orange-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount to send:</span>
                  <span className="text-white font-semibold">{amount} {selectedCrypto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">You'll receive:</span>
                  <span className="text-white font-semibold">₦{calculatedAmount}</span>
                </div>
              </div>
            </div>
            <AnimatedButton
              variant="primary"
              onClick={() => {
                setStep(1);
                setAmount('');
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
                    {Object.values(prices).map((coin) => {
                      const portfolioItem = portfolio.find(p => p.symbol === coin.symbol);
                      return (
                        <button
                          key={coin.symbol}
                          onClick={() => setSelectedCrypto(coin.symbol)}
                          className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                            selectedCrypto === coin.symbol
                              ? 'border-orange-500 bg-orange-500/20'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
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
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                  disabled={!amount || !selectedCrypto || !bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName || user?.kycStatus !== 'approved'}
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
                    <span className="text-blue-300 font-medium">Secure Transaction</span>
                  </div>
                  <p className="text-blue-400 text-sm">
                    Your funds will be transferred to your bank account within 5-15 minutes after we receive your cryptocurrency.
                  </p>
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
                {portfolio.map((item, index) => (
                  <div 
                    key={item.symbol}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCrypto(item.symbol)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{item.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{item.symbol}</div>
                        <div className="text-gray-400 text-xs">{item.amount} {item.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-sm">₦{item.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
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
                  {Object.values(prices).map((coin, index) => (
                    <div 
                      key={coin.symbol}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedCrypto(coin.symbol)}
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium text-sm">₦{coin.priceNGN.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
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