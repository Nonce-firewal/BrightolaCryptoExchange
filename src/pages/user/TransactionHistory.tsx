import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Eye,
  Copy,
  ExternalLink,
  User,
  CreditCard,
  Wallet,
  Network,
  Building,
  MessageCircle,
  Shield,
  Info
} from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import AnimatedButton from '../../components/AnimatedButton';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  cryptocurrency: string;
  amount: number;
  amountNGN: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  date: string;
  fee: number;
  rate: number;
  // Enhanced transaction details
  network?: string;
  walletAddress?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  paymentMethod?: string;
  confirmations?: number;
  txHash?: string;
  processingTime?: string;
  adminNotes?: string;
  completedAt?: string;
  failureReason?: string;
  referenceNumber?: string;
  customerNotes?: string;
}

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Enhanced mock transaction data with detailed information
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'buy',
      cryptocurrency: 'BTC',
      amount: 0.5,
      amountNGN: 37500000,
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      fee: 750000,
      rate: 75000000,
      network: 'Bitcoin',
      walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      bankDetails: {
        accountName: 'Brightola Exchange Limited',
        accountNumber: '2034567890',
        bankName: 'First Bank of Nigeria'
      },
      paymentMethod: 'Bank Transfer',
      confirmations: 6,
      txHash: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
      processingTime: '15 minutes',
      completedAt: '2024-01-15T10:45:00Z',
      referenceNumber: 'REF001BTC240115',
      customerNotes: 'First Bitcoin purchase'
    },
    {
      id: 'TXN002',
      type: 'sell',
      cryptocurrency: 'ETH',
      amount: 2.0,
      amountNGN: 10560000,
      status: 'pending',
      date: '2024-01-15T14:20:00Z',
      fee: 211200,
      rate: 5280000,
      network: 'Ethereum',
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
      bankDetails: {
        accountName: 'John Doe',
        accountNumber: '1234567890',
        bankName: 'GTBank'
      },
      paymentMethod: 'Bank Transfer',
      confirmations: 2,
      processingTime: 'In progress',
      referenceNumber: 'REF002ETH240115',
      adminNotes: 'Awaiting blockchain confirmation',
      customerNotes: 'Urgent sale for emergency'
    },
    {
      id: 'TXN003',
      type: 'buy',
      cryptocurrency: 'USDT',
      amount: 1000,
      amountNGN: 1650000,
      status: 'completed',
      date: '2024-01-15T09:15:00Z',
      fee: 33000,
      rate: 1650,
      network: 'Ethereum (ERC-20)',
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
      bankDetails: {
        accountName: 'Brightola Exchange Limited',
        accountNumber: '0123456789',
        bankName: 'Guaranty Trust Bank'
      },
      paymentMethod: 'Bank Transfer',
      confirmations: 12,
      txHash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
      processingTime: '5 minutes',
      completedAt: '2024-01-15T09:20:00Z',
      referenceNumber: 'REF003USDT240115'
    },
    {
      id: 'TXN004',
      type: 'sell',
      cryptocurrency: 'SOL',
      amount: 10,
      amountNGN: 1980000,
      status: 'failed',
      date: '2024-01-14T16:45:00Z',
      fee: 39600,
      rate: 198000,
      network: 'Solana',
      walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      bankDetails: {
        accountName: 'Jane Smith',
        accountNumber: '9876543210',
        bankName: 'Access Bank'
      },
      paymentMethod: 'Bank Transfer',
      processingTime: '2 hours',
      failureReason: 'Insufficient wallet balance',
      referenceNumber: 'REF004SOL240114',
      adminNotes: 'Customer notified to check wallet balance',
      customerNotes: 'Please retry transaction'
    },
    {
      id: 'TXN005',
      type: 'buy',
      cryptocurrency: 'BTC',
      amount: 0.25,
      amountNGN: 18750000,
      status: 'cancelled',
      date: '2024-01-14T11:20:00Z',
      fee: 0,
      rate: 75000000,
      network: 'Bitcoin',
      paymentMethod: 'Bank Transfer',
      processingTime: '1 hour',
      failureReason: 'Customer requested cancellation',
      referenceNumber: 'REF005BTC240114',
      adminNotes: 'Cancelled by customer before payment',
      customerNotes: 'Changed mind about purchase'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cryptocurrency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'failed': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'cancelled': return 'text-gray-400 bg-gray-900/20 border-gray-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
    }
  };

  // Calculate stats
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const totalVolume = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amountNGN, 0);
  const totalFees = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.fee, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <History className="w-8 h-8 text-blue-400 mr-3" />
                Transaction History
              </h1>
              <p className="text-gray-400 mt-1">View and manage all your crypto transactions</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <AnimatedButton
                variant="secondary"
                icon={Calendar}
                size="sm"
              >
                Last 30 Days
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                icon={Download}
                size="sm"
              >
                Export
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              name: 'Total Transactions',
              value: totalTransactions.toString(),
              icon: History,
              color: 'blue'
            },
            {
              name: 'Completed',
              value: completedTransactions.toString(),
              icon: CheckCircle,
              color: 'green'
            },
            {
              name: 'Total Volume',
              value: `₦${(totalVolume / 1000000).toFixed(1)}M`,
              icon: TrendingUp,
              color: 'purple'
            },
            {
              name: 'Total Fees',
              value: `₦${(totalFees / 1000).toFixed(0)}K`,
              icon: ArrowUpRight,
              color: 'orange'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name}
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div 
          ref={tableRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-1000 delay-500 ${
            tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
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
                {filteredTransactions.map((transaction, index) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  return (
                    <tr 
                      key={transaction.id} 
                      className="hover:bg-gray-700/50 transition-all duration-300 animate-slideInFromLeft cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">{transaction.cryptocurrency.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{transaction.id}</div>
                            <div className="text-sm text-gray-400">{transaction.cryptocurrency}</div>
                          </div>
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
                        <div className="text-sm text-white">
                          ₦{transaction.rate.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          per {transaction.cryptocurrency}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                        <div className="text-xs">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransaction(transaction);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-300 transform hover:scale-110"
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

        {filteredTransactions.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No transactions found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Enhanced Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-4xl border border-gray-700 animate-fadeInScale max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{selectedTransaction.cryptocurrency.substring(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
                    <p className="text-gray-400">{selectedTransaction.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-300 transition-colors transform hover:scale-110"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Transaction Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Transaction Type</span>
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
                      {selectedTransaction.status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Processing Time</span>
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold text-white">{selectedTransaction.processingTime}</p>
                  </div>
                </div>

                {/* Transaction Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Transaction Info */}
                  <div className="space-y-6">
                    {/* Basic Transaction Info */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Info className="w-5 h-5 text-blue-400 mr-2" />
                        Transaction Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reference Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono text-sm">{selectedTransaction.referenceNumber}</span>
                            <button
                              onClick={() => copyToClipboard(selectedTransaction.referenceNumber || '', 'ref')}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {copied === 'ref' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cryptocurrency:</span>
                          <span className="text-white font-medium">{selectedTransaction.cryptocurrency}</span>
                        </div>
                        {selectedTransaction.network && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Network:</span>
                            <div className="flex items-center">
                              <Network className="w-4 h-4 text-blue-400 mr-1" />
                              <span className="text-white font-medium">{selectedTransaction.network}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-white font-medium">
                            {selectedTransaction.amount} {selectedTransaction.cryptocurrency}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">NGN Amount:</span>
                          <span className="text-white font-medium">₦{selectedTransaction.amountNGN.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Exchange Rate:</span>
                          <span className="text-white font-medium">₦{selectedTransaction.rate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Transaction Fee:</span>
                          <span className="text-white font-medium">₦{selectedTransaction.fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="text-white font-medium">{selectedTransaction.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* Blockchain Info */}
                    {(selectedTransaction.walletAddress || selectedTransaction.txHash || selectedTransaction.confirmations) && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Wallet className="w-5 h-5 text-purple-400 mr-2" />
                          Blockchain Information
                        </h4>
                        <div className="space-y-3">
                          {selectedTransaction.walletAddress && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Wallet Address:</span>
                              <div className="flex items-center justify-between bg-gray-800 rounded p-2">
                                <span className="text-white font-mono text-sm break-all">
                                  {selectedTransaction.walletAddress}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(selectedTransaction.walletAddress || '', 'wallet')}
                                  className="text-purple-400 hover:text-purple-300 transition-colors ml-2"
                                >
                                  {copied === 'wallet' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          )}
                          {selectedTransaction.txHash && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Transaction Hash:</span>
                              <div className="flex items-center justify-between bg-gray-800 rounded p-2">
                                <span className="text-white font-mono text-sm break-all">
                                  {selectedTransaction.txHash}
                                </span>
                                <div className="flex items-center space-x-2 ml-2">
                                  <button
                                    onClick={() => copyToClipboard(selectedTransaction.txHash || '', 'hash')}
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
                          {selectedTransaction.confirmations !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Confirmations:</span>
                              <span className="text-white font-medium">{selectedTransaction.confirmations}/6</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Additional Info */}
                  <div className="space-y-6">
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
                            <span className="text-white font-medium">{selectedTransaction.bankDetails.accountName}</span>
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
                            <span className="text-gray-400">Bank Name:</span>
                            <span className="text-white font-medium">{selectedTransaction.bankDetails.bankName}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                        Timeline
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created:</span>
                          <span className="text-white font-medium">
                            {new Date(selectedTransaction.date).toLocaleString()}
                          </span>
                        </div>
                        {selectedTransaction.completedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Completed:</span>
                            <span className="text-white font-medium">
                              {new Date(selectedTransaction.completedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {(selectedTransaction.adminNotes || selectedTransaction.customerNotes || selectedTransaction.failureReason) && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <MessageCircle className="w-5 h-5 text-yellow-400 mr-2" />
                          Notes & Comments
                        </h4>
                        <div className="space-y-3">
                          {selectedTransaction.customerNotes && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Customer Notes:</span>
                              <p className="text-white bg-gray-800 rounded p-2 text-sm">{selectedTransaction.customerNotes}</p>
                            </div>
                          )}
                          {selectedTransaction.adminNotes && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Admin Notes:</span>
                              <p className="text-blue-300 bg-gray-800 rounded p-2 text-sm">{selectedTransaction.adminNotes}</p>
                            </div>
                          )}
                          {selectedTransaction.failureReason && (
                            <div>
                              <span className="text-gray-400 text-sm block mb-1">Failure Reason:</span>
                              <p className="text-red-300 bg-red-900/20 border border-red-700 rounded p-2 text-sm">{selectedTransaction.failureReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-700">
                  {selectedTransaction.status === 'pending' && (
                    <AnimatedButton
                      variant="secondary"
                      icon={MessageCircle}
                      size="sm"
                    >
                      Contact Support
                    </AnimatedButton>
                  )}
                  {selectedTransaction.txHash && (
                    <AnimatedButton
                      variant="secondary"
                      icon={ExternalLink}
                      size="sm"
                    >
                      View on Explorer
                    </AnimatedButton>
                  )}
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
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default TransactionHistory;