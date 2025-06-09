import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { usePricing } from '../../contexts/PricingContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { prices, loading } = usePricing();

  const kycStatusConfig = {
    'not-submitted': {
      color: 'gray',
      icon: AlertCircle,
      text: 'Not Submitted',
      action: 'Complete KYC'
    },
    'pending': {
      color: 'yellow',
      icon: Clock,
      text: 'Under Review',
      action: 'View Status'
    },
    'approved': {
      color: 'green',
      icon: CheckCircle,
      text: 'Verified',
      action: 'View Details'
    },
    'rejected': {
      color: 'red',
      icon: AlertCircle,
      text: 'Rejected',
      action: 'Resubmit'
    }
  };

  const kycConfig = kycStatusConfig[user?.kycStatus || 'not-submitted'];
  const KycIcon = kycConfig.icon;

  const stats = [
    {
      name: 'Total Transactions',
      value: '12',
      change: '+2.1%',
      changeType: 'increase' as const,
      icon: Activity
    },
    {
      name: 'Portfolio Value',
      value: '₦850,000',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: Wallet
    },
    {
      name: 'Active Orders',
      value: '3',
      change: '-1',
      changeType: 'decrease' as const,
      icon: TrendingUp
    }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-gray-400 mt-1">Here's what's happening with your crypto portfolio today.</p>
              <p className="text-sm text-gray-500 mt-2">Your Referral Code: <span className="font-mono font-semibold text-orange-500">{user?.referralCode}</span></p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-4">
              <Link
                to="/buy"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Buy Crypto
              </Link>
              <Link
                to="/sell"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Sell Crypto
              </Link>
            </div>
          </div>
        </div>

        {/* KYC Status Alert */}
        {user?.kycStatus !== 'approved' && (
          <div className={`bg-${kycConfig.color === 'gray' ? 'gray-800' : kycConfig.color === 'yellow' ? 'yellow-900/50' : kycConfig.color === 'green' ? 'green-900/50' : 'red-900/50'} border border-${kycConfig.color === 'gray' ? 'gray-700' : kycConfig.color === 'yellow' ? 'yellow-700' : kycConfig.color === 'green' ? 'green-700' : 'red-700'} rounded-lg p-4 flex items-center justify-between`}>
            <div className="flex items-center">
              <KycIcon className={`w-5 h-5 ${kycConfig.color === 'gray' ? 'text-gray-400' : kycConfig.color === 'yellow' ? 'text-yellow-400' : kycConfig.color === 'green' ? 'text-green-400' : 'text-red-400'} mr-3`} />
              <div>
                <p className={`${kycConfig.color === 'gray' ? 'text-gray-300' : kycConfig.color === 'yellow' ? 'text-yellow-300' : kycConfig.color === 'green' ? 'text-green-300' : 'text-red-300'} font-medium`}>
                  KYC Status: {kycConfig.text}
                </p>
                <p className={`${kycConfig.color === 'gray' ? 'text-gray-400' : kycConfig.color === 'yellow' ? 'text-yellow-400' : kycConfig.color === 'green' ? 'text-green-400' : 'text-red-400'} text-sm`}>
                  {user?.kycStatus === 'not-submitted' 
                    ? 'Complete your KYC verification to unlock full trading features.'
                    : user?.kycStatus === 'pending'
                    ? 'Your documents are being reviewed. This usually takes 24-48 hours.'
                    : 'Your KYC was rejected. Please check the reason and resubmit.'
                  }
                </p>
              </div>
            </div>
            <Link
              to="/kyc"
              className={`bg-${kycConfig.color === 'gray' ? 'gray-600' : kycConfig.color === 'yellow' ? 'yellow-600' : kycConfig.color === 'green' ? 'green-600' : 'red-600'} text-white px-4 py-2 rounded-lg hover:bg-${kycConfig.color === 'gray' ? 'gray-700' : kycConfig.color === 'yellow' ? 'yellow-700' : kycConfig.color === 'green' ? 'green-700' : 'red-700'} transition-colors text-sm`}
            >
              {kycConfig.action}
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Overview */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            <span className="text-sm text-gray-400">Live prices</span>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-20" />
                      <div className="h-3 bg-gray-700 rounded w-16" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-24" />
                    <div className="h-3 bg-gray-700 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.values(prices).map((coin) => (
                <div key={coin.symbol} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{coin.symbol.substring(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{coin.symbol}</p>
                      <p className="text-sm text-gray-400">${coin.priceUSD.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">₦{coin.priceNGN.toLocaleString()}</p>
                    <div className="flex items-center text-sm">
                      {coin.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                      )}
                      <span className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/buy"
            className="bg-green-900/50 border border-green-700 rounded-lg p-6 hover:bg-green-900/70 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-300">Buy Crypto</h3>
                <p className="text-sm text-green-400 mt-1">Purchase with NGN</p>
              </div>
              <ArrowDownRight className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            to="/sell"
            className="bg-orange-900/50 border border-orange-700 rounded-lg p-6 hover:bg-orange-900/70 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-300">Sell Crypto</h3>
                <p className="text-sm text-orange-400 mt-1">Convert to NGN</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            to="/transactions"
            className="bg-purple-900/50 border border-purple-700 rounded-lg p-6 hover:bg-purple-900/70 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-300">Transactions</h3>
                <p className="text-sm text-purple-400 mt-1">View history</p>
              </div>
              <Activity className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            to="/referrals"
            className="bg-blue-900/50 border border-blue-700 rounded-lg p-6 hover:bg-blue-900/70 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-300">Referrals</h3>
                <p className="text-sm text-blue-400 mt-1">Earn rewards</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;