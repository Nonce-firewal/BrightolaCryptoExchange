import React, { createContext, useContext, useState, useEffect } from 'react';

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isActive: boolean;
  createdAt: string;
}

interface WalletAddress {
  id: string;
  cryptocurrency: string;
  network: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

interface CustomToken {
  id: string;
  symbol: string;
  name: string;
  contractAddress: string;
  network: string;
  decimals: number;
  isActive: boolean;
  buyEnabled: boolean;
  sellEnabled: boolean;
  buyMargin: number;
  sellMargin: number;
  minAmount: number;
  maxAmount: number;
  priceUSD: number;
  priceNGN: number;
  change24h: number;
  createdAt: string;
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
  network: string;
  buyEnabled: boolean;
  sellEnabled: boolean;
  buyMargin: number;
  sellMargin: number;
  minAmount: number;
  maxAmount: number;
  status: 'active' | 'inactive';
  priceUSD: number;
  priceNGN: number;
  change24h: number;
}

interface AdminSettings {
  bankAccounts: BankAccount[];
  walletAddresses: WalletAddress[];
  customTokens: CustomToken[];
  supportedCoins: Coin[];
  tradingSettings: {
    buyEnabled: boolean;
    sellEnabled: boolean;
    minBuyAmount: number;
    maxBuyAmount: number;
    minSellAmount: number;
    maxSellAmount: number;
    buyMargin: number;
    sellMargin: number;
  };
  kycSettings: {
    autoApproval: boolean;
    requiredDocuments: string[];
    verificationTimeout: number;
  };
}

interface AdminContextType {
  settings: AdminSettings;
  updateBankAccount: (account: BankAccount) => void;
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt'>) => void;
  deleteBankAccount: (id: string) => void;
  updateWalletAddress: (wallet: WalletAddress) => void;
  addWalletAddress: (wallet: Omit<WalletAddress, 'id' | 'createdAt'>) => void;
  deleteWalletAddress: (id: string) => void;
  updateCustomToken: (token: CustomToken) => void;
  addCustomToken: (token: Omit<CustomToken, 'id' | 'createdAt'>) => void;
  deleteCustomToken: (id: string) => void;
  updateCoin: (coin: Coin) => void;
  addCoin: (coin: Omit<Coin, 'id'>) => void;
  deleteCoin: (id: string) => void;
  updateTradingSettings: (settings: AdminSettings['tradingSettings']) => void;
  updateKYCSettings: (settings: AdminSettings['kycSettings']) => void;
  getActiveBankAccounts: () => BankAccount[];
  getActiveWalletAddress: (crypto: string, network?: string) => WalletAddress | null;
  getActiveCoins: () => (Coin | CustomToken)[];
  getAllActiveTokens: () => (Coin | CustomToken)[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>({
    bankAccounts: [
      {
        id: 'bank_001',
        bankName: 'First Bank of Nigeria',
        accountName: 'Brightola Exchange Limited',
        accountNumber: '2034567890',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'bank_002',
        bankName: 'Guaranty Trust Bank',
        accountName: 'Brightola Exchange Limited',
        accountNumber: '0123456789',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'bank_003',
        bankName: 'Access Bank',
        accountName: 'Brightola Exchange Limited',
        accountNumber: '1234567890',
        isActive: false,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    walletAddresses: [
      {
        id: 'wallet_001',
        cryptocurrency: 'BTC',
        network: 'Bitcoin',
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'wallet_002',
        cryptocurrency: 'ETH',
        network: 'Ethereum',
        address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'wallet_003',
        cryptocurrency: 'USDT',
        network: 'Ethereum (ERC-20)',
        address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'wallet_004',
        cryptocurrency: 'USDT',
        network: 'Tron (TRC-20)',
        address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'wallet_005',
        cryptocurrency: 'SOL',
        network: 'Solana',
        address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    customTokens: [
      {
        id: 'token_001',
        symbol: 'SHIB',
        name: 'Shiba Inu',
        contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        network: 'Ethereum',
        decimals: 18,
        isActive: true,
        buyEnabled: true,
        sellEnabled: true,
        buyMargin: 3.0,
        sellMargin: 3.0,
        minAmount: 1000000,
        maxAmount: 1000000000,
        priceUSD: 0.000008,
        priceNGN: 0.0132,
        change24h: 5.2,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'token_002',
        symbol: 'PEPE',
        name: 'Pepe',
        contractAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
        network: 'Ethereum',
        decimals: 18,
        isActive: true,
        buyEnabled: true,
        sellEnabled: false,
        buyMargin: 4.0,
        sellMargin: 4.0,
        minAmount: 1000000,
        maxAmount: 10000000000,
        priceUSD: 0.000001,
        priceNGN: 0.00165,
        change24h: -2.1,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    supportedCoins: [
      {
        id: 'coin_001',
        symbol: 'BTC',
        name: 'Bitcoin',
        network: 'Bitcoin',
        buyEnabled: true,
        sellEnabled: true,
        buyMargin: 2.0,
        sellMargin: 2.0,
        minAmount: 0.001,
        maxAmount: 10,
        status: 'active',
        priceUSD: 45000,
        priceNGN: 74250000,
        change24h: 2.5
      },
      {
        id: 'coin_002',
        symbol: 'ETH',
        name: 'Ethereum',
        network: 'Ethereum',
        buyEnabled: true,
        sellEnabled: true,
        buyMargin: 1.5,
        sellMargin: 1.5,
        minAmount: 0.01,
        maxAmount: 100,
        status: 'active',
        priceUSD: 3200,
        priceNGN: 5280000,
        change24h: -1.2
      },
      {
        id: 'coin_003',
        symbol: 'USDT',
        name: 'Tether',
        network: 'Ethereum',
        buyEnabled: true,
        sellEnabled: true,
        buyMargin: 1.0,
        sellMargin: 1.0,
        minAmount: 10,
        maxAmount: 50000,
        status: 'active',
        priceUSD: 1,
        priceNGN: 1650,
        change24h: 0.1
      },
      {
        id: 'coin_004',
        symbol: 'SOL',
        name: 'Solana',
        network: 'Solana',
        buyEnabled: true,
        sellEnabled: true,
        buyMargin: 2.5,
        sellMargin: 2.5,
        minAmount: 0.1,
        maxAmount: 1000,
        status: 'active',
        priceUSD: 120,
        priceNGN: 198000,
        change24h: 5.8
      }
    ],
    tradingSettings: {
      buyEnabled: true,
      sellEnabled: true,
      minBuyAmount: 1000,
      maxBuyAmount: 10000000,
      minSellAmount: 0.001,
      maxSellAmount: 100,
      buyMargin: 2.0,
      sellMargin: 2.0
    },
    kycSettings: {
      autoApproval: false,
      requiredDocuments: ['id', 'selfie', 'address'],
      verificationTimeout: 48
    }
  });

  const updateBankAccount = (account: BankAccount) => {
    setSettings(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map(b => b.id === account.id ? account : b)
    }));
  };

  const addBankAccount = (account: Omit<BankAccount, 'id' | 'createdAt'>) => {
    const newAccount: BankAccount = {
      ...account,
      id: 'bank_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setSettings(prev => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, newAccount]
    }));
  };

  const deleteBankAccount = (id: string) => {
    setSettings(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter(b => b.id !== id)
    }));
  };

  const updateWalletAddress = (wallet: WalletAddress) => {
    setSettings(prev => ({
      ...prev,
      walletAddresses: prev.walletAddresses.map(w => w.id === wallet.id ? wallet : w)
    }));
  };

  const addWalletAddress = (wallet: Omit<WalletAddress, 'id' | 'createdAt'>) => {
    const newWallet: WalletAddress = {
      ...wallet,
      id: 'wallet_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setSettings(prev => ({
      ...prev,
      walletAddresses: [...prev.walletAddresses, newWallet]
    }));
  };

  const deleteWalletAddress = (id: string) => {
    setSettings(prev => ({
      ...prev,
      walletAddresses: prev.walletAddresses.filter(w => w.id !== id)
    }));
  };

  const updateCustomToken = (token: CustomToken) => {
    setSettings(prev => ({
      ...prev,
      customTokens: prev.customTokens.map(t => t.id === token.id ? token : t)
    }));
  };

  const addCustomToken = (token: Omit<CustomToken, 'id' | 'createdAt'>) => {
    const newToken: CustomToken = {
      ...token,
      id: 'token_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setSettings(prev => ({
      ...prev,
      customTokens: [...prev.customTokens, newToken]
    }));
  };

  const deleteCustomToken = (id: string) => {
    setSettings(prev => ({
      ...prev,
      customTokens: prev.customTokens.filter(t => t.id !== id)
    }));
  };

  const updateCoin = (coin: Coin) => {
    setSettings(prev => ({
      ...prev,
      supportedCoins: prev.supportedCoins.map(c => c.id === coin.id ? coin : c)
    }));
  };

  const addCoin = (coin: Omit<Coin, 'id'>) => {
    const newCoin: Coin = {
      ...coin,
      id: 'coin_' + Date.now()
    };
    setSettings(prev => ({
      ...prev,
      supportedCoins: [...prev.supportedCoins, newCoin]
    }));
  };

  const deleteCoin = (id: string) => {
    setSettings(prev => ({
      ...prev,
      supportedCoins: prev.supportedCoins.filter(c => c.id !== id)
    }));
  };

  const updateTradingSettings = (tradingSettings: AdminSettings['tradingSettings']) => {
    setSettings(prev => ({ ...prev, tradingSettings }));
  };

  const updateKYCSettings = (kycSettings: AdminSettings['kycSettings']) => {
    setSettings(prev => ({ ...prev, kycSettings }));
  };

  const getActiveBankAccounts = () => {
    return settings.bankAccounts.filter(account => account.isActive);
  };

  const getActiveWalletAddress = (crypto: string, network?: string) => {
    const wallets = settings.walletAddresses.filter(w => 
      w.cryptocurrency === crypto && w.isActive && (!network || w.network === network)
    );
    return wallets.length > 0 ? wallets[0] : null;
  };

  const getActiveCoins = () => {
    return settings.supportedCoins.filter(coin => coin.status === 'active');
  };

  const getAllActiveTokens = () => {
    const activeCoins = settings.supportedCoins.filter(coin => coin.status === 'active');
    const activeTokens = settings.customTokens.filter(token => token.isActive);
    return [...activeCoins, ...activeTokens];
  };

  const value: AdminContextType = {
    settings,
    updateBankAccount,
    addBankAccount,
    deleteBankAccount,
    updateWalletAddress,
    addWalletAddress,
    deleteWalletAddress,
    updateCustomToken,
    addCustomToken,
    deleteCustomToken,
    updateCoin,
    addCoin,
    deleteCoin,
    updateTradingSettings,
    updateKYCSettings,
    getActiveBankAccounts,
    getActiveWalletAddress,
    getActiveCoins,
    getAllActiveTokens
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};