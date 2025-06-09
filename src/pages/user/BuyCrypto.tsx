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
  Zap
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const BuyCrypto: React.FC = () => {
  const { prices, loading } = usePricing();
  const { user } = useAuth();
  const { getActiveBankAccounts, getAllActiveTokens } = useAdmin();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'naira'>('naira');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [selectedBank, setSelectedBank] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonMethod, setComingSoonMethod] = useState<'card' | 'ussd'>('card');
  
  // Payment proof states
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [transactionReference, setTransactionReference] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation();

  const activeBanks = getActiveBankAccounts();
  const allTokens = getAllActiveTokens();
  const selectedBankAccount = activeBanks.find(bank => bank.id === selectedBank);

  const selectedPrice = prices[selectedCrypto];
  const calculatedAmount = amount && selectedPrice ? 
    (amountType === 'naira' ? 
      (parseFloat(amount) / selectedPrice?.priceNGN || 0).toFixed(8) :
      (parseFloat(amount) * selectedPrice?.priceNGN || 0).toLocaleString()
    ) : '';

  // Check if selected crypto is a custom token
  const isCustomToken = (crypto: string) => {
    const token = allTokens.find(t => t.symbol === crypto);
    return token && 'contractAddress' in token;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOrder = async () => {
    if (user?.kycStatus !== 'approved') {
      alert('Please complete KYC verification before making purchases.');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !selectedBank) {
      alert('Please select a bank account for payment.');
      return;
    }

    // Show coming soon modal for card and USSD payment methods
    if (paymentMethod === 'card') {
      setComingSoonMethod('card');
      setShowComingSoonModal(true);
      return;
    }

    if (paymentMethod === 'ussd') {
      setComingSoonMethod('ussd');
      setShowComingSoonModal(true);
      return;
    }

    setIsProcessing(true);
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order details
    const order = {
      id: `ORD${Date.now()}`,
      crypto: selectedCrypto,
      amount: amountType === 'naira' ? calculatedAmount : amount,
      amountNGN: amountType === 'naira' ? amount : calculatedAmount,
      bankAccount: selectedBankAccount,
      createdAt: new Date().toISOString(),
      status: 'awaiting_payment'
    };
    
    setOrderDetails(order);
    setStep(3);
    setIsProcessing(false);
  };

  const handlePaymentConfirmation = async () => {
    if (!paymentProof) {
      alert('Please upload payment proof before confirming.');
      return;
    }

    if (!transactionReference.trim()) {
      alert('Please enter the transaction reference number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate payment confirmation submission
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
    
    setPaymentProof(file);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    if (methodId === 'card' || methodId === 'ussd') {
      setComingSoonMethod(methodId as 'card' | 'ussd');
      setShowComingSoonModal(true);
    } else {
      setPaymentMethod(methodId);
    }
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

  // Step 4 - Order Submitted
  if (step === 4) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Payment Confirmed!</h2>
            <p className="text-gray-400 mb-6">
              Your payment confirmation has been submitted successfully. Our team will verify your payment and credit your {selectedCrypto} within 15-30 minutes.
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
                  <span className="text-gray-400">Paid:</span>
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
                <li>• Payment verification (5-15 minutes)</li>
                <li>• Crypto transfer to your wallet</li>
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
                  setSelectedBank('');
                  setPaymentProof(null);
                  setTransactionReference('');
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

  // Step 3 - Payment Instructions & Proof Upload
  if (step === 3) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <Banknote className="w-8 h-8 text-green-400 mr-3" />
                  Complete Payment
                </h1>
                <p className="text-gray-400 mt-1">Transfer payment and upload proof</p>
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
            {/* Payment Instructions */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Building className="w-6 h-6 text-green-500 mr-3" />
                Payment Instructions
              </h2>

              {selectedBankAccount && (
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-semibold mb-4">Transfer Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Bank Name:</span>
                      <span className="text-white font-medium">{selectedBankAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white font-medium">{selectedBankAccount.accountName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Account Number:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-lg">{selectedBankAccount.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(selectedBankAccount.accountNumber)}
                          className="text-green-500 hover:text-green-400 transition-colors"
                        >
                          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Amount to Pay:</span>
                      <span className="text-green-500 font-bold text-xl">₦{orderDetails?.amountNGN}</span>
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
                  <li>• Transfer the EXACT amount shown above</li>
                  <li>• Use the reference: {orderDetails?.id}</li>
                  <li>• Keep your transaction receipt/screenshot</li>
                  <li>• Upload proof of payment below</li>
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
                    <span className="text-white font-semibold">{orderDetails?.amount} {selectedCrypto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(orderDetails?.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Proof Upload */}
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 text-orange-500 mr-3" />
                Upload Payment Proof
              </h2>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Payment Screenshot/Receipt</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-orange-500 transition-colors duration-300">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Upload Payment Proof</h3>
                    <p className="text-gray-400 text-sm mb-4">Upload screenshot of your bank transfer or payment receipt</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                      id="payment-proof"
                    />
                    <label htmlFor="payment-proof">
                      <AnimatedButton
                        variant="secondary"
                        className="cursor-pointer"
                        icon={Upload}
                      >
                        {paymentProof ? 'Change File' : 'Choose File'}
                      </AnimatedButton>
                    </label>
                    {paymentProof && (
                      <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-300 text-sm">{paymentProof.name}</span>
                          </div>
                          <button
                            onClick={() => setPaymentProof(null)}
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

              {/* Transaction Reference */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Reference/ID</label>
                <input
                  type="text"
                  value={transactionReference}
                  onChange={(e) => setTransactionReference(e.target.value)}
                  placeholder="Enter transaction reference from your bank"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                />
                <p className="text-gray-500 text-xs mt-1">This helps us verify your payment faster</p>
              </div>

              {/* Customer Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Any additional information about your payment..."
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
                  onClick={handlePaymentConfirmation}
                  loading={isSubmitting}
                  disabled={!paymentProof || !transactionReference.trim()}
                  className="flex-1"
                  icon={Send}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Payment'}
                </AnimatedButton>
              </div>

              {/* Help Section */}
              <div className="mt-6 bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-300 font-medium">Need Help?</span>
                </div>
                <p className="text-yellow-400 text-sm mb-3">
                  If you're having trouble with payment or upload, contact our support team.
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
                <ArrowDownRight className="w-8 h-8 text-green-400 mr-3" />
                Buy Cryptocurrency
              </h1>
              <p className="text-gray-400 mt-1">Purchase crypto with Nigerian Naira</p>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allTokens.filter(token => 'buyEnabled' in token ? token.buyEnabled : true).map((token) => {
                      const isCustom = 'contractAddress' in token;
                      return (
                        <button
                          key={token.symbol}
                          onClick={() => setSelectedCrypto(token.symbol)}
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
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">{token.symbol.substring(0, 2)}</span>
                          </div>
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
                          onClick={() => !isDisabled && handlePaymentMethodSelect(method.id)}
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
                          className={`w-full p-3 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${
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
                    <span className="text-blue-300 font-medium">Next Steps</span>
                  </div>
                  <ul className="text-blue-400 text-sm space-y-1">
                    <li>• Transfer the exact amount to our bank account</li>
                    <li>• Upload your payment proof (screenshot/receipt)</li>
                    <li>• We'll verify and credit your crypto within 15 minutes</li>
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
                  {allTokens.filter(token => 'buyEnabled' in token ? token.buyEnabled : true).map((token, index) => {
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

        {/* Coming Soon Modal for Card and USSD Payment */}
        {showComingSoonModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 animate-comingSoonModal">
              <div className="relative">
                {/* Animated elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    {comingSoonMethod === 'card' ? (
                      <CreditCard className="w-10 h-10 text-white" />
                    ) : (
                      <Smartphone className="w-10 h-10 text-white" />
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {comingSoonMethod === 'card' ? 'Card Payment Coming Soon!' : 'USSD Payment Coming Soon!'}
                  </h2>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 animate-shimmer"></div>
                    <p className="text-gray-300 relative z-10">
                      {comingSoonMethod === 'card' 
                        ? 'We\'re currently integrating our card payment system to provide you with a seamless experience. This feature will be available very soon!' 
                        : 'Our USSD payment option is under development and will be available shortly. This will allow you to make payments directly from your phone without internet access.'}
                    </p>
                    
                    <div className="flex items-center justify-center mt-4 space-x-2">
                      <Zap className="w-5 h-5 text-orange-400 animate-pulse" />
                      <span className="text-orange-400 font-medium">Coming in Q2 2024</span>
                    </div>
                  </div>
                  
                  <AnimatedButton
                    variant="primary"
                    onClick={() => setShowComingSoonModal(false)}
                    className="w-full"
                  >
                    Back to Payment Methods
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        )}
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
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .animate-comingSoonModal {
          animation: fadeInScale 0.5s ease-out;
        }
        
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 8s infinite linear;
        }
      `}</style>
    </Layout>
  );
};

export default BuyCrypto;