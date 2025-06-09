import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { usePricing } from '../../contexts/PricingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  ArrowDownRight, 
  Calculator, 
  CreditCard, 
  Shield, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Banknote,
  Smartphone,
  Copy,
  Building
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const BuyCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const { getActiveBankAccounts } = useAdmin();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'naira'>('naira');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [selectedBank, setSelectedBank] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation();

  const activeBanks = getActiveBankAccounts();
  const selectedBankAccount = activeBanks.find(bank => bank.id === selectedBank);

  const selectedPrice = prices[selectedCrypto];
  const calculatedAmount = amount && selectedPrice ? 
    (amountType === 'naira' ? 
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8) :
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString()
    ) : '';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchase = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before making purchases.');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !selectedBank) {
      alert('Please select a bank account for payment.');
      return;
    }

    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(3);
    setIsProcessing(false);
  };

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Banknote,
      description: 'Direct bank transfer (Recommended)',
      fee: '0%',
      time: '5-15 minutes'
    },
    {
      id: 'card',
      name: 'Debit Card',
      icon: CreditCard,
      description: 'Instant payment with debit card',
      fee: '1.5%',
      time: 'Instant'
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: Smartphone,
      description: 'Pay with USSD code',
      fee: '0.5%',
      time: '2-5 minutes'
    }
  ];

  if (step === 3) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Purchase Order Created!</h2>
            <p className="text-gray-400 mb-6">
              Your {selectedCrypto} purchase order has been created. Complete the payment to receive your crypto.
            </p>
            
            {paymentMethod === 'bank_transfer' && selectedBankAccount && (
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-3">Payment Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank:</span>
                    <span className="text-white">{selectedBankAccount.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Name:</span>
                    <span className="text-white">{selectedBankAccount.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">{selectedBankAccount.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(selectedBankAccount.accountNumber)}
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount to Pay:</span>
                    <span className="text-orange-500 font-bold">₦{amount}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">You will receive:</span>
                <span className="text-white font-semibold">{calculatedAmount} {selectedCrypto}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-mono">ORD{Date.now()}</span>
              </div>
            </div>
            
            <AnimatedButton
              variant="primary"
              onClick={() => {
                setStep(1);
                setAmount('');
                setSelectedBank('');
              }}
              className="w-full"
            >
              Make Another Purchase
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
                <ArrowDownRight className="w-8 h-8 text-green-400 mr-3" />
                Buy Cryptocurrency
              </h1>
              <p className="text-gray-400 mt-1">Purchase crypto with Nigerian Naira</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* KYC Warning */}
        {user?.kycStatus !== 'approved' && (
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 flex items-center animate-pulse">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
            <div>
              <p className="text-yellow-300 font-medium">KYC Verification Required</p>
              <p className="text-yellow-400 text-sm">Complete your KYC verification to make purchases.</p>
            </div>
          </div>
        )}

        {/* No Active Banks Warning */}
        {activeBanks.length === 0 && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <div>
              <p className="text-red-300 font-medium">No Payment Methods Available</p>
              <p className="text-red-400 text-sm">Bank transfer is temporarily unavailable. Please try again later.</p>
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
                  Purchase Details
                </h2>

                {/* Crypto Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.values(prices).filter(coin => coin.buyEnabled).map((coin) => (
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
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Amount</label>
                  <div className="flex space-x-3">
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
                  </div>
                  <div className="mt-3 relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Enter ${amountType === 'naira' ? 'NGN' : selectedCrypto} amount`}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {amountType === 'naira' ? '₦' : selectedCrypto}
                    </div>
                  </div>
                  {amount && (
                    <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                      <div className="text-sm text-gray-400">You will receive:</div>
                      <div className="text-lg font-semibold text-white">
                        {amountType === 'naira' ? `${calculatedAmount} ${selectedCrypto}` : `₦${calculatedAmount}`}
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Payment Method</label>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isDisabled = method.id === 'bank_transfer' && activeBanks.length === 0;
                      return (
                        <button
                          key={method.id}
                          onClick={() => !isDisabled && setPaymentMethod(method.id)}
                          disabled={isDisabled}
                          className={`w-full p-4 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${
                            paymentMethod === method.id
                              ? 'border-orange-500 bg-orange-500/20'
                              : isDisabled
                              ? 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className="w-6 h-6 text-orange-500" />
                              <div className="text-left">
                                <div className="text-white font-medium">{method.name}</div>
                                <div className="text-gray-400 text-sm">{method.description}</div>
                                {isDisabled && (
                                  <div className="text-red-400 text-xs">Currently unavailable</div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 text-sm font-medium">Fee: {method.fee}</div>
                              <div className="text-gray-400 text-xs">{method.time}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bank Selection for Bank Transfer */}
                {paymentMethod === 'bank_transfer' && activeBanks.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Select Bank Account</label>
                    <div className="space-y-3">
                      {activeBanks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBank(bank.id)}
                          className={`w-full p-4 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${
                            selectedBank === bank.id
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Building className="w-6 h-6 text-green-500" />
                            <div className="text-left">
                              <div className="text-white font-medium">{bank.bankName}</div>
                              <div className="text-gray-400 text-sm">{bank.accountName}</div>
                              <div className="text-gray-400 text-sm font-mono">{bank.accountNumber}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={
                    !amount || 
                    !selectedCrypto || 
                    user?.kycStatus !== 'approved' ||
                    (paymentMethod === 'bank_transfer' && (!selectedBank || activeBanks.length === 0))
                  }
                  className="w-full"
                  icon={ArrowDownRight}
                >
                  Continue to Payment
                </AnimatedButton>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 text-orange-500 mr-3" />
                  Payment Confirmation
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
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-medium">
                        {amountType === 'naira' ? calculatedAmount : amount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price per {selectedCrypto}:</span>
                      <span className="text-white font-medium">₦{selectedPrice?.priceNGN.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment Method:</span>
                      <span className="text-white font-medium">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name}
                      </span>
                    </div>
                    {selectedBankAccount && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank:</span>
                          <span className="text-white font-medium">{selectedBankAccount.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account:</span>
                          <span className="text-white font-medium">{selectedBankAccount.accountNumber}</span>
                        </div>
                      </>
                    )}
                    <hr className="border-gray-700" />
                    <div className="flex justify-between text-lg">
                      <span className="text-white font-semibold">Total:</span>
                      <span className="text-orange-500 font-bold">
                        ₦{amountType === 'naira' ? amount : calculatedAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium">Secure Payment</span>
                  </div>
                  <p className="text-blue-400 text-sm">
                    {paymentMethod === 'bank_transfer' 
                      ? 'Transfer the exact amount to the selected bank account. Your crypto will be credited once payment is confirmed.'
                      : 'Your payment is secured with bank-grade encryption. Complete the payment to receive your cryptocurrency.'
                    }
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
                    variant="success"
                    onClick={handlePurchase}
                    loading={isProcessing}
                    className="flex-1"
                    icon={CheckCircle}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>

          {/* Market Overview */}
          <div 
            ref={marketRef}
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              marketVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                Live Prices
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
                  {Object.values(prices).filter(coin => coin.buyEnabled).map((coin, index) => (
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

            {/* Quick Buy Amounts */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Buy</h3>
              <div className="grid grid-cols-2 gap-3">
                {['10,000', '25,000', '50,000', '100,000'].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => {
                      setAmount(quickAmount.replace(',', ''));
                      setAmountType('naira');
                    }}
                    className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white hover:border-orange-500 hover:bg-orange-500/20 transition-all duration-300 transform hover:scale-105"
                  >
                    ₦{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Banks Info */}
            {activeBanks.length > 0 && (
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Building className="w-5 h-5 text-green-400 mr-2" />
                  Available Banks
                </h3>
                <div className="space-y-2">
                  {activeBanks.slice(0, 3).map((bank) => (
                    <div key={bank.id} className="flex items-center space-x-3 p-2 bg-gray-900 rounded-lg">
                      <Building className="w-4 h-4 text-green-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{bank.bankName}</div>
                        <div className="text-gray-400 text-xs">{bank.accountName}</div>
                      </div>
                    </div>
                  ))}
                  {activeBanks.length > 3 && (
                    <div className="text-gray-400 text-sm text-center">
                      +{activeBanks.length - 3} more banks available
                    </div>
                  )}
                </div>
              </div>
            )}
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

export default BuyCrypto;