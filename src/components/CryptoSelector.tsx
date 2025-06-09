import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { usePricing } from '../contexts/PricingContext';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Coins,
  Network,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface CryptoSelectorProps {
  selectedCrypto: string;
  onSelect: (crypto: string) => void;
  type: 'buy' | 'sell';
  showNetworks?: boolean;
  selectedNetwork?: string;
  onNetworkSelect?: (network: string) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedCrypto,
  onSelect,
  type,
  showNetworks = false,
  selectedNetwork,
  onNetworkSelect
}) => {
  const { getAllActiveTokens, getAvailableNetworksForCrypto, getActiveWalletAddress } = useAdmin();
  const { prices } = usePricing();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const allTokens = getAllActiveTokens();
  const availableNetworks = selectedCrypto ? getAvailableNetworksForCrypto(selectedCrypto) : [];

  // Filter tokens based on type and search
  const filteredTokens = allTokens.filter(token => {
    const matchesSearch = token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const hasWallet = getActiveWalletAddress(token.symbol);
    const isEnabled = type === 'buy' 
      ? ('buyEnabled' in token ? token.buyEnabled : true)
      : ('sellEnabled' in token ? token.sellEnabled : true);
    
    return matchesSearch && hasWallet && isEnabled;
  });

  // Popular tokens (you can customize this list)
  const popularTokens = ['BTC', 'ETH', 'USDT', 'SOL'];

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
            showFavorites
              ? 'border-orange-500 bg-orange-500/20 text-orange-400'
              : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
          }`}
        >
          <Star className="w-4 h-4" />
        </button>
      </div>

      {/* Popular Tokens */}
      {!searchTerm && (
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Popular</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularTokens.map((symbol) => {
              const token = allTokens.find(t => t.symbol === symbol);
              if (!token) return null;
              
              const hasWallet = getActiveWalletAddress(symbol);
              const isEnabled = type === 'buy' 
                ? ('buyEnabled' in token ? token.buyEnabled : true)
                : ('sellEnabled' in token ? token.sellEnabled : true);
              
              if (!hasWallet || !isEnabled) return null;

              const price = prices[symbol];
              
              return (
                <button
                  key={symbol}
                  onClick={() => onSelect(symbol)}
                  className={`p-3 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                    selectedCrypto === symbol
                      ? 'border-orange-500 bg-orange-500/20'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-xs">{symbol.substring(0, 2)}</span>
                  </div>
                  <div className="text-white font-medium text-sm">{symbol}</div>
                  {price && (
                    <div className="text-gray-400 text-xs">₦{price.priceNGN.toLocaleString()}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Tokens */}
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
          <Coins className="w-4 h-4 mr-2" />
          {searchTerm ? 'Search Results' : 'All Cryptocurrencies'}
          <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
            {filteredTokens.length}
          </span>
        </h4>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredTokens.map((token) => {
            const price = prices[token.symbol];
            const hasWallet = getActiveWalletAddress(token.symbol);
            
            return (
              <button
                key={token.symbol}
                onClick={() => onSelect(token.symbol)}
                className={`w-full p-3 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedCrypto === token.symbol
                    ? 'border-orange-500 bg-orange-500/20'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{token.symbol.substring(0, 2)}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-gray-400 text-sm">{token.name}</div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Network className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400">{token.network}</span>
                        {hasWallet ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {price && (
                      <>
                        <div className="text-white font-medium">₦{price.priceNGN.toLocaleString()}</div>
                        <div className="flex items-center text-sm">
                          {price.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                          )}
                          <span className={price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {price.change24h >= 0 ? '+' : ''}{price.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Network Selection */}
      {showNetworks && selectedCrypto && availableNetworks.length > 1 && (
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
            <Network className="w-4 h-4 mr-2" />
            Available Networks for {selectedCrypto}
          </h4>
          <div className="space-y-2">
            {availableNetworks.map((network) => {
              const wallet = getActiveWalletAddress(selectedCrypto, network);
              return (
                <button
                  key={network}
                  onClick={() => onNetworkSelect?.(network)}
                  disabled={!wallet}
                  className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                    selectedNetwork === network
                      ? 'border-blue-500 bg-blue-500/20'
                      : wallet
                      ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                      : 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Network className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">{network}</span>
                    </div>
                    {wallet ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {filteredTokens.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Coins className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No cryptocurrencies found</h3>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default CryptoSelector;