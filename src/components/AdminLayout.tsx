import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Shield, 
  Coins, 
  Sparkles, 
  Settings, 
  LogOut,
  User,
  Menu,
  X,
  BarChart3,
  Users
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Transactions', href: '/admin/transactions', icon: ArrowLeftRight },
    { name: 'KYC Management', href: '/admin/kyc', icon: Shield },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Coins & Networks', href: '/admin/coins', icon: Coins },
    { name: 'Custom Tokens', href: '/admin/custom-tokens', icon: Sparkles },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-800">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
            <Link to="/admin" className="flex items-center">
              <div className="text-xl font-bold">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
              <span className="ml-2 text-sm text-orange-500">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center h-16 px-6 border-b border-gray-700">
          <Link to="/admin" className="flex items-center">
            <div className="text-xl font-bold">
              <span className="text-white">BRIGHTOLA</span>
              <span className="text-orange-500">X</span>
            </div>
            <span className="ml-2 text-sm text-orange-500">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-orange-500">Administrator</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 bg-gray-800 border-b border-gray-700 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-between px-4">
            <Link to="/admin" className="flex items-center">
              <div className="text-xl font-bold">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
              <span className="ml-2 text-sm text-orange-500">Admin</span>
            </Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;