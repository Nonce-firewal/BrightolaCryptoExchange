import React, { createContext, useContext, useState, useEffect } from 'react';

interface TransactionProof {
  paymentProof?: File | string;
  transactionReference?: string;
  customerNotes?: string;
  cryptoProof?: File | string;
  transactionHash?: string;
  walletAddress?: string;
  network?: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'buy' | 'sell';
  cryptocurrency: string;
  amount: number;
  amountNGN: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'awaiting_payment' | 'awaiting_crypto' | 'under_review';
  createdAt: string;
  completedAt?: string;
  paymentMethod?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  proof?: TransactionProof;
  adminNotes?: string;
  failureReason?: string;
  processingTime?: string;
  fee: number;
  rate: number;
  referenceNumber: string;
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
    underReview: number;
    awaitingPayment: number;
    awaitingCrypto: number;
  };
  refreshData: () => Promise<void>;
  updateTransactionStatus: (id: string, status: Transaction['status'], adminNotes?: string, failureReason?: string) => void;
  updateKYCStatus: (id: string, status: KYCSubmission['status'], reason?: string) => void;
  addTransactionProof: (id: string, proof: TransactionProof) => void;
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
    approvedKYC: 0,
    underReview: 0,
    awaitingPayment: 0,
    awaitingCrypto: 0
  });

  const generateMockData = () => {
    // Enhanced mock transactions with proof data
    const mockTransactions: Transaction[] = [
      {
        id: 'TXN001',
        userId: 'user_001',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        type: 'buy',
        cryptocurrency: 'BTC',
        amount: 0.5,
        amountNGN: 37500000,
        status: 'under_review',
        createdAt: '2024-01-15T10:30:00Z',
        paymentMethod: 'Bank Transfer',
        bankDetails: {
          accountName: 'Brightola Exchange Limited',
          accountNumber: '2034567890',
          bankName: 'First Bank of Nigeria'
        },
        proof: {
          paymentProof: 'payment_screenshot_001.jpg',
          transactionReference: 'TRF240115001234',
          customerNotes: 'First Bitcoin purchase, paid via mobile banking'
        },
        fee: 750000,
        rate: 75000000,
        referenceNumber: 'REF001BTC240115',
        processingTime: 'Under review'
      },
      {
        id: 'TXN002',
        userId: 'user_002',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        type: 'sell',
        cryptocurrency: 'ETH',
        amount: 2.0,
        amountNGN: 10560000,
        status: 'awaiting_crypto',
        createdAt: '2024-01-15T14:20:00Z',
        paymentMethod: 'Bank Transfer',
        bankDetails: {
          accountName: 'Jane Smith',
          accountNumber: '1234567890',
          bankName: 'GTBank'
        },
        proof: {
          cryptoProof: 'crypto_transfer_002.jpg',
          transactionHash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
          walletAddress: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
          network: 'Ethereum',
          customerNotes: 'Urgent sale for emergency'
        },
        fee: 211200,
        rate: 5280000,
        referenceNumber: 'REF002ETH240115',
        processingTime: 'Awaiting crypto confirmation'
      },
      {
        id: 'TXN003',
        userId: 'user_003',
        userName: 'Mike Johnson',
        userEmail: 'mike@example.com',
        type: 'buy',
        cryptocurrency: 'USDT',
        amount: 1000,
        amountNGN: 1650000,
        status: 'completed',
        createdAt: '2024-01-15T09:15:00Z',
        completedAt: '2024-01-15T09:20:00Z',
        paymentMethod: 'Bank Transfer',
        bankDetails: {
          accountName: 'Brightola Exchange Limited',
          accountNumber: '0123456789',
          bankName: 'Guaranty Trust Bank'
        },
        proof: {
          paymentProof: 'payment_screenshot_003.jpg',
          transactionReference: 'TRF240115005678',
          customerNotes: 'Quick USDT purchase'
        },
        fee: 33000,
        rate: 1650,
        referenceNumber: 'REF003USDT240115',
        processingTime: '5 minutes',
        adminNotes: 'Payment verified and processed successfully'
      },
      {
        id: 'TXN004',
        userId: 'user_004',
        userName: 'Sarah Wilson',
        userEmail: 'sarah@example.com',
        type: 'sell',
        cryptocurrency: 'SOL',
        amount: 10,
        amountNGN: 1980000,
        status: 'failed',
        createdAt: '2024-01-14T16:45:00Z',
        paymentMethod: 'Bank Transfer',
        bankDetails: {
          accountName: 'Sarah Wilson',
          accountNumber: '9876543210',
          bankName: 'Access Bank'
        },
        proof: {
          cryptoProof: 'crypto_transfer_004.jpg',
          transactionHash: 'invalid_hash_provided',
          walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          network: 'Solana',
          customerNotes: 'Please process quickly'
        },
        fee: 39600,
        rate: 198000,
        referenceNumber: 'REF004SOL240114',
        processingTime: '2 hours',
        failureReason: 'Invalid transaction hash provided',
        adminNotes: 'Customer provided incorrect transaction hash. Requested resubmission.'
      },
      {
        id: 'TXN005',
        userId: 'user_005',
        userName: 'David Brown',
        userEmail: 'david@example.com',
        type: 'buy',
        cryptocurrency: 'BTC',
        amount: 0.25,
        amountNGN: 18750000,
        status: 'awaiting_payment',
        createdAt: '2024-01-14T11:20:00Z',
        paymentMethod: 'Bank Transfer',
        bankDetails: {
          accountName: 'Brightola Exchange Limited',
          accountNumber: '2034567890',
          bankName: 'First Bank of Nigeria'
        },
        fee: 375000,
        rate: 75000000,
        referenceNumber: 'REF005BTC240114',
        processingTime: 'Awaiting payment proof'
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

    // Calculate enhanced stats
    setStats({
      totalUsers: mockUsers.length,
      totalVolume: mockTransactions.reduce((sum, tx) => sum + tx.amountNGN, 0),
      totalRevenue: mockTransactions.reduce((sum, tx) => sum + tx.fee, 0),
      activeTransactions: mockTransactions.filter(tx => ['pending', 'under_review', 'awaiting_payment', 'awaiting_crypto'].includes(tx.status)).length,
      pendingKYC: mockKYC.filter(kyc => kyc.status === 'pending').length,
      approvedKYC: mockKYC.filter(kyc => kyc.status === 'approved').length,
      underReview: mockTransactions.filter(tx => tx.status === 'under_review').length,
      awaitingPayment: mockTransactions.filter(tx => tx.status === 'awaiting_payment').length,
      awaitingCrypto: mockTransactions.filter(tx => tx.status === 'awaiting_crypto').length
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

  const updateTransactionStatus = (id: string, status: Transaction['status'], adminNotes?: string, failureReason?: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id 
        ? { 
            ...tx, 
            status, 
            completedAt: status === 'completed' ? new Date().toISOString() : undefined,
            adminNotes: adminNotes || tx.adminNotes,
            failureReason: status === 'failed' ? failureReason : undefined
          }
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

  const addTransactionProof = (id: string, proof: TransactionProof) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id 
        ? { 
            ...tx, 
            proof: { ...tx.proof, ...proof },
            status: tx.type === 'buy' ? 'under_review' : 'awaiting_crypto'
          }
        : tx
    ));
  };

  const value: DataContextType = {
    transactions,
    kycSubmissions,
    users,
    stats,
    refreshData,
    updateTransactionStatus,
    updateKYCStatus,
    addTransactionProof
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};