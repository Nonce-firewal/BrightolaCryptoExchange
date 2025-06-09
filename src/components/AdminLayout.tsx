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
  Users,
  Network,
  Building
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Transactions', href: '/admin/transactions', icon: ArrowLeftRight },
    { name: 'KYC Management', href: '/admin/kyc', icon: Shield },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Coins & Networks', href: '/admin/coins', icon: Coins },
    { name: 'Custom Tokens', href: '/admin/custom-tokens', icon: Sparkles },
    { name: 'Networks', href: '/admin/networks', icon: Network },
    { name: 'Bank & Wallets', href: '/admin/bank-wallet', icon: Building },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ${
            sidebarOpen ? 'bg-opacity-75' : 'bg-opacity-0'
          }`} 
          onClick={() => setSidebarOpen(false)} 
        />
        <div className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-800 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700 animate-slideInFromTop">
            <Link to="/admin" className="flex items-center">
              <div className="text-xl font-bold">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
              <span className="ml-2 text-sm text-orange-500">Admin</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate-slideInFromLeft ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-700 animate-slideInFromBottom">
            <div className="flex items-center group">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-orange-500">Administrator</p>
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center h-16 px-6 border-b border-gray-700">
          <Link to="/admin" className="flex items-center group">
            <div className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">
              <span className="text-white">BRIGHTOLA</span>
              <span className="text-orange-500">X</span>
            </div>
            <span className="ml-2 text-sm text-orange-500">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 group ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className={`w-5 h-5 mr-3 transition-transform duration-300 ${
                  isActive ? '' : 'group-hover:scale-110'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center group">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-orange-500">Administrator</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
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
            className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 lg:hidden transition-all duration-300 hover:text-gray-300 transform hover:scale-110"
          >
            <Menu className="w-6 h-6 animate-pulse" />
          </button>
          <div className="flex-1 flex items-center justify-between px-4">
            <Link to="/admin" className="flex items-center group">
              <div className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
              <span className="ml-2 text-sm text-orange-500">Admin</span>
            </Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main 
          ref={contentRef}
          className={`flex-1 transition-all duration-1000 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {children}
        </main>
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInFromTop {
          animation: slideInFromTop 0.5s ease-out;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;