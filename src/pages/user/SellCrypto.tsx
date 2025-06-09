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
  EyeOff,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Upload,
  Camera,
  FileText,
  Send,
  Info,
  X
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SellCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const { getActiveWalletAddress, getAllActiveTokens } = useAdmin();
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
  
  // Payment proof states for sell orders
  const [cryptoProof, setCryptoProof] = useState<File | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: portfolioRef, isVisible: portfolioVisible } = useScrollAnimation();

  const allTokens = getAllActiveTokens();
  const selectedPrice = prices[selectedCrypto];
  const calculatedAmount = amount && selectedPrice ? 
    (amountType === 'crypto' ? 
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString() :
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8)
    ) : '';

  // Check if selected crypto is a custom token
  const isCustomToken = (crypto: string) => {
    const token = allTokens.find(t => t.symbol === crypto);
    return token && 'contractAddress' in token;
  };

  // Get available networks for selected crypto
  const getAvailableNetworks = (crypto: string) => {
    const networkMap: Record<string, string[]> = {
      'BTC': ['Bitcoin'],
      'ETH': ['Ethereum'],
      'USDT': ['Ethereum', 'Tron', 'Binance Smart Chain'],
      'SOL': ['Solana'],
      'BNB': ['Binance Smart Chain'],
      'ADA': ['Cardano']
    };
    return networkMap[crypto] || ['Ethereum']; // Default to Ethereum for custom tokens
  };

  const availableNetworks = getAvailableNetworks(selectedCrypto);
  const currentNetwork = selectedNetwork || availableNetworks[0];
  const walletAddress = getActiveWalletAddress(selectedCrypto, currentNetwork);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate WhatsApp message for custom tokens
  const generateWhatsAppMessage = (crypto: string, amount: string, network: string) => {
    const token = allTokens.find(t => t.symbol === crypto);
    const price = prices[crypto];
    const ngnAmount = amountType === 'crypto' ? calculatedAmount : amount;
    const cryptoAmount = amountType === 'crypto' ? amount : calculatedAmount;

    const message = `Hello! I want to sell my ${crypto} tokens.

*Token Details:*
• Token: ${token?.name} (${crypto})
• Network: ${network}
• Amount: ${cryptoAmount} ${crypto}
• Estimated Value: ₦${ngnAmount}

*My Bank Details:*
• Account Name: ${bankDetails.accountName}
• Account Number: ${bankDetails.accountNumber}
• Bank: ${bankDetails.bankName}

*User Information:*
• Name: ${user?.name}
• Email: ${user?.email}

Please confirm the current rate and provide your wallet address for the transfer. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleCustomTokenSell = () => {
    if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
      alert('Please fill in all bank details before proceeding.');
      return;
    }

    if (!amount) {
      alert('Please enter the amount you want to sell.');
      return;
    }

    const whatsappMessage = generateWhatsAppMessage(selectedCrypto, amount, currentNetwork);
    const whatsappUrl = `https://wa.me/2349165501298?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleCreateSellOrder = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before selling.');
      return;
    }

    if (!walletAddress) {
      alert('Wallet address not available for this cryptocurrency and network.');
      return;
    }

    if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
      alert('Please fill in all bank details before proceeding.');
      return;
    }

    setIsProcessing(true);
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order details
    const order = {
      id: `SELL${Date.now()}`,
      crypto: selectedCrypto,
      network: currentNetwork,
      amount: amountType === 'crypto' ? amount : calculatedAmount,
      amountNGN: amountType === 'crypto' ? calculatedAmount : amount,
      walletAddress: walletAddress.address,
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
      alert('Please upload transaction proof before confirming.');
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

  // Mock portfolio data
  const portfolio = [
    { symbol: 'BTC', amount: 0.5, value: 37500000 },
    { symbol: 'ETH', amount: 2.0, value: 10560000 },
    { symbol: 'USDT', amount: 1000, value: 1650000 },
    { symbol: 'SOL', amount: 10, value: 1980000 },
    { symbol: 'SHIB', amount: 1000000, value: 13200 },
    { symbol: 'PEPE', amount: 5000000, value: 8250 },
    { symbol: 'MATIC', amount: 100, value: 140250 }
  ];

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
                  <span className="text-gray-400">Crypto Sent:</span>
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
                <li>• Transaction verification (5-15 minutes)</li>
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
                  <Wallet className="w-8 h-8 text-orange-400 mr-3" />
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
                <Wallet className="w-6 h-6 text-orange-500 mr-3" />
                Transfer Instructions
              </h2>

              {walletAddress && (
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-semibold mb-4">Send {selectedCrypto} to:</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Network:</span>
                      <div className="flex items-center">
                        <Network className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-white font-medium">{currentNetwork}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm block mb-1">Wallet Address:</span>
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
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Amount to Send:</span>
                      <span className="text-orange-500 font-bold text-xl">{orderDetails?.amount} {selectedCrypto}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-300 font-medium">Critical Instructions</span>
                </div>
                <ul className="text-red-400 text-sm space-y-1">
                  <li>• Only send {selectedCrypto} on the {currentNetwork} network</li>
                  <li>• Send the EXACT amount shown above</li>
                  <li>• Sending wrong amount or network will result in loss</li>
                  <li>• Keep your transaction hash for verification</li>
                  <li>• Upload transaction proof after sending</li>
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
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white">{currentNetwork}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You'll Receive:</span>
                    <span className="text-white font-semibold">₦{orderDetails?.amountNGN}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank Account:</span>
                    <span className="text-white">{orderDetails?.bankDetails?.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(orderDetails?.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Proof Upload */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 text-orange-500 mr-3" />
                Upload Transaction Proof
              </h2>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Transaction Screenshot</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-orange-500 transition-colors duration-300">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Upload Transaction Proof</h3>
                    <p className="text-gray-400 text-sm mb-4">Upload screenshot of your crypto transfer transaction</p>
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
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                />
                <p className="text-gray-500 text-xs mt-1">This helps us verify your transaction on the blockchain</p>
              </div>

              {/* Customer Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Any additional information about your transaction..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 resize-none"
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
              <p className="text-gray-400 mt-1">Convert your crypto to Nigerian Naira</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 4 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* KYC Warning for Regular Tokens */}
        {user?.kycStatus !== 'approved' && !isCustomToken(selectedCrypto) && (
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 flex items-center animate-pulse">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
            <div>
              <p className="text-yellow-300 font-medium">KYC Verification Required</p>
              <p className="text-yellow-400 text-sm">Complete your KYC verification to sell regular cryptocurrencies.</p>
            </div>
          </div>
        )}

        {/* Custom Token Info */}
        {isCustomToken(selectedCrypto) && (
          <div className="bg-purple-900/50 border border-purple-700 rounded-lg p-4 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-400 mr-3 animate-pulse" />
            <div>
              <p className="text-purple-300 font-medium">Custom Token Sale</p>
              <p className="text-purple-400 text-sm">Custom tokens are sold via WhatsApp for personalized service and better rates.</p>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allTokens.filter(token => 'sellEnabled' in token ? token.sellEnabled : true).map((token) => {
                      const portfolioItem = portfolio.find(p => p.symbol === token.symbol);
                      const hasWallet = getActiveWalletAddress(token.symbol);
                      const isCustom = 'contractAddress' in token;
                      return (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setSelectedCrypto(token.symbol);
                            setSelectedNetwork('');
                          }}
                          disabled={!hasWallet && !isCustom}
                          className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 relative ${
                            selectedCrypto === token.symbol
                              ? 'border-orange-500 bg-orange-500/20'
                              : hasWallet || isCustom
                              ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                              : 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          {isCustom && (
                            <div className="absolute -top-2 -right-2">
                              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                            </div>
                          )}
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">{token.symbol.substring(0, 2)}</span>
                          </div>
                          <div className="text-white font-medium text-sm">{token.symbol}</div>
                          <div className="text-gray-400 text-xs">₦{token.priceNGN.toLocaleString()}</div>
                          {portfolioItem && (
                            <div className="text-green-400 text-xs mt-1">
                              {portfolioItem.amount} {token.symbol}
                            </div>
                          )}
                          {isCustom && (
                            <div className="text-purple-400 text-xs mt-1">Custom Token</div>
                          )}
                          {!hasWallet && !isCustom && (
                            <div className="text-red-400 text-xs mt-1">No wallet</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Network Selection for Regular Tokens */}
                {!isCustomToken(selectedCrypto) && availableNetworks.length > 1 && (
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

                {/* Action Button */}
                {isCustomToken(selectedCrypto) ? (
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    onClick={handleCustomTokenSell}
                    disabled={
                      !amount || 
                      !selectedCrypto || 
                      !bankDetails.accountName || 
                      !bankDetails.accountNumber || 
                      !bankDetails.bankName
                    }
                    className="w-full"
                    icon={MessageCircle}
                  >
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Sell via WhatsApp
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                  </AnimatedButton>
                ) : (
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
                )}

                {/* Custom Token Info */}
                {isCustomToken(selectedCrypto) && (
                  <div className="mt-4 p-4 bg-purple-900/20 border border-purple-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-purple-300 font-medium">Custom Token Sale Process</span>
                    </div>
                    <ul className="text-purple-400 text-sm space-y-1">
                      <li>• Click "Sell via WhatsApp" to contact our team</li>
                      <li>• Get personalized rates and instant support</li>
                      <li>• Secure P2P transaction with manual verification</li>
                      <li>• Faster processing for custom tokens</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 for Regular Tokens */}
            {step === 2 && !isCustomToken(selectedCrypto) && (
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
                    variant="success"
                    onClick={handleCreateSellOrder}
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
                  const isCustom = isCustomToken(item.symbol);
                  const canSell = (coinPrice?.sellEnabled || isCustom) && (hasWallet || isCustom);
                  return (
                    <div 
                      key={item.symbol}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 relative ${
                        canSell 
                          ? 'hover:bg-gray-700/50 cursor-pointer' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => canSell && setSelectedCrypto(item.symbol)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {isCustom && (
                        <div className="absolute -top-1 -right-1">
                          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{item.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm flex items-center">
                            {item.symbol}
                            {isCustom && <Sparkles className="w-3 h-3 text-purple-400 ml-1" />}
                          </div>
                          <div className="text-gray-400 text-xs">{item.amount} {item.symbol}</div>
                          {!hasWallet && !isCustom && (
                            <div className="text-red-400 text-xs">No wallet available</div>
                          )}
                          {!coinPrice?.sellEnabled && hasWallet && !isCustom && (
                            <div className="text-yellow-400 text-xs">Selling disabled</div>
                          )}
                          {isCustom && (
                            <div className="text-purple-400 text-xs">Sell via WhatsApp</div>
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
                  {allTokens.filter(token => 'sellEnabled' in token ? token.sellEnabled : true).map((token, index) => {
                    const hasWallet = getActiveWalletAddress(token.symbol);
                    const isCustom = 'contractAddress' in token;
                    const price = prices[token.symbol];
                    return (
                      <div 
                        key={token.symbol}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 relative ${
                          hasWallet || isCustom
                            ? 'hover:bg-gray-700/50 cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => (hasWallet || isCustom) && setSelectedCrypto(token.symbol)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {isCustom && (
                          <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{token.symbol.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm flex items-center">
                              {token.symbol}
                              {isCustom && <Sparkles className="w-3 h-3 text-purple-400 ml-1" />}
                            </div>
                            <div className={`text-xs ${price && price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {price ? `${price.change24h >= 0 ? '+' : ''}${price.change24h.toFixed(2)}%` : 'Custom'}
                            </div>
                            {!hasWallet && !isCustom && (
                              <div className="text-red-400 text-xs">No wallet</div>
                            )}
                            {isCustom && (
                              <div className="text-purple-400 text-xs">WhatsApp</div>
                            )}
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