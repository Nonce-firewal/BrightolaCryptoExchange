import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  FileText,
  MessageCircle,
  AlertTriangle,
  User,
  Building,
  Network,
  Copy,
  ExternalLink,
  Camera,
  Banknote,
  Wallet,
  Edit,
  Save,
  X
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';

interface TransactionProof {
  paymentProof?: File | string;
  transactionReference?: string;
  customerNotes?: string;
  cryptoProof?: File | string;
  transactionHash?: string;
  walletAddress?: string;
  network?: string;
}

interface EnhancedTransaction {
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

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<EnhancedTransaction | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [failureReason, setFailureReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Enhanced mock transaction data with proof uploads
  const transactions: EnhancedTransaction[] = [
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
      processingTime: 'Pending review'
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
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cryptocurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'awaiting_payment': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      case 'awaiting_crypto': return 'text-purple-400 bg-purple-900/20 border-purple-700';
      case 'under_review': return 'text-orange-400 bg-orange-900/20 border-orange-700';
      case 'failed': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'cancelled': return 'text-gray-400 bg-gray-900/20 border-gray-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'awaiting_payment': return Banknote;
      case 'awaiting_crypto': return Wallet;
      case 'under_review': return Eye;
      case 'failed': return XCircle;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
    }
  };

  const handleStatusUpdate = async (transactionId: string, newStatus: string) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update transaction status logic here
    console.log(`Updating transaction ${transactionId} to status: ${newStatus}`);
    
    setIsUpdating(false);
    setSelectedTransaction(null);
  };

  const handleAddAdminNotes = async (transactionId: string) => {
    if (!adminNotes.trim()) return;
    
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add admin notes logic here
    console.log(`Adding admin notes to transaction ${transactionId}: ${adminNotes}`);
    
    setAdminNotes('');
    setIsUpdating(false);
  };

  const handleRejectTransaction = async (transactionId: string) => {
    if (!failureReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reject transaction logic here
    console.log(`Rejecting transaction ${transactionId}: ${failureReason}`);
    
    setFailureReason('');
    setIsUpdating(false);
    setSelectedTransaction(null);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Transaction Management</h1>
              <p className="text-gray-400 mt-1">Monitor and manage all platform transactions with proof verification</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <AnimatedButton
                variant="secondary"
                icon={Download}
                size="sm"
              >
                Export
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: 'Under Review',
              value: transactions.filter(t => t.status === 'under_review').length.toString(),
              icon: Eye,
              color: 'orange'
            },
            {
              name: 'Awaiting Payment',
              value: transactions.filter(t => t.status === 'awaiting_payment').length.toString(),
              icon: Banknote,
              color: 'blue'
            },
            {
              name: 'Awaiting Crypto',
              value: transactions.filter(t => t.status === 'awaiting_crypto').length.toString(),
              icon: Wallet,
              color: 'purple'
            },
            {
              name: 'Completed Today',
              value: transactions.filter(t => t.status === 'completed').length.toString(),
              icon: CheckCircle,
              color: 'green'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              <option value="under_review">Under Review</option>
              <option value="awaiting_payment">Awaiting Payment</option>
              <option value="awaiting_crypto">Awaiting Crypto</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>

            <AnimatedButton
              variant="primary"
              icon={Filter}
              className="w-full"
            >
              Apply Filters
            </AnimatedButton>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Proof
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  const hasProof = transaction.proof && (transaction.proof.paymentProof || transaction.proof.cryptoProof);
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">{transaction.cryptocurrency.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{transaction.id}</div>
                            <div className="text-sm text-gray-400">{transaction.referenceNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{transaction.userName}</div>
                          <div className="text-sm text-gray-400">{transaction.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {transaction.type === 'buy' ? (
                            <ArrowDownRight className="w-4 h-4 text-green-400 mr-2" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-orange-400 mr-2" />
                          )}
                          <span className={`text-sm font-medium ${
                            transaction.type === 'buy' ? 'text-green-400' : 'text-orange-400'
                          }`}>
                            {transaction.type.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {transaction.amount} {transaction.cryptocurrency}
                        </div>
                        <div className="text-sm text-gray-400">
                          ₦{transaction.amountNGN.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {transaction.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {hasProof ? (
                            <>
                              <FileText className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm">Uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 text-sm">Pending</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedTransaction(transaction)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-6xl border border-gray-700 max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{selectedTransaction.cryptocurrency.substring(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Transaction Review</h3>
                    <p className="text-gray-400">{selectedTransaction.id} - {selectedTransaction.referenceNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Transaction Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Type</span>
                      {selectedTransaction.type === 'buy' ? (
                        <ArrowDownRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-orange-400" />
                      )}
                    </div>
                    <p className={`text-lg font-semibold ${
                      selectedTransaction.type === 'buy' ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {selectedTransaction.type.toUpperCase()}
                    </p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Status</span>
                      {React.createElement(getStatusIcon(selectedTransaction.status), {
                        className: "w-4 h-4 text-current"
                      })}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full border ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Amount</span>
                      <Wallet className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {selectedTransaction.amount} {selectedTransaction.cryptocurrency}
                    </p>
                    <p className="text-sm text-gray-400">₦{selectedTransaction.amountNGN.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">User</span>
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-lg font-semibold text-white">{selectedTransaction.userName}</p>
                    <p className="text-sm text-gray-400">{selectedTransaction.userEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Transaction Details */}
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Transaction Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reference:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono text-sm">{selectedTransaction.referenceNumber}</span>
                            <button
                              onClick={() => copyToClipboard(selectedTransaction.referenceNumber, 'ref')}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {copied === 'ref' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rate:</span>
                          <span className="text-white">₦{selectedTransaction.rate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fee:</span>
                          <span className="text-white">₦{selectedTransaction.fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="text-white">{selectedTransaction.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created:</span>
                          <span className="text-white">{new Date(selectedTransaction.createdAt).toLocaleString()}</span>
                        </div>
                        {selectedTransaction.completedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Completed:</span>
                            <span className="text-white">{new Date(selectedTransaction.completedAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bank Details */}
                    {selectedTransaction.bankDetails && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Building className="w-5 h-5 text-green-400 mr-2" />
                          Bank Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Account Name:</span>
                            <span className="text-white">{selectedTransaction.bankDetails.accountName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Account Number:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-mono">{selectedTransaction.bankDetails.accountNumber}</span>
                              <button
                                onClick={() => copyToClipboard(selectedTransaction.bankDetails?.accountNumber || '', 'account')}
                                className="text-green-400 hover:text-green-300 transition-colors"
                              >
                                {copied === 'account' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bank:</span>
                            <span className="text-white">{selectedTransaction.bankDetails.bankName}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Proof & Actions */}
                  <div className="space-y-6">
                    {/* Uploaded Proof */}
                    {selectedTransaction.proof && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <FileText className="w-5 h-5 text-blue-400 mr-2" />
                          Uploaded Proof
                        </h4>
                        <div className="space-y-4">
                          {selectedTransaction.proof.paymentProof && (
                            <div className="border border-gray-700 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Payment Proof:</span>
                                <Camera className="w-4 h-4 text-green-400" />
                              </div>
                              <div className="bg-gray-800 rounded p-2 mb-2">
                                <span className="text-white text-sm">{selectedTransaction.proof.paymentProof}</span>
                              </div>
                              <AnimatedButton variant="secondary" size="sm" icon={Eye}>
                                View Image
                              </AnimatedButton>
                            </div>
                          )}
                          
                          {selectedTransaction.proof.cryptoProof && (
                            <div className="border border-gray-700 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Crypto Transfer Proof:</span>
                                <Wallet className="w-4 h-4 text-purple-400" />
                              </div>
                              <div className="bg-gray-800 rounded p-2 mb-2">
                                <span className="text-white text-sm">{selectedTransaction.proof.cryptoProof}</span>
                              </div>
                              <AnimatedButton variant="secondary" size="sm" icon={Eye}>
                                View Image
                              </AnimatedButton>
                            </div>
                          )}
                          
                          {selectedTransaction.proof.transactionReference && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Transaction Reference:</span>
                              <div className="flex items-center justify-between bg-gray-800 rounded p-2">
                                <span className="text-white font-mono text-sm">{selectedTransaction.proof.transactionReference}</span>
                                <button
                                  onClick={() => copyToClipboard(selectedTransaction.proof?.transactionReference || '', 'txref')}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  {copied === 'txref' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {selectedTransaction.proof.transactionHash && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Transaction Hash:</span>
                              <div className="flex items-center justify-between bg-gray-800 rounded p-2">
                                <span className="text-white font-mono text-sm break-all">{selectedTransaction.proof.transactionHash}</span>
                                <div className="flex items-center space-x-2 ml-2">
                                  <button
                                    onClick={() => copyToClipboard(selectedTransaction.proof?.transactionHash || '', 'hash')}
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                  >
                                    {copied === 'hash' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {selectedTransaction.proof.customerNotes && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Customer Notes:</span>
                              <div className="bg-gray-800 rounded p-2">
                                <p className="text-white text-sm">{selectedTransaction.proof.customerNotes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Admin Actions */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Admin Actions</h4>
                      
                      {/* Status Update Buttons */}
                      {selectedTransaction.status !== 'completed' && selectedTransaction.status !== 'failed' && (
                        <div className="space-y-3 mb-4">
                          <div className="flex space-x-2">
                            <AnimatedButton
                              variant="success"
                              size="sm"
                              icon={CheckCircle}
                              onClick={() => handleStatusUpdate(selectedTransaction.id, 'completed')}
                              loading={isUpdating}
                              className="flex-1"
                            >
                              Approve
                            </AnimatedButton>
                            <AnimatedButton
                              variant="danger"
                              size="sm"
                              icon={XCircle}
                              onClick={() => {
                                const reason = prompt('Enter rejection reason:');
                                if (reason) {
                                  setFailureReason(reason);
                                  handleRejectTransaction(selectedTransaction.id);
                                }
                              }}
                              loading={isUpdating}
                              className="flex-1"
                            >
                              Reject
                            </AnimatedButton>
                          </div>
                        </div>
                      )}
                      
                      {/* Admin Notes */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-300">Add Admin Notes:</label>
                        <textarea
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Enter notes for this transaction..."
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        />
                        <AnimatedButton
                          variant="secondary"
                          size="sm"
                          icon={Save}
                          onClick={() => handleAddAdminNotes(selectedTransaction.id)}
                          disabled={!adminNotes.trim()}
                          loading={isUpdating}
                        >
                          Save Notes
                        </AnimatedButton>
                      </div>
                      
                      {/* Existing Admin Notes */}
                      {selectedTransaction.adminNotes && (
                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                          <span className="text-blue-300 text-sm font-medium">Previous Admin Notes:</span>
                          <p className="text-blue-400 text-sm mt-1">{selectedTransaction.adminNotes}</p>
                        </div>
                      )}
                      
                      {/* Failure Reason */}
                      {selectedTransaction.failureReason && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                          <span className="text-red-300 text-sm font-medium">Failure Reason:</span>
                          <p className="text-red-400 text-sm mt-1">{selectedTransaction.failureReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-700">
                  <AnimatedButton
                    variant="secondary"
                    icon={MessageCircle}
                    size="sm"
                  >
                    Contact User
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    onClick={() => setSelectedTransaction(null)}
                    className="ml-auto"
                  >
                    Close
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredTransactions.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No transactions found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Transactions;