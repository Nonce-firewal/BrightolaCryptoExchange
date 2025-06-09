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
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getAllActiveTokens } = useAdmin();
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const [usdToNgnRate, setUsdToNgnRate] = useState(1650); // Default rate
  const [buyMargin, setBuyMargin] = useState(2); // 2% buy margin
  const [sellMargin, setSellMargin] = useState(2); // 2% sell margin
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      
      // Get all active tokens from admin context
      const activeTokens = getAllActiveTokens();
      
      // Convert to pricing format
      const pricesData: Record<string, CoinPrice> = {};
      
      activeTokens.forEach(token => {
        pricesData[token.symbol] = {
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

      setPrices(pricesData);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [getAllActiveTokens]);

  const value: PricingContextType = {
    prices,
    usdToNgnRate,
    buyMargin,
    sellMargin,
    loading,
    refreshPrices: fetchPrices
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};