import React, { createContext, useContext, useState, useEffect } from 'react';

interface CoinPrice {
  symbol: string;
  priceUSD: number;
  priceNGN: number;
  change24h: number;
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
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const [usdToNgnRate, setUsdToNgnRate] = useState(1650); // Default rate
  const [buyMargin, setBuyMargin] = useState(2); // 2% buy margin
  const [sellMargin, setSellMargin] = useState(2); // 2% sell margin
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real implementation, use CoinMarketCap API
      const mockPrices = {
        BTC: {
          symbol: 'BTC',
          priceUSD: 45000,
          priceNGN: 45000 * usdToNgnRate,
          change24h: 2.5
        },
        ETH: {
          symbol: 'ETH',
          priceUSD: 3200,
          priceNGN: 3200 * usdToNgnRate,
          change24h: -1.2
        },
        USDT: {
          symbol: 'USDT',
          priceUSD: 1,
          priceNGN: 1 * usdToNgnRate,
          change24h: 0.1
        },
        SOL: {
          symbol: 'SOL',
          priceUSD: 120,
          priceNGN: 120 * usdToNgnRate,
          change24h: 5.8
        }
      };

      setPrices(mockPrices);
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
  }, [usdToNgnRate]);

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