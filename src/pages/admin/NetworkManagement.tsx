import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Network,
  Globe,
  Link,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const NetworkManagement: React.FC = () => {
  const { 
    settings, 
    updateNetwork, 
    addNetwork, 
    deleteNetwork 
  } = useAdmin();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNetwork, setEditingNetwork] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [networkForm, setNetworkForm] = useState({
    name: '',
    symbol: '',
    chainId: '',
    rpcUrl: '',
    explorerUrl: '',
    isActive: true
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const filteredNetworks = settings.networks.filter(network => {
    const matchesSearch = network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         network.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && network.isActive) ||
                         (statusFilter === 'inactive' && !network.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleAddNetwork = () => {
    addNetwork(networkForm);
    setNetworkForm({
      name: '',
      symbol: '',
      chainId: '',
      rpcUrl: '',
      explorerUrl: '',
      isActive: true
    });
    setShowAddModal(false);
  };

  const handleEditNetwork = () => {
    if (editingNetwork) {
      updateNetwork(editingNetwork);
      setEditingNetwork(null);
    }
  };

  const toggleNetworkStatus = (network: any) => {
    updateNetwork({ ...network, isActive: !network.isActive });
  };

  return (
    <AdminLayout>
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
                <Network className="w-8 h-8 text-blue-400 mr-3" />
                Network Management
              </h1>
              <p className="text-gray-400 mt-1">Manage blockchain networks and their configurations</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Total: {settings.networks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Active: {settings.networks.filter(n => n.isActive).length}</span>
                </div>
              </div>
              <AnimatedButton
                variant="primary"
                icon={Plus}
                onClick={() => setShowAddModal(true)}
              >
                Add Network
              </AnimatedButton>
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
                placeholder="Search networks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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

        {/* Networks Grid */}
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-300 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNetworks.map((network, index) => (
              <div 
                key={network.id}
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">{network.symbol}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{network.name}</h3>
                      <p className="text-gray-400 text-sm">{network.symbol}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleNetworkStatus(network)}>
                    {network.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  {network.chainId && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Chain ID:</span>
                      <span className="text-white font-mono text-sm">{network.chainId}</span>
                    </div>
                  )}

                  {network.rpcUrl && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">RPC URL:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm truncate max-w-32">
                          {network.rpcUrl.substring(0, 20)}...
                        </span>
                        <Link className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                  )}

                  {network.explorerUrl && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Explorer:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">Available</span>
                        <ExternalLink className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                      network.isActive 
                        ? 'text-green-400 bg-green-900/20 border-green-700'
                        : 'text-red-400 bg-red-900/20 border-red-700'
                    }`}>
                      {network.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Created:</span>
                    <span className="text-white text-sm">
                      {new Date(network.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <AnimatedButton
                    variant="secondary"
                    icon={Edit}
                    size="sm"
                    onClick={() => setEditingNetwork(network)}
                    className="flex-1"
                  >
                    Edit
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    icon={Trash2}
                    size="sm"
                    onClick={() => deleteNetwork(network.id)}
                    className="flex-1"
                  >
                    Delete
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Network Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Add New Network</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network Name</label>
                  <input
                    type="text"
                    value={networkForm.name}
                    onChange={(e) => setNetworkForm({...networkForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Ethereum"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    value={networkForm.symbol}
                    onChange={(e) => setNetworkForm({...networkForm, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., ETH"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Chain ID (Optional)</label>
                  <input
                    type="text"
                    value={networkForm.chainId}
                    onChange={(e) => setNetworkForm({...networkForm, chainId: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">RPC URL (Optional)</label>
                  <input
                    type="url"
                    value={networkForm.rpcUrl}
                    onChange={(e) => setNetworkForm({...networkForm, rpcUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Explorer URL (Optional)</label>
                  <input
                    type="url"
                    value={networkForm.explorerUrl}
                    onChange={(e) => setNetworkForm({...networkForm, explorerUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setNetworkForm({...networkForm, isActive: !networkForm.isActive})}>
                    {networkForm.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleAddNetwork}
                  disabled={!networkForm.name || !networkForm.symbol}
                  className="flex-1"
                >
                  Add Network
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Edit Network Modal */}
        {editingNetwork && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Network</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network Name</label>
                  <input
                    type="text"
                    value={editingNetwork.name}
                    onChange={(e) => setEditingNetwork({...editingNetwork, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    value={editingNetwork.symbol}
                    onChange={(e) => setEditingNetwork({...editingNetwork, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Chain ID</label>
                  <input
                    type="text"
                    value={editingNetwork.chainId || ''}
                    onChange={(e) => setEditingNetwork({...editingNetwork, chainId: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">RPC URL</label>
                  <input
                    type="url"
                    value={editingNetwork.rpcUrl || ''}
                    onChange={(e) => setEditingNetwork({...editingNetwork, rpcUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Explorer URL</label>
                  <input
                    type="url"
                    value={editingNetwork.explorerUrl || ''}
                    onChange={(e) => setEditingNetwork({...editingNetwork, explorerUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setEditingNetwork({...editingNetwork, isActive: !editingNetwork.isActive})}>
                    {editingNetwork.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setEditingNetwork(null)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleEditNetwork}
                  className="flex-1"
                >
                  Update Network
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NetworkManagement;