import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  User,
  AlertTriangle
} from 'lucide-react';

const KYCManagement: React.FC = () => {
  const { kycSubmissions, updateKYCStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedKYC, setSelectedKYC] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredSubmissions = kycSubmissions.filter(submission => {
    const matchesSearch = submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'rejected': return 'text-red-400 bg-red-900/20 border-red-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const handleApprove = (kycId: string) => {
    updateKYCStatus(kycId, 'approved');
  };

  const handleReject = (kycId: string) => {
    if (rejectionReason.trim()) {
      updateKYCStatus(kycId, 'rejected', rejectionReason);
      setRejectionReason('');
      setSelectedKYC(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">KYC Management</h1>
              <p className="text-gray-400 mt-1">Review and manage user verification submissions</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Pending: {kycSubmissions.filter(k => k.status === 'pending').length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Approved: {kycSubmissions.filter(k => k.status === 'approved').length}</span>
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
                placeholder="Search KYC submissions..."
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
              <option value="rejected">Rejected</option>
            </select>

            <button className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* KYC Submissions */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{submission.userName}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{submission.userEmail}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">ID Type:</span>
                        <p className="text-white font-medium">{submission.documents.idType}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">ID Number:</span>
                        <p className="text-white font-medium">{submission.documents.idNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Selfie:</span>
                        <p className={`font-medium ${submission.documents.selfie ? 'text-green-400' : 'text-red-400'}`}>
                          {submission.documents.selfie ? 'Submitted' : 'Missing'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Proof of Address:</span>
                        <p className={`font-medium ${submission.documents.proofOfAddress ? 'text-green-400' : 'text-red-400'}`}>
                          {submission.documents.proofOfAddress ? 'Submitted' : 'Missing'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                      {submission.reviewedAt && (
                        <span className="ml-4">
                          Reviewed: {new Date(submission.reviewedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    {submission.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                          <span className="text-red-300 font-medium">Rejection Reason:</span>
                        </div>
                        <p className="text-red-400 mt-1">{submission.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Documents
                  </button>
                  
                  {submission.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(submission.id)}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button 
                        onClick={() => setSelectedKYC(submission.id)}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No KYC submissions found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Rejection Modal */}
        {selectedKYC && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Reject KYC Submission</h3>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleReject(selectedKYC)}
                  disabled={!rejectionReason.trim()}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Submission
                </button>
                <button
                  onClick={() => {
                    setSelectedKYC(null);
                    setRejectionReason('');
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default KYCManagement;