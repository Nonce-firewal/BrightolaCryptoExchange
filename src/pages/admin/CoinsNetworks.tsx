import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Coins,
  Network,
  DollarSign
} from 'lucide-react';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  network: string;
  buyEnabled: boolean;
  sellEnabled: boolean;
  buyMargin: number;
  sellMargin: number;
  minAmount: number;
  maxAmount: number;
  status: 'active' | 'inactive';
}

const CoinsNetworks: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      network: 'Bitcoin',
      buyEnabled: true,
      sellEnabled: true,
      buyMargin: 2.0,
      sellMargin: 2.0,
      minAmount: 0.001,
      maxAmount: 10,
      status: 'active'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      network: 'Ethereum',
      buyEnabled: true,
      sellEnabled: true,
      buyMargin: 1.5,
      sellMargin: 1.5,
      minAmount: 0.01,
      maxAmount: 100,
      status: 'active'
    },
    {
      id: '3',
      symbol: 'USDT',
      name: 'Tether',
      network: 'Ethereum',
      buyEnabled: true,
      sellEnabled: true,
      buyMargin: 1.0,
      sellMargin: 1.0,
      minAmount: 10,
      maxAmount: 50000,
      status: 'active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoin, setEditingCoin] = useState<Coin | null>(null);

  const toggleCoinStatus = (coinId: string) => {
    setCoins(prev => prev.map(coin => 
      coin.id === coinId 
        ? { ...coin, status: coin.status === 'active' ? 'inactive' : 'active' }
        : coin
    ));
  };

  const toggleBuyEnabled = (coinId: string) => {
    setCoins(prev => prev.map(coin => 
      coin.id === coinId 
        ? { ...coin, buyEnabled: !coin.buyEnabled }
        : coin
    ));
  };

  const toggleSellEnabled = (coinId: string) => {
    setCoins(prev => prev.map(coin => 
      coin.id === coinId 
        ? { ...coin, sellEnabled: !coin.sellEnabled }
        : coin
    ));
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Coins & Networks</h1>
              <p className="text-gray-400 mt-1">Manage supported cryptocurrencies and their trading parameters</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Coin
              </button>
            </div>
          </div>
        </div>

        {/* Coins Table */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
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
                {coins.map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
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
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 w-8">Buy:</span>
                          <button onClick={() => toggleBuyEnabled(coin.id)}>
                            {coin.buyEnabled ? (
                              <ToggleRight className="w-5 h-5 text-green-400" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 w-8">Sell:</span>
                          <button onClick={() => toggleSellEnabled(coin.id)}>
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
                      <button onClick={() => toggleCoinStatus(coin.id)}>
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
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
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
                <p className="text-2xl font-bold text-white mt-2">{coins.length}</p>
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
                  {coins.filter(c => c.status === 'active').length}
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
                  {new Set(coins.map(c => c.network)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CoinsNetworks;