import React from 'react';
import Layout from '../components/Layout';
import { useData } from '../contexts/DataContext';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { stats, transactions, kycSubmissions, refreshData } = useData();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const dashboardStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Total Volume',
      value: `₦${(stats.totalVolume / 1000000).toFixed(1)}M`,
      change: '+8.3%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'green'
    },
    {
      name: 'Revenue',
      value: `₦${(stats.totalRevenue / 1000).toFixed(0)}K`,
      change: '+15.7%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'orange'
    },
    {
      name: 'Active Transactions',
      value: stats.activeTransactions.toString(),
      change: stats.activeTransactions > 0 ? '+2' : '0',
      changeType: stats.activeTransactions > 0 ? 'increase' as const : 'neutral' as const,
      icon: Activity,
      color: 'purple'
    }
  ];

  const recentTransactions = transactions.slice(0, 5);
  const recentKYC = kycSubmissions.slice(0, 3);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor and manage your crypto exchange platform</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat) => {
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
                <div className="mt-4 flex items-center text-sm">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                  ) : stat.changeType === 'decrease' ? (
                    <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                  ) : null}
                  <span className={
                    stat.changeType === 'increase' ? 'text-green-400' : 
                    stat.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                  }>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-400' :
                      transaction.status === 'failed' ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">{transaction.userName}</p>
                      <p className="text-gray-400 text-sm">
                        {transaction.type.toUpperCase()} {transaction.amount} {transaction.cryptocurrency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">₦{transaction.amountNGN.toLocaleString()}</p>
                    <p className={`text-sm capitalize ${
                      transaction.status === 'completed' ? 'text-green-400' :
                      transaction.status === 'pending' ? 'text-yellow-400' :
                      transaction.status === 'failed' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KYC Status */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">KYC Submissions</h2>
            <div className="space-y-4">
              {recentKYC.map((kyc) => (
                <div key={kyc.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {kyc.status === 'pending' && <Clock className="w-5 h-5 text-yellow-400" />}
                      {kyc.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {kyc.status === 'rejected' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{kyc.userName}</p>
                      <p className="text-gray-400 text-sm">{kyc.userEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium capitalize ${
                      kyc.status === 'pending' ? 'text-yellow-400' :
                      kyc.status === 'approved' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {kyc.status}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(kyc.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-300 font-medium">Trading Engine</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-300 font-medium">Payment Gateway</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-300 font-medium">KYC System</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;