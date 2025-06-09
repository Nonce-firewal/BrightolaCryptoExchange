import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PricingProvider } from './contexts/PricingContext';
import { DataProvider } from './contexts/DataContext';
import { AdminProvider } from './contexts/AdminContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/user/Dashboard';
import BuyCrypto from './pages/user/BuyCrypto';
import SellCrypto from './pages/user/SellCrypto';
import TransactionHistory from './pages/user/TransactionHistory';
import KYCVerification from './pages/user/KYCVerification';
import ReferralDashboard from './pages/user/ReferralDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminKYC from './pages/admin/AdminKYC';
import AdminCoins from './pages/admin/AdminCoins';
import AdminCustomTokens from './pages/admin/AdminCustomTokens';
import AdminSettings from './pages/admin/AdminSettings';
import Analytics from './pages/admin/Analytics';
import CoinsNetworks from './pages/admin/CoinsNetworks';
import CustomTokens from './pages/admin/CustomTokens';
import KYCManagement from './pages/admin/KYCManagement';
import Settings from './pages/admin/Settings';
import Transactions from './pages/admin/Transactions';
import UserManagement from './pages/admin/UserManagement';
import BankWalletManagement from './pages/admin/BankWalletManagement';
import NetworkManagement from './pages/admin/NetworkManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <PricingProvider>
            <DataProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected User Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/buy" element={
                  <ProtectedRoute>
                    <BuyCrypto />
                  </ProtectedRoute>
                } />
                <Route path="/sell" element={
                  <ProtectedRoute>
                    <SellCrypto />
                  </ProtectedRoute>
                } />
                <Route path="/transactions" element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                } />
                <Route path="/kyc" element={
                  <ProtectedRoute>
                    <KYCVerification />
                  </ProtectedRoute>
                } />
                <Route path="/referrals" element={
                  <ProtectedRoute>
                    <ReferralDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/analytics" element={
                  <AdminRoute>
                    <Analytics />
                  </AdminRoute>
                } />
                <Route path="/admin/transactions" element={
                  <AdminRoute>
                    <Transactions />
                  </AdminRoute>
                } />
                <Route path="/admin/kyc" element={
                  <AdminRoute>
                    <KYCManagement />
                  </AdminRoute>
                } />
                <Route path="/admin/coins" element={
                  <AdminRoute>
                    <CoinsNetworks />
                  </AdminRoute>
                } />
                <Route path="/admin/custom-tokens" element={
                  <AdminRoute>
                    <CustomTokens />
                  </AdminRoute>
                } />
                <Route path="/admin/networks" element={
                  <AdminRoute>
                    <NetworkManagement />
                  </AdminRoute>
                } />
                <Route path="/admin/settings" element={
                  <AdminRoute>
                    <Settings />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <UserManagement />
                  </AdminRoute>
                } />
                <Route path="/admin/bank-wallet" element={
                  <AdminRoute>
                    <BankWalletManagement />
                  </AdminRoute>
                } />
              </Routes>
            </DataProvider>
          </PricingProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;