import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useReferral } from '../../contexts/ReferralContext';
import RefreshButton from '../../components/RefreshButton';
import { 
  Users, 
  Gift, 
  Copy, 
  Share2, 
  TrendingUp, 
  DollarSign,
  Award,
  Star,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  Wallet,
  ArrowUpRight,
  Building,
  AlertCircle,
  Download,
  Eye,
  Calendar,
  Banknote,
  CreditCard,
  X,
  Send,
  RefreshCw
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ReferralDashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats, earnings, requestWithdrawal, getWithdrawalHistory, refreshData } = useReferral();
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState(1);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showWithdrawalHistory, setShowWithdrawalHistory] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: referralsRef, isVisible: referralsVisible } = useScrollAnimation();

  const referralLink = `https://brightola.com/register?ref=${user?.referralCode}`;
  const withdrawalHistory = getWithdrawalHistory();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Brightola Exchange',
        text: 'Start trading crypto with the best rates in Nigeria!',
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleWithdrawalRequest = async () => {
    setError('');
    
    if (!withdrawalAmount || parseFloat(withdrawalAmount) < 2000) {
      setError('Minimum withdrawal amount is ₦2,000');
      return;
    }

    if (parseFloat(withdrawalAmount) > stats.availableBalance) {
      setError('Insufficient available balance');
      return;
    }

    if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
      setError('Please fill in all bank details');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await requestWithdrawal(parseFloat(withdrawalAmount), bankDetails);
      setShowWithdrawalModal(false);
      setWithdrawalAmount('');
      setBankDetails({ accountName: '', accountNumber: '', bankName: '' });
      handleRefresh();
      alert('Withdrawal request submitted successfully! It will be processed within 24-48 hours.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const referralTiers = [
    {
      tier: 1,
      name: 'Bronze',
      minReferrals: 0,
      commission: 10,
      bonus: 5000,
      color: 'orange',
      icon: Award
    },
    {
      tier: 2,
      name: 'Silver',
      minReferrals: 10,
      commission: 15,
      bonus: 15000,
      color: 'gray',
      icon: Star
    },
    {
      tier: 3,
      name: 'Gold',
      minReferrals: 25,
      commission: 20,
      bonus: 35000,
      color: 'yellow',
      icon: Target
    },
    {
      tier: 4,
      name: 'Platinum',
      minReferrals: 50,
      commission: 25,
      bonus: 75000,
      color: 'purple',
      icon: Gift
    }
  ];

  const currentTier = referralTiers.find(t => t.tier === stats.currentTier);
  const nextTier = referralTiers.find(t => t.tier === stats.currentTier + 1);

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                Referral Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Earn rewards by inviting friends to trade crypto</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <RefreshButton 
                onRefresh={handleRefresh} 
                loading={isRefreshing}
                size="sm"
              />
              <AnimatedButton
                variant="secondary"
                icon={Copy}
                onClick={copyToClipboard}
                size="sm"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                icon={Share2}
                onClick={shareReferral}
                size="sm"
              >
                Share
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Referral Link</h3>
              <p className="text-purple-300 text-sm mb-4">Share this link to earn commissions on every trade</p>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-900 rounded-lg px-4 py-2 flex-1 max-w-md">
                  <p className="text-white font-mono text-sm break-all">{referralLink}</p>
                </div>
                <AnimatedButton
                  variant="primary"
                  icon={copied ? CheckCircle : Copy}
                  onClick={copyToClipboard}
                  size="sm"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </AnimatedButton>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats with Withdrawal Balance */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              name: 'Available Balance',
              value: `₦${(stats.availableBalance / 1000).toFixed(0)}K`,
              icon: Wallet,
              color: 'green',
              change: 'Ready to withdraw',
              action: () => setShowWithdrawalModal(true),
              actionText: 'Withdraw'
            },
            {
              name: 'Total Earnings',
              value: `₦${(stats.totalEarnings / 1000).toFixed(0)}K`,
              icon: DollarSign,
              color: 'purple',
              change: '+₦25K this month',
              action: () => setShowEarningsModal(true),
              actionText: 'View Details'
            },
            {
              name: 'Pending Balance',
              value: `₦${(stats.pendingBalance / 1000).toFixed(0)}K`,
              icon: Clock,
              color: 'orange',
              change: 'Available in 7 days'
            },
            {
              name: 'Total Referrals',
              value: stats.totalReferrals.toString(),
              icon: Users,
              color: 'blue',
              change: '+3 this month'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name}
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{stat.change}</p>
                  {stat.action && (
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={stat.action}
                      className="text-xs px-2 py-1"
                    >
                      {stat.actionText}
                    </AnimatedButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Withdrawal History Quick View */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <ArrowUpRight className="w-5 h-5 text-green-400 mr-2" />
              Recent Withdrawals
            </h3>
            <div className="flex space-x-3">
              <RefreshButton 
                onRefresh={handleRefresh} 
                loading={isRefreshing}
                size="sm"
              />
              <AnimatedButton
                variant="secondary"
                icon={Eye}
                size="sm"
                onClick={() => setShowWithdrawalHistory(true)}
              >
                View All
              </AnimatedButton>
            </div>
          </div>
          
          {withdrawalHistory.length > 0 ? (
            <div className="space-y-3">
              {withdrawalHistory.slice(0, 3).map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">₦{withdrawal.amount.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">{withdrawal.bankDetails.bankName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                      withdrawal.status === 'paid' 
                        ? 'text-green-400 bg-green-900/20 border-green-700'
                        : withdrawal.status === 'pending'
                        ? 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
                        : 'text-red-400 bg-red-900/20 border-red-700'
                    }`}>
                      {withdrawal.status}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(withdrawal.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No withdrawals yet</p>
              <p className="text-gray-500 text-sm">Start earning and withdraw your referral commissions</p>
            </div>
          )}
        </div>

        {/* Rest of the existing referral dashboard content... */}
        {/* Tier Progress, How It Works, etc. */}

        {/* Withdrawal Request Modal */}
        {showWithdrawalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Wallet className="w-6 h-6 text-green-400 mr-2" />
                  Request Withdrawal
                </h3>
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-4 flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Available Balance:</span>
                  <span className="text-green-400 font-bold text-lg">₦{stats.availableBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Minimum Withdrawal:</span>
                  <span className="text-white">₦2,000</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount</label>
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder="Enter amount (min ₦2,000)"
                    min="2000"
                    max={stats.availableBalance}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                    placeholder="Enter account name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                    placeholder="Enter bank name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3 mt-4 mb-6">
                <p className="text-blue-400 text-sm">
                  ⚠️ Withdrawal requests are processed manually within 24-48 hours. Ensure your bank details are correct.
                </p>
              </div>

              <div className="flex space-x-3">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setShowWithdrawalModal(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="success"
                  onClick={handleWithdrawalRequest}
                  loading={isSubmitting}
                  disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < 2000}
                  className="flex-1"
                  icon={Send}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Withdrawal'}
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Details Modal */}
        {showEarningsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <DollarSign className="w-6 h-6 text-purple-400 mr-2" />
                  Earnings Details
                </h3>
                <div className="flex space-x-3">
                  <RefreshButton 
                    onRefresh={handleRefresh} 
                    loading={isRefreshing}
                    size="sm"
                  />
                  <button
                    onClick={() => setShowEarningsModal(false)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {earnings.map((earning) => (
                  <div key={earning.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <span className="text-purple-400 font-bold text-sm">{earning.cryptocurrency}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{earning.fromUserName}</p>
                          <p className="text-gray-400 text-sm">{earning.transactionId}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                        earning.status === 'confirmed' 
                          ? 'text-green-400 bg-green-900/20 border-green-700'
                          : 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
                      }`}>
                        {earning.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Transaction Amount:</span>
                        <p className="text-white font-medium">₦{earning.transactionAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Commission ({earning.commissionRate}%):</span>
                        <p className="text-green-400 font-bold">₦{earning.commissionAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Earned Date:</span>
                        <p className="text-white">{new Date(earning.earnedAt).toLocaleDateString()}</p>
                      </div>
                      {earning.paidAt && (
                        <div>
                          <span className="text-gray-400">Paid Date:</span>
                          <p className="text-white">{new Date(earning.paidAt).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Withdrawal History Modal */}
        {showWithdrawalHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-3xl border border-gray-700 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <ArrowUpRight className="w-6 h-6 text-green-400 mr-2" />
                  Withdrawal History
                </h3>
                <div className="flex space-x-3">
                  <RefreshButton 
                    onRefresh={handleRefresh} 
                    loading={isRefreshing}
                    size="sm"
                  />
                  <button
                    onClick={() => setShowWithdrawalHistory(false)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {withdrawalHistory.map((withdrawal) => (
                  <div key={withdrawal.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-bold text-lg">₦{withdrawal.amount.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">{withdrawal.referenceNumber}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border ${
                        withdrawal.status === 'paid' 
                          ? 'text-green-400 bg-green-900/20 border-green-700'
                          : withdrawal.status === 'pending'
                          ? 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
                          : withdrawal.status === 'approved'
                          ? 'text-blue-400 bg-blue-900/20 border-blue-700'
                          : 'text-red-400 bg-red-900/20 border-red-700'
                      }`}>
                        {withdrawal.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Bank Details:</span>
                        <p className="text-white">{withdrawal.bankDetails.accountName}</p>
                        <p className="text-gray-300">{withdrawal.bankDetails.accountNumber} - {withdrawal.bankDetails.bankName}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Requested:</span>
                        <p className="text-white">{new Date(withdrawal.requestedAt).toLocaleString()}</p>
                        {withdrawal.processedAt && (
                          <>
                            <span className="text-gray-400">Processed:</span>
                            <p className="text-white">{new Date(withdrawal.processedAt).toLocaleString()}</p>
                          </>
                        )}
                      </div>
                    </div>
                    {withdrawal.adminNotes && (
                      <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700 rounded">
                        <span className="text-blue-300 text-sm font-medium">Admin Notes:</span>
                        <p className="text-blue-400 text-sm">{withdrawal.adminNotes}</p>
                      </div>
                    )}
                    {withdrawal.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-900/20 border border-red-700 rounded">
                        <span className="text-red-300 text-sm font-medium">Rejection Reason:</span>
                        <p className="text-red-400 text-sm">{withdrawal.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default ReferralDashboard;