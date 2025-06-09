import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Calendar,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const { stats, transactions } = useData();

  // Calculate additional analytics
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const successRate = totalTransactions > 0 ? (completedTransactions / totalTransactions * 100).toFixed(1) : '0';
  
  const buyTransactions = transactions.filter(t => t.type === 'buy').length;
  const sellTransactions = transactions.filter(t => t.type === 'sell').length;

  const analyticsCards = [
    {
      title: 'Total Revenue',
      value: `₦${(stats.totalRevenue / 1000).toFixed(0)}K`,
      change: '+15.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Transaction Success Rate',
      value: `${successRate}%`,
      change: '+2.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: stats.totalUsers.toString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Daily Transactions',
      value: totalTransactions.toString(),
      change: '+8.1%',
      changeType: 'positive',
      icon: Activity,
      color: 'orange'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400 mt-1">Comprehensive platform analytics and insights</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </button>
              <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{card.title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${card.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${card.color}-500`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">{card.change}</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Volume Chart */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Volume</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Chart visualization coming soon</p>
                <p className="text-sm text-gray-500">Integration with charting library in progress</p>
              </div>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Chart visualization coming soon</p>
                <p className="text-sm text-gray-500">Integration with charting library in progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Breakdown */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Transaction Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Buy Orders</span>
                <span className="text-green-400 font-semibold">{buyTransactions}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: `${totalTransactions > 0 ? (buyTransactions / totalTransactions) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Sell Orders</span>
                <span className="text-orange-400 font-semibold">{sellTransactions}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full" 
                  style={{ width: `${totalTransactions > 0 ? (sellTransactions / totalTransactions) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Completed</span>
                <span className="text-blue-400 font-semibold">{completedTransactions}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${totalTransactions > 0 ? (completedTransactions / totalTransactions) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cryptocurrencies */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Top Cryptocurrencies by Volume</h3>
          <div className="space-y-4">
            {['BTC', 'ETH', 'USDT', 'SOL'].map((crypto, index) => {
              const volume = Math.random() * 10000000; // Mock data
              const percentage = Math.random() * 100;
              return (
                <div key={crypto} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{crypto.substring(0, 2)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{crypto}</p>
                      <p className="text-gray-400 text-sm">₦{volume.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{percentage.toFixed(1)}%</p>
                    <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-orange-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;