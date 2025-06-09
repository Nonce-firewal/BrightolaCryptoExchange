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
  RefreshCw,
  UserCheck,
  UserPlus,
  Zap
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
      bonus: 1000,
      tierBonus: 5000,
      color: 'orange',
      icon: Award
    },
    {
      tier: 2,
      name: 'Silver',
      minReferrals: 10,
      bonus: 1000,
      tierBonus: 15000,
      color: 'gray',
      icon: Star
    },
    {
      tier: 3,
      name: 'Gold',
      minReferrals: 25,
      bonus: 1000,
      tierBonus: 35000,
      color: 'yellow',
      icon: Target
    },
    {
      tier: 4,
      name: 'Platinum',
      minReferrals: 50,
      bonus: 1000,
      tierBonus: 75000,
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
              <p className="text-gray-400 mt-1">Earn ₦1,000 for each qualified referral (3+ transactions)</p>
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
              <p className="text-purple-300 text-sm mb-4">Share this link to earn ₦1,000 per qualified user</p>
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

        {/* Enhanced Stats with Referral Breakdown */}
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
              name: 'Qualified Referrals',
              value: stats.qualifiedReferrals.toString(),
              icon: UserCheck,
              color: 'purple',
              change: `₦${stats.qualifiedReferrals * 1000} earned`,
              action: () => setShowEarningsModal(true),
              actionText: 'View Details'
            },
            {
              name: 'Pending Referrals',
              value: stats.pendingReferrals.toString(),
              icon: UserPlus,
              color: 'orange',
              change: 'Need 3+ transactions',
              description: 'Users with 1-2 transactions'
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
                {stat.description && (
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* How Referral Earnings Work */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            How Referral Earnings Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">1. Refer a Friend</h4>
              <p className="text-gray-400 text-sm">Share your referral link and get them to sign up</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">2. They Trade</h4>
              <p className="text-gray-400 text-sm">Your friend completes 3 or more transactions</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">3. Earn ₦1,000</h4>
              <p className="text-gray-400 text-sm">Get your fixed bonus once they qualify</p>
            </div>
          </div>
        </div>

        {/* Referral Progress */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Target className="w-5 h-5 text-purple-400 mr-2" />
              Referral Progress
            </h3>
            <RefreshButton 
              onRefresh={handleRefresh} 
              loading={isRefreshing}
              size="sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress to Next Tier */}
            {nextTier && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Progress to {nextTier.name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Qualified Referrals:</span>
                    <span className="text-white">{stats.qualifiedReferrals} / {nextTier.minReferrals}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((stats.qualifiedReferrals / nextTier.minReferrals) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {nextTier.minReferrals - stats.qualifiedReferrals} more qualified referrals to unlock {nextTier.name} tier
                  </p>
                </div>
              </div>
            )}

            {/* Current Tier Benefits */}
            {currentTier && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Current Tier: {currentTier.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Referral Bonus:</span>
                    <span className="text-green-400 font-bold">₦{currentTier.bonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tier Bonus:</span>
                    <span className="text-purple-400 font-bold">₦{currentTier.tierBonus.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Tier bonus is a one-time reward for reaching this level
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              Recent Referrals
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
                onClick={() => setShowEarningsModal(true)}
              >
                View All
              </AnimatedButton>
            </div>
          </div>
          
          <div className="space-y-3">
            {earnings.slice(0, 5).map((earning) => (
              <div key={earning.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    earning.status === 'qualified' ? 'bg-green-500/20' : 'bg-orange-500/20'
                  }`}>
                    {earning.status === 'qualified' ? (
                      <UserCheck className="w-4 h-4 text-green-400" />
                    ) : (
                      <UserPlus className="w-4 h-4 text-orange-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{earning.fromUserName}</p>
                    <p className="text-gray-400 text-sm">
                      {earning.transactionCount} transaction{earning.transactionCount !== 1 ? 's' : ''}
                      {earning.status === 'qualified' && ' • Qualified'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    earning.status === 'qualified' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {earning.status === 'qualified' ? '₦1,000' : 'Pending'}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(earning.referredAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
              <p className="text-gray-500 text-sm">Start earning and withdraw your referral bonuses</p>
            </div>
          )}
        </div>

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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Qualified Referrals:</span>
                  <span className="text-white">{stats.qualifiedReferrals} × ₦1,000</span>
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
                  Referral Earnings Details
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          earning.status === 'qualified' ? 'bg-green-500/20' : 'bg-orange-500/20'
                        }`}>
                          {earning.status === 'qualified' ? (
                            <UserCheck className="w-4 h-4 text-green-400" />
                          ) : (
                            <UserPlus className="w-4 h-4 text-orange-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{earning.fromUserName}</p>
                          <p className="text-gray-400 text-sm">User ID: {earning.fromUserId}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                        earning.status === 'qualified' 
                          ? 'text-green-400 bg-green-900/20 border-green-700'
                          : 'text-orange-400 bg-orange-900/20 border-orange-700'
                      }`}>
                        {earning.status === 'qualified' ? 'Qualified' : 'Pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Transaction Count:</span>
                        <p className="text-white font-medium">{earning.transactionCount} / 3 required</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Bonus Amount:</span>
                        <p className={`font-bold ${earning.status === 'qualified' ? 'text-green-400' : 'text-gray-400'}`}>
                          ₦{earning.bonusAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Referred Date:</span>
                        <p className="text-white">{new Date(earning.referredAt).toLocaleDateString()}</p>
                      </div>
                      {earning.qualifiedAt && (
                        <div>
                          <span className="text-gray-400">Qualified Date:</span>
                          <p className="text-white">{new Date(earning.qualifiedAt).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                    {earning.status === 'pending' && (
                      <div className="mt-3 p-2 bg-orange-900/20 border border-orange-700 rounded">
                        <p className="text-orange-400 text-sm">
                          User needs {3 - earning.transactionCount} more transaction{3 - earning.transactionCount !== 1 ? 's' : ''} to qualify
                        </p>
                      </div>
                    )}
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
                {withdrawalHistory.length > 0 ? withdrawalHistory.map((withdrawal) => (
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
                )) : (
                  <div className="text-center py-8">
                    <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No withdrawal history</p>
                    <p className="text-gray-500 text-sm">Your withdrawal requests will appear here</p>
                  </div>
                )}
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