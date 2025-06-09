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
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import AnimatedButton from '../../components/AnimatedButton';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { prices, loading } = usePricing();

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation();
  const { ref: actionsRef, isVisible: actionsVisible } = useScrollAnimation();

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
        <div 
          ref={headerRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-gray-400 mt-1">Here's what's happening with your crypto portfolio today.</p>
              <p className="text-sm text-gray-400 mt-2">Your Referral Code: <span className="font-mono font-semibold text-orange-500">{user?.referralCode}</span></p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-4">
              <AnimatedButton
                variant="success"
                icon={ArrowDownRight}
                onClick={() => window.location.href = '/buy'}
              >
                Buy Crypto
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                icon={ArrowUpRight}
                onClick={() => window.location.href = '/sell'}
              >
                Sell Crypto
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* KYC Status Alert */}
        {user?.kycStatus !== 'approved' && (
          <div className={`bg-${kycConfig.color === 'gray' ? 'gray-800' : kycConfig.color === 'yellow' ? 'yellow-900/50' : kycConfig.color === 'green' ? 'green-900/50' : 'red-900/50'} border border-${kycConfig.color === 'gray' ? 'gray-700' : kycConfig.color === 'yellow' ? 'yellow-700' : kycConfig.color === 'green' ? 'green-700' : 'red-700'} rounded-lg p-4 flex items-center justify-between transition-all duration-1000 delay-300 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center">
              <KycIcon className={`w-5 h-5 ${kycConfig.color === 'gray' ? 'text-gray-400' : kycConfig.color === 'yellow' ? 'text-yellow-400' : kycConfig.color === 'green' ? 'text-green-400' : 'text-red-400'} mr-3 animate-pulse`} />
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
              className={`bg-${kycConfig.color === 'gray' ? 'gray-600' : kycConfig.color === 'yellow' ? 'yellow-600' : kycConfig.color === 'green' ? 'green-600' : 'red-600'} text-white px-4 py-2 rounded-lg hover:bg-${kycConfig.color === 'gray' ? 'gray-700' : kycConfig.color === 'yellow' ? 'yellow-700' : kycConfig.color === 'green' ? 'green-700' : 'red-700'} transition-all duration-300 transform hover:scale-105 text-sm`}
            >
              {kycConfig.action}
            </Link>
          </div>
        )}

        {/* Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name} 
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
        <div 
          ref={marketRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 delay-700 ${
            marketVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            <span className="text-sm text-gray-400 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live prices
            </span>
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
              {Object.values(prices).map((coin, index) => (
                <div 
                  key={coin.symbol} 
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
        <div 
          ref={actionsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-900 ${
            actionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              title: 'Buy Crypto',
              description: 'Purchase with NGN',
              href: '/buy',
              icon: ArrowDownRight,
              color: 'green',
              bgColor: 'bg-green-900/50',
              borderColor: 'border-green-700',
              hoverBg: 'hover:bg-green-900/70',
              titleColor: 'text-green-300',
              descColor: 'text-green-400',
              iconColor: 'text-green-400'
            },
            {
              title: 'Sell Crypto',
              description: 'Convert to NGN',
              href: '/sell',
              icon: ArrowUpRight,
              color: 'orange',
              bgColor: 'bg-orange-900/50',
              borderColor: 'border-orange-700',
              hoverBg: 'hover:bg-orange-900/70',
              titleColor: 'text-orange-300',
              descColor: 'text-orange-400',
              iconColor: 'text-orange-400'
            },
            {
              title: 'Transactions',
              description: 'View history',
              href: '/transactions',
              icon: Activity,
              color: 'purple',
              bgColor: 'bg-purple-900/50',
              borderColor: 'border-purple-700',
              hoverBg: 'hover:bg-purple-900/70',
              titleColor: 'text-purple-300',
              descColor: 'text-purple-400',
              iconColor: 'text-purple-400'
            },
            {
              title: 'Referrals',
              description: 'Earn rewards',
              href: '/referrals',
              icon: TrendingUp,
              color: 'blue',
              bgColor: 'bg-blue-900/50',
              borderColor: 'border-blue-700',
              hoverBg: 'hover:bg-blue-900/70',
              titleColor: 'text-blue-300',
              descColor: 'text-blue-400',
              iconColor: 'text-blue-400'
            }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className={`${action.bgColor} border ${action.borderColor} rounded-lg p-6 ${action.hoverBg} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${action.titleColor}`}>{action.title}</h3>
                    <p className={`text-sm ${action.descColor} mt-1`}>{action.description}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;