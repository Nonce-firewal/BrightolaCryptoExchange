import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../contexts/DataContext';
import { 
  Search, 
  Filter, 
  Eye, 
  Ban, 
  CheckCircle,
  Clock,
  User,
  Mail,
  Calendar,
  TrendingUp
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const { users } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKYC = kycFilter === 'all' || user.kycStatus === kycFilter;
    
    return matchesSearch && matchesKYC;
  });

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'rejected': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'not-submitted': return 'text-gray-400 bg-gray-900/20 border-gray-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">Manage and monitor platform users</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Total Users: {users.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">KYC Verified: {users.filter(u => u.kycStatus === 'approved').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <select
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All KYC Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="not-submitted">Not Submitted</option>
            </select>

            <button className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-400 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">ID: {user.id}</p>
                  </div>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getKYCStatusColor(user.kycStatus)}`}>
                  {user.kycStatus.replace('-', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Total Transactions</span>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-white font-semibold text-lg">{user.totalTransactions}</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Total Volume</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-white font-semibold text-lg">₦{(user.totalVolume / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Registered:</span>
                  <span className="text-white">{new Date(user.registeredAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Login:</span>
                  <span className="text-white">{new Date(user.lastLogin).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Referral Code:</span>
                  <span className="text-orange-400 font-mono">{user.referralCode}</span>
                </div>
                {user.referredBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Referred By:</span>
                    <span className="text-blue-400">{user.referredBy}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;