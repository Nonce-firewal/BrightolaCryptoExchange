import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminCoins: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Coins</h1>
          <p className="text-gray-400">Admin coins functionality coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCoins;