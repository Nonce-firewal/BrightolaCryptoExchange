import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Coins,
  Network,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CoinsNetworks: React.FC = () => {
  const { 
    settings, 
    updateCoin, 
    addCoin, 
    deleteCoin 
  } = useAdmin();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoin, setEditingCoin] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [coinForm, setCoinForm] = useState({
    symbol: '',
    name: '',
    network: 'Bitcoin',
    buyEnabled: true,
    sellEnabled: true,
    buyMargin: 2.0,
    sellMargin: 2.0,
    minAmount: 0.001,
    maxAmount: 10,
    status: 'active' as 'active' | 'inactive',
    priceUSD: 0,
    priceNGN: 0,
    change24h: 0
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const filteredCoins = settings.supportedCoins.filter(coin => {
    const matchesSearch = coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || coin.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddCoin = () => {
    addCoin(coinForm);
    setCoinForm({
      symbol: '',
      name: '',
      network: 'Bitcoin',
      buyEnabled: true,
      sellEnabled: true,
      buyMargin: 2.0,
      sellMargin: 2.0,
      minAmount: 0.001,
      maxAmount: 10,
      status: 'active',
      priceUSD: 0,
      priceNGN: 0,
      change24h: 0
    });
    setShowAddModal(false);
  };

  const handleEditCoin = () => {
    if (editingCoin) {
      updateCoin(editingCoin);
      setEditingCoin(null);
    }
  };

  const toggleCoinStatus = (coin: any) => {
    updateCoin({ ...coin, status: coin.status === 'active' ? 'inactive' : 'active' });
  };

  const toggleBuyEnabled = (coin: any) => {
    updateCoin({ ...coin, buyEnabled: !coin.buyEnabled });
  };

  const toggleSellEnabled = (coin: any) => {
    updateCoin({ ...coin, sellEnabled: !coin.sellEnabled });
  };

  const networks = ['Bitcoin', 'Ethereum', 'Binance Smart Chain', 'Polygon', 'Solana', 'Cardano', 'Avalanche', 'Arbitrum'];

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
                <Coins className="w-8 h-8 text-blue-400 mr-3" />
                Coins & Networks Management
              </h1>
              <p className="text-gray-400 mt-1">Manage supported cryptocurrencies and their trading parameters</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Total: {settings.supportedCoins.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Active: {settings.supportedCoins.filter(c => c.status === 'active').length}</span>
                </div>
              </div>
              <AnimatedButton
                variant="primary"
                icon={Plus}
                onClick={() => setShowAddModal(true)}
              >
                Add New Coin
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
                placeholder="Search coins..."
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

        {/* Coins Table */}
        <div 
          ref={contentRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-1000 delay-300 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Cryptocurrency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Network
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Margins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Limits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCoins.map((coin, index) => (
                  <tr 
                    key={coin.id} 
                    className="hover:bg-gray-700/50 transition-all duration-300 animate-slideInFromLeft"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">{coin.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{coin.symbol}</div>
                          <div className="text-sm text-gray-400">{coin.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Network className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-sm text-white">{coin.network}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white">${coin.priceUSD.toLocaleString()}</div>
                        <div className="text-gray-400">₦{coin.priceNGN.toLocaleString()}</div>
                        <div className="flex items-center">
                          {coin.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                          )}
                          <span className={`text-xs ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 w-8">Buy:</span>
                          <button onClick={() => toggleBuyEnabled(coin)}>
                            {coin.buyEnabled ? (
                              <ToggleRight className="w-5 h-5 text-green-400" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 w-8">Sell:</span>
                          <button onClick={() => toggleSellEnabled(coin)}>
                            {coin.sellEnabled ? (
                              <ToggleRight className="w-5 h-5 text-green-400" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white">Buy: {coin.buyMargin}%</div>
                        <div className="text-gray-400">Sell: {coin.sellMargin}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white">Min: {coin.minAmount}</div>
                        <div className="text-gray-400">Max: {coin.maxAmount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => toggleCoinStatus(coin)}>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                          coin.status === 'active' 
                            ? 'text-green-400 bg-green-900/20 border-green-700'
                            : 'text-red-400 bg-red-900/20 border-red-700'
                        }`}>
                          {coin.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setEditingCoin(coin)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteCoin(coin.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Coins</p>
                <p className="text-2xl font-bold text-white mt-2">{settings.supportedCoins.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Coins</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {settings.supportedCoins.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ToggleRight className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Networks</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {new Set(settings.supportedCoins.map(c => c.network)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Coin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Add New Coin</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    value={coinForm.symbol}
                    onChange={(e) => setCoinForm({...coinForm, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., BTC"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={coinForm.name}
                    onChange={(e) => setCoinForm({...coinForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bitcoin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
                  <select
                    value={coinForm.network}
                    onChange={(e) => setCoinForm({...coinForm, network: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {networks.map(network => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">USD Price</label>
                  <input
                    type="number"
                    value={coinForm.priceUSD}
                    onChange={(e) => setCoinForm({...coinForm, priceUSD: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">NGN Price</label>
                  <input
                    type="number"
                    value={coinForm.priceNGN}
                    onChange={(e) => setCoinForm({...coinForm, priceNGN: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="74250000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">24h Change (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coinForm.change24h}
                    onChange={(e) => setCoinForm({...coinForm, change24h: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Buy Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coinForm.buyMargin}
                    onChange={(e) => setCoinForm({...coinForm, buyMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sell Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coinForm.sellMargin}
                    onChange={(e) => setCoinForm({...coinForm, sellMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Amount</label>
                  <input
                    type="number"
                    step="0.001"
                    value={coinForm.minAmount}
                    onChange={(e) => setCoinForm({...coinForm, minAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Amount</label>
                  <input
                    type="number"
                    value={coinForm.maxAmount}
                    onChange={(e) => setCoinForm({...coinForm, maxAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setCoinForm({...coinForm, status: coinForm.status === 'active' ? 'inactive' : 'active'})}>
                    {coinForm.status === 'active' ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Buy Enabled</span>
                  <button onClick={() => setCoinForm({...coinForm, buyEnabled: !coinForm.buyEnabled})}>
                    {coinForm.buyEnabled ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sell Enabled</span>
                  <button onClick={() => setCoinForm({...coinForm, sellEnabled: !coinForm.sellEnabled})}>
                    {coinForm.sellEnabled ? (
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
                  onClick={handleAddCoin}
                  disabled={!coinForm.symbol || !coinForm.name}
                  className="flex-1"
                >
                  Add Coin
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Edit Coin Modal */}
        {editingCoin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Coin</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    value={editingCoin.symbol}
                    onChange={(e) => setEditingCoin({...editingCoin, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editingCoin.name}
                    onChange={(e) => setEditingCoin({...editingCoin, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">USD Price</label>
                  <input
                    type="number"
                    value={editingCoin.priceUSD}
                    onChange={(e) => setEditingCoin({...editingCoin, priceUSD: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">NGN Price</label>
                  <input
                    type="number"
                    value={editingCoin.priceNGN}
                    onChange={(e) => setEditingCoin({...editingCoin, priceNGN: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Buy Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCoin.buyMargin}
                    onChange={(e) => setEditingCoin({...editingCoin, buyMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sell Margin (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCoin.sellMargin}
                    onChange={(e) => setEditingCoin({...editingCoin, sellMargin: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setEditingCoin({...editingCoin, status: editingCoin.status === 'active' ? 'inactive' : 'active'})}>
                    {editingCoin.status === 'active' ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Buy Enabled</span>
                  <button onClick={() => setEditingCoin({...editingCoin, buyEnabled: !editingCoin.buyEnabled})}>
                    {editingCoin.buyEnabled ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sell Enabled</span>
                  <button onClick={() => setEditingCoin({...editingCoin, sellEnabled: !editingCoin.sellEnabled})}>
                    {editingCoin.sellEnabled ? (
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
                  onClick={() => setEditingCoin(null)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleEditCoin}
                  className="flex-1"
                >
                  Update Coin
                </AnimatedButton>
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
        
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
};

export default CoinsNetworks;