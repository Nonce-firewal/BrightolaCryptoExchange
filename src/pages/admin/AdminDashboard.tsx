import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: Users
    },
    {
      name: 'Total Volume',
      value: '₦45.2M',
      change: '+8.3%',
      changeType: 'increase' as const,
      icon: TrendingUp
    },
    {
      name: 'Revenue',
      value: '₦892K',
      change: '+15.7%',
      changeType: 'increase' as const,
      icon: DollarSign
    },
    {
      name: 'Active Transactions',
      value: '156',
      change: '-2.1%',
      changeType: 'decrease' as const,
      icon: Activity
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor and manage your crypto exchange platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'Completed KYC verification', time: '2 minutes ago', status: 'success' },
              { user: 'Jane Smith', action: 'Sold 0.5 BTC', time: '5 minutes ago', status: 'info' },
              { user: 'Mike Johnson', action: 'Bought 1000 USDT', time: '8 minutes ago', status: 'info' },
              { user: 'Sarah Wilson', action: 'KYC rejected - resubmission required', time: '12 minutes ago', status: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`} />
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-gray-400 text-sm">{activity.action}</p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;