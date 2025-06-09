import React from 'react';
import Layout from '../../components/Layout';

const TransactionHistory: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Transaction History</h1>
          <p className="text-gray-400">Transaction history coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionHistory;