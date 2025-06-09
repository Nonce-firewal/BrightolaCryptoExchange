import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { usePricing } from '../../contexts/PricingContext';
import RefreshButton from '../../components/RefreshButton';
import MarketPreviewModal from '../../components/MarketPreviewModal';
import { CryptoLogo } from '../../utils/cryptoLogos';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  RefreshCw,
  Wifi,
  WifiOff,
  Eye,
  BarChart3
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import AnimatedButton from '../../components/AnimatedButton';
import AnimatedCard from '../../components/AnimatedCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { prices, loading, refreshPrices, lastUpdated } = usePricing();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, visibleItems: visibleStats } = useStaggeredAnimation(3, 150);
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation({ delay: 300 });
  const { ref: actionsRef, visibleItems: visibleActions } = useStaggeredAnimation(4, 100);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshPrices();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const kycStatusConfig = {
    'not-submitted': {
      color: 'gray',
      icon: AlertCircle,
      text: 'Not Submitted',
      action: 'Complete KYC',
      bgColor: 'bg-gray-800',
      borderColor: 'border-gray-700',
      textColor: 'text-gray-300'
    },
    'pending': {
      color: 'yellow',
      icon: Clock,
      text: 'Under Review',
      action: 'View Status',
      bgColor: 'bg-yellow-900/50',
      borderColor: 'border-yellow-700',
      textColor: 'text-yellow-300'
    },
    'approved': {
      color: 'green',
      icon: CheckCircle,
      text: 'Verified',
      action: 'View Details',
      bgColor: 'bg-green-900/50',
      borderColor: 'border-green-700',
      textColor: 'text-green-300'
    },
    'rejected': {
      color: 'red',
      icon: AlertCircle,
      text: 'Rejected',
      action: 'Resubmit',
      bgColor: 'bg-red-900/50',
      borderColor: 'border-red-700',
      textColor: 'text-red-300'
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
      icon: Activity,
      color: 'blue'
    },
    {
      name: 'Portfolio Value',
      value: '₦850,000',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: Wallet,
      color: 'green'
    },
    {
      name: 'Active Orders',
      value: '3',
      change: '-1',
      changeType: 'decrease' as const,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  // Check if prices are real-time or fallback
  const isRealTimeData = lastUpdated && (Date.now() - lastUpdated.getTime()) < 60000; // Within last minute

  // Get top 4 coins by price change for preview
  const topCoins = Object.values(prices)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 4);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header with enhanced animations */}
        <div 
          ref={headerRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 transform ${
            headerVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="relative">
              {/* Animated welcome text */}
              <h1 className="text-2xl font-bold text-white relative overflow-hidden">
                <span className={`inline-block transition-all duration-700 ${
                  headerVisible ? 'translate-x-0' : '-translate-x-full'
                }`}>
                  Welcome back,
                </span>
                <span className={`inline-block ml-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent transition-all duration-700 delay-300 ${
                  headerVisible ? 'translate-x-0' : 'translate-x-full'
                }`}>
                  {user?.name}!
                </span>
                {/* Sparkle effects */}
                {headerVisible && (
                  <>
                    <Sparkles className="absolute -top-2 -right-8 w-4 h-4 text-orange-400 animate-pulse" />
                    <Zap className="absolute -bottom-1 -left-4 w-3 h-3 text-orange-500 animate-bounce" />
                  </>
                )}
              </h1>
              <p className={`text-gray-400 mt-1 transition-all duration-700 delay-500 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Here's what's happening with your crypto portfolio today.
              </p>
              <p className={`text-sm text-gray-400 mt-2 transition-all duration-700 delay-700 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Your Referral Code: 
                <span className="font-mono font-semibold text-orange-500 ml-1 hover:text-orange-400 transition-colors cursor-pointer">
                  {user?.referralCode}
                </span>
              </p>
            </div>
            <div className={`mt-4 lg:mt-0 flex space-x-4 transition-all duration-700 delay-900 ${
              headerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'hover:scale-110'}`}
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <Link to="/buy">
                <AnimatedButton
                  variant="success"
                  icon={ArrowDownRight}
                  hoverEffect="glow"
                >
                  Buy Crypto
                </AnimatedButton>
              </Link>
              <Link to="/sell">
                <AnimatedButton
                  variant="primary"
                  icon={ArrowUpRight}
                  hoverEffect="glow"
                >
                  Sell Crypto
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced KYC Status Alert */}
        {user?.kycStatus !== 'approved' && (
          <AnimatedCard 
            className={`${kycConfig.bgColor} border ${kycConfig.borderColor} rounded-lg p-4 flex items-center justify-between`}
            delay={200}
            hoverEffect="glow"
          >
            <div className="flex items-center">
              <KycIcon className={`w-5 h-5 ${kycConfig.textColor} mr-3 animate-pulse`} />
              <div>
                <p className={`${kycConfig.textColor} font-medium`}>
                  KYC Status: {kycConfig.text}
                </p>
                <p className="text-gray-400 text-sm">
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
              className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 text-sm shadow-lg hover:shadow-xl`}
            >
              {kycConfig.action}
            </Link>
          </AnimatedCard>
        )}

        {/* Enhanced Stats with staggered animation */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isVisible = visibleStats.includes(index);
            return (
              <AnimatedCard
                key={stat.name}
                className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                delay={index * 150}
                hoverEffect="lift"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-white mt-2 group-hover:text-orange-400 transition-colors">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500 group-hover:text-${stat.color}-400`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1 group-hover:animate-bounce" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1 group-hover:animate-bounce" />
                  )}
                  <span className={`${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'} group-hover:font-semibold transition-all`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Enhanced Market Overview */}
        <AnimatedCard 
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 ${
            marketVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          delay={700}
          hoverEffect="glow"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400 flex items-center">
                {isRealTimeData ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-400 mr-2 animate-pulse" />
                    <span className="text-green-400">Live prices</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-yellow-400">Cached prices</span>
                  </>
                )}
              </span>
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'hover:scale-110'}`}
                title="Refresh prices"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <AnimatedButton
                variant="secondary"
                icon={BarChart3}
                size="sm"
                onClick={() => setShowMarketModal(true)}
              >
                View All
              </AnimatedButton>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" text="Loading market data..." />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top 4 Coins Preview */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <h3 className="text-sm font-medium text-gray-300">Top Performers (24h)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topCoins.map((coin, index) => (
                    <div 
                      key={coin.symbol} 
                      className={`flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer bg-gradient-to-r from-orange-500/5 to-transparent ${
                        marketVisible ? 'animate-slideInFromLeft' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                      onClick={() => setShowMarketModal(true)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-5 h-5 bg-orange-500 text-white rounded-full text-xs font-bold">
                          {index + 1}
                        </div>
                        <CryptoLogo 
                          symbol={coin.symbol} 
                          size={32} 
                          className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" 
                        />
                        <div>
                          <p className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">
                            {coin.symbol}
                          </p>
                          <p className="text-xs text-gray-400">${coin.priceUSD.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">
                          ₦{coin.priceNGN.toLocaleString()}
                        </p>
                        <div className="flex items-center text-xs">
                          {coin.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-400 mr-1 group-hover:animate-bounce" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400 mr-1 group-hover:animate-bounce" />
                          )}
                          <span className={`${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'} group-hover:font-semibold transition-all font-bold`}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <div className="flex justify-center pt-4 border-t border-gray-700">
                <AnimatedButton
                  variant="primary"
                  icon={Eye}
                  onClick={() => setShowMarketModal(true)}
                  className="w-full max-w-xs"
                >
                  View All {Object.keys(prices).length} Coins
                </AnimatedButton>
              </div>
            </div>
          )}
        </AnimatedCard>

        {/* Enhanced Quick Actions with staggered animation */}
        <div ref={actionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Buy Crypto',
              description: 'Purchase with NGN',
              href: '/buy',
              icon: ArrowDownRight,
              gradient: 'from-green-500 to-green-600',
              hoverGradient: 'hover:from-green-600 hover:to-green-700'
            },
            {
              title: 'Sell Crypto',
              description: 'Convert to NGN',
              href: '/sell',
              icon: ArrowUpRight,
              gradient: 'from-orange-500 to-orange-600',
              hoverGradient: 'hover:from-orange-600 hover:to-orange-700'
            },
            {
              title: 'Transactions',
              description: 'View history',
              href: '/transactions',
              icon: Activity,
              gradient: 'from-purple-500 to-purple-600',
              hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
            },
            {
              title: 'Referrals',
              description: 'Earn rewards',
              href: '/referrals',
              icon: TrendingUp,
              gradient: 'from-blue-500 to-blue-600',
              hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
            }
          ].map((action, index) => {
            const Icon = action.icon;
            const isVisible = visibleActions.includes(index);
            return (
              <Link
                key={action.title}
                to={action.href}
                className={`bg-gradient-to-r ${action.gradient} ${action.hoverGradient} rounded-lg p-6 transition-all duration-500 transform group cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                } hover:scale-105 hover:shadow-2xl`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-white/80 mt-1 group-hover:text-white transition-colors">
                      {action.description}
                    </p>
                  </div>
                  <Icon className="w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
              </Link>
            );
          })}
        </div>

        {/* Market Preview Modal */}
        <MarketPreviewModal 
          isOpen={showMarketModal}
          onClose={() => setShowMarketModal(false)}
        />
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

export default Dashboard;