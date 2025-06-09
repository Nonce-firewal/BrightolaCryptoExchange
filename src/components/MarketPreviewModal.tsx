import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Zap, Eye } from 'lucide-react';
import { usePricing } from '../contexts/PricingContext';
import { CryptoLogo } from '../utils/cryptoLogos';
import AnimatedButton from './AnimatedButton';
import LoadingSpinner from './LoadingSpinner';

interface MarketPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarketPreviewModal: React.FC<MarketPreviewModalProps> = ({ isOpen, onClose }) => {
  const { prices, loading, refreshPrices } = usePricing();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshPrices();
    } catch (error) {
      console.error("Error refreshing prices:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Sort coins by 24h price change (highest first)
  const sortedCoins = Object.values(prices).sort((a, b) => b.change24h - a.change24h);
  
  // Get top 4 coins for preview
  const topCoins = sortedCoins.slice(0, 4);
  
  // Get remaining coins for expanded view
  const remainingCoins = sortedCoins.slice(4);

  const CoinRow: React.FC<{ coin: any; index: number; isTopCoin?: boolean }> = ({ 
    coin, 
    index, 
    isTopCoin = false 
  }) => (
    <div 
      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:bg-gray-700/50 group cursor-pointer ${
        isTopCoin ? 'bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20' : 'bg-gray-900'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center space-x-4">
        {isTopCoin && (
          <div className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold">
            {index + 1}
          </div>
        )}
        <CryptoLogo 
          symbol={coin.symbol} 
          size={isTopCoin ? 44 : 40} 
          className="group-hover:scale-110 transition-transform duration-300" 
        />
        <div>
          <p className={`font-semibold text-white group-hover:text-orange-400 transition-colors ${
            isTopCoin ? 'text-lg' : 'text-base'
          }`}>
            {coin.symbol}
          </p>
          <p className="text-sm text-gray-400">${coin.priceUSD.toLocaleString()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold text-white group-hover:text-orange-400 transition-colors ${
          isTopCoin ? 'text-lg' : 'text-base'
        }`}>
          ₦{coin.priceNGN.toLocaleString()}
        </p>
        <div className="flex items-center text-sm">
          {coin.change24h >= 0 ? (
            <TrendingUp className="w-3 h-3 text-green-400 mr-1 group-hover:animate-bounce" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-400 mr-1 group-hover:animate-bounce" />
          )}
          <span className={`${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'} group-hover:font-semibold transition-all ${
            isTopCoin ? 'font-bold' : ''
          }`}>
            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-gray-700 animate-fadeInScale max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Market Overview</h3>
              <p className="text-gray-400 text-sm">Live cryptocurrency prices and 24h changes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-300 ${
                isRefreshing ? 'animate-spin' : 'hover:scale-110'
              }`}
              title="Refresh prices"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" text="Loading market data..." />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top Performers Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <h4 className="text-lg font-semibold text-white">Top Performers (24h)</h4>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live prices</span>
                </div>
              </div>

              {/* Top 4 Coins */}
              <div className="space-y-3">
                {topCoins.map((coin, index) => (
                  <CoinRow 
                    key={coin.symbol} 
                    coin={coin} 
                    index={index} 
                    isTopCoin={true}
                  />
                ))}
              </div>

              {/* Expand/Collapse Button */}
              {remainingCoins.length > 0 && (
                <div className="flex justify-center pt-4">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setIsExpanded(!isExpanded)}
                    icon={isExpanded ? ChevronUp : ChevronDown}
                    className="w-full max-w-xs"
                  >
                    {isExpanded 
                      ? `Show Less` 
                      : `Show ${remainingCoins.length} More Coins`
                    }
                  </AnimatedButton>
                </div>
              )}

              {/* Expanded Coins List */}
              {isExpanded && remainingCoins.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-700 animate-slideDown">
                  <div className="flex items-center space-x-2 mb-4">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <h5 className="text-base font-medium text-white">All Available Coins</h5>
                  </div>
                  {remainingCoins.map((coin, index) => (
                    <CoinRow 
                      key={coin.symbol} 
                      coin={coin} 
                      index={index + 4} 
                      isTopCoin={false}
                    />
                  ))}
                </div>
              )}

              {/* Market Summary */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {sortedCoins.filter(c => c.change24h > 0).length}
                    </div>
                    <div className="text-sm text-gray-400">Gainers</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {sortedCoins.filter(c => c.change24h < 0).length}
                    </div>
                    <div className="text-sm text-gray-400">Losers</div>
                  </div>
                </div>
                
                {/* Last Updated Info */}
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-400">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MarketPreviewModal;