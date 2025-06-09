import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReferralEarning {
  id: string;
  fromUserId: string;
  fromUserName: string;
  transactionId: string;
  cryptocurrency: string;
  transactionAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'confirmed' | 'paid';
  earnedAt: string;
  paidAt?: string;
}

interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  requestedAt: string;
  processedAt?: string;
  adminNotes?: string;
  rejectionReason?: string;
  referenceNumber: string;
}

interface ReferralStats {
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  totalWithdrawn: number;
  totalReferrals: number;
  activeReferrals: number;
  currentTier: number;
  nextTierProgress: number;
}

interface ReferralContextType {
  stats: ReferralStats;
  earnings: ReferralEarning[];
  withdrawalRequests: WithdrawalRequest[];
  requestWithdrawal: (amount: number, bankDetails: WithdrawalRequest['bankDetails']) => Promise<boolean>;
  getWithdrawalHistory: () => WithdrawalRequest[];
  refreshData: () => Promise<void>;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
};

export const ReferralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<ReferralStats>({
    totalEarnings: 125000,
    availableBalance: 85000, // Available for withdrawal
    pendingBalance: 25000,   // Pending confirmation
    totalWithdrawn: 15000,   // Already withdrawn
    totalReferrals: 12,
    activeReferrals: 8,
    currentTier: 2,
    nextTierProgress: 60
  });

  const [earnings, setEarnings] = useState<ReferralEarning[]>([
    {
      id: 'earn_001',
      fromUserId: 'user_001',
      fromUserName: 'John Doe',
      transactionId: 'TXN001',
      cryptocurrency: 'BTC',
      transactionAmount: 37500000,
      commissionRate: 15,
      commissionAmount: 5625000,
      status: 'confirmed',
      earnedAt: '2024-01-15T10:45:00Z',
      paidAt: '2024-01-15T11:00:00Z'
    },
    {
      id: 'earn_002',
      fromUserId: 'user_002',
      fromUserName: 'Jane Smith',
      transactionId: 'TXN002',
      cryptocurrency: 'ETH',
      transactionAmount: 10560000,
      commissionRate: 15,
      commissionAmount: 1584000,
      status: 'pending',
      earnedAt: '2024-01-15T14:20:00Z'
    },
    {
      id: 'earn_003',
      fromUserId: 'user_003',
      fromUserName: 'Mike Johnson',
      transactionId: 'TXN003',
      cryptocurrency: 'USDT',
      transactionAmount: 1650000,
      commissionRate: 15,
      commissionAmount: 247500,
      status: 'confirmed',
      earnedAt: '2024-01-15T09:20:00Z',
      paidAt: '2024-01-15T09:30:00Z'
    }
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([
    {
      id: 'WDR001',
      userId: 'current_user',
      userName: 'Current User',
      userEmail: 'user@example.com',
      amount: 15000,
      bankDetails: {
        accountName: 'Current User',
        accountNumber: '1234567890',
        bankName: 'First Bank'
      },
      status: 'paid',
      requestedAt: '2024-01-10T10:00:00Z',
      processedAt: '2024-01-10T15:30:00Z',
      adminNotes: 'Processed successfully',
      referenceNumber: 'REF001WDR240110'
    }
  ]);

  const requestWithdrawal = async (amount: number, bankDetails: WithdrawalRequest['bankDetails']): Promise<boolean> => {
    // Validate minimum withdrawal amount
    if (amount < 2000) {
      throw new Error('Minimum withdrawal amount is ₦2,000');
    }

    // Check available balance
    if (amount > stats.availableBalance) {
      throw new Error('Insufficient available balance');
    }

    // Create withdrawal request
    const newRequest: WithdrawalRequest = {
      id: `WDR${Date.now()}`,
      userId: 'current_user',
      userName: 'Current User',
      userEmail: 'user@example.com',
      amount,
      bankDetails,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      referenceNumber: `REF${Date.now()}WDR${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setWithdrawalRequests(prev => [newRequest, ...prev]);
    
    // Update available balance
    setStats(prev => ({
      ...prev,
      availableBalance: prev.availableBalance - amount
    }));

    return true;
  };

  const getWithdrawalHistory = () => {
    return withdrawalRequests.filter(req => req.userId === 'current_user');
  };

  const refreshData = async () => {
    // Simulate API call to refresh data
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Data would be refreshed from API
  };

  const value: ReferralContextType = {
    stats,
    earnings,
    withdrawalRequests,
    requestWithdrawal,
    getWithdrawalHistory,
    refreshData
  };

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
};