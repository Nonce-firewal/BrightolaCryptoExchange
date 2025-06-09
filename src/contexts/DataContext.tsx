import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'buy' | 'sell';
  cryptocurrency: string;
  amount: number;
  amountNGN: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

interface KYCSubmission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  documents: {
    idType: string;
    idNumber: string;
    selfie: boolean;
    proofOfAddress: boolean;
  };
  rejectionReason?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: 'not-submitted' | 'pending' | 'approved' | 'rejected';
  registeredAt: string;
  lastLogin: string;
  totalTransactions: number;
  totalVolume: number;
  referralCode: string;
  referredBy?: string;
}

interface DataContextType {
  transactions: Transaction[];
  kycSubmissions: KYCSubmission[];
  users: User[];
  stats: {
    totalUsers: number;
    totalVolume: number;
    totalRevenue: number;
    activeTransactions: number;
    pendingKYC: number;
    approvedKYC: number;
  };
  refreshData: () => Promise<void>;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
  updateKYCStatus: (id: string, status: KYCSubmission['status'], reason?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVolume: 0,
    totalRevenue: 0,
    activeTransactions: 0,
    pendingKYC: 0,
    approvedKYC: 0
  });

  const generateMockData = () => {
    // Mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: 'tx_001',
        userId: 'user_001',
        userName: 'John Doe',
        type: 'buy',
        cryptocurrency: 'BTC',
        amount: 0.5,
        amountNGN: 37500000,
        status: 'completed',
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T10:45:00Z'
      },
      {
        id: 'tx_002',
        userId: 'user_002',
        userName: 'Jane Smith',
        type: 'sell',
        cryptocurrency: 'ETH',
        amount: 2.0,
        amountNGN: 10560000,
        status: 'pending',
        createdAt: '2024-01-15T14:20:00Z'
      },
      {
        id: 'tx_003',
        userId: 'user_003',
        userName: 'Mike Johnson',
        type: 'buy',
        cryptocurrency: 'USDT',
        amount: 1000,
        amountNGN: 1650000,
        status: 'completed',
        createdAt: '2024-01-15T09:15:00Z',
        completedAt: '2024-01-15T09:20:00Z'
      }
    ];

    // Mock KYC submissions
    const mockKYC: KYCSubmission[] = [
      {
        id: 'kyc_001',
        userId: 'user_004',
        userName: 'Sarah Wilson',
        userEmail: 'sarah@example.com',
        status: 'pending',
        submittedAt: '2024-01-15T08:00:00Z',
        documents: {
          idType: 'NIN',
          idNumber: '12345678901',
          selfie: true,
          proofOfAddress: true
        }
      },
      {
        id: 'kyc_002',
        userId: 'user_005',
        userName: 'David Brown',
        userEmail: 'david@example.com',
        status: 'approved',
        submittedAt: '2024-01-14T16:30:00Z',
        reviewedAt: '2024-01-15T09:00:00Z',
        documents: {
          idType: 'Passport',
          idNumber: 'A12345678',
          selfie: true,
          proofOfAddress: true
        }
      }
    ];

    // Mock users
    const mockUsers: User[] = [
      {
        id: 'user_001',
        name: 'John Doe',
        email: 'john@example.com',
        kycStatus: 'approved',
        registeredAt: '2024-01-10T12:00:00Z',
        lastLogin: '2024-01-15T10:30:00Z',
        totalTransactions: 5,
        totalVolume: 50000000,
        referralCode: 'REF001'
      },
      {
        id: 'user_002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        kycStatus: 'approved',
        registeredAt: '2024-01-12T14:00:00Z',
        lastLogin: '2024-01-15T14:20:00Z',
        totalTransactions: 3,
        totalVolume: 25000000,
        referralCode: 'REF002'
      }
    ];

    setTransactions(mockTransactions);
    setKycSubmissions(mockKYC);
    setUsers(mockUsers);

    // Calculate stats
    setStats({
      totalUsers: mockUsers.length,
      totalVolume: mockTransactions.reduce((sum, tx) => sum + tx.amountNGN, 0),
      totalRevenue: mockTransactions.reduce((sum, tx) => sum + (tx.amountNGN * 0.02), 0), // 2% fee
      activeTransactions: mockTransactions.filter(tx => tx.status === 'pending').length,
      pendingKYC: mockKYC.filter(kyc => kyc.status === 'pending').length,
      approvedKYC: mockKYC.filter(kyc => kyc.status === 'approved').length
    });
  };

  useEffect(() => {
    generateMockData();
  }, []);

  const refreshData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    generateMockData();
  };

  const updateTransactionStatus = (id: string, status: Transaction['status']) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id 
        ? { ...tx, status, completedAt: status === 'completed' ? new Date().toISOString() : undefined }
        : tx
    ));
  };

  const updateKYCStatus = (id: string, status: KYCSubmission['status'], reason?: string) => {
    setKycSubmissions(prev => prev.map(kyc => 
      kyc.id === id 
        ? { 
            ...kyc, 
            status, 
            reviewedAt: new Date().toISOString(),
            rejectionReason: status === 'rejected' ? reason : undefined
          }
        : kyc
    ));
  };

  const value: DataContextType = {
    transactions,
    kycSubmissions,
    users,
    stats,
    refreshData,
    updateTransactionStatus,
    updateKYCStatus
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};