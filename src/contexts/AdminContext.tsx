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

interface AdminSettings {
  bankAccounts: BankAccount[];
  walletAddresses: WalletAddress[];
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
  updateTradingSettings: (settings: AdminSettings['tradingSettings']) => void;
  updateKYCSettings: (settings: AdminSettings['kycSettings']) => void;
  getActiveBankAccounts: () => BankAccount[];
  getActiveWalletAddress: (crypto: string, network?: string) => WalletAddress | null;
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

  const value: AdminContextType = {
    settings,
    updateBankAccount,
    addBankAccount,
    deleteBankAccount,
    updateWalletAddress,
    addWalletAddress,
    deleteWalletAddress,
    updateTradingSettings,
    updateKYCSettings,
    getActiveBankAccounts,
    getActiveWalletAddress
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};