import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Sparkles,
  Network,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CustomTokens: React.FC = () => {
  const { 
    settings, 
    updateCustomToken, 
    addCustomToken, 
    deleteCustomToken 
  } = useAdmin();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingToken, setEditingToken] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);

  const [tokenForm, setTokenForm] = useState({
    symbol: '',
    name: '',
    contractAddress: '',
    network: 'Ethereum',
    decimals: 18,
    isActive: true,
    buyEnabled: true,
    sellEnabled: true,
    buyMargin: 3.0,
    sellMargin: 3.0,
    minAmount: 1000,
    maxAmount: 1000000,
    priceUSD: 0,
    priceNGN: 0,
    change24h: 0
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const filteredTokens = settings.customTokens.filter(token => {
    const matchesSearch = token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && token.isActive) ||
                         (statusFilter === 'inactive' && !token.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAddToken = () => {
    addCustomToken(tokenForm);
    setTokenForm({
      symbol: '',
      name: '',
      contractAddress: '',
      network: 'Ethereum',
      decimals: 18,
      isActive: true,
      buyEnabled: true,
      sellEnabled: true,
      buyMargin: 3.0,
      sellMargin: 3.0,
      minAmount: 1000,
      maxAmount: 1000000,
      priceUSD: 0,
      priceNGN: 0,
      change24h: 0
    });
    setShowAddModal(false);
  };

  const handleEditToken = () => {
    if (editingToken) {
      updateCustomToken(editingToken);
      setEditingToken(null);
    }
  };

  const toggleTokenStatus = (token: any) => {
    updateCustomToken({ ...token, isActive: !token.isActive });
  };

  const toggleBuyEnabled = (token: any) => {
    updateCustomToken({ ...token, buyEnabled: !token.buyEnabled });
  };

  const toggleSellEnabled = (token: any) => {
    updateCustomToken({ ...token, sellEnabled: !token.sellEnabled });
  };

  const networks = ['Ethereum', 'Binance Smart Chain', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'];

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
                <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
                Custom Tokens Management
              </h1>
              <p className="text-gray-400 mt-1">Add and manage custom ERC-20 tokens and other network tokens</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Total: {settings.customTokens.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Active: {settings.customTokens.filter(t => t.isActive).length}</span>
                </div>
              </div>
              <AnimatedButton
                variant="primary"
                icon={Plus}
                onClick={() => setShowAddModal(true)}
              >
                Add Custom Token
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
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        {/* Tokens Grid */}
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-300 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filteredTokens.length === 0 ? (
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-12 text-center">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No custom tokens found</h3>
              <p className="text-gray-400 mb-6">Add your first custom token to get started.</p>
              <AnimatedButton
                variant="primary"
                icon={Plus}
                onClick={() => setShowAddModal(true)}
              >
                Add Custom Token
              </AnimatedButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTokens.map((token, index) => (
                <div 
                  key={token.id}
                  className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">{token.symbol.substring(0, 3)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{token.symbol}</h3>
                        <p className="text-gray-400 text-sm">{token.name}</p>
                        <div className="flex items-center mt-1">
                          <Network className="w-3 h-3 text-blue-400 mr-1" />
                          <span className="text-blue-400 text-xs">{token.network}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleTokenStatus(token)}>
                      {token.isActive ? (
                        <ToggleRight className="w-6 h-6 text-green-400" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Price Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">USD Price</div>
                      <div className="text-white font-semibold">${token.priceUSD.toFixed(6)}</div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">NGN Price</div>
                      <div className="text-white font-semibold">₦{token.priceNGN.toFixed(4)}</div>
                    </div>
                  </div>

                  {/* Contract Address */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-xs mb-1">Contract Address</div>
                    <div className="flex items-center justify-between bg-gray-900 rounded p-2">
                      <span className="text-white font-mono text-sm">
                        {token.contractAddress.substring(0, 8)}...{token.contractAddress.substring(token.contractAddress.length - 8)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(token.contractAddress, token.id)}
                          className="text-gray-400 hover:text-purple-500 transition-colors"
                        >
                          {copied === token.id ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button className="text-gray-400 hover:text-purple-500 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trading Settings */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Buy Trading</span>
                        <button onClick={() => toggleBuyEnabled(token)}>
                          {token.buyEnabled ? (
                            <ToggleRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="text-white text-sm">Margin: {token.buyMargin}%</div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Sell Trading</span>
                        <button onClick={() => toggleSellEnabled(token)}>
                          {token.sellEnabled ? (
                            <ToggleRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="text-white text-sm">Margin: {token.sellMargin}%</div>
                    </div>
                  </div>

                  {/* 24h Change */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">24h Change:</span>
                    <div className="flex items-center">
                      {token.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <AnimatedButton
                      variant="secondary"
                      icon={Edit}
                      size="sm"
                      onClick={() => setEditingToken(token)}
                      className="flex-1"
                    >
                      Edit
                    </AnimatedButton>
                    <AnimatedButton
                      variant="danger"
                      icon={Trash2}
                      size="sm"
                      onClick={() => deleteCustomToken(token.id)}
                      className="flex-1"
                    >
                      Delete
                    </AnimatedButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Token Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Add Custom Token</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                  <input
                    type="text"
                    value={tokenForm.symbol}
                    onChange={(e) => setTokenForm({...tokenForm, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., SHIB"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
                  <input
                    type="text"
                    value={tokenForm.name}
                    onChange={(e) => setTokenForm({...tokenForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Shiba Inu"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contract Address</label>
                  <input
                    type="text"
                    value={tokenForm.contractAddress}
                    onChange={(e) => setTokenForm({...tokenForm, contractAddress: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0x..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
                  <select
                    value={tokenForm.network}
                    onChange={(e) => setTokenForm({...tokenForm, network: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {networks.map(network => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Decimals</label>
                  <input
                    type="number"
                    value={tokenForm.decimals}
                    onChange={(e) => setTokenForm({...tokenForm, decimals: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    max="18"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">USD Price</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={tokenForm.priceUSD}
                    onChange={(e) => setTokenForm({...tokenForm, priceUSD: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.000001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">NGN Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={tokenForm.priceNGN}
                    onChange={(e) => setTokenForm({...tokenForm, priceNGN: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00165"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Buy Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tokenForm.buyMargin}
                    onChange={(e) => setTokenForm({...tokenForm, buyMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sell Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tokenForm.sellMargin}
                    onChange={(e) => setTokenForm({...tokenForm, sellMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Amount</label>
                  <input
                    type="number"
                    value={tokenForm.minAmount}
                    onChange={(e) => setTokenForm({...tokenForm, minAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Amount</label>
                  <input
                    type="number"
                    value={tokenForm.maxAmount}
                    onChange={(e) => setTokenForm({...tokenForm, maxAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setTokenForm({...tokenForm, isActive: !tokenForm.isActive})}>
                    {tokenForm.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Buy Enabled</span>
                  <button onClick={() => setTokenForm({...tokenForm, buyEnabled: !tokenForm.buyEnabled})}>
                    {tokenForm.buyEnabled ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sell Enabled</span>
                  <button onClick={() => setTokenForm({...tokenForm, sellEnabled: !tokenForm.sellEnabled})}>
                    {tokenForm.sellEnabled ? (
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
                  onClick={handleAddToken}
                  disabled={!tokenForm.symbol || !tokenForm.name || !tokenForm.contractAddress}
                  className="flex-1"
                >
                  Add Token
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Edit Token Modal */}
        {editingToken && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Custom Token</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                  <input
                    type="text"
                    value={editingToken.symbol}
                    onChange={(e) => setEditingToken({...editingToken, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
                  <input
                    type="text"
                    value={editingToken.name}
                    onChange={(e) => setEditingToken({...editingToken, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">USD Price</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editingToken.priceUSD}
                    onChange={(e) => setEditingToken({...editingToken, priceUSD: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">NGN Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editingToken.priceNGN}
                    onChange={(e) => setEditingToken({...editingToken, priceNGN: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Buy Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingToken.buyMargin}
                    onChange={(e) => setEditingToken({...editingToken, buyMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sell Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingToken.sellMargin}
                    onChange={(e) => setEditingToken({...editingToken, sellMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setEditingToken({...editingToken, isActive: !editingToken.isActive})}>
                    {editingToken.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Buy Enabled</span>
                  <button onClick={() => setEditingToken({...editingToken, buyEnabled: !editingToken.buyEnabled})}>
                    {editingToken.buyEnabled ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sell Enabled</span>
                  <button onClick={() => setEditingToken({...editingToken, sellEnabled: !editingToken.sellEnabled})}>
                    {editingToken.sellEnabled ? (
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
                  onClick={() => setEditingToken(null)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleEditToken}
                  className="flex-1"
                >
                  Update Token
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CustomTokens;