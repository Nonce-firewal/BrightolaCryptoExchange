import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReferralEarning {
  id: string;
  fromUserId: string;
  fromUserName: string;
  transactionCount: number; // Track number of transactions by referred user
  bonusAmount: number; // Fixed ₦1,000 bonus
  status: 'pending' | 'qualified' | 'paid';
  referredAt: string; // When user was referred
  qualifiedAt?: string; // When user completed 3rd transaction
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
  qualifiedReferrals: number; // Users who completed 3+ transactions
  pendingReferrals: number; // Users with 1-2 transactions
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
    totalEarnings: 8000, // 8 qualified referrals × ₦1,000
    availableBalance: 6000, // 6 × ₦1,000 (qualified and confirmed)
    pendingBalance: 2000,   // 2 × ₦1,000 (qualified but pending confirmation)
    totalWithdrawn: 0,
    totalReferrals: 12, // Total users referred
    qualifiedReferrals: 8, // Users who completed 3+ transactions
    pendingReferrals: 4, // Users with 1-2 transactions
    currentTier: 2,
    nextTierProgress: 60
  });

  const [earnings, setEarnings] = useState<ReferralEarning[]>([
    {
      id: 'earn_001',
      fromUserId: 'user_001',
      fromUserName: 'John Doe',
      transactionCount: 5,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-10T10:00:00Z',
      qualifiedAt: '2024-01-15T10:45:00Z',
      paidAt: '2024-01-15T11:00:00Z'
    },
    {
      id: 'earn_002',
      fromUserId: 'user_002',
      fromUserName: 'Jane Smith',
      transactionCount: 3,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-12T14:00:00Z',
      qualifiedAt: '2024-01-15T14:20:00Z'
    },
    {
      id: 'earn_003',
      fromUserId: 'user_003',
      fromUserName: 'Mike Johnson',
      transactionCount: 4,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-13T09:00:00Z',
      qualifiedAt: '2024-01-15T09:20:00Z',
      paidAt: '2024-01-15T09:30:00Z'
    },
    {
      id: 'earn_004',
      fromUserId: 'user_004',
      fromUserName: 'Sarah Wilson',
      transactionCount: 2,
      bonusAmount: 1000,
      status: 'pending',
      referredAt: '2024-01-14T16:00:00Z'
    },
    {
      id: 'earn_005',
      fromUserId: 'user_005',
      fromUserName: 'David Brown',
      transactionCount: 1,
      bonusAmount: 1000,
      status: 'pending',
      referredAt: '2024-01-15T11:00:00Z'
    },
    {
      id: 'earn_006',
      fromUserId: 'user_006',
      fromUserName: 'Lisa Garcia',
      transactionCount: 6,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-08T08:00:00Z',
      qualifiedAt: '2024-01-12T15:30:00Z',
      paidAt: '2024-01-12T16:00:00Z'
    },
    {
      id: 'earn_007',
      fromUserId: 'user_007',
      fromUserName: 'Ahmed Hassan',
      transactionCount: 3,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-09T12:00:00Z',
      qualifiedAt: '2024-01-14T10:15:00Z'
    },
    {
      id: 'earn_008',
      fromUserId: 'user_008',
      fromUserName: 'Grace Okafor',
      transactionCount: 7,
      bonusAmount: 1000,
      status: 'qualified',
      referredAt: '2024-01-07T15:00:00Z',
      qualifiedAt: '2024-01-11T09:45:00Z',
      paidAt: '2024-01-11T10:00:00Z'
    }
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);

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
    
    // Recalculate stats based on current earnings
    const qualifiedEarnings = earnings.filter(e => e.status === 'qualified');
    const paidEarnings = earnings.filter(e => e.status === 'qualified' && e.paidAt);
    const pendingQualifiedEarnings = earnings.filter(e => e.status === 'qualified' && !e.paidAt);
    
    setStats(prev => ({
      ...prev,
      totalEarnings: qualifiedEarnings.length * 1000,
      availableBalance: paidEarnings.length * 1000,
      pendingBalance: pendingQualifiedEarnings.length * 1000,
      qualifiedReferrals: qualifiedEarnings.length,
      pendingReferrals: earnings.filter(e => e.status === 'pending').length
    }));
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