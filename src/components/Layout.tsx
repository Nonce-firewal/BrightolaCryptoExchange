import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  History, 
  Shield, 
  Users, 
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Buy Crypto', href: '/buy', icon: TrendingUp },
    { name: 'Sell Crypto', href: '/sell', icon: TrendingDown },
    { name: 'Transactions', href: '/transactions', icon: History },
    { name: 'KYC Verification', href: '/kyc', icon: Shield },
    { name: 'Referrals', href: '/referrals', icon: Users },
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
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
            <Link to="/dashboard" className="flex items-center">
              <div className="text-xl font-bold">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
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
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
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
          <Link to="/dashboard" className="flex items-center group">
            <div className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">
              <span className="text-white">BRIGHTOLA</span>
              <span className="text-orange-500">X</span>
            </div>
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
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500">
              <User className="w-4 h-4 text-gray-300 group-hover:text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
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
            className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 lg:hidden transition-all duration-300 hover:text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-between px-4">
            <Link to="/dashboard" className="flex items-center group">
              <div className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
            </Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
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
    </div>
  );
};

export default Layout;