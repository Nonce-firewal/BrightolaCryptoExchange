import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowUpRight,
  User,
  Building,
  Copy,
  MessageCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Edit,
  Save,
  X,
  Banknote,
  Users,
  TrendingUp,
  Wallet
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';

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
  userReferralStats?: {
    totalEarnings: number;
    totalReferrals: number;
    activeReferrals: number;
  };
}

const ReferralWithdrawals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Enhanced mock withdrawal data
  const withdrawalRequests: WithdrawalRequest[] = [
    {
      id: 'WDR001',
      userId: 'user_001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      amount: 45000,
      bankDetails: {
        accountName: 'John Doe',
        accountNumber: '1234567890',
        bankName: 'First Bank of Nigeria'
      },
      status: 'pending',
      requestedAt: '2024-01-15T10:30:00Z',
      referenceNumber: 'REF001WDR240115',
      userReferralStats: {
        totalEarnings: 125000,
        totalReferrals: 12,
        activeReferrals: 8
      }
    },
    {
      id: 'WDR002',
      userId: 'user_002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      amount: 25000,
      bankDetails: {
        accountName: 'Jane Smith',
        accountNumber: '0987654321',
        bankName: 'GTBank'
      },
      status: 'approved',
      requestedAt: '2024-01-14T14:20:00Z',
      processedAt: '2024-01-14T16:45:00Z',
      adminNotes: 'Verified user with good referral history. Approved for payment.',
      referenceNumber: 'REF002WDR240114',
      userReferralStats: {
        totalEarnings: 85000,
        totalReferrals: 8,
        activeReferrals: 6
      }
    },
    {
      id: 'WDR003',
      userId: 'user_003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      amount: 15000,
      bankDetails: {
        accountName: 'Mike Johnson',
        accountNumber: '1122334455',
        bankName: 'Access Bank'
      },
      status: 'paid',
      requestedAt: '2024-01-13T09:15:00Z',
      processedAt: '2024-01-13T15:30:00Z',
      adminNotes: 'Payment processed successfully via bank transfer.',
      referenceNumber: 'REF003WDR240113',
      userReferralStats: {
        totalEarnings: 65000,
        totalReferrals: 5,
        activeReferrals: 4
      }
    },
    {
      id: 'WDR004',
      userId: 'user_004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      amount: 8000,
      bankDetails: {
        accountName: 'Sarah Wilson',
        accountNumber: '5566778899',
        bankName: 'UBA'
      },
      status: 'rejected',
      requestedAt: '2024-01-12T16:45:00Z',
      processedAt: '2024-01-12T18:20:00Z',
      rejectionReason: 'Bank account name does not match user profile name. Please update and resubmit.',
      referenceNumber: 'REF004WDR240112',
      userReferralStats: {
        totalEarnings: 35000,
        totalReferrals: 3,
        activeReferrals: 2
      }
    }
  ];

  const filteredRequests = withdrawalRequests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'approved': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'rejected': return 'text-red-400 bg-red-900/20 border-red-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const handleStatusUpdate = async (withdrawalId: string, newStatus: string) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Updating withdrawal ${withdrawalId} to status: ${newStatus}`);
    
    setIsUpdating(false);
    setSelectedWithdrawal(null);
  };

  const handleApprove = async (withdrawalId: string) => {
    await handleStatusUpdate(withdrawalId, 'approved');
  };

  const handleMarkAsPaid = async (withdrawalId: string) => {
    await handleStatusUpdate(withdrawalId, 'paid');
  };

  const handleReject = async (withdrawalId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Rejecting withdrawal ${withdrawalId}: ${rejectionReason}`);
    
    setRejectionReason('');
    setIsUpdating(false);
    setSelectedWithdrawal(null);
  };

  const handleAddNotes = async (withdrawalId: string) => {
    if (!adminNotes.trim()) return;
    
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Adding notes to withdrawal ${withdrawalId}: ${adminNotes}`);
    
    setAdminNotes('');
    setIsUpdating(false);
  };

  // Calculate stats
  const totalRequests = withdrawalRequests.length;
  const pendingRequests = withdrawalRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = withdrawalRequests.filter(r => r.status === 'approved').length;
  const totalAmount = withdrawalRequests.reduce((sum, r) => sum + r.amount, 0);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Referral Withdrawals</h1>
              <p className="text-gray-400 mt-1">Manage referral commission withdrawal requests</p>
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
              name: 'Pending Requests',
              value: pendingRequests.toString(),
              icon: Clock,
              color: 'yellow'
            },
            {
              name: 'Approved Requests',
              value: approvedRequests.toString(),
              icon: CheckCircle,
              color: 'blue'
            },
            {
              name: 'Total Requests',
              value: totalRequests.toString(),
              icon: ArrowUpRight,
              color: 'purple'
            },
            {
              name: 'Total Amount',
              value: `₦${(totalAmount / 1000).toFixed(0)}K`,
              icon: DollarSign,
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search withdrawals..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
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

        {/* Withdrawals Table */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bank Details
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
                {filteredRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  
                  return (
                    <tr key={request.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{request.id}</div>
                          <div className="text-sm text-gray-400">{request.referenceNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{request.userName}</div>
                            <div className="text-sm text-gray-400">{request.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-white">₦{request.amount.toLocaleString()}</div>
                        {request.userReferralStats && (
                          <div className="text-sm text-gray-400">
                            {request.userReferralStats.totalReferrals} referrals
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{request.bankDetails.accountName}</div>
                        <div className="text-sm text-gray-400">{request.bankDetails.accountNumber}</div>
                        <div className="text-sm text-gray-400">{request.bankDetails.bankName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedWithdrawal(request)}
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

        {/* Enhanced Withdrawal Detail Modal */}
        {selectedWithdrawal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-4xl border border-gray-700 max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Withdrawal Request Review</h3>
                    <p className="text-gray-400">{selectedWithdrawal.id} - {selectedWithdrawal.referenceNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWithdrawal(null)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Request Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Amount</span>
                      <Wallet className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-green-400">₦{selectedWithdrawal.amount.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Status</span>
                      {React.createElement(getStatusIcon(selectedWithdrawal.status), {
                        className: "w-4 h-4 text-current"
                      })}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full border ${getStatusColor(selectedWithdrawal.status)}`}>
                      {selectedWithdrawal.status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">User</span>
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold text-white">{selectedWithdrawal.userName}</p>
                    <p className="text-sm text-gray-400">{selectedWithdrawal.userEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Request Details */}
                  <div className="space-y-6">
                    {/* Bank Details */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Building className="w-5 h-5 text-green-400 mr-2" />
                        Bank Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Name:</span>
                          <span className="text-white font-medium">{selectedWithdrawal.bankDetails.accountName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono">{selectedWithdrawal.bankDetails.accountNumber}</span>
                            <button
                              onClick={() => copyToClipboard(selectedWithdrawal.bankDetails.accountNumber, 'account')}
                              className="text-green-400 hover:text-green-300 transition-colors"
                            >
                              {copied === 'account' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank Name:</span>
                          <span className="text-white font-medium">{selectedWithdrawal.bankDetails.bankName}</span>
                        </div>
                      </div>
                    </div>

                    {/* User Referral Stats */}
                    {selectedWithdrawal.userReferralStats && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Users className="w-5 h-5 text-purple-400 mr-2" />
                          User Referral Stats
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Earnings:</span>
                            <span className="text-white font-medium">₦{selectedWithdrawal.userReferralStats.totalEarnings.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Referrals:</span>
                            <span className="text-white font-medium">{selectedWithdrawal.userReferralStats.totalReferrals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Referrals:</span>
                            <span className="text-white font-medium">{selectedWithdrawal.userReferralStats.activeReferrals}</span>
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
                          <span className="text-gray-400">Requested:</span>
                          <span className="text-white font-medium">
                            {new Date(selectedWithdrawal.requestedAt).toLocaleString()}
                          </span>
                        </div>
                        {selectedWithdrawal.processedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Processed:</span>
                            <span className="text-white font-medium">
                              {new Date(selectedWithdrawal.processedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Admin Actions */}
                  <div className="space-y-6">
                    {/* Admin Actions */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Admin Actions</h4>
                      
                      {/* Status Update Buttons */}
                      {selectedWithdrawal.status === 'pending' && (
                        <div className="space-y-3 mb-4">
                          <div className="flex space-x-2">
                            <AnimatedButton
                              variant="success"
                              size="sm"
                              icon={CheckCircle}
                              onClick={() => handleApprove(selectedWithdrawal.id)}
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
                                  setRejectionReason(reason);
                                  handleReject(selectedWithdrawal.id);
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

                      {selectedWithdrawal.status === 'approved' && (
                        <div className="mb-4">
                          <AnimatedButton
                            variant="success"
                            size="sm"
                            icon={Banknote}
                            onClick={() => handleMarkAsPaid(selectedWithdrawal.id)}
                            loading={isUpdating}
                            className="w-full"
                          >
                            Mark as Paid
                          </AnimatedButton>
                        </div>
                      )}
                      
                      {/* Admin Notes */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-300">Add Admin Notes:</label>
                        <textarea
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Enter notes for this withdrawal request..."
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        />
                        <AnimatedButton
                          variant="secondary"
                          size="sm"
                          icon={Save}
                          onClick={() => handleAddNotes(selectedWithdrawal.id)}
                          disabled={!adminNotes.trim()}
                          loading={isUpdating}
                        >
                          Save Notes
                        </AnimatedButton>
                      </div>
                      
                      {/* Existing Admin Notes */}
                      {selectedWithdrawal.adminNotes && (
                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                          <span className="text-blue-300 text-sm font-medium">Admin Notes:</span>
                          <p className="text-blue-400 text-sm mt-1">{selectedWithdrawal.adminNotes}</p>
                        </div>
                      )}
                      
                      {/* Rejection Reason */}
                      {selectedWithdrawal.rejectionReason && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                          <span className="text-red-300 text-sm font-medium">Rejection Reason:</span>
                          <p className="text-red-400 text-sm mt-1">{selectedWithdrawal.rejectionReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Payment Instructions */}
                    {selectedWithdrawal.status === 'approved' && (
                      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                        <h4 className="text-blue-300 font-medium mb-2">Payment Instructions</h4>
                        <ul className="text-blue-400 text-sm space-y-1">
                          <li>• Transfer ₦{selectedWithdrawal.amount.toLocaleString()} to the provided bank account</li>
                          <li>• Use reference: {selectedWithdrawal.referenceNumber}</li>
                          <li>• Mark as "Paid" once transfer is completed</li>
                          <li>• Notify user via email about payment completion</li>
                        </ul>
                      </div>
                    )}
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
                    onClick={() => setSelectedWithdrawal(null)}
                    className="ml-auto"
                  >
                    Close
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredRequests.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
            <ArrowUpRight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No withdrawal requests found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReferralWithdrawals;