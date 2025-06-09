import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { usePricing } from '../../contexts/PricingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { CryptoLogo } from '../../utils/cryptoLogos';
import { 
  ArrowUpRight, 
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
  Building,
  Sparkles,
  Upload,
  Camera,
  FileText,
  Send,
  Eye,
  EyeOff,
  MessageCircle,
  Info,
  X,
  Zap,
  Wallet,
  Network
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SellCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const { getActiveBankAccounts, getAllActiveTokens, getActiveWalletAddress } = useAdmin();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'naira'>('crypto');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  
  // Crypto transfer proof states
  const [cryptoProof, setCryptoProof] = useState<File | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Bank details for receiving payment
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation();

  const activeBanks = getActiveBankAccounts();
  const allTokens = getAllActiveTokens();
  const selectedPrice = prices[selectedCrypto];
  
  const calculatedAmount = amount && selectedPrice ? 
    (amountType === 'crypto' ? 
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString() :
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8)
    ) : '';

  // Get available networks for selected crypto
  const availableNetworks = selectedCrypto ? 
    allTokens
      .filter(token => token.symbol === selectedCrypto)
      .map(token => 'network' in token ? token.network : 'Bitcoin') // Default network for coins
      .filter((network, index, self) => self.indexOf(network) === index) // Remove duplicates
    : [];

  // Get wallet address for selected crypto and network
  const walletAddress = selectedCrypto && selectedNetwork ? 
    getActiveWalletAddress(selectedCrypto, selectedNetwork) : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOrder = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before selling crypto.');
      return;
    }

    if (!selectedNetwork) {
      alert('Please select a network for your crypto transfer.');
      return;
    }

    if (!walletAddress) {
      alert('No wallet address available for the selected crypto and network.');
      return;
    }

    if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
      alert('Please provide your bank details to receive payment.');
      return;
    }

    setIsProcessing(true);
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order details
    const order = {
      id: `ORD${Date.now()}`,
      crypto: selectedCrypto,
      amount: amountType === 'crypto' ? amount : calculatedAmount,
      amountNGN: amountType === 'crypto' ? calculatedAmount : amount,
      network: selectedNetwork,
      walletAddress: walletAddress?.address,
      bankDetails,
      createdAt: new Date().toISOString(),
      status: 'awaiting_crypto'
    };
    
    setOrderDetails(order);
    setStep(3);
    setIsProcessing(false);
  };

  const handleCryptoConfirmation = async () => {
    if (!cryptoProof) {
      alert('Please upload proof of your crypto transfer before confirming.');
      return;
    }

    if (!transactionHash.trim()) {
      alert('Please enter the transaction hash.');
      return;
    }

    setIsSubmitting(true);
    // Simulate crypto confirmation submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(4);
    setIsSubmitting(false);
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only JPG, PNG, or PDF files');
      return;
    }
    
    setCryptoProof(file);
  };

  // Step 4 - Order Submitted
  if (step === 4) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Crypto Transfer Confirmed!</h2>
            <p className="text-gray-400 mb-6">
              Your crypto transfer confirmation has been submitted successfully. Our team will verify your transaction and process your NGN payment within 15-30 minutes.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="text-white font-mono text-sm">{orderDetails?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white">{orderDetails?.amount} {selectedCrypto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">You'll Receive:</span>
                  <span className="text-orange-500 font-bold">₦{orderDetails?.amountNGN}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400">Under Review</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <Info className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-blue-300 font-medium">What's Next?</span>
              </div>
              <ul className="text-blue-400 text-sm text-left space-y-1">
                <li>• Crypto transaction verification (5-15 minutes)</li>
                <li>• NGN transfer to your bank account</li>
                <li>• Email confirmation</li>
                <li>• Transaction completion</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <AnimatedButton
                variant="secondary"
                onClick={() => window.location.href = '/transactions'}
                className="flex-1"
              >
                View Transactions
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                onClick={() => {
                  setStep(1);
                  setAmount('');
                  setSelectedNetwork('');
                  setCryptoProof(null);
                  setTransactionHash('');
                  setCustomerNotes('');
                  setOrderDetails(null);
                  setBankDetails({ accountName: '', accountNumber: '', bankName: '' });
                }}
                className="flex-1"
              >
                New Order
              </AnimatedButton>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Step 3 - Crypto Transfer Instructions & Proof Upload
  if (step === 3) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <Wallet className="w-8 h-8 text-purple-400 mr-3" />
                  Send Cryptocurrency
                </h1>
                <p className="text-gray-400 mt-1">Transfer crypto and upload proof</p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transfer Instructions */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Wallet className="w-6 h-6 text-purple-500 mr-3" />
                Transfer Instructions
              </h2>

              {walletAddress && (
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-semibold mb-4">Send To This Address</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Cryptocurrency:</span>
                      <span className="text-white font-medium">{selectedCrypto}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Network:</span>
                      <div className="flex items-center">
                        <Network className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-white font-medium">{selectedNetwork}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm block mb-1">Wallet Address:</span>
                      <div className="flex items-center justify-between bg-gray-800 rounded p-2">
                        <span className="text-white font-mono text-sm break-all">{walletAddress.address}</span>
                        <button
                          onClick={() => copyToClipboard(walletAddress.address)}
                          className="text-purple-500 hover:text-purple-400 transition-colors ml-2"
                        >
                          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Amount to Send:</span>
                      <span className="text-purple-500 font-bold text-xl">{orderDetails?.amount} {selectedCrypto}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-blue-300 font-medium">Important Instructions</span>
                </div>
                <ul className="text-blue-400 text-sm space-y-1">
                  <li>• Send the EXACT amount shown above</li>
                  <li>• Use the correct network: {selectedNetwork}</li>
                  <li>• Double-check the wallet address</li>
                  <li>• Save your transaction hash</li>
                  <li>• Upload proof of transfer below</li>
                  <li>• Processing time: 5-15 minutes after confirmation</li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-white font-mono text-sm">{orderDetails?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cryptocurrency:</span>
                    <span className="text-white">{selectedCrypto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You'll Receive:</span>
                    <span className="text-white font-semibold">₦{orderDetails?.amountNGN}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Bank:</span>
                    <span className="text-white">{orderDetails?.bankDetails?.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(orderDetails?.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crypto Proof Upload */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 text-orange-500 mr-3" />
                Upload Transfer Proof
              </h2>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Transfer Screenshot/Receipt</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-purple-500 transition-colors duration-300">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Upload Transfer Proof</h3>
                    <p className="text-gray-400 text-sm mb-4">Upload screenshot of your crypto transfer or transaction receipt</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                      id="crypto-proof"
                    />
                    <label htmlFor="crypto-proof">
                      <AnimatedButton
                        variant="secondary"
                        className="cursor-pointer"
                        icon={Upload}
                      >
                        {cryptoProof ? 'Change File' : 'Choose File'}
                      </AnimatedButton>
                    </label>
                    {cryptoProof && (
                      <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-300 text-sm">{cryptoProof.name}</span>
                          </div>
                          <button
                            onClick={() => setCryptoProof(null)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-green-400 text-xs mt-1">✓ File uploaded successfully</p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
              </div>

              {/* Transaction Hash */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Hash/ID</label>
                <input
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="Enter transaction hash from your wallet"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <p className="text-gray-500 text-xs mt-1">This helps us verify your transaction faster</p>
              </div>

              {/* Customer Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Any additional information about your transfer..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </AnimatedButton>
                <AnimatedButton
                  variant="success"
                  onClick={handleCryptoConfirmation}
                  loading={isSubmitting}
                  disabled={!cryptoProof || !transactionHash.trim()}
                  className="flex-1"
                  icon={Send}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Transfer'}
                </AnimatedButton>
              </div>

              {/* Help Section */}
              <div className="mt-6 bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-300 font-medium">Need Help?</span>
                </div>
                <p className="text-yellow-400 text-sm mb-3">
                  If you're having trouble with the transfer or upload, contact our support team.
                </p>
                <AnimatedButton
                  variant="secondary"
                  size="sm"
                  icon={MessageCircle}
                >
                  Contact Support
                </AnimatedButton>
              </div>
            </div>
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
              <p className="text-gray-400 mt-1">Convert crypto to Nigerian Naira</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 4 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* KYC Warning */}
        {user?.kycStatus !== 'approved' && (
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 flex items-center animate-pulse">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
            <div>
              <p className="text-yellow-300 font-medium">KYC Verification Required</p>
              <p className="text-yellow-400 text-sm">Complete your KYC verification to sell crypto.</p>
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
                  Sale Details
                </h2>

                {/* Crypto Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allTokens.filter(token => 'sellEnabled' in token ? token.sellEnabled : true).map((token) => {
                      const isCustom = 'contractAddress' in token;
                      return (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setSelectedCrypto(token.symbol);
                            setSelectedNetwork(''); // Reset network when crypto changes
                          }}
                          className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 relative ${
                            selectedCrypto === token.symbol
                              ? 'border-orange-500 bg-orange-500/20'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                          }`}
                        >
                          {isCustom && (
                            <div className="absolute -top-2 -right-2">
                              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                            </div>
                          )}
                          <CryptoLogo symbol={token.symbol} size={40} className="mx-auto mb-2" />
                          <div className="text-white font-medium text-sm">{token.symbol}</div>
                          <div className="text-gray-400 text-xs">₦{token.priceNGN.toLocaleString()}</div>
                          {isCustom && (
                            <div className="text-purple-400 text-xs mt-1">Custom Token</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Network Selection */}
                {selectedCrypto && availableNetworks.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Select Network</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableNetworks.map((network) => (
                        <button
                          key={network}
                          onClick={() => setSelectedNetwork(network)}
                          className={`p-3 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                            selectedNetwork === network
                              ? 'border-blue-500 bg-blue-500/20'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Network className="w-5 h-5 text-blue-400" />
                            <div className="text-left">
                              <div className="text-white font-medium text-sm">{network}</div>
                              <div className="text-gray-400 text-xs">Available</div>
                            </div>
                          </div>
                        </button>
                      ))}
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
                  <label className="block text-sm font-medium text-gray-300 mb-3">Your Bank Details (for receiving payment)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                        placeholder="Account Name"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                        placeholder="Account Number"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                        placeholder="Bank Name"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={
                    !amount || 
                    !selectedCrypto || 
                    !selectedNetwork ||
                    !bankDetails.accountName ||
                    !bankDetails.accountNumber ||
                    !bankDetails.bankName ||
                    user?.kycStatus !== 'approved'
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
                  <CreditCard className="w-6 h-6 text-orange-500 mr-3" />
                  Order Review
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
                      <span className="text-white font-medium">{selectedNetwork}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount to Send:</span>
                      <span className="text-white font-medium">
                        {amountType === 'crypto' ? amount : calculatedAmount} {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price per {selectedCrypto}:</span>
                      <span className="text-white font-medium">₦{selectedPrice?.priceNGN.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Your Bank:</span>
                      <span className="text-white font-medium">{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white font-medium">{bankDetails.accountNumber}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <div className="flex justify-between text-lg">
                      <span className="text-white font-semibold">You'll Receive:</span>
                      <span className="text-orange-500 font-bold">
                        ₦{amountType === 'crypto' ? calculatedAmount : amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transfer Instructions */}
                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium">Next Steps</span>
                  </div>
                  <ul className="text-blue-400 text-sm space-y-1">
                    <li>• Send your crypto to our secure wallet address</li>
                    <li>• Upload your transaction proof (screenshot/hash)</li>
                    <li>• We'll verify and send NGN to your bank within 15 minutes</li>
                    <li>• You'll receive an email confirmation</li>
                  </ul>
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
                    onClick={handleCreateOrder}
                    loading={isProcessing}
                    className="flex-1"
                    icon={CheckCircle}
                  >
                    {isProcessing ? 'Creating Order...' : 'Create Order'}
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
                  {allTokens.filter(token => 'sellEnabled' in token ? token.sellEnabled : true).map((token, index) => {
                    const isCustom = 'contractAddress' in token;
                    const price = prices[token.symbol];
                    return (
                      <div 
                        key={token.symbol}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer relative"
                        onClick={() => setSelectedCrypto(token.symbol)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {isCustom && (
                          <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <CryptoLogo symbol={token.symbol} size={32} />
                          <div>
                            <div className="text-white font-medium text-sm flex items-center">
                              {token.symbol}
                              {isCustom && <Sparkles className="w-3 h-3 text-purple-400 ml-1" />}
                            </div>
                            <div className={`text-xs ${price && price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {price ? `${price.change24h >= 0 ? '+' : ''}${price.change24h.toFixed(2)}%` : 'Custom'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium text-sm">₦{token.priceNGN.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Sell Amounts */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Sell</h3>
              <div className="grid grid-cols-2 gap-3">
                {['0.1', '0.5', '1.0', '2.0'].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => {
                      setAmount(quickAmount);
                      setAmountType('crypto');
                    }}
                    className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white hover:border-orange-500 hover:bg-orange-500/20 transition-all duration-300 transform hover:scale-105"
                  >
                    {quickAmount} {selectedCrypto || 'BTC'}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet Address Info */}
            {selectedCrypto && selectedNetwork && walletAddress && (
              <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Wallet className="w-5 h-5 text-purple-400 mr-2" />
                  Wallet Address
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Network:</span>
                    <span className="text-white text-sm">{selectedNetwork}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block mb-1">Address:</span>
                    <div className="bg-gray-900 rounded p-2 break-all">
                      <span className="text-white font-mono text-xs">
                        {walletAddress.address.substring(0, 20)}...
                      </span>
                    </div>
                  </div>
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

export default SellCrypto;