import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PricingProvider } from './contexts/PricingContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/user/Dashboard';
import BuyCrypto from './pages/user/BuyCrypto';
import SellCrypto from './pages/user/SellCrypto';
import TransactionHistory from './pages/user/TransactionHistory';
import KYCVerification from './pages/user/KYCVerification';
import ReferralDashboard from './pages/user/ReferralDashboard';
import CustomTokens from './pages/CustomTokens';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminKYC from './pages/admin/AdminKYC';
import AdminCoins from './pages/admin/AdminCoins';
import AdminCustomTokens from './pages/admin/AdminCustomTokens';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PricingProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/custom-tokens" element={<CustomTokens />} />
            
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
            <Route path="/admin/transactions" element={
              <AdminRoute>
                <AdminTransactions />
              </AdminRoute>
            } />
            <Route path="/admin/kyc" element={
              <AdminRoute>
                <AdminKYC />
              </AdminRoute>
            } />
            <Route path="/admin/coins" element={
              <AdminRoute>
                <AdminCoins />
              </AdminRoute>
            } />
            <Route path="/admin/custom-tokens" element={
              <AdminRoute>
                <AdminCustomTokens />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />
          </Routes>
        </PricingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;