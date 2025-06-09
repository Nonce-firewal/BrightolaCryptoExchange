import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

interface CoinPrice {
  symbol: string;
  priceUSD: number;
  priceNGN: number;
  change24h: number;
  buyEnabled?: boolean;
  sellEnabled?: boolean;
  buyMargin?: number;
  sellMargin?: number;
  minAmount?: number;
  maxAmount?: number;
}

interface PricingContextType {
  prices: Record<string, CoinPrice>;
  usdToNgnRate: number;
  buyMargin: number;
  sellMargin: number;
  loading: boolean;
  refreshPrices: () => Promise<void>;
  lastUpdated: Date | null;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

// Cryptocurrency symbol mapping for API calls
const CRYPTO_SYMBOL_MAP: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'SOL': 'solana',
  'BNB': 'binancecoin',
  'ADA': 'cardano',
  'MATIC': 'matic-network',
  'SHIB': 'shiba-inu',
  'PEPE': 'pepe',
  'DOGE': 'dogecoin',
  'XRP': 'ripple',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'LTC': 'litecoin'
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getAllActiveTokens } = useAdmin();
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const [usdToNgnRate, setUsdToNgnRate] = useState(1650); // Default rate
  const [buyMargin, setBuyMargin] = useState(2); // 2% buy margin
  const [sellMargin, setSellMargin] = useState(2); // 2% sell margin
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchUSDToNGNRate = async (): Promise<number> => {
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      return data.rates.NGN || 1650; // Fallback to default rate
    } catch (error) {
      console.warn('Failed to fetch USD to NGN rate, using default:', error);
      return 1650; // Default fallback rate
    }
  };

  const fetchCryptoPrices = async (symbols: string[]): Promise<Record<string, any>> => {
    try {
      // Map symbols to CoinGecko IDs
      const coinIds = symbols
        .map(symbol => CRYPTO_SYMBOL_MAP[symbol])
        .filter(Boolean)
        .join(',');

      if (!coinIds) {
        throw new Error('No valid coin IDs found');
      }

      // Using CoinGecko free API
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Failed to fetch crypto prices from CoinGecko:', error);
      
      // Fallback to mock data if API fails
      return generateFallbackPrices(symbols);
    }
  };

  const generateFallbackPrices = (symbols: string[]): Record<string, any> => {
    const fallbackPrices: Record<string, any> = {
      'bitcoin': { usd: 45000, usd_24h_change: 2.5 },
      'ethereum': { usd: 3200, usd_24h_change: -1.2 },
      'tether': { usd: 1, usd_24h_change: 0.1 },
      'solana': { usd: 120, usd_24h_change: 5.8 },
      'binancecoin': { usd: 350, usd_24h_change: 3.2 },
      'cardano': { usd: 0.45, usd_24h_change: -2.1 },
      'matic-network': { usd: 0.85, usd_24h_change: 3.7 },
      'shiba-inu': { usd: 0.000008, usd_24h_change: 5.2 },
      'pepe': { usd: 0.000001, usd_24h_change: -2.1 },
      'dogecoin': { usd: 0.08, usd_24h_change: 4.3 },
      'ripple': { usd: 0.52, usd_24h_change: 1.8 },
      'polkadot': { usd: 6.5, usd_24h_change: -0.5 },
      'avalanche-2': { usd: 28, usd_24h_change: 2.9 },
      'chainlink': { usd: 15, usd_24h_change: 1.2 },
      'uniswap': { usd: 7.5, usd_24h_change: -1.8 },
      'litecoin': { usd: 75, usd_24h_change: 0.9 }
    };

    return fallbackPrices;
  };

  const fetchPrices = async () => {
    try {
      setLoading(true);
      
      // Get all active tokens from admin context
      const activeTokens = getAllActiveTokens();
      const symbols = activeTokens.map(token => token.symbol);

      // Fetch USD to NGN rate and crypto prices in parallel
      const [ngnRate, cryptoData] = await Promise.all([
        fetchUSDToNGNRate(),
        fetchCryptoPrices(symbols)
      ]);

      setUsdToNgnRate(ngnRate);

      // Convert to pricing format
      const pricesData: Record<string, CoinPrice> = {};
      
      activeTokens.forEach(token => {
        const coinId = CRYPTO_SYMBOL_MAP[token.symbol];
        const coinData = cryptoData[coinId];
        
        let priceUSD = token.priceUSD; // Fallback to admin-set price
        let change24h = token.change24h; // Fallback to admin-set change
        
        if (coinData) {
          priceUSD = coinData.usd || priceUSD;
          change24h = coinData.usd_24h_change || change24h;
        }

        const priceNGN = priceUSD * ngnRate;

        pricesData[token.symbol] = {
          symbol: token.symbol,
          priceUSD: priceUSD,
          priceNGN: priceNGN,
          change24h: change24h,
          buyEnabled: 'buyEnabled' in token ? token.buyEnabled : true,
          sellEnabled: 'sellEnabled' in token ? token.sellEnabled : true,
          buyMargin: 'buyMargin' in token ? token.buyMargin : 2.0,
          sellMargin: 'sellMargin' in token ? token.sellMargin : 2.0,
          minAmount: 'minAmount' in token ? token.minAmount : 0.001,
          maxAmount: 'maxAmount' in token ? token.maxAmount : 100
        };
      });

      setPrices(pricesData);
      setLastUpdated(new Date());
      
      console.log('Prices updated successfully:', {
        symbolCount: symbols.length,
        ngnRate,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      
      // Fallback to admin-configured prices if API completely fails
      const activeTokens = getAllActiveTokens();
      const fallbackPrices: Record<string, CoinPrice> = {};
      
      activeTokens.forEach(token => {
        fallbackPrices[token.symbol] = {
          symbol: token.symbol,
          priceUSD: token.priceUSD,
          priceNGN: token.priceNGN,
          change24h: token.change24h,
          buyEnabled: 'buyEnabled' in token ? token.buyEnabled : true,
          sellEnabled: 'sellEnabled' in token ? token.sellEnabled : true,
          buyMargin: 'buyMargin' in token ? token.buyMargin : 2.0,
          sellMargin: 'sellMargin' in token ? token.sellMargin : 2.0,
          minAmount: 'minAmount' in token ? token.minAmount : 0.001,
          maxAmount: 'maxAmount' in token ? token.maxAmount : 100
        };
      });
      
      setPrices(fallbackPrices);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPrices();
    
    // Set up interval to refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [getAllActiveTokens]);

  // Refresh prices when active tokens change
  useEffect(() => {
    if (!loading) {
      fetchPrices();
    }
  }, [getAllActiveTokens]);

  const value: PricingContextType = {
    prices,
    usdToNgnRate,
    buyMargin,
    sellMargin,
    loading,
    refreshPrices: fetchPrices,
    lastUpdated
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};